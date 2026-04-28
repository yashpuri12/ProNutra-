console.log("ProNutra Website Loaded");

// Product catalog for the nutrition store.
const PRODUCTS = [
  {
    id: "whey-protein",
    name: "ProNutra Whey Protein",
    category: "protein",
    price: 1899,
    image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=900&auto=format&fit=crop",
    description: "Clean whey nutrition for muscle recovery and daily strength support.",
    benefit: "Supports recovery and lean muscle growth."
  },
  {
    id: "mass-gainer",
    name: "ProNutra Mass Gainer Blend",
    category: "protein",
    price: 2199,
    image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?q=80&w=900&auto=format&fit=crop",
    description: "Balanced calories, carbs, and protein for healthy weight gain.",
    benefit: "Helps support size, energy, and recovery."
  },
  {
    id: "creatine",
    name: "ProNutra Creatine Monohydrate",
    category: "performance",
    price: 899,
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=900&auto=format&fit=crop",
    description: "Simple strength support for gym training, power, and endurance.",
    benefit: "Improves power output and workout performance."
  },
  {
    id: "fish-oil",
    name: "ProNutra Omega-3 Fish Oil",
    category: "wellness",
    price: 749,
    image: "https://www.wissenschaft.de/wp-content/uploads/2/5/250203_omega3.jpg",
    description: "Daily wellness capsules for heart, joint, and overall body care.",
    benefit: "Supports heart care and active mobility."
  },
  {
    id: "multivitamin",
    name: "ProNutra Daily Multivitamin",
    category: "wellness",
    price: 599,
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=900&auto=format&fit=crop",
    description: "Essential vitamins and minerals for immunity and healthy routines.",
    benefit: "Daily immunity and healthy fitness support."
  },
  {
    id: "protein-oats",
    name: "ProNutra Protein Oats",
    category: "foods",
    price: 499,
    image: "https://images.unsplash.com/photo-1517673400267-0251440c45dc?q=80&w=900&auto=format&fit=crop",
    description: "Healthy breakfast option with fiber and energy for active mornings.",
    benefit: "Great for breakfast, fiber, and steady energy."
  },
  {
    id: "peanut-butter",
    name: "ProNutra Peanut Butter",
    category: "foods",
    price: 399,
    image: "https://www.organicfacts.net/wp-content/uploads/peanutbutter1.jpg",
    description: "Protein-rich spread for snacks, oats, and high-calorie meal plans.",
    benefit: "Adds protein and healthy fats to meals."
  },
  {
    id: "diet-plan",
    name: "ProNutra Balanced Diet Plan",
    category: "plans",
    price: 799,
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=900&auto=format&fit=crop",
    description: "Simple meal guidance with healthy eating tips and weekly structure.",
    benefit: "Builds healthy eating habits and meal balance."
  },
  {
    id: "plant-protein",
    name: "ProNutra Plant Protein Mix",
    category: "protein",
    price: 1699,
    image: "https://images.unsplash.com/photo-1622484211148-018c2d54eb7c?q=80&w=900&auto=format&fit=crop",
    description: "Clean plant-based protein for vegan nutrition, recovery, and daily fitness.",
    benefit: "Ideal for vegan recovery and clean protein goals."
  },
  {
    id: "granola-mix",
    name: "ProNutra Fitness Granola Mix",
    category: "foods",
    price: 449,
    image: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?q=80&w=900&auto=format&fit=crop",
    description: "Crunchy granola with nuts and seeds for healthy breakfast and snack support.",
    benefit: "Supports healthy snacking and morning nutrition."
  },
  {
    id: "vitamin-c",
    name: "ProNutra Vitamin C Gummies",
    category: "wellness",
    price: 549,
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=900&auto=format&fit=crop",
    description: "Daily vitamin gummies for immunity, energy, and wellness support.",
    benefit: "Boosts immunity and daily wellness care."
  },
  {
    id: "yoga-plan",
    name: "ProNutra Yoga Wellness Guide",
    category: "plans",
    price: 699,
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=900&auto=format&fit=crop",
    description: "Simple yoga, breathing, and wellness plan for flexible healthy living.",
    benefit: "Improves flexibility, calmness, and balance."
  },
  {
    id: "bcaa-recovery",
    name: "ProNutra BCAA Recovery",
    category: "performance",
    price: 1199,
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=900&auto=format&fit=crop",
    description: "Workout amino blend for hydration, endurance, and recovery support.",
    benefit: "Helps reduce fatigue and supports workout recovery."
  },
  {
    id: "almond-mix",
    name: "ProNutra Almond Energy Mix",
    category: "foods",
    price: 649,
    image: "https://images.unsplash.com/photo-1508747703725-719777637510?q=80&w=900&auto=format&fit=crop",
    description: "Premium almonds and seeds mix for healthy snacking and clean energy.",
    benefit: "Supports healthy snacking and daily energy needs."
  },
  {
    id: "wellness-capsules",
    name: "ProNutra Wellness Capsules",
    category: "wellness",
    price: 699,
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=900&auto=format&fit=crop",
    description: "Daily wellness support with essential vitamins for active lifestyles.",
    benefit: "Supports immunity, energy, and everyday wellness."
  }
];

const STORAGE = {
  users: "pronutra_users_v1",
  currentUser: "pronutra_current_user_v1",
  session: "pronutra_session_v1",
  token: "pronutra_auth_token_v1"
};

const API_BASE = "http://localhost:5000/api";
const PROTECTED_PAGES = new Set(["home", "products", "cart", "checkout", "orders"]);
const page = document.body.dataset.page || "home";
let backendAvailable = false;

function readJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function money(value) {
  return `Rs. ${Number(value).toLocaleString("en-IN")}`;
}

function slugId() {
  return `PN${Date.now()}`;
}

function normalizeEmail(value = "") {
  return String(value).trim().toLowerCase();
}

function getUsers() {
  return readJson(STORAGE.users, []);
}

function saveUsers(users) {
  writeJson(STORAGE.users, users);
}

function getCurrentUser() {
  return readJson(STORAGE.currentUser, null);
}

function setCurrentUser(user) {
  writeJson(STORAGE.currentUser, user);
}

function clearCurrentUser() {
  localStorage.removeItem(STORAGE.currentUser);
  sessionStorage.removeItem(STORAGE.session);
}

function getToken() {
  return localStorage.getItem(STORAGE.token) || "";
}

function setToken(token) {
  localStorage.setItem(STORAGE.token, token);
}

function clearToken() {
  localStorage.removeItem(STORAGE.token);
}

function setSessionActive() {
  sessionStorage.setItem(STORAGE.session, "active");
}

function hasActiveSession() {
  return sessionStorage.getItem(STORAGE.session) === "active";
}

async function apiFetch(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };

  if (options.auth !== false && getToken()) {
    headers.Authorization = `Bearer ${getToken()}`;
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || "Request failed.");
  }
  return data;
}

async function detectBackend() {
  try {
    await apiFetch("/health", { auth: false });
    backendAvailable = true;
  } catch {
    backendAvailable = false;
  }
}

// Per-user cart and order storage keeps shopping data user-specific.
function cartKey(userId) {
  return `pronutra_cart_${userId}`;
}

function orderKey(userId) {
  return `pronutra_orders_${userId}`;
}

function readCart() {
  const user = getCurrentUser();
  return user ? readJson(cartKey(user.user_id), {}) : {};
}

function writeCart(cart) {
  const user = getCurrentUser();
  if (!user) return;
  writeJson(cartKey(user.user_id), cart);
}

function readOrders() {
  const user = getCurrentUser();
  return user ? readJson(orderKey(user.user_id), []) : [];
}

function writeOrders(orders) {
  const user = getCurrentUser();
  if (!user) return;
  writeJson(orderKey(user.user_id), orders);
}

async function syncCartFromApi() {
  if (!backendAvailable || !getCurrentUser()) return;
  const response = await apiFetch("/cart");
  const cart = (response.items || []).reduce((acc, item) => {
    acc[item.product_id] = item.quantity;
    return acc;
  }, {});
  writeCart(cart);
}

async function syncOrdersFromApi() {
  if (!backendAvailable || !getCurrentUser()) return;
  const response = await apiFetch("/orders");
  const orders = (response.orders || []).map((order) => ({
    id: order.id,
    date: new Date(order.createdAt).toLocaleDateString("en-IN"),
    payment: order.paymentMethod,
    status: order.status,
    total: order.totals.total,
    items: order.items
  }));
  writeOrders(orders);
}

async function restoreBackendSession() {
  if (!backendAvailable || !getToken() || !hasActiveSession()) return;
  const response = await apiFetch("/auth/me");
  setCurrentUser(response.user);
  await Promise.all([syncCartFromApi(), syncOrdersFromApi()]);
}

function requireAuth() {
  const user = getCurrentUser();
  const authenticated = backendAvailable
    ? !!getToken() && !!user && hasActiveSession()
    : !!user && hasActiveSession();
  if (!authenticated && PROTECTED_PAGES.has(page)) {
    window.location.href = "login.html";
    return false;
  }
  if (authenticated && page === "login") {
    window.location.href = "index.html";
    return false;
  }
  return true;
}

function getProduct(productId) {
  return PRODUCTS.find((product) => product.id === productId);
}

function cartEntries() {
  return Object.entries(readCart())
    .map(([productId, qty]) => ({ product: getProduct(productId), qty }))
    .filter((entry) => entry.product && entry.qty > 0);
}

function cartTotals() {
  const subtotal = cartEntries().reduce((sum, item) => sum + (item.product.price * item.qty), 0);
  const tax = Math.round(subtotal * 0.18);
  const delivery = subtotal === 0 || subtotal >= 2000 ? 0 : 99;
  return { subtotal, tax, delivery, total: subtotal + tax + delivery };
}

function updateCartCount() {
  const count = cartEntries().reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll("[data-cart-count]").forEach((node) => {
    node.textContent = count;
  });
}

function renderNavbarUser() {
  const user = getCurrentUser();
  document.querySelectorAll("[data-profile-name]").forEach((node) => {
    node.textContent = user ? user.name : "My Account";
  });
  document.querySelectorAll("[data-profile-initial]").forEach((node) => {
    node.textContent = user ? user.name.charAt(0).toUpperCase() : "A";
  });
}

function toast(message) {
  const host = document.querySelector("#toastArea");
  if (!host) return;
  const note = document.createElement("div");
  note.className = "mini-toast";
  note.textContent = message;
  host.appendChild(note);
  setTimeout(() => note.remove(), 2200);
}

// Product card reused on home page and products page.
function productCard(product) {
  const qty = readCart()[product.id] || 0;
  const controls = qty > 0
    ? `
      <div class="product-actions-center">
        <div class="qty-box">
          <button type="button" data-minus="${product.id}">-</button>
          <span>${qty}</span>
          <button type="button" data-plus="${product.id}">+</button>
        </div>
      </div>
    `
    : `
      <div class="product-actions-center">
        <button class="btn btn-success btn-sm card-add-btn" type="button" data-add="${product.id}">Add to Cart</button>
      </div>
    `;

  return `
    <div class="col-md-6 col-xl-3">
      <article class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <div class="product-content">
          <span class="badge-chip">${product.category}</span>
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <div class="product-benefit">${product.benefit}</div>
          <div class="product-footer">
            <strong>${money(product.price)}</strong>
            <small>In stock</small>
          </div>
          ${controls}
        </div>
      </article>
    </div>
  `;
}

function renderFeaturedProducts() {
  const grid = document.querySelector("#featuredProducts");
  if (!grid) return;
  grid.innerHTML = PRODUCTS.slice(0, 8).map(productCard).join("");
}

function renderProductCatalog() {
  const grid = document.querySelector("#productGrid");
  if (!grid) return;

  const search = (document.querySelector("#productSearch")?.value || "").trim().toLowerCase();
  const activeFilter = document.querySelector("[data-filter].active")?.dataset.filter || "all";
  const items = PRODUCTS.filter((product) => {
    const matchesFilter = activeFilter === "all" || product.category === activeFilter;
    const text = `${product.name} ${product.category} ${product.description}`.toLowerCase();
    return matchesFilter && text.includes(search);
  });

  grid.innerHTML = items.length
    ? items.map(productCard).join("")
    : `<div class="col-12"><div class="empty-box">No products found for this search.</div></div>`;
}

function handleHomeSearch(event) {
  event.preventDefault();
  const query = document.querySelector("#homeSearch")?.value.trim() || "";
  window.location.href = query ? `products.html?q=${encodeURIComponent(query)}` : "products.html";
}

// Cart section rendering for quantity update and total calculation.
function renderCartPage() {
  const container = document.querySelector("#cartItems");
  if (!container) return;

  const items = cartEntries();
  if (!items.length) {
    container.innerHTML = `<div class="empty-box">Your cart is empty. Add products from the store.</div>`;
  } else {
    container.innerHTML = items.map(({ product, qty }) => `
      <div class="cart-row">
        <img src="${product.image}" alt="${product.name}">
        <div class="cart-row-info">
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <strong>${money(product.price)}</strong>
        </div>
        <div class="cart-row-side">
          <div class="qty-box">
            <button type="button" data-minus="${product.id}">-</button>
            <span>${qty}</span>
            <button type="button" data-plus="${product.id}">+</button>
          </div>
          <button class="link-danger" type="button" data-remove="${product.id}">Remove</button>
        </div>
      </div>
    `).join("");
  }

  updateSummaryTotals();
}

function updateSummaryTotals() {
  const totals = cartTotals();
  const summaryMap = {
    cartSubtotal: money(totals.subtotal),
    cartTax: money(totals.tax),
    cartDelivery: totals.delivery ? money(totals.delivery) : "Free",
    cartTotal: money(totals.total)
  };

  Object.entries(summaryMap).forEach(([id, text]) => {
    document.querySelectorAll(`#${id}`).forEach((node) => {
      node.textContent = text;
    });
  });
}

function renderCheckoutPage() {
  const itemsBox = document.querySelector("#checkoutItems");
  if (!itemsBox) return;

  const items = cartEntries();
  itemsBox.innerHTML = items.length
    ? items.map(({ product, qty }) => `<div class="summary-item"><span>${product.name} x ${qty}</span><strong>${money(product.price * qty)}</strong></div>`).join("")
    : `<div class="empty-box">No items in cart.</div>`;

  updateSummaryTotals();

  const user = getCurrentUser();
  const nameInput = document.querySelector("#customerName");
  const emailInput = document.querySelector("#customerEmail");
  if (user && nameInput && !nameInput.value) nameInput.value = user.name;
  if (user && emailInput && !emailInput.value) emailInput.value = user.email;
}

// Order history shown after successful checkout.
function renderOrdersPage() {
  const host = document.querySelector("#ordersList");
  if (!host) return;

  const orders = readOrders();
  if (!orders.length) {
    host.innerHTML = `<div class="empty-box">No orders yet. Complete checkout to see order history.</div>`;
    return;
  }

  host.innerHTML = orders.map((order) => `
    <article class="order-card">
      <div class="order-head">
        <div>
          <span>Order ID</span>
          <h3>${order.id}</h3>
        </div>
        <strong>${order.status}</strong>
      </div>
      <div class="order-meta">
        <div><span>Date</span><strong>${order.date}</strong></div>
        <div><span>Payment</span><strong>${order.payment}</strong></div>
        <div><span>Total</span><strong>${money(order.total)}</strong></div>
      </div>
      <div class="order-items">
        ${order.items.map((item) => `<div><span>${item.name} x ${item.qty}</span><strong>${money(item.price * item.qty)}</strong></div>`).join("")}
      </div>
    </article>
  `).join("");
}

// Shopping cart actions for add, increase, decrease, and remove.
async function addToCart(productId) {
  const cart = readCart();
  const nextQty = (cart[productId] || 0) + 1;

  if (backendAvailable && getToken()) {
    await apiFetch(`/cart/${productId}`, {
      method: "PUT",
      body: JSON.stringify({ quantity: nextQty })
    });
    await syncCartFromApi();
  } else {
    cart[productId] = nextQty;
    writeCart(cart);
  }

  updateCartCount();
  renderFeaturedProducts();
  renderProductCatalog();
  renderCartPage();
  renderCheckoutPage();
  toast("Product added to cart");
}

async function updateQty(productId, nextQty) {
  if (backendAvailable && getToken()) {
    await apiFetch(`/cart/${productId}`, {
      method: "PUT",
      body: JSON.stringify({ quantity: Math.max(0, nextQty) })
    });
    await syncCartFromApi();
  } else {
    const cart = readCart();
    if (nextQty <= 0) {
      delete cart[productId];
    } else {
      cart[productId] = nextQty;
    }
    writeCart(cart);
  }

  updateCartCount();
  renderFeaturedProducts();
  renderProductCatalog();
  renderCartPage();
  renderCheckoutPage();
}

function handleProductActions(event) {
  const add = event.target.closest("[data-add]");
  const plus = event.target.closest("[data-plus]");
  const minus = event.target.closest("[data-minus]");
  const remove = event.target.closest("[data-remove]");
  const filter = event.target.closest("[data-filter]");

  if (add) addToCart(add.dataset.add);
  if (plus) updateQty(plus.dataset.plus, (readCart()[plus.dataset.plus] || 0) + 1);
  if (minus) updateQty(minus.dataset.minus, (readCart()[minus.dataset.minus] || 0) - 1);
  if (remove) updateQty(remove.dataset.remove, 0);
  if (filter) {
    document.querySelectorAll("[data-filter]").forEach((node) => node.classList.remove("active"));
    filter.classList.add("active");
    renderProductCatalog();
  }
}

// Signup validation for account creation.
function handleSignup(event) {
  event.preventDefault();
  const status = document.querySelector("#signupStatus");
  const name = document.querySelector("#signupName")?.value.trim() || "";
  const email = normalizeEmail(document.querySelector("#signupEmail")?.value);
  const password = document.querySelector("#signupPassword")?.value || "";
  const confirm = document.querySelector("#signupConfirmPassword")?.value || "";
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (name.length < 3) {
    status.innerHTML = `<div class="alert alert-danger">Enter a valid full name.</div>`;
    return;
  }
  if (!emailOk) {
    status.innerHTML = `<div class="alert alert-danger">Invalid email.</div>`;
    return;
  }
  if (password.length < 6) {
    status.innerHTML = `<div class="alert alert-danger">Password must be at least 6 characters.</div>`;
    return;
  }
  if (password !== confirm) {
    status.innerHTML = `<div class="alert alert-danger">Passwords do not match.</div>`;
    return;
  }

  if (backendAvailable) {
    apiFetch("/auth/signup", {
      method: "POST",
      auth: false,
      body: JSON.stringify({ name, email, password })
    }).then(async (response) => {
      setToken(response.token);
      setCurrentUser(response.user);
      setSessionActive();
      await Promise.all([syncCartFromApi(), syncOrdersFromApi()]);
      status.innerHTML = `<div class="alert alert-success">Account created successfully.</div>`;
      setTimeout(() => { window.location.href = "index.html"; }, 700);
    }).catch((error) => {
      status.innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
    });
    return;
  }

  const users = getUsers();
  if (users.some((user) => user.email === email)) {
    status.innerHTML = `<div class="alert alert-danger">Email already registered.</div>`;
    return;
  }

  const user = { user_id: slugId(), name, email, password };
  users.push(user);
  saveUsers(users);
  setCurrentUser({ user_id: user.user_id, name: user.name, email: user.email });
  setSessionActive();
  writeCart({});
  writeOrders([]);
  status.innerHTML = `<div class="alert alert-success">Account created successfully.</div>`;
  setTimeout(() => { window.location.href = "index.html"; }, 700);
}

// Login validation for existing registered users.
function handleLogin(event) {
  event.preventDefault();
  const status = document.querySelector("#loginStatus");
  const email = normalizeEmail(document.querySelector("#loginEmail")?.value);
  const password = document.querySelector("#loginPassword")?.value || "";
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!emailOk) {
    status.innerHTML = `<div class="alert alert-danger">Invalid email.</div>`;
    return;
  }

  if (backendAvailable) {
    apiFetch("/auth/login", {
      method: "POST",
      auth: false,
      body: JSON.stringify({ email, password })
    }).then(async (response) => {
      setToken(response.token);
      setCurrentUser(response.user);
      setSessionActive();
      await Promise.all([syncCartFromApi(), syncOrdersFromApi()]);
      status.innerHTML = `<div class="alert alert-success">Login successful.</div>`;
      setTimeout(() => { window.location.href = "index.html"; }, 600);
    }).catch((error) => {
      status.innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
    });
    return;
  }

  const user = getUsers().find((item) => item.email === email);
  if (!user) {
    status.innerHTML = `<div class="alert alert-danger">User not found.</div>`;
    return;
  }
  if (user.password !== password) {
    status.innerHTML = `<div class="alert alert-danger">Wrong password.</div>`;
    return;
  }

  setCurrentUser({ user_id: user.user_id, name: user.name, email: user.email });
  setSessionActive();
  status.innerHTML = `<div class="alert alert-success">Login successful.</div>`;
  setTimeout(() => { window.location.href = "index.html"; }, 600);
}

function handleLogout() {
  clearToken();
  clearCurrentUser();
  window.location.href = "login.html";
}

// Checkout saves order history and clears the current user cart.
async function handleCheckout(event) {
  event.preventDefault();
  const status = document.querySelector("#orderStatus");
  const items = cartEntries();

  if (!items.length) {
    status.innerHTML = `<div class="alert alert-danger">Your cart is empty.</div>`;
    return;
  }

  const name = document.querySelector("#customerName")?.value.trim() || "";
  const email = normalizeEmail(document.querySelector("#customerEmail")?.value);
  const phone = document.querySelector("#customerPhone")?.value.trim() || "";
  const address = document.querySelector("#customerAddress")?.value.trim() || "";
  const payment = document.querySelector("#paymentMethod")?.value || "PayPal Sandbox";

  if (name.length < 3 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || phone.length < 10 || address.length < 10) {
    status.innerHTML = `<div class="alert alert-danger">Please fill all checkout details correctly.</div>`;
    return;
  }

  if (backendAvailable && getToken()) {
    try {
      const response = await apiFetch("/orders", {
        method: "POST",
        body: JSON.stringify({
          customer: { name, email, phone, address },
          paymentMethod: payment,
          items: items.map(({ product, qty }) => ({ productId: product.id, quantity: qty }))
        })
      });
      writeCart({});
      await syncCartFromApi();
      await syncOrdersFromApi();
      status.innerHTML = `<div class="alert alert-success">Order placed successfully. Order ID: <strong>PN-${response.orderId}</strong>. <a class="alert-link" href="orders.html">View orders</a></div>`;
    } catch (error) {
      status.innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
      return;
    }
  } else {
    const totals = cartTotals();
    const orders = readOrders();
    const order = {
      id: slugId(),
      date: new Date().toLocaleDateString("en-IN"),
      payment,
      status: "Confirmed",
      total: totals.total,
      items: items.map(({ product, qty }) => ({
        name: product.name,
        qty,
        price: product.price
      }))
    };

    orders.unshift(order);
    writeOrders(orders);
    writeCart({});
    status.innerHTML = `<div class="alert alert-success">Order placed successfully. Order ID: <strong>${order.id}</strong>. <a class="alert-link" href="orders.html">View orders</a></div>`;
  }

  event.currentTarget.reset();
  renderCheckoutPage();
  renderOrdersPage();
  updateCartCount();
}

function initAuthTabs() {
  const signinPanel = document.querySelector("#signinPanel");
  const signupPanel = document.querySelector("#signupPanel");
  if (!signinPanel || !signupPanel) return;

  document.querySelectorAll("[data-auth-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      const tab = button.dataset.authTab;
      document.querySelectorAll("[data-auth-tab]").forEach((node) => node.classList.remove("active"));
      button.classList.add("active");
      signinPanel.classList.toggle("hidden-panel", tab !== "signin");
      signupPanel.classList.toggle("hidden-panel", tab !== "signup");
    });
  });
}

function initSearch() {
  const homeSearchForm = document.querySelector("#homeSearchForm");
  homeSearchForm?.addEventListener("submit", handleHomeSearch);

  const productSearch = document.querySelector("#productSearch");
  if (productSearch) {
    const params = new URLSearchParams(window.location.search);
    productSearch.value = params.get("q") || "";
    productSearch.addEventListener("input", renderProductCatalog);
    renderProductCatalog();
  }
}

function bindEvents() {
  document.addEventListener("click", handleProductActions);
  document.querySelector("#loginForm")?.addEventListener("submit", handleLogin);
  document.querySelector("#signupForm")?.addEventListener("submit", handleSignup);
  document.querySelector("#checkoutForm")?.addEventListener("submit", handleCheckout);
  document.querySelector("#logoutBtn")?.addEventListener("click", handleLogout);
}

async function initPage() {
  await detectBackend();
  if (backendAvailable) {
    try {
      await restoreBackendSession();
    } catch {
      clearToken();
      clearCurrentUser();
    }
  }

  if (!requireAuth()) return;
  renderNavbarUser();
  updateCartCount();
  renderFeaturedProducts();
  renderCartPage();
  renderCheckoutPage();
  renderOrdersPage();
  initSearch();
  initAuthTabs();
  bindEvents();
}

initPage();
