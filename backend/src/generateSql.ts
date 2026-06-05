import fs from 'fs';
import path from 'path';

// Define paths
const submissionsPath = path.join(__dirname, 'data', 'submissions.json');
const productsPath = path.join(__dirname, 'data', 'products.json');
const metadataPath = path.join(__dirname, 'data', 'metadata.json');
const blogsPath = path.join(__dirname, 'data', 'blogs.json');
const outputPath = path.join(process.cwd(), 'sara_earthing.sql');

// Helper to escape SQL strings
function escapeSql(value: any): string {
  if (value === null || value === undefined) return 'NULL';
  if (typeof value === 'object') {
    const jsonStr = JSON.stringify(value);
    return `'${jsonStr.replace(/\\/g, '\\\\').replace(/'/g, "''")}'`;
  }
  if (typeof value === 'number') return String(value);
  return `'${String(value).replace(/\\/g, '\\\\').replace(/'/g, "''")}'`;
}

// Generate SQL
let sql = '-- SAARA Earthing Live Database Setup SQL Dump\n';
sql += '-- Generated from local JSON database files\n\n';

// Submissions Table
sql += `-- --------------------------------------------------------\n`;
sql += `-- Table structure for table \`submissions\`\n`;
sql += `-- --------------------------------------------------------\n`;
sql += `DROP TABLE IF EXISTS \`submissions\`;\n`;
sql += `CREATE TABLE IF NOT EXISTS \`submissions\` (
  \`id\` VARCHAR(50) PRIMARY KEY,
  \`type\` VARCHAR(50) NOT NULL,
  \`data\` JSON NOT NULL,
  \`status\` VARCHAR(50) NOT NULL DEFAULT 'new',
  \`createdAt\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);\n\n`;

if (fs.existsSync(submissionsPath)) {
  const data = JSON.parse(fs.readFileSync(submissionsPath, 'utf-8') || '[]');
  if (data.length > 0) {
    sql += `-- Dumping data for table \`submissions\`\n`;
    for (const item of data) {
      sql += `INSERT INTO \`submissions\` (\`id\`, \`type\`, \`data\`, \`status\`, \`createdAt\`) VALUES (${escapeSql(item.id)}, ${escapeSql(item.type)}, ${escapeSql(item.data)}, ${escapeSql(item.status)}, ${escapeSql(item.createdAt)});\n`;
    }
    sql += `\n`;
  }
}

// Products Table
sql += `-- --------------------------------------------------------\n`;
sql += `-- Table structure for table \`products\`\n`;
sql += `-- --------------------------------------------------------\n`;
sql += `DROP TABLE IF EXISTS \`products\`;\n`;
sql += `CREATE TABLE IF NOT EXISTS \`products\` (
  \`slug\` VARCHAR(100) NOT NULL,
  \`category\` VARCHAR(100) NOT NULL,
  \`title\` VARCHAR(255) NOT NULL,
  \`desc\` TEXT,
  \`image\` VARCHAR(255),
  \`hoverImage\` VARCHAR(255),
  \`features\` JSON,
  \`specs\` JSON,
  \`applications\` JSON,
  \`longDesc\` JSON,
  \`highlights\` JSON,
  \`detailedTabs\` JSON,
  PRIMARY KEY (\`slug\`)
);\n\n`;

if (fs.existsSync(productsPath)) {
  const data = JSON.parse(fs.readFileSync(productsPath, 'utf-8') || '[]');
  if (data.length > 0) {
    sql += `-- Dumping data for table \`products\`\n`;
    for (const item of data) {
      sql += `INSERT INTO \`products\` (\`slug\`, \`category\`, \`title\`, \`desc\`, \`image\`, \`hoverImage\`, \`features\`, \`specs\`, \`applications\`, \`longDesc\`, \`highlights\`, \`detailedTabs\`) VALUES (
        ${escapeSql(item.slug)},
        ${escapeSql(item.category)},
        ${escapeSql(item.title)},
        ${escapeSql(item.desc)},
        ${escapeSql(item.image)},
        ${escapeSql(item.hoverImage)},
        ${escapeSql(item.features)},
        ${escapeSql(item.specs)},
        ${escapeSql(item.applications)},
        ${escapeSql(item.longDesc)},
        ${escapeSql(item.highlights)},
        ${escapeSql(item.detailedTabs)}
      );\n`;
    }
    sql += `\n`;
  }
}

// Metadata Table
sql += `-- --------------------------------------------------------\n`;
sql += `-- Table structure for table \`metadata\`\n`;
sql += `-- --------------------------------------------------------\n`;
sql += `DROP TABLE IF EXISTS \`metadata\`;\n`;
sql += `CREATE TABLE IF NOT EXISTS \`metadata\` (
  \`path\` VARCHAR(255) PRIMARY KEY,
  \`title\` VARCHAR(255) NOT NULL,
  \`description\` TEXT NOT NULL
);\n\n`;

if (fs.existsSync(metadataPath)) {
  const data = JSON.parse(fs.readFileSync(metadataPath, 'utf-8') || '{}');
  const entries = Object.entries(data);
  if (entries.length > 0) {
    sql += `-- Dumping data for table \`metadata\`\n`;
    for (const [pathKey, val] of entries) {
      const metaVal = val as any;
      sql += `INSERT INTO \`metadata\` (\`path\`, \`title\`, \`description\`) VALUES (${escapeSql(pathKey)}, ${escapeSql(metaVal.title)}, ${escapeSql(metaVal.description)});\n`;
    }
    sql += `\n`;
  }
}

// Blogs Table
sql += `-- --------------------------------------------------------\n`;
sql += `-- Table structure for table \`blogs\`\n`;
sql += `-- --------------------------------------------------------\n`;
sql += `DROP TABLE IF EXISTS \`blogs\`;\n`;
sql += `CREATE TABLE IF NOT EXISTS \`blogs\` (
  \`slug\` VARCHAR(100) PRIMARY KEY,
  \`title\` VARCHAR(255) NOT NULL,
  \`excerpt\` TEXT,
  \`content\` JSON,
  \`image\` VARCHAR(255),
  \`author\` VARCHAR(100),
  \`readTime\` VARCHAR(50),
  \`date\` VARCHAR(50),
  \`metaTitle\` VARCHAR(255),
  \`metaDescription\` TEXT
);\n\n`;

if (fs.existsSync(blogsPath)) {
  const data = JSON.parse(fs.readFileSync(blogsPath, 'utf-8') || '[]');
  if (data.length > 0) {
    sql += `-- Dumping data for table \`blogs\`\n`;
    for (const item of data) {
      sql += `INSERT INTO \`blogs\` (\`slug\`, \`title\`, \`excerpt\`, \`content\`, \`image\`, \`author\`, \`readTime\`, \`date\`, \`metaTitle\`, \`metaDescription\`) VALUES (
        ${escapeSql(item.slug)},
        ${escapeSql(item.title)},
        ${escapeSql(item.excerpt)},
        ${escapeSql(item.content)},
        ${escapeSql(item.image)},
        ${escapeSql(item.author)},
        ${escapeSql(item.readTime)},
        ${escapeSql(item.date)},
        ${escapeSql(item.metaTitle)},
        ${escapeSql(item.metaDescription)}
      );\n`;
    }
  }
}

fs.writeFileSync(outputPath, sql, 'utf-8');
console.log('SQL dump generated at:', outputPath);
