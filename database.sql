CREATE DATABASE IF NOT EXISTS jomoro_koffee;
USE jomoro_koffee;

-- Drop tables in safe order (child before parent)
DROP TABLE IF EXISTS deliveries;
DROP TABLE IF EXISTS payments;
DROP TABLE IF EXISTS order_details;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS cart_items;
DROP TABLE IF EXISTS carts;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS users;

-- Users table (auth-service)
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(25) NOT NULL DEFAULT 'CUSTOMER'
);

-- Categories & Products (product-service)
CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  price DOUBLE NOT NULL,
  stock INT NOT NULL,
  image_url VARCHAR(255),
  category_id INT NOT NULL,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Cart (transaction-service)
CREATE TABLE carts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL
);

CREATE TABLE cart_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cart_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  FOREIGN KEY (cart_id) REFERENCES carts(id)
);

-- Orders (transaction-service) — status column required by Prisma
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(25) NOT NULL DEFAULT 'PENDING'
);

CREATE TABLE order_details (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  price DOUBLE NOT NULL,
  quantity INT NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id)
);

CREATE TABLE payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL UNIQUE,
  payment_method VARCHAR(255) NOT NULL,
  amount DOUBLE NOT NULL,
  payment_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(255) NOT NULL DEFAULT 'COMPLETED',
  FOREIGN KEY (order_id) REFERENCES orders(id)
);

CREATE TABLE deliveries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL UNIQUE,
  address VARCHAR(255) NOT NULL,
  delivery_status VARCHAR(255) NOT NULL DEFAULT 'SHIPPED',
  shipped_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id)
);

-- Seed: admin user
INSERT INTO users (first_name, last_name, email, password, role)
VALUES ('Admin', 'Jomoro', 'admin@jomoro.com', 'Admin12345', 'ADMIN');

-- Seed: categories
INSERT INTO categories (name) VALUES
  ('Espresso Series'),
  ('Latte Blends'),
  ('Non-Coffee Drinks'),
  ('Cold Brew');

-- Seed: products
INSERT INTO products (name, description, price, stock, image_url, category_id) VALUES
  ('Black Cold Brew',  'Smooth cold brew, black and bold — zero sugar, pure flavor.', 13000, 50, NULL, 4),
  ('Indieast White',   'Our signature kopi susu — creamy, sweet, and perfectly balanced.', 14000, 50, NULL, 4),
  ('Westen Pandan',    'A refreshing pandan cold brew that feels like home.', 15000, 40, NULL, 4),
  ('Noorder Kiwi',     'Sweet tea meets tangy kiwi in a bold fusion drink.', 15000, 40, NULL, 3),
  ('Matcha',           'Premium matcha — no need to fly to Japan for the real thing.', 16000, 30, NULL, 3),
  ('Manual Brew',      'Ask our barista for today\'s available single-origin beans.', 20000, 20, NULL, 1),
  ('Espresso Shot',    'Double shot of our house espresso, intense and aromatic.', 12000, 60, NULL, 1),
  ('Caramel Latte',    'Velvety latte with a rich caramel swirl.', 18000, 45, NULL, 2),
  ('Hazelnut Latte',   'Smooth espresso with a warm hazelnut sweetness.', 18000, 45, NULL, 2),
  ('Vanilla Latte',    'Classic vanilla latte, light and comforting.', 17000, 45, NULL, 2);
