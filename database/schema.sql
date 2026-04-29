CREATE DATABASE IF NOT EXISTS pronutra_store;
USE pronutra_store;

CREATE TABLE IF NOT EXISTS products (
  id VARCHAR(60) PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  category VARCHAR(40) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  rating DECIMAL(2, 1) DEFAULT 4.5,
  badge VARCHAR(40),
  image_url TEXT,
  description TEXT,
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL UNIQUE,
  phone_number VARCHAR(20) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS carts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS cart_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cart_id INT NOT NULL,
  product_id VARCHAR(60) NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  UNIQUE KEY uniq_cart_product (cart_id, product_id),
  FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  customer_name VARCHAR(120) NOT NULL,
  customer_email VARCHAR(160) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  customer_address TEXT NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  tax DECIMAL(10, 2) NOT NULL,
  delivery DECIMAL(10, 2) NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  status VARCHAR(40) DEFAULT 'CREATED',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id VARCHAR(60) NOT NULL,
  quantity INT NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  provider VARCHAR(40) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(40) NOT NULL,
  transaction_ref VARCHAR(120),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id)
);

INSERT INTO products (id, name, category, price, rating, badge, image_url, description) VALUES
('whey-protein', 'ProNutra Whey Protein', 'protein', 1899, 4.8, 'Protein', 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=900&auto=format&fit=crop', 'Clean whey nutrition for muscle recovery and daily strength support.'),
('mass-gainer', 'ProNutra Mass Gainer Blend', 'protein', 2199, 4.7, 'Protein', 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?q=80&w=900&auto=format&fit=crop', 'Balanced calories, carbs, and protein for healthy weight gain.'),
('creatine', 'ProNutra Creatine Monohydrate', 'performance', 899, 4.9, 'Performance', 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=900&auto=format&fit=crop', 'Simple strength support for gym training, power, and endurance.'),
('fish-oil', 'ProNutra Omega-3 Fish Oil', 'wellness', 749, 4.6, 'Wellness', 'https://www.wissenschaft.de/wp-content/uploads/2/5/250203_omega3.jpg', 'Daily wellness capsules for heart, joint, and overall body care.'),
('multivitamin', 'ProNutra Daily Multivitamin', 'wellness', 599, 4.6, 'Wellness', 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=900&auto=format&fit=crop', 'Essential vitamins and minerals for immunity and healthy routines.'),
('protein-oats', 'ProNutra Protein Oats', 'foods', 499, 4.6, 'Foods', 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?q=80&w=900&auto=format&fit=crop', 'Healthy breakfast option with fiber and energy for active mornings.'),
('peanut-butter', 'ProNutra Peanut Butter', 'foods', 399, 4.7, 'Foods', 'https://www.organicfacts.net/wp-content/uploads/peanutbutter1.jpg', 'Protein-rich spread for snacks, oats, and high-calorie meal plans.'),
('diet-plan', 'ProNutra Balanced Diet Plan', 'plans', 799, 4.5, 'Plans', 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=900&auto=format&fit=crop', 'Simple meal guidance with healthy eating tips and weekly structure.'),
('plant-protein', 'ProNutra Plant Protein Mix', 'protein', 1699, 4.7, 'Protein', 'https://images.unsplash.com/photo-1622484211148-018c2d54eb7c?q=80&w=900&auto=format&fit=crop', 'Clean plant-based protein for vegan nutrition, recovery, and daily fitness.'),
('granola-mix', 'ProNutra Fitness Granola Mix', 'foods', 449, 4.4, 'Foods', 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?q=80&w=900&auto=format&fit=crop', 'Crunchy granola with nuts and seeds for healthy breakfast and snack support.'),
('vitamin-c', 'ProNutra Vitamin C Gummies', 'wellness', 549, 4.6, 'Wellness', 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=900&auto=format&fit=crop', 'Daily vitamin gummies for immunity, energy, and wellness support.'),
('yoga-plan', 'ProNutra Yoga Wellness Guide', 'plans', 699, 4.5, 'Plans', 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=900&auto=format&fit=crop', 'Simple yoga, breathing, and wellness plan for flexible healthy living.'),
('bcaa-recovery', 'ProNutra BCAA Recovery', 'performance', 1199, 4.6, 'Performance', 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=900&auto=format&fit=crop', 'Workout amino blend for hydration, endurance, and recovery support.'),
('almond-mix', 'ProNutra Almond Energy Mix', 'foods', 649, 4.6, 'Foods', 'https://images.unsplash.com/photo-1508747703725-719777637510?q=80&w=900&auto=format&fit=crop', 'Premium almonds and seeds mix for healthy snacking and clean energy.'),
('wellness-capsules', 'ProNutra Wellness Capsules', 'wellness', 699, 4.6, 'Wellness', 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=900&auto=format&fit=crop', 'Daily wellness support with essential vitamins for active lifestyles.')
ON DUPLICATE KEY UPDATE
name = VALUES(name),
category = VALUES(category),
price = VALUES(price),
rating = VALUES(rating),
badge = VALUES(badge),
image_url = VALUES(image_url),
description = VALUES(description),
is_active = 1;
