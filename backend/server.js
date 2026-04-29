require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "pronutra_store",
  waitForConnections: true,
  connectionLimit: 10
});

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";

function signToken(user) {
  return jwt.sign({ userId: user.id, email: user.email, name: user.full_name, phone: user.phone_number || "" }, JWT_SECRET, { expiresIn: "7d" });
}

function normalizePhone(value = "") {
  const digits = String(value).replace(/\D/g, "");
  return digits.length > 10 ? digits.slice(-10) : digits;
}

function isValidPhone(value = "") {
  return /^\d{10}$/.test(normalizePhone(value));
}

async function getUserCart(connection, userId) {
  const [existing] = await connection.query("SELECT id FROM carts WHERE user_id = ?", [userId]);
  if (existing.length) return existing[0].id;
  const [created] = await connection.query("INSERT INTO carts (user_id) VALUES (?)", [userId]);
  return created.insertId;
}

async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) {
    return res.status(401).json({ error: "Authentication required." });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const [rows] = await pool.query("SELECT id, full_name, email, phone_number FROM users WHERE id = ?", [payload.userId]);
    if (!rows.length) {
      return res.status(401).json({ error: "User not found." });
    }
    req.user = { id: rows[0].id, name: rows[0].full_name, email: rows[0].email, phone: rows[0].phone_number };
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired session." });
  }
}

app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "ProNutra API" });
});

app.post("/api/auth/signup", async (req, res) => {
  const { name, email, phone, password } = req.body || {};
  const trimmedEmail = String(email || "").trim().toLowerCase();
  const trimmedName = String(name || "").trim();
  const normalizedPhone = normalizePhone(phone);

  if (!trimmedName || trimmedName.length < 3) {
    return res.status(400).json({ error: "Name must be at least 3 characters." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    return res.status(400).json({ error: "Invalid email." });
  }

  if (!password || String(password).length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters." });
  }
  if (!isValidPhone(normalizedPhone)) {
    return res.status(400).json({ error: "Enter a valid 10-digit mobile number." });
  }

  const [existing] = await pool.query("SELECT id FROM users WHERE email = ? OR phone_number = ?", [trimmedEmail, normalizedPhone]);
  if (existing.length) {
    return res.status(409).json({ error: "Email or mobile number already registered." });
  }

  const passwordHash = await bcrypt.hash(String(password), 10);
  const [result] = await pool.query(
    "INSERT INTO users (full_name, email, phone_number, password_hash) VALUES (?, ?, ?, ?)",
    [trimmedName, trimmedEmail, normalizedPhone, passwordHash]
  );
  await pool.query("INSERT INTO carts (user_id) VALUES (?)", [result.insertId]);
  const token = signToken({ id: result.insertId, email: trimmedEmail, full_name: trimmedName, phone_number: normalizedPhone });
  res.status(201).json({ token, user: { user_id: result.insertId, name: trimmedName, email: trimmedEmail, phone: normalizedPhone } });
});

app.post("/api/auth/login", async (req, res) => {
  const { credential, password } = req.body || {};
  const rawCredential = String(credential || "").trim();
  const trimmedEmail = rawCredential.toLowerCase();
  const normalizedPhone = normalizePhone(rawCredential);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmail = emailRegex.test(trimmedEmail);
  const isPhone = isValidPhone(normalizedPhone);
  if (!isEmail && !isPhone) {
    return res.status(400).json({ error: "Enter a valid email or mobile number." });
  }

  const [rows] = await pool.query(
    "SELECT id, full_name, email, phone_number, password_hash FROM users WHERE email = ? OR phone_number = ?",
    [isEmail ? trimmedEmail : "", isPhone ? normalizedPhone : ""]
  );
  if (!rows.length) {
    return res.status(404).json({ error: "User not found." });
  }

  const user = rows[0];
  const validPassword = await bcrypt.compare(String(password || ""), user.password_hash);
  if (!validPassword) {
    return res.status(401).json({ error: "Wrong password." });
  }

  const token = signToken(user);
  res.json({ token, user: { user_id: user.id, name: user.full_name, email: user.email, phone: user.phone_number } });
});

app.get("/api/auth/me", authMiddleware, async (req, res) => {
  res.json({ user: { user_id: req.user.id, name: req.user.name, email: req.user.email, phone: req.user.phone } });
});

app.post("/api/auth/google-demo", async (req, res) => {
  const name = String(req.body?.name || "ProNutra Google User").trim();
  const email = String(req.body?.email || "google.user@pronutra.com").trim().toLowerCase();
  const phone = normalizePhone(req.body?.phone || "9999999999");
  const password = String(req.body?.password || "google-auth");

  let user;
  const [existing] = await pool.query(
    "SELECT id, full_name, email, phone_number FROM users WHERE email = ? OR phone_number = ? LIMIT 1",
    [email, phone]
  );

  if (existing.length) {
    user = existing[0];
  } else {
    const passwordHash = await bcrypt.hash(password, 10);
    const [created] = await pool.query(
      "INSERT INTO users (full_name, email, phone_number, password_hash) VALUES (?, ?, ?, ?)",
      [name, email, phone, passwordHash]
    );
    await pool.query("INSERT INTO carts (user_id) VALUES (?)", [created.insertId]);
    user = { id: created.insertId, full_name: name, email, phone_number: phone };
  }

  const token = signToken(user);
  res.json({ token, user: { user_id: user.id, name: user.full_name, email: user.email, phone: user.phone_number } });
});

app.get("/api/products", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM products WHERE is_active = 1 ORDER BY id DESC");
  res.json(rows);
});

app.get("/api/cart", authMiddleware, async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const cartId = await getUserCart(connection, req.user.id);
    const [rows] = await connection.query(
      `SELECT ci.product_id, ci.quantity
       FROM cart_items ci
       WHERE ci.cart_id = ?`,
      [cartId]
    );
    res.json({ items: rows });
  } finally {
    connection.release();
  }
});

app.put("/api/cart/:productId", authMiddleware, async (req, res) => {
  const { quantity } = req.body || {};
  const qty = Number(quantity);
  if (!Number.isInteger(qty) || qty < 0) {
    return res.status(400).json({ error: "Quantity must be 0 or more." });
  }

  const connection = await pool.getConnection();
  try {
    const cartId = await getUserCart(connection, req.user.id);
    if (qty === 0) {
      await connection.query("DELETE FROM cart_items WHERE cart_id = ? AND product_id = ?", [cartId, req.params.productId]);
    } else {
      await connection.query(
        `INSERT INTO cart_items (cart_id, product_id, quantity)
         VALUES (?, ?, ?)
         ON DUPLICATE KEY UPDATE quantity = VALUES(quantity)`,
        [cartId, req.params.productId, qty]
      );
    }
    res.json({ ok: true });
  } finally {
    connection.release();
  }
});

app.post("/api/orders", authMiddleware, async (req, res) => {
  const { customer, items, paymentMethod } = req.body;

  if (!customer || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "Customer and order items are required." });
  }

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const productIds = items.map((item) => item.productId);
    const [products] = await connection.query(
      `SELECT id, price FROM products WHERE id IN (${productIds.map(() => "?").join(",")})`,
      productIds
    );

    const priceMap = new Map(products.map((product) => [String(product.id), Number(product.price)]));
    const subtotal = items.reduce((sum, item) => sum + (priceMap.get(String(item.productId)) || 0) * Number(item.quantity), 0);
    const tax = Math.round(subtotal * 0.18);
    const delivery = subtotal === 0 || subtotal >= 2500 ? 0 : 99;
    const total = subtotal + tax + delivery;

    const [orderResult] = await connection.query(
      `INSERT INTO orders (user_id, customer_name, customer_email, customer_phone, customer_address, subtotal, tax, delivery, total, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [req.user.id, customer.name, customer.email, customer.phone, customer.address, subtotal, tax, delivery, total, "CREATED"]
    );

    for (const item of items) {
      const price = priceMap.get(String(item.productId));
      await connection.query(
        `INSERT INTO order_items (order_id, product_id, quantity, unit_price)
         VALUES (?, ?, ?, ?)`,
        [orderResult.insertId, item.productId, item.quantity, price]
      );
    }

    await connection.query(
      `INSERT INTO payments (order_id, provider, amount, status, transaction_ref)
       VALUES (?, ?, ?, ?, ?)`,
      [orderResult.insertId, paymentMethod || "dummy", total, "DUMMY_SUCCESS", `PN-${Date.now()}`]
    );

    const cartId = await getUserCart(connection, req.user.id);
    await connection.query("DELETE FROM cart_items WHERE cart_id = ?", [cartId]);

    await connection.commit();
    res.status(201).json({ orderId: orderResult.insertId, total, status: "DUMMY_SUCCESS" });
  } catch (error) {
    await connection.rollback();
    res.status(500).json({ error: "Order creation failed." });
  } finally {
    connection.release();
  }
});

app.get("/api/orders", authMiddleware, async (req, res) => {
  const [orders] = await pool.query(
    `SELECT id, customer_name, customer_email, customer_phone, customer_address, subtotal, tax, delivery, total, status, created_at
     FROM orders WHERE user_id = ? ORDER BY created_at DESC`,
    [req.user.id]
  );

  const orderIds = orders.map((order) => order.id);
  const itemsByOrder = new Map();
  if (orderIds.length) {
    const [items] = await pool.query(
      `SELECT oi.order_id, oi.product_id, oi.quantity, oi.unit_price, p.name
       FROM order_items oi
       JOIN products p ON p.id = oi.product_id
       WHERE oi.order_id IN (${orderIds.map(() => "?").join(",")})`,
      orderIds
    );
    items.forEach((item) => {
      const group = itemsByOrder.get(item.order_id) || [];
      group.push(item);
      itemsByOrder.set(item.order_id, group);
    });
  }

  res.json({
    orders: orders.map((order) => ({
      id: `PN-${order.id}`,
      createdAt: order.created_at,
      customer: {
        name: order.customer_name,
        email: order.customer_email,
        phone: order.customer_phone
      },
      address: order.customer_address,
      totals: {
        subtotal: Number(order.subtotal),
        tax: Number(order.tax),
        delivery: Number(order.delivery),
        total: Number(order.total)
      },
      paymentMethod: "PayPal / Card / COD",
      status: order.status,
      items: (itemsByOrder.get(order.id) || []).map((item) => ({
        id: item.product_id,
        name: item.name,
        qty: item.quantity,
        price: Number(item.unit_price)
      }))
    }))
  });
});

app.post("/api/paypal/create-order", async (req, res) => {
  res.json({
    mode: "sandbox-placeholder",
    message: "Connect PayPal Sandbox SDK here using PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET."
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`ProNutra API running on port ${port}`);
});
