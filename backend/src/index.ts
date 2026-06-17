import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool, initDb } from './db';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'saraadmin';

const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
  'https://next.saaraindia.com',
  'https://www.saaraindia.com',
  'https://saaraindia.com',
  'http://next.saaraindia.com',
  'http://www.saaraindia.com',
  'http://saaraindia.com'
];

// Middleware
app.use(cors({
  origin: ALLOWED_ORIGINS,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-admin-password'],
}));

// Explicit OPTIONS preflight handler — ensures Passenger/Apache doesn't
// swallow the preflight before Express can add CORS headers.
app.options('*', cors({
  origin: ALLOWED_ORIGINS,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-admin-password'],
}));

app.use(express.json());

// URL Rewrite Middleware for production sub-path hosting (Passenger)
app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.url.startsWith('/next-api')) {
    req.url = req.url.substring('/next-api'.length);
    if (!req.url.startsWith('/')) {
      req.url = '/' + req.url;
    }
  }
  next();
});

// Serve static images from frontend/public so product/blog images
// are accessible via the backend server (needed when frontend & backend
// are on different origins, e.g. production).
// NOTE: Must be AFTER the URL rewrite so /next-api/images/... is rewritten
// to /images/... before this handler runs.
const publicImagesDir = path.join(__dirname, '../../frontend/public/images');
app.use('/images', express.static(publicImagesDir));

let dbError: string | null = null;

// Middleware to check for database connection errors on API routes
app.use((req: Request, res: Response, next: NextFunction) => {
  if (dbError && req.path.startsWith('/api/')) {
    return res.status(500).json({
      error: 'Database connection failed',
      details: dbError,
      env: {
        DB_HOST: process.env.DB_HOST || 'localhost',
        DB_PORT: process.env.DB_PORT || '3306',
        DB_USER: process.env.DB_USER || 'root',
        DB_NAME: process.env.DB_NAME || 'sara_earthing',
        DB_PASSWORD_SET: !!process.env.DB_PASSWORD,
      }
    });
  }
  next();
});

// Auth Middleware helper
const checkAdminAuth = (req: Request, res: Response, next: NextFunction) => {
  const passwordHeader = req.headers['x-admin-password'];
  if (passwordHeader !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

// --- Submissions APIs ---

// GET: Get all submissions (Admin Only)
app.get('/api/submissions', checkAdminAuth, async (req: Request, res: Response) => {
  try {
    const [rows]: any = await pool.query('SELECT * FROM submissions ORDER BY createdAt DESC');
    const parsedRows = rows.map((row: any) => {
      let parsedData = row.data;
      if (typeof row.data === 'string') {
        try {
          parsedData = JSON.parse(row.data);
        } catch (e) {
          // ignore
        }
      }
      return {
        ...row,
        data: parsedData
      };
    });
    return res.json(parsedRows);
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to fetch submissions', details: err.message });
  }
});

// POST: Add new submission (Public)
app.post('/api/submissions', async (req: Request, res: Response) => {
  try {
    const { type, data } = req.body;
    if (!type || !data) {
      return res.status(400).json({ error: 'Missing type or data' });
    }

    // Server-side validation for submission fields
    if (type === 'quote') {
      const { name, email, phone, company, location } = data;
      if (!name?.trim() || !email?.trim() || !phone?.trim() || !company?.trim() || !location?.trim()) {
        return res.status(400).json({ error: 'Validation failed: Contact Name, Corporate Email, Phone, Company, and Location are required.' });
      }
    } else if (type === 'contact') {
      const { name, email, phone, message } = data;
      if (!name?.trim() || !email?.trim() || !phone?.trim() || !message?.trim()) {
        return res.status(400).json({ error: 'Validation failed: Full Name, Email, Phone, and Message/Requirements are required.' });
      }
    } else {
      return res.status(400).json({ error: 'Invalid submission type' });
    }

    const id = Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
    const status = 'new';
    const createdAt = new Date();

    await pool.query(
      'INSERT INTO submissions (id, type, data, status, createdAt) VALUES (?, ?, ?, ?, ?)',
      [id, type, JSON.stringify(data), status, createdAt]
    );

    return res.json({ success: true, id });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to write submission', details: err.message });
  }
});

// PUT: Update submission status (Admin Only)
app.put('/api/submissions/:id', checkAdminAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'Missing status' });
    }

    const [result]: any = await pool.query(
      'UPDATE submissions SET status = ? WHERE id = ?',
      [status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    return res.json({ success: true });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to update submission', details: err.message });
  }
});

// DELETE: Delete submission (Admin Only)
app.delete('/api/submissions/:id', checkAdminAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [result]: any = await pool.query('DELETE FROM submissions WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    return res.json({ success: true });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to delete submission', details: err.message });
  }
});

// --- Upload API ---

const uploadDir = path.join(__dirname, '../../frontend/public/images/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// POST: Upload an image (Admin Only)
app.post('/api/upload', checkAdminAuth, upload.single('file'), (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    // Return the API-based URL path so the image is served through the
    // /api/uploads/:filename route (works without static middleware)
    const filePath = `/api/uploads/${req.file.filename}`;
    return res.json({ success: true, filePath });
  } catch (err: any) {
    return res.status(500).json({ error: 'Upload failed', details: err.message });
  }
});

// GET: Serve an uploaded image file
app.get('/api/uploads/:filename', (req: Request, res: Response) => {
  const filename = path.basename(req.params.filename); // sanitize
  const filePath = path.join(uploadDir, filename);
  if (fs.existsSync(filePath)) {
    return res.sendFile(filePath);
  }
  return res.status(404).json({ error: 'File not found' });
});

// --- Products APIs ---

// GET: Get all products (Public)
app.get('/api/products', async (req: Request, res: Response) => {
  try {
    const [rows]: any = await pool.query('SELECT * FROM products');
    return res.json(rows);
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to fetch products', details: err.message });
  }
});

// POST: Add new product (Admin Only)
app.post('/api/products', checkAdminAuth, async (req: Request, res: Response) => {
  try {
    const prod = req.body;
    if (!prod.slug || !prod.category || !prod.title || !prod.desc || !prod.image) {
      return res.status(400).json({ error: 'Missing required fields (slug, category, title, desc, image)' });
    }

    // Check conflict
    const [existing]: any = await pool.query(
      'SELECT slug FROM products WHERE slug = ? AND category = ?',
      [prod.slug, prod.category]
    );
    if (existing.length > 0) {
      return res.status(400).json({ error: 'Product with this slug already exists in this category' });
    }

    await pool.query(
      'INSERT INTO products (slug, category, title, `desc`, image, hoverImage, features, specs, applications, longDesc, highlights, detailedTabs) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        prod.slug,
        prod.category,
        prod.title,
        prod.desc,
        prod.image,
        prod.hoverImage || null,
        prod.features ? JSON.stringify(prod.features) : null,
        prod.specs ? JSON.stringify(prod.specs) : null,
        prod.applications ? JSON.stringify(prod.applications) : null,
        prod.longDesc ? JSON.stringify(prod.longDesc) : null,
        prod.highlights ? JSON.stringify(prod.highlights) : null,
        prod.detailedTabs ? JSON.stringify(prod.detailedTabs) : null
      ]
    );

    return res.json({ success: true, product: prod });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to write product', details: err.message });
  }
});

// PUT: Update an existing product (Admin Only)
app.put('/api/products/:slug', checkAdminAuth, async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const updatedProd = req.body;

    if (!updatedProd.slug || !updatedProd.category || !updatedProd.title || !updatedProd.desc || !updatedProd.image) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if product exists
    const [existing]: any = await pool.query('SELECT slug FROM products WHERE slug = ?', [slug]);
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Check conflict if changing slug
    if (updatedProd.slug !== slug) {
      const [conflict]: any = await pool.query(
        'SELECT slug FROM products WHERE slug = ? AND category = ?',
        [updatedProd.slug, updatedProd.category]
      );
      if (conflict.length > 0) {
        return res.status(400).json({ error: 'Product with the new slug already exists' });
      }
    }

    await pool.query(
      'UPDATE products SET slug = ?, category = ?, title = ?, `desc` = ?, image = ?, hoverImage = ?, features = ?, specs = ?, applications = ?, longDesc = ?, highlights = ?, detailedTabs = ? WHERE slug = ?',
      [
        updatedProd.slug,
        updatedProd.category,
        updatedProd.title,
        updatedProd.desc,
        updatedProd.image,
        updatedProd.hoverImage || null,
        updatedProd.features ? JSON.stringify(updatedProd.features) : null,
        updatedProd.specs ? JSON.stringify(updatedProd.specs) : null,
        updatedProd.applications ? JSON.stringify(updatedProd.applications) : null,
        updatedProd.longDesc ? JSON.stringify(updatedProd.longDesc) : null,
        updatedProd.highlights ? JSON.stringify(updatedProd.highlights) : null,
        updatedProd.detailedTabs ? JSON.stringify(updatedProd.detailedTabs) : null,
        slug
      ]
    );

    return res.json({ success: true, product: updatedProd });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to update product', details: err.message });
  }
});

// DELETE: Remove product (Admin Only)
app.delete('/api/products/:slug', checkAdminAuth, async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    const [rows]: any = await pool.query('SELECT * FROM products WHERE slug = ?', [slug]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    await pool.query('DELETE FROM products WHERE slug = ?', [slug]);

    return res.json({ success: true, deleted: rows[0] });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to delete product', details: err.message });
  }
});

// --- Metadata APIs ---

// GET: Get all page metadata (Public)
app.get('/api/metadata', async (req: Request, res: Response) => {
  try {
    const [rows]: any = await pool.query('SELECT * FROM metadata');
    const obj: Record<string, { title: string; description: string }> = {};
    for (const row of rows) {
      obj[row.path] = {
        title: row.title,
        description: row.description
      };
    }
    return res.json(obj);
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to fetch metadata', details: err.message });
  }
});

// PUT: Update page metadata (Admin Only)
app.put('/api/metadata', checkAdminAuth, async (req: Request, res: Response) => {
  try {
    const updatedMetadata = req.body;
    if (typeof updatedMetadata !== 'object' || updatedMetadata === null) {
      return res.status(400).json({ error: 'Invalid metadata format' });
    }

    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();
      
      await connection.query('DELETE FROM metadata');
      
      for (const [pathKey, val] of Object.entries(updatedMetadata)) {
        const metadataVal = val as any;
        await connection.query(
          'INSERT INTO metadata (path, title, description) VALUES (?, ?, ?)',
          [pathKey, metadataVal.title || '', metadataVal.description || '']
        );
      }
      
      await connection.commit();
    } catch (txErr) {
      await connection.rollback();
      throw txErr;
    } finally {
      connection.release();
    }

    return res.json({ success: true, metadata: updatedMetadata });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to update metadata', details: err.message });
  }
});

// --- Blogs APIs ---

// GET: Get all blogs (Public)
app.get('/api/blogs', async (req: Request, res: Response) => {
  try {
    const [rows]: any = await pool.query('SELECT * FROM blogs');
    return res.json(rows);
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to fetch blogs', details: err.message });
  }
});

// GET: Get single blog post by slug (Public)
app.get('/api/blogs/:slug', async (req: Request, res: Response) => {
  try {
    const [rows]: any = await pool.query('SELECT * FROM blogs WHERE slug = ?', [req.params.slug]);
    if (rows.length === 0) return res.status(404).json({ error: 'Blog not found' });
    return res.json(rows[0]);
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to fetch blog post', details: err.message });
  }
});

// POST: Add new blog (Admin Only)
app.post('/api/blogs', checkAdminAuth, async (req: Request, res: Response) => {
  try {
    const blog = req.body;
    if (!blog.slug || !blog.title || !blog.excerpt || !blog.content || !blog.image || !blog.author || !blog.readTime || !blog.date) {
      return res.status(400).json({ error: 'Missing required blog fields (slug, title, excerpt, content, image, author, readTime, date)' });
    }

    const [existing]: any = await pool.query('SELECT slug FROM blogs WHERE slug = ?', [blog.slug]);
    if (existing.length > 0) {
      return res.status(400).json({ error: 'Blog with this slug already exists' });
    }

    await pool.query(
      'INSERT INTO blogs (slug, title, excerpt, content, image, author, readTime, date, metaTitle, metaDescription) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        blog.slug,
        blog.title,
        blog.excerpt,
        blog.content ? JSON.stringify(blog.content) : null,
        blog.image,
        blog.author,
        blog.readTime,
        blog.date,
        blog.metaTitle || null,
        blog.metaDescription || null
      ]
    );

    return res.json({ success: true, blog });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to write blog post', details: err.message });
  }
});

// PUT: Update an existing blog (Admin Only)
app.put('/api/blogs/:slug', checkAdminAuth, async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const updatedBlog = req.body;

    if (!updatedBlog.slug || !updatedBlog.title || !updatedBlog.excerpt || !updatedBlog.content || !updatedBlog.image || !updatedBlog.author || !updatedBlog.readTime || !updatedBlog.date) {
      return res.status(400).json({ error: 'Missing required blog fields' });
    }

    const [existing]: any = await pool.query('SELECT slug FROM blogs WHERE slug = ?', [slug]);
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    if (updatedBlog.slug !== slug) {
      const [conflict]: any = await pool.query('SELECT slug FROM blogs WHERE slug = ?', [updatedBlog.slug]);
      if (conflict.length > 0) {
        return res.status(400).json({ error: 'Blog with the new slug already exists' });
      }
    }

    await pool.query(
      'UPDATE blogs SET slug = ?, title = ?, excerpt = ?, content = ?, image = ?, author = ?, readTime = ?, date = ?, metaTitle = ?, metaDescription = ? WHERE slug = ?',
      [
        updatedBlog.slug,
        updatedBlog.title,
        updatedBlog.excerpt,
        updatedBlog.content ? JSON.stringify(updatedBlog.content) : null,
        updatedBlog.image,
        updatedBlog.author,
        updatedBlog.readTime,
        updatedBlog.date,
        updatedBlog.metaTitle || null,
        updatedBlog.metaDescription || null,
        slug
      ]
    );

    return res.json({ success: true, blog: updatedBlog });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to update blog post', details: err.message });
  }
});

// DELETE: Remove blog (Admin Only)
app.delete('/api/blogs/:slug', checkAdminAuth, async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    const [rows]: any = await pool.query('SELECT * FROM blogs WHERE slug = ?', [slug]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    await pool.query('DELETE FROM blogs WHERE slug = ?', [slug]);

    return res.json({ success: true, deleted: rows[0] });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to delete blog post', details: err.message });
  }
});

// Start Server after initializing DB
initDb()
  .then(() => {
    console.log('[MySQL] Database initialized successfully.');
  })
  .catch((err) => {
    console.error('Failed to initialize database:', err);
    dbError = err.message || String(err);
  })
  .finally(() => {
    app.listen(PORT, () => {
      console.log(`[SAARA Earthing Backend] running on http://localhost:${PORT}`);
      if (dbError) {
        console.warn(`[WARNING] Server started but database initialization failed: ${dbError}`);
      }
    });
  });
