require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

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

app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "ProNutra API" });
});

app.get("/api/products", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM products WHERE is_active = 1 ORDER BY id DESC");
  res.json(rows);
});

app.post("/api/orders", async (req, res) => {
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
      `INSERT INTO orders (customer_name, customer_email, customer_phone, customer_address, subtotal, tax, delivery, total, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [customer.name, customer.email, customer.phone, customer.address, subtotal, tax, delivery, total, "CREATED"]
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

    await connection.commit();
    res.status(201).json({ orderId: orderResult.insertId, total, status: "DUMMY_SUCCESS" });
  } catch (error) {
    await connection.rollback();
    res.status(500).json({ error: "Order creation failed." });
  } finally {
    connection.release();
  }
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
