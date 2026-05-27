const fs = require('fs');
const path = require('path');

// Use the mysql2 already installed in product-service
const mysql = require('mysql2/promise');

async function run() {
  console.log('🔌 Connecting to MySQL...');
  const conn = await mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    multipleStatements: true,
  });

  console.log('✅ Connected!');

  const sqlFile = path.join(__dirname, '..', 'database.sql');
  const sql = fs.readFileSync(sqlFile, 'utf8');

  console.log('📤 Running database.sql...');
  await conn.query(sql);
  console.log('✅ Database created and seeded successfully!');

  // Verify
  await conn.query('USE jomoro_koffee');
  const [tables] = await conn.query('SHOW TABLES');
  console.log('📋 Tables created:', tables.map(t => Object.values(t)[0]).join(', '));

  const [users] = await conn.query('SELECT email, role FROM users');
  console.log('👤 Users:', users);

  const [cats] = await conn.query('SELECT * FROM categories');
  console.log('📂 Categories:', cats.map(c => c.name).join(', '));

  const [prods] = await conn.query('SELECT COUNT(*) AS count FROM products');
  console.log('☕ Products seeded:', prods[0].count);

  await conn.end();
  console.log('\n✅ All done! Database is ready.');
}

run().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
