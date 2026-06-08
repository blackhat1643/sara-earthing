"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./db");
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
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
app.use((0, cors_1.default)({
    origin: ALLOWED_ORIGINS,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'x-admin-password'],
}));
// Explicit OPTIONS preflight handler — ensures Passenger/Apache doesn't
// swallow the preflight before Express can add CORS headers.
app.options('*', (0, cors_1.default)({
    origin: ALLOWED_ORIGINS,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'x-admin-password'],
}));
app.use(express_1.default.json());
// URL Rewrite Middleware for production sub-path hosting (Passenger)
app.use((req, res, next) => {
    if (req.url.startsWith('/next-api')) {
        req.url = req.url.substring('/next-api'.length);
        if (!req.url.startsWith('/')) {
            req.url = '/' + req.url;
        }
    }
    next();
});
let dbError = null;
// Middleware to check for database connection errors on API routes
app.use((req, res, next) => {
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
const checkAdminAuth = (req, res, next) => {
    const passwordHeader = req.headers['x-admin-password'];
    if (passwordHeader !== ADMIN_PASSWORD) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
};
// --- Submissions APIs ---
// GET: Get all submissions (Admin Only)
app.get('/api/submissions', checkAdminAuth, async (req, res) => {
    try {
        const [rows] = await db_1.pool.query('SELECT * FROM submissions ORDER BY createdAt DESC');
        return res.json(rows);
    }
    catch (err) {
        return res.status(500).json({ error: 'Failed to fetch submissions', details: err.message });
    }
});
// POST: Add new submission (Public)
app.post('/api/submissions', async (req, res) => {
    try {
        const { type, data } = req.body;
        if (!type || !data) {
            return res.status(400).json({ error: 'Missing type or data' });
        }
        const id = Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
        const status = 'new';
        const createdAt = new Date();
        await db_1.pool.query('INSERT INTO submissions (id, type, data, status, createdAt) VALUES (?, ?, ?, ?, ?)', [id, type, JSON.stringify(data), status, createdAt]);
        return res.json({ success: true, id });
    }
    catch (err) {
        return res.status(500).json({ error: 'Failed to write submission', details: err.message });
    }
});
// PUT: Update submission status (Admin Only)
app.put('/api/submissions/:id', checkAdminAuth, async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        if (!status) {
            return res.status(400).json({ error: 'Missing status' });
        }
        const [result] = await db_1.pool.query('UPDATE submissions SET status = ? WHERE id = ?', [status, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Submission not found' });
        }
        return res.json({ success: true });
    }
    catch (err) {
        return res.status(500).json({ error: 'Failed to update submission', details: err.message });
    }
});
// DELETE: Delete submission (Admin Only)
app.delete('/api/submissions/:id', checkAdminAuth, async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await db_1.pool.query('DELETE FROM submissions WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Submission not found' });
        }
        return res.json({ success: true });
    }
    catch (err) {
        return res.status(500).json({ error: 'Failed to delete submission', details: err.message });
    }
});
// --- Products APIs ---
// GET: Get all products (Public)
app.get('/api/products', async (req, res) => {
    try {
        const [rows] = await db_1.pool.query('SELECT * FROM products');
        return res.json(rows);
    }
    catch (err) {
        return res.status(500).json({ error: 'Failed to fetch products', details: err.message });
    }
});
// POST: Add new product (Admin Only)
app.post('/api/products', checkAdminAuth, async (req, res) => {
    try {
        const prod = req.body;
        if (!prod.slug || !prod.category || !prod.title || !prod.desc || !prod.image) {
            return res.status(400).json({ error: 'Missing required fields (slug, category, title, desc, image)' });
        }
        // Check conflict
        const [existing] = await db_1.pool.query('SELECT slug FROM products WHERE slug = ? AND category = ?', [prod.slug, prod.category]);
        if (existing.length > 0) {
            return res.status(400).json({ error: 'Product with this slug already exists in this category' });
        }
        await db_1.pool.query('INSERT INTO products (slug, category, title, `desc`, image, hoverImage, features, specs, applications, longDesc, highlights, detailedTabs) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
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
        ]);
        return res.json({ success: true, product: prod });
    }
    catch (err) {
        return res.status(500).json({ error: 'Failed to write product', details: err.message });
    }
});
// PUT: Update an existing product (Admin Only)
app.put('/api/products/:slug', checkAdminAuth, async (req, res) => {
    try {
        const { slug } = req.params;
        const updatedProd = req.body;
        if (!updatedProd.slug || !updatedProd.category || !updatedProd.title || !updatedProd.desc || !updatedProd.image) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        // Check if product exists
        const [existing] = await db_1.pool.query('SELECT slug FROM products WHERE slug = ?', [slug]);
        if (existing.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        // Check conflict if changing slug
        if (updatedProd.slug !== slug) {
            const [conflict] = await db_1.pool.query('SELECT slug FROM products WHERE slug = ? AND category = ?', [updatedProd.slug, updatedProd.category]);
            if (conflict.length > 0) {
                return res.status(400).json({ error: 'Product with the new slug already exists' });
            }
        }
        await db_1.pool.query('UPDATE products SET slug = ?, category = ?, title = ?, `desc` = ?, image = ?, hoverImage = ?, features = ?, specs = ?, applications = ?, longDesc = ?, highlights = ?, detailedTabs = ? WHERE slug = ?', [
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
        ]);
        return res.json({ success: true, product: updatedProd });
    }
    catch (err) {
        return res.status(500).json({ error: 'Failed to update product', details: err.message });
    }
});
// DELETE: Remove product (Admin Only)
app.delete('/api/products/:slug', checkAdminAuth, async (req, res) => {
    try {
        const { slug } = req.params;
        const [rows] = await db_1.pool.query('SELECT * FROM products WHERE slug = ?', [slug]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        await db_1.pool.query('DELETE FROM products WHERE slug = ?', [slug]);
        return res.json({ success: true, deleted: rows[0] });
    }
    catch (err) {
        return res.status(500).json({ error: 'Failed to delete product', details: err.message });
    }
});
// --- Metadata APIs ---
// GET: Get all page metadata (Public)
app.get('/api/metadata', async (req, res) => {
    try {
        const [rows] = await db_1.pool.query('SELECT * FROM metadata');
        const obj = {};
        for (const row of rows) {
            obj[row.path] = {
                title: row.title,
                description: row.description
            };
        }
        return res.json(obj);
    }
    catch (err) {
        return res.status(500).json({ error: 'Failed to fetch metadata', details: err.message });
    }
});
// PUT: Update page metadata (Admin Only)
app.put('/api/metadata', checkAdminAuth, async (req, res) => {
    try {
        const updatedMetadata = req.body;
        if (typeof updatedMetadata !== 'object' || updatedMetadata === null) {
            return res.status(400).json({ error: 'Invalid metadata format' });
        }
        const connection = await db_1.pool.getConnection();
        try {
            await connection.beginTransaction();
            await connection.query('DELETE FROM metadata');
            for (const [pathKey, val] of Object.entries(updatedMetadata)) {
                const metadataVal = val;
                await connection.query('INSERT INTO metadata (path, title, description) VALUES (?, ?, ?)', [pathKey, metadataVal.title || '', metadataVal.description || '']);
            }
            await connection.commit();
        }
        catch (txErr) {
            await connection.rollback();
            throw txErr;
        }
        finally {
            connection.release();
        }
        return res.json({ success: true, metadata: updatedMetadata });
    }
    catch (err) {
        return res.status(500).json({ error: 'Failed to update metadata', details: err.message });
    }
});
// --- Blogs APIs ---
// GET: Get all blogs (Public)
app.get('/api/blogs', async (req, res) => {
    try {
        const [rows] = await db_1.pool.query('SELECT * FROM blogs');
        return res.json(rows);
    }
    catch (err) {
        return res.status(500).json({ error: 'Failed to fetch blogs', details: err.message });
    }
});
// GET: Get single blog post by slug (Public)
app.get('/api/blogs/:slug', async (req, res) => {
    try {
        const [rows] = await db_1.pool.query('SELECT * FROM blogs WHERE slug = ?', [req.params.slug]);
        if (rows.length === 0)
            return res.status(404).json({ error: 'Blog not found' });
        return res.json(rows[0]);
    }
    catch (err) {
        return res.status(500).json({ error: 'Failed to fetch blog post', details: err.message });
    }
});
// POST: Add new blog (Admin Only)
app.post('/api/blogs', checkAdminAuth, async (req, res) => {
    try {
        const blog = req.body;
        if (!blog.slug || !blog.title || !blog.excerpt || !blog.content || !blog.image || !blog.author || !blog.readTime || !blog.date) {
            return res.status(400).json({ error: 'Missing required blog fields (slug, title, excerpt, content, image, author, readTime, date)' });
        }
        const [existing] = await db_1.pool.query('SELECT slug FROM blogs WHERE slug = ?', [blog.slug]);
        if (existing.length > 0) {
            return res.status(400).json({ error: 'Blog with this slug already exists' });
        }
        await db_1.pool.query('INSERT INTO blogs (slug, title, excerpt, content, image, author, readTime, date, metaTitle, metaDescription) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
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
        ]);
        return res.json({ success: true, blog });
    }
    catch (err) {
        return res.status(500).json({ error: 'Failed to write blog post', details: err.message });
    }
});
// PUT: Update an existing blog (Admin Only)
app.put('/api/blogs/:slug', checkAdminAuth, async (req, res) => {
    try {
        const { slug } = req.params;
        const updatedBlog = req.body;
        if (!updatedBlog.slug || !updatedBlog.title || !updatedBlog.excerpt || !updatedBlog.content || !updatedBlog.image || !updatedBlog.author || !updatedBlog.readTime || !updatedBlog.date) {
            return res.status(400).json({ error: 'Missing required blog fields' });
        }
        const [existing] = await db_1.pool.query('SELECT slug FROM blogs WHERE slug = ?', [slug]);
        if (existing.length === 0) {
            return res.status(404).json({ error: 'Blog post not found' });
        }
        if (updatedBlog.slug !== slug) {
            const [conflict] = await db_1.pool.query('SELECT slug FROM blogs WHERE slug = ?', [updatedBlog.slug]);
            if (conflict.length > 0) {
                return res.status(400).json({ error: 'Blog with the new slug already exists' });
            }
        }
        await db_1.pool.query('UPDATE blogs SET slug = ?, title = ?, excerpt = ?, content = ?, image = ?, author = ?, readTime = ?, date = ?, metaTitle = ?, metaDescription = ? WHERE slug = ?', [
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
        ]);
        return res.json({ success: true, blog: updatedBlog });
    }
    catch (err) {
        return res.status(500).json({ error: 'Failed to update blog post', details: err.message });
    }
});
// DELETE: Remove blog (Admin Only)
app.delete('/api/blogs/:slug', checkAdminAuth, async (req, res) => {
    try {
        const { slug } = req.params;
        const [rows] = await db_1.pool.query('SELECT * FROM blogs WHERE slug = ?', [slug]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Blog post not found' });
        }
        await db_1.pool.query('DELETE FROM blogs WHERE slug = ?', [slug]);
        return res.json({ success: true, deleted: rows[0] });
    }
    catch (err) {
        return res.status(500).json({ error: 'Failed to delete blog post', details: err.message });
    }
});
// Start Server after initializing DB
(0, db_1.initDb)()
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
