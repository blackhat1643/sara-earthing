import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'sara_earthing',
  port: parseInt(process.env.DB_PORT || '3306', 10),
};

export let pool: mysql.Pool;

export async function initDb() {
  console.log('[MySQL] Initializing database connection...');

  try {
    // 1. First connect without selecting database, to ensure the database exists
    const tempConnection = await mysql.createConnection({
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password,
      port: dbConfig.port,
    });
    
    await tempConnection.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\`;`);
    await tempConnection.end();
    console.log(`[MySQL] Verified database "${dbConfig.database}" exists.`);
  } catch (err: any) {
    console.error('[MySQL] Database creation warning/error (may lack permissions):', err.message);
  }

  // 2. Initialize connection pool
  pool = mysql.createPool({
    ...dbConfig,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  // Verify connection pool works
  try {
    const conn = await pool.getConnection();
    conn.release();
    console.log('[MySQL] Database connection pool verified successfully.');
  } catch (err: any) {
    console.error('[MySQL] Failed to establish database connection:', err.message);
    throw err;
  }

  // 3. Create tables
  await createTables();

  // 4. Seed data from JSON if tables are empty
  await seedDatabase();
}

async function createTables() {
  console.log('[MySQL] Verifying tables structure...');

  const submissionsTable = `
    CREATE TABLE IF NOT EXISTS submissions (
      id VARCHAR(50) PRIMARY KEY,
      type VARCHAR(50) NOT NULL,
      data JSON NOT NULL,
      status VARCHAR(50) NOT NULL DEFAULT 'new',
      createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const productsTable = `
    CREATE TABLE IF NOT EXISTS products (
      slug VARCHAR(100) NOT NULL,
      category VARCHAR(100) NOT NULL,
      title VARCHAR(255) NOT NULL,
      \`desc\` TEXT,
      image VARCHAR(255),
      hoverImage VARCHAR(255),
      features JSON,
      specs JSON,
      applications JSON,
      longDesc JSON,
      highlights JSON,
      detailedTabs JSON,
      PRIMARY KEY (slug)
    );
  `;

  const metadataTable = `
    CREATE TABLE IF NOT EXISTS metadata (
      path VARCHAR(255) PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL
    );
  `;

  const blogsTable = `
    CREATE TABLE IF NOT EXISTS blogs (
      slug VARCHAR(100) PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      excerpt TEXT,
      content JSON,
      image VARCHAR(255),
      author VARCHAR(100),
      readTime VARCHAR(50),
      date VARCHAR(50),
      metaTitle VARCHAR(255),
      metaDescription TEXT
    );
  `;

  await pool.query(submissionsTable);
  await pool.query(productsTable);
  await pool.query(metadataTable);
  await pool.query(blogsTable);

  console.log('[MySQL] All tables verified.');
}

async function seedDatabase() {
  console.log('[MySQL] Checking if data seeding is required...');

  const getJsonPath = (filename: string): string => {
    const srcPath = path.join(process.cwd(), 'src', 'data', filename);
    if (fs.existsSync(srcPath)) return srcPath;
    const dirPath = path.join(__dirname, 'data', filename);
    if (fs.existsSync(dirPath)) return dirPath;
    return path.join(process.cwd(), 'data', filename);
  };

  const submissionsPath = getJsonPath('submissions.json');
  const productsPath = getJsonPath('products.json');
  const metadataPath = getJsonPath('metadata.json');
  const blogsPath = getJsonPath('blogs.json');

  // Seed Submissions
  try {
    const [rows]: any = await pool.query('SELECT COUNT(*) as count FROM submissions');
    if (rows[0].count === 0 && fs.existsSync(submissionsPath)) {
      const data = fs.readFileSync(submissionsPath, 'utf-8');
      const list = JSON.parse(data || '[]');
      if (Array.isArray(list) && list.length > 0) {
        console.log(`[MySQL] Seeding ${list.length} submissions from JSON...`);
        for (const item of list) {
          await pool.query(
            'INSERT INTO submissions (id, type, data, status, createdAt) VALUES (?, ?, ?, ?, ?)',
            [item.id, item.type, JSON.stringify(item.data), item.status, item.createdAt || new Date()]
          );
        }
      }
    }
  } catch (err: any) {
    console.error('[MySQL] Error seeding submissions:', err.message);
  }

  // Seed Products
  try {
    const [rows]: any = await pool.query('SELECT COUNT(*) as count FROM products');
    if (rows[0].count === 0 && fs.existsSync(productsPath)) {
      const data = fs.readFileSync(productsPath, 'utf-8');
      const list = JSON.parse(data || '[]');
      if (Array.isArray(list) && list.length > 0) {
        console.log(`[MySQL] Seeding ${list.length} products from JSON...`);
        for (const item of list) {
          await pool.query(
            'INSERT INTO products (slug, category, title, `desc`, image, hoverImage, features, specs, applications, longDesc, highlights, detailedTabs) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
              item.slug,
              item.category,
              item.title,
              item.desc,
              item.image,
              item.hoverImage || null,
              item.features ? JSON.stringify(item.features) : null,
              item.specs ? JSON.stringify(item.specs) : null,
              item.applications ? JSON.stringify(item.applications) : null,
              item.longDesc ? JSON.stringify(item.longDesc) : null,
              item.highlights ? JSON.stringify(item.highlights) : null,
              item.detailedTabs ? JSON.stringify(item.detailedTabs) : null,
            ]
          );
        }
      }
    }
  } catch (err: any) {
    console.error('[MySQL] Error seeding products:', err.message);
  }

  // Seed Metadata
  try {
    const [rows]: any = await pool.query('SELECT COUNT(*) as count FROM metadata');
    if (rows[0].count === 0 && fs.existsSync(metadataPath)) {
      const data = fs.readFileSync(metadataPath, 'utf-8');
      const obj = JSON.parse(data || '{}');
      const entries = Object.entries(obj);
      if (entries.length > 0) {
        console.log(`[MySQL] Seeding ${entries.length} metadata entries from JSON...`);
        for (const [pathKey, entryVal] of entries) {
          const val = entryVal as any;
          await pool.query(
            'INSERT INTO metadata (path, title, description) VALUES (?, ?, ?)',
            [pathKey, val.title, val.description]
          );
        }
      }
    }
  } catch (err: any) {
    console.error('[MySQL] Error seeding metadata:', err.message);
  }

  // Seed Blogs
  try {
    const [rows]: any = await pool.query('SELECT COUNT(*) as count FROM blogs');
    if (rows[0].count === 0 && fs.existsSync(blogsPath)) {
      const data = fs.readFileSync(blogsPath, 'utf-8');
      const list = JSON.parse(data || '[]');
      if (Array.isArray(list) && list.length > 0) {
        console.log(`[MySQL] Seeding ${list.length} blogs from JSON...`);
        for (const item of list) {
          await pool.query(
            'INSERT INTO blogs (slug, title, excerpt, content, image, author, readTime, date, metaTitle, metaDescription) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
              item.slug,
              item.title,
              item.excerpt,
              item.content ? JSON.stringify(item.content) : null,
              item.image,
              item.author,
              item.readTime,
              item.date,
              item.metaTitle || null,
              item.metaDescription || null,
            ]
          );
        }
      }
    }
  } catch (err: any) {
    console.error('[MySQL] Error seeding blogs:', err.message);
  }

  console.log('[MySQL] Seeding check completed.');
}
