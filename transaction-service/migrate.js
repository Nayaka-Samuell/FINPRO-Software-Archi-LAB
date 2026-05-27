const { PrismaClient } = require('./node_modules/@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$executeRawUnsafe(`ALTER TABLE orders ADD COLUMN status VARCHAR(255) DEFAULT 'PENDING'`);
  } catch (e) {
    console.log("Column might already exist", e.message);
  }
  await prisma.$executeRawUnsafe(`CREATE TABLE IF NOT EXISTS payments (id INT AUTO_INCREMENT PRIMARY KEY, order_id INT NOT NULL UNIQUE, payment_method VARCHAR(255) NOT NULL, amount DOUBLE NOT NULL, payment_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, status VARCHAR(255) NOT NULL DEFAULT 'COMPLETED', FOREIGN KEY (order_id) REFERENCES orders(id))`);
  await prisma.$executeRawUnsafe(`CREATE TABLE IF NOT EXISTS deliveries (id INT AUTO_INCREMENT PRIMARY KEY, order_id INT NOT NULL UNIQUE, address VARCHAR(255) NOT NULL, delivery_status VARCHAR(255) NOT NULL DEFAULT 'SHIPPED', shipped_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (order_id) REFERENCES orders(id))`);
  console.log('Tables created');
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
