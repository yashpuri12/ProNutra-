# ProNutra E-Commerce Mini Project

Problem statement: develop a fully functional online store that allows product browsing, cart management, secure checkout, and dummy payment integration.

## Pages

- `index.html` - professional company home page
- `products.html` - searchable product catalog
- `cart.html` - persistent cart management
- `checkout.html` - secure checkout and dummy payment flow
- `about.html` - project architecture, security, backend plan
- `contact.html` - support form

## Features

- Real photo-based product visuals from public photo sources
- Product browsing, category filtering, product details modal
- Expanded catalog for protein, performance, wellness, fitness foods, plans, and equipment
- Persistent cart using browser `localStorage`
- Quantity update, remove item, clear cart
- GST, delivery, and total calculation
- Secure checkout validation
- Dummy PayPal Sandbox, dummy card, and cash-on-delivery payment modes
- Backend-ready Node.js API scaffold
- MySQL schema for products, orders, order items, and payments

## Tools Covered

- HTML/CSS/JavaScript
- Bootstrap and Font Awesome
- Node.js backend scaffold
- MySQL schema
- PayPal Sandbox placeholder endpoint

## Backend Setup

1. Import `database/schema.sql` into MySQL.
2. Copy `backend/.env.example` to `backend/.env`.
3. Fill database and PayPal Sandbox credentials.
4. Run `npm install` inside `backend`.
5. Run `npm start`.

The current browser checkout is dummy mode. In a real deployment, order totals and PayPal payment capture must happen on the server.
