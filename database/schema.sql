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
('whey-gold', 'ProNutra Whey Gold', 'protein', 1899, 4.8, 'Best Seller', 'https://source.unsplash.com/h2fn-gkM60A/900x620', 'High-quality whey protein for muscle growth and recovery.'),
('mass-gainer', 'Mass Gainer Formula', 'protein', 2199, 4.7, 'Weight Gain', 'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?q=80&w=900&auto=format&fit=crop', 'Calorie-rich protein and carb blend for healthy weight gain.'),
('creatine', 'Creatine Monohydrate', 'performance', 899, 4.9, 'Strength', 'https://source.unsplash.com/h2fn-gkM60A/900x620', 'Pure micronized creatine for strength and power output.'),
('omega', 'Omega-3 Fish Oil', 'wellness', 749, 4.6, 'Heart Care', 'https://source.unsplash.com/nBNobTKhniQ/900x620', 'Omega-3 softgels for heart and joint wellness.'),
('oats-protein', 'Protein Oats', 'foods', 499, 4.6, 'Breakfast', 'https://source.unsplash.com/UFQQkXV-jwU/900x620', 'High-fiber oats for healthy fitness breakfast.'),
('peanut-butter', 'High Protein Peanut Butter', 'foods', 399, 4.7, 'Food', 'https://source.unsplash.com/jgiyGOUO19E/900x620', 'Protein-rich peanut butter for snacks and shakes.'),
('fat-loss-plan', 'Fat Loss Fitness Plan', 'plans', 999, 4.8, 'Plan', 'https://images.unsplash.com/photo-1571019613914-85f342c6a11e?q=80&w=900&auto=format&fit=crop', 'Workout and nutrition guidance for healthy fat loss.'),
('muscle-gain-plan', 'Muscle Gain Program', 'plans', 1299, 4.9, 'Coaching', 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=900&auto=format&fit=crop', 'Training and high protein diet guidance for muscle gain.'),
('resistance-bands', 'Resistance Bands Set', 'equipment', 799, 4.7, 'Training', 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?q=80&w=900&auto=format&fit=crop', 'Portable resistance bands for strength training.'),
('yoga-mat', 'Premium Yoga Mat', 'equipment', 999, 4.6, 'Fitness Gear', 'https://source.unsplash.com/zBYG9kzN-8s/900x620', 'Yoga and exercise mat for workouts and wellness.'),
('vitamin-c-gummies', 'Vitamin C Gummies', 'wellness', 549, 4.6, 'Vitamin C', 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=900&auto=format&fit=crop', 'Vitamin C gummies for daily immunity and wellness.'),
('green-tea', 'Green Tea Detox Pack', 'foods', 349, 4.4, 'Detox', 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?q=80&w=900&auto=format&fit=crop', 'Green tea pack for hydration and healthy lifestyle habits.'),
('trail-mix', 'Nuts & Seeds Trail Mix', 'foods', 599, 4.7, 'Energy Food', 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?q=80&w=900&auto=format&fit=crop', 'Nuts and seeds mix for clean snacking and workout energy.'),
('skipping-rope', 'Speed Skipping Rope', 'equipment', 399, 4.5, 'Cardio', 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=900&auto=format&fit=crop', 'Lightweight speed rope for cardio and home workouts.'),
('dumbbell-pair', 'Adjustable Dumbbell Pair', 'equipment', 2499, 4.8, 'Strength', 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=900&auto=format&fit=crop', 'Adjustable dumbbell pair for home strength workouts.'),
('sleep-recovery', 'Sleep & Recovery Support', 'wellness', 899, 4.5, 'Recovery', 'https://source.unsplash.com/nBNobTKhniQ/900x620', 'Wellness capsules for rest, recovery, and active lifestyle balance.')
ON DUPLICATE KEY UPDATE name = VALUES(name), price = VALUES(price);
