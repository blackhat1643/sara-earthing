"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
exports.initDb = initDb;
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'sara_earthing',
    port: parseInt(process.env.DB_PORT || '3306', 10),
};
async function initDb() {
    console.log('[MySQL] Initializing database connection...');
    try {
        // 1. First connect without selecting database, to ensure the database exists
        const tempConnection = await promise_1.default.createConnection({
            host: dbConfig.host,
            user: dbConfig.user,
            password: dbConfig.password,
            port: dbConfig.port,
            connectTimeout: 5000,
        });
        await tempConnection.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\`;`);
        await tempConnection.end();
        console.log(`[MySQL] Verified database "${dbConfig.database}" exists.`);
    }
    catch (err) {
        console.error('[MySQL] Database creation warning/error (may lack permissions):', err.message);
    }
    // 2. Initialize connection pool
    exports.pool = promise_1.default.createPool({
        ...dbConfig,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        connectTimeout: 5000,
    });
    // Verify connection pool works
    try {
        const conn = await exports.pool.getConnection();
        conn.release();
        console.log('[MySQL] Database connection pool verified successfully.');
    }
    catch (err) {
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
    await exports.pool.query(submissionsTable);
    await exports.pool.query(productsTable);
    await exports.pool.query(metadataTable);
    await exports.pool.query(blogsTable);
    console.log('[MySQL] All tables verified.');
}
async function seedDatabase() {
    console.log('[MySQL] Checking if data seeding is required...');
    const getJsonPath = (filename) => {
        const srcPath = path_1.default.join(process.cwd(), 'src', 'data', filename);
        if (fs_1.default.existsSync(srcPath))
            return srcPath;
        const dirPath = path_1.default.join(__dirname, 'data', filename);
        if (fs_1.default.existsSync(dirPath))
            return dirPath;
        return path_1.default.join(process.cwd(), 'data', filename);
    };
    const submissionsPath = getJsonPath('submissions.json');
    const productsPath = getJsonPath('products.json');
    const metadataPath = getJsonPath('metadata.json');
    const blogsPath = getJsonPath('blogs.json');
    // Seed Submissions
    try {
        const [rows] = await exports.pool.query('SELECT COUNT(*) as count FROM submissions');
        if (rows[0].count === 0 && fs_1.default.existsSync(submissionsPath)) {
            const data = fs_1.default.readFileSync(submissionsPath, 'utf-8');
            const list = JSON.parse(data || '[]');
            if (Array.isArray(list) && list.length > 0) {
                console.log(`[MySQL] Seeding ${list.length} submissions from JSON...`);
                for (const item of list) {
                    await exports.pool.query('INSERT INTO submissions (id, type, data, status, createdAt) VALUES (?, ?, ?, ?, ?)', [item.id, item.type, JSON.stringify(item.data), item.status, item.createdAt || new Date()]);
                }
            }
        }
    }
    catch (err) {
        console.error('[MySQL] Error seeding submissions:', err.message);
    }
    // Seed Products
    try {
        const [rows] = await exports.pool.query('SELECT COUNT(*) as count FROM products');
        if (rows[0].count === 0 && fs_1.default.existsSync(productsPath)) {
            const data = fs_1.default.readFileSync(productsPath, 'utf-8');
            const list = JSON.parse(data || '[]');
            if (Array.isArray(list) && list.length > 0) {
                console.log(`[MySQL] Seeding ${list.length} products from JSON...`);
                for (const item of list) {
                    await exports.pool.query('INSERT INTO products (slug, category, title, `desc`, image, hoverImage, features, specs, applications, longDesc, highlights, detailedTabs) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
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
                    ]);
                }
            }
        }
    }
    catch (err) {
        console.error('[MySQL] Error seeding products:', err.message);
    }
    // Seed Metadata
    try {
        const [rows] = await exports.pool.query('SELECT COUNT(*) as count FROM metadata');
        if (rows[0].count === 0 && fs_1.default.existsSync(metadataPath)) {
            const data = fs_1.default.readFileSync(metadataPath, 'utf-8');
            const obj = JSON.parse(data || '{}');
            const entries = Object.entries(obj);
            if (entries.length > 0) {
                console.log(`[MySQL] Seeding ${entries.length} metadata entries from JSON...`);
                for (const [pathKey, entryVal] of entries) {
                    const val = entryVal;
                    await exports.pool.query('INSERT INTO metadata (path, title, description) VALUES (?, ?, ?)', [pathKey, val.title, val.description]);
                }
            }
        }
    }
    catch (err) {
        console.error('[MySQL] Error seeding metadata:', err.message);
    }
    // Seed Blogs
    try {
        const [rows] = await exports.pool.query('SELECT COUNT(*) as count FROM blogs');
        if (rows[0].count === 0 && fs_1.default.existsSync(blogsPath)) {
            const data = fs_1.default.readFileSync(blogsPath, 'utf-8');
            const list = JSON.parse(data || '[]');
            if (Array.isArray(list) && list.length > 0) {
                console.log(`[MySQL] Seeding ${list.length} blogs from JSON...`);
                for (const item of list) {
                    await exports.pool.query('INSERT INTO blogs (slug, title, excerpt, content, image, author, readTime, date, metaTitle, metaDescription) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
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
                    ]);
                }
            }
        }
    }
    catch (err) {
        console.error('[MySQL] Error seeding blogs:', err.message);
    }
    console.log('[MySQL] Seeding check completed.');
}
