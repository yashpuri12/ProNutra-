console.log("ProNutra Website Loaded");

const PRODUCTS = [
  {
    id: "whey-gold",
    name: "ProNutra Whey Gold",
    category: "protein",
    price: 1899,
    rating: 4.8,
    badge: "Best Seller",
    image: "https://source.unsplash.com/h2fn-gkM60A/900x620",
    imageAlt: "Whey protein supplement powder jar",
    description: "Premium whey protein powder for muscle recovery, strength, and daily high protein diet support.",
    details: ["24g protein per serving", "Chocolate flavor", "1 kg pack", "Ideal after workout"]
  },
  {
    id: "mass-gainer",
    name: "Mass Gainer Formula",
    category: "protein",
    price: 2199,
    rating: 4.7,
    badge: "Weight Gain",
    image: "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?q=80&w=900&auto=format&fit=crop",
    imageAlt: "Mass gainer protein shake supplement",
    description: "Calorie-rich protein and carb formula for healthy weight gain, muscle size, and strength training.",
    details: ["Protein and complex carbs", "Banana flavor", "1.5 kg pack", "Healthy bulking support"]
  },
  {
    id: "plant-protein",
    name: "Plant Protein Mix",
    category: "protein",
    price: 1699,
    rating: 4.7,
    badge: "Vegan",
    image: "https://images.unsplash.com/photo-1622484211148-018c2d54eb7c?q=80&w=900&auto=format&fit=crop",
    imageAlt: "Plant protein powder with natural ingredients",
    description: "Plant-powered protein blend for vegan nutrition, clean diet routines, and lean muscle support.",
    details: ["Pea and rice protein", "No added sugar", "Vanilla flavor", "900 g pack"]
  },
  {
    id: "protein-bars",
    name: "Protein Bar Box",
    category: "protein",
    price: 999,
    rating: 4.5,
    badge: "Snack",
    image: "https://images.unsplash.com/photo-1622484211148-018c2d54eb7c?q=80&w=900&auto=format&fit=crop",
    imageAlt: "Protein bars for healthy snacking",
    description: "High-protein snack bars for gym bags, office breaks, travel, and clean snacking.",
    details: ["12 bars", "High fiber", "No artificial color", "Travel friendly"]
  },
  {
    id: "creatine",
    name: "Creatine Monohydrate",
    category: "performance",
    price: 899,
    rating: 4.9,
    badge: "Strength",
    image: "https://source.unsplash.com/h2fn-gkM60A/900x620",
    imageAlt: "Creatine powder supplement",
    description: "Pure micronized creatine powder for strength, power output, and training performance.",
    details: ["3g serving", "Unflavored", "60 servings", "Micronized powder"]
  },
  {
    id: "bcaa",
    name: "BCAA Hydration Fuel",
    category: "performance",
    price: 1199,
    rating: 4.5,
    badge: "Workout",
    image: "https://images.unsplash.com/photo-1553531384-cc64ac80f931?q=80&w=900&auto=format&fit=crop",
    imageAlt: "BCAA workout hydration drink",
    description: "Amino acid and electrolyte workout drink for hydration, endurance, and recovery support.",
    details: ["2:1:1 BCAA ratio", "Electrolytes added", "Lemon flavor", "30 servings"]
  },
  {
    id: "pre-workout",
    name: "Pre-Workout Energy",
    category: "performance",
    price: 1399,
    rating: 4.6,
    badge: "Energy",
    image: "https://images.unsplash.com/photo-1532384748853-8f54a8f476e2?q=80&w=900&auto=format&fit=crop",
    imageAlt: "Pre-workout supplement powder",
    description: "Training energy blend for focus, pump, and intense workout sessions.",
    details: ["Caffeine blend", "Watermelon flavor", "30 servings", "Use before workout"]
  },
  {
    id: "shaker",
    name: "ProNutra Shaker Bottle",
    category: "performance",
    price: 349,
    rating: 4.3,
    badge: "Accessory",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=900&auto=format&fit=crop",
    imageAlt: "Protein shaker bottle",
    description: "Leak-proof shaker bottle for protein shakes and daily hydration.",
    details: ["700 ml capacity", "Mixing ball included", "BPA free", "Easy carry loop"]
  },
  {
    id: "omega",
    name: "Omega-3 Fish Oil",
    category: "wellness",
    price: 749,
    rating: 4.6,
    badge: "Heart Care",
    image: "https://source.unsplash.com/nBNobTKhniQ/900x620",
    imageAlt: "Omega-3 fish oil capsules",
    description: "Omega-3 softgels for heart, joint, and general wellness support.",
    details: ["EPA and DHA", "60 softgels", "Easy swallow", "Daily wellness"]
  },
  {
    id: "multivitamin",
    name: "Daily Wellness Capsules",
    category: "wellness",
    price: 599,
    rating: 4.4,
    badge: "Wellness",
    image: "https://source.unsplash.com/nBNobTKhniQ/900x620",
    imageAlt: "Multivitamin capsules",
    description: "Daily vitamins and minerals for active adults and students.",
    details: ["60 capsules", "Immunity support", "Energy support", "Once daily"]
  },
  {
    id: "diet-plan",
    name: "Balanced Diet Plan",
    category: "diet",
    price: 799,
    rating: 4.5,
    badge: "Diet Plan",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=900&auto=format&fit=crop",
    imageAlt: "Balanced nutrition diet meal plan",
    description: "Balanced nutrition chart with healthy meals, macros, and grocery guidance.",
    details: ["7-day meal plan", "Vegetarian options", "Macro guidance", "Easy meal structure"]
  },
  {
    id: "meal-kit",
    name: "Lean Meal Prep Kit",
    category: "diet",
    price: 1299,
    rating: 4.8,
    badge: "Meal Plan",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=900&auto=format&fit=crop",
    imageAlt: "Healthy meal prep food containers",
    description: "Clean-eating meal prep kit with portion ideas, recipes, and nutrition tracking.",
    details: ["14 recipes", "Portion guide", "Shopping checklist", "Macro tracker"]
  },
  {
    id: "oats-protein",
    name: "Protein Oats",
    category: "foods",
    price: 499,
    rating: 4.6,
    badge: "Breakfast",
    image: "https://source.unsplash.com/UFQQkXV-jwU/900x620",
    imageAlt: "Protein oats breakfast bowl",
    description: "High-fiber protein oats for a healthy fitness breakfast and steady daily energy.",
    details: ["Rolled oats", "High fiber", "No added color", "Easy breakfast meal"]
  },
  {
    id: "peanut-butter",
    name: "High Protein Peanut Butter",
    category: "foods",
    price: 399,
    rating: 4.7,
    badge: "Food",
    image: "https://source.unsplash.com/jgiyGOUO19E/900x620",
    imageAlt: "High protein peanut butter jar",
    description: "Creamy peanut butter for high protein snacks, shakes, oats, and healthy weight gain.",
    details: ["Roasted peanuts", "Protein-rich spread", "No trans fat", "Great with oats"]
  },
  {
    id: "granola",
    name: "Fitness Granola Mix",
    category: "foods",
    price: 449,
    rating: 4.4,
    badge: "Snack",
    image: "https://source.unsplash.com/pqpW5wHweQo/900x620",
    imageAlt: "Granola bowl with nuts and seeds",
    description: "Crunchy granola with nuts, seeds, and fiber for healthy snacks and breakfast bowls.",
    details: ["Nuts and seeds", "Breakfast ready", "Good fiber source", "Great with yogurt"]
  },
  {
    id: "electrolyte",
    name: "Electrolyte Hydration Tablets",
    category: "wellness",
    price: 299,
    rating: 4.5,
    badge: "Hydration",
    image: "https://images.unsplash.com/photo-1553531384-cc64ac80f931?q=80&w=900&auto=format&fit=crop",
    imageAlt: "Electrolyte hydration tablets in water",
    description: "Electrolyte tablets for workout hydration, running, cycling, and active daily routines.",
    details: ["Effervescent tablets", "Workout hydration", "Travel friendly", "Low sugar"]
  },
  {
    id: "joint-support",
    name: "Joint Support Capsules",
    category: "wellness",
    price: 849,
    rating: 4.5,
    badge: "Mobility",
    image: "https://source.unsplash.com/nBNobTKhniQ/900x620",
    imageAlt: "Joint support wellness capsules",
    description: "Wellness capsules to support mobility, flexibility, and active lifestyle comfort.",
    details: ["Joint support blend", "60 capsules", "Active lifestyle", "Daily wellness use"]
  },
  {
    id: "immunity-kit",
    name: "Immunity Wellness Kit",
    category: "wellness",
    price: 999,
    rating: 4.6,
    badge: "Immunity",
    image: "https://source.unsplash.com/nBNobTKhniQ/900x620",
    imageAlt: "Immunity vitamins and wellness capsules",
    description: "Daily wellness support with vitamins and minerals for healthy active living.",
    details: ["Vitamin support", "Mineral blend", "Daily wellness", "Family-friendly routine"]
  },
  {
    id: "fat-loss-plan",
    name: "Fat Loss Fitness Plan",
    category: "plans",
    price: 999,
    rating: 4.8,
    badge: "Plan",
    image: "https://images.unsplash.com/photo-1571019613914-85f342c6a11e?q=80&w=900&auto=format&fit=crop",
    imageAlt: "Fat loss workout training",
    description: "Structured workout and nutrition guidance for healthy fat loss and consistency.",
    details: ["4-week workout plan", "Diet guidance", "Beginner friendly", "Progress tracker"]
  },
  {
    id: "muscle-gain-plan",
    name: "Muscle Gain Program",
    category: "plans",
    price: 1299,
    rating: 4.9,
    badge: "Coaching",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=900&auto=format&fit=crop",
    imageAlt: "Muscle gain strength training in gym",
    description: "Training and high protein diet guidance for strength and lean muscle gain.",
    details: ["6-week strength plan", "Protein guidance", "Workout split", "Recovery tips"]
  },
  {
    id: "yoga-wellness-plan",
    name: "Yoga & Wellness Guide",
    category: "plans",
    price: 699,
    rating: 4.5,
    badge: "Guide",
    image: "https://source.unsplash.com/LEXnTAAcAog/900x620",
    imageAlt: "Yoga and wellness stretching",
    description: "Yoga, mobility, breathing, and wellness guidance for daily healthy fitness.",
    details: ["Daily yoga routine", "Mobility drills", "Breathing practice", "Stress support"]
  },
  {
    id: "resistance-bands",
    name: "Resistance Bands Set",
    category: "equipment",
    price: 799,
    rating: 4.7,
    badge: "Training",
    image: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?q=80&w=900&auto=format&fit=crop",
    imageAlt: "Resistance bands workout set",
    description: "Portable resistance bands set for home workouts, warmups, and strength training.",
    details: ["5 resistance levels", "Home workout", "Travel friendly", "Strength training"]
  },
  {
    id: "yoga-mat",
    name: "Premium Yoga Mat",
    category: "equipment",
    price: 999,
    rating: 4.6,
    badge: "Fitness Gear",
    image: "https://source.unsplash.com/zBYG9kzN-8s/900x620",
    imageAlt: "Premium yoga exercise mat",
    description: "Comfortable yoga and exercise mat for workouts, stretching, and wellness sessions.",
    details: ["Anti-slip surface", "Workout support", "Easy to carry", "Good cushioning"]
  },
  {
    id: "smart-scale",
    name: "Fitness Smart Scale",
    category: "equipment",
    price: 1899,
    rating: 4.4,
    badge: "Tracker",
    image: "https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=900&auto=format&fit=crop",
    imageAlt: "Digital fitness smart scale",
    description: "Smart body scale for tracking weight progress and healthy fitness goals.",
    details: ["Body tracking", "Digital display", "Progress monitoring", "Fitness goal support"]
  },
  {
    id: "vitamin-c-gummies",
    name: "Vitamin C Gummies",
    category: "wellness",
    price: 549,
    rating: 4.6,
    badge: "Vitamin C",
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=900&auto=format&fit=crop",
    imageAlt: "Vitamin C gummies and wellness supplement",
    description: "Tasty vitamin C gummies for daily immunity, antioxidant support, and wellness routines.",
    details: ["Vitamin C support", "60 gummies", "Easy daily use", "Immunity-focused"]
  },
  {
    id: "green-tea",
    name: "Green Tea Detox Pack",
    category: "foods",
    price: 349,
    rating: 4.4,
    badge: "Detox",
    image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?q=80&w=900&auto=format&fit=crop",
    imageAlt: "Green tea cup and tea leaves",
    description: "Green tea pack for light metabolism support, hydration, and healthy lifestyle habits.",
    details: ["30 tea bags", "Antioxidant support", "No added sugar", "Morning routine"]
  },
  {
    id: "trail-mix",
    name: "Nuts & Seeds Trail Mix",
    category: "foods",
    price: 599,
    rating: 4.7,
    badge: "Energy Food",
    image: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?q=80&w=900&auto=format&fit=crop",
    imageAlt: "Nuts and seeds trail mix",
    description: "Balanced nuts and seeds mix for healthy fats, clean snacking, and workout energy.",
    details: ["Almonds and seeds", "Healthy fats", "High-energy snack", "No fried ingredients"]
  },
  {
    id: "skipping-rope",
    name: "Speed Skipping Rope",
    category: "equipment",
    price: 399,
    rating: 4.5,
    badge: "Cardio",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=900&auto=format&fit=crop",
    imageAlt: "Skipping rope cardio fitness training",
    description: "Lightweight speed rope for cardio, fat loss workouts, warmups, and home training.",
    details: ["Adjustable length", "Cardio training", "Travel friendly", "Home workout gear"]
  },
  {
    id: "dumbbell-pair",
    name: "Adjustable Dumbbell Pair",
    category: "equipment",
    price: 2499,
    rating: 4.8,
    badge: "Strength",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=900&auto=format&fit=crop",
    imageAlt: "Dumbbells strength training equipment",
    description: "Adjustable dumbbell pair for home strength workouts, muscle gain, and conditioning.",
    details: ["Adjustable plates", "Home gym ready", "Strength training", "Compact storage"]
  },
  {
    id: "sleep-recovery",
    name: "Sleep & Recovery Support",
    category: "wellness",
    price: 899,
    rating: 4.5,
    badge: "Recovery",
    image: "https://source.unsplash.com/nBNobTKhniQ/900x620",
    imageAlt: "Sleep and recovery wellness capsules",
    description: "Wellness support capsules for rest, recovery, and active lifestyle balance.",
    details: ["Night routine support", "Recovery focused", "60 capsules", "Active lifestyle care"]
  }
];

const CART_KEY = "pronutra_cart_v2";
const page = document.body.dataset.page || "home";
let activeFilter = new URLSearchParams(window.location.search).get("category") || "all";
let heroTimer = null;
let activeHeroIndex = 0;

const HERO_PRODUCTS = [
  {
    id: "whey-gold",
    label: "Protein Supplement",
    benefit: "Supports muscle recovery, strength, and daily high protein nutrition."
  },
  {
    id: "oats-protein",
    label: "Fitness Food",
    benefit: "A clean breakfast option for energy, fiber, and healthy fitness routines."
  },
  {
    id: "vitamin-c-gummies",
    label: "Wellness Support",
    benefit: "Helps support immunity, daily wellness, and active lifestyle care."
  },
  {
    id: "dumbbell-pair",
    label: "Workout Equipment",
    benefit: "Build strength at home with compact equipment for full-body training."
  },
  {
    id: "trail-mix",
    label: "Fitness Food",
    benefit: "Clean snack energy with nuts and seeds for workouts, office, and travel."
  },
  {
    id: "yoga-wellness-plan",
    label: "Daily Wellness Plan",
    benefit: "Yoga, mobility, breathing, and wellness habits for a balanced routine."
  }
];

const GUIDANCE_PRODUCTS = [
  {
    id: "fat-loss-plan",
    icon: "fa-fire",
    cta: "View Plan",
    benefits: ["Balanced calorie guidance", "Beginner workouts", "Weekly progress tracking"]
  },
  {
    id: "muscle-gain-plan",
    icon: "fa-dumbbell",
    cta: "Start Training",
    benefits: ["High protein diet support", "Strength routine", "Recovery and supplement tips"]
  },
  {
    id: "yoga-wellness-plan",
    icon: "fa-leaf",
    cta: "Shop Wellness",
    benefits: ["Daily yoga routine", "Hydration and wellness habits", "Mobility and breathing practice"]
  }
];

function money(amount) {
  return `Rs. ${Number(amount).toLocaleString("en-IN")}`;
}

function fallbackImage(category = "protein") {
  const fallbacks = {
    protein: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=900&auto=format&fit=crop",
    performance: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=900&auto=format&fit=crop",
    wellness: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=900&auto=format&fit=crop",
    diet: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=900&auto=format&fit=crop",
    foods: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=900&auto=format&fit=crop",
    plans: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=900&auto=format&fit=crop",
    equipment: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=900&auto=format&fit=crop"
  };
  return fallbacks[category] || fallbacks.protein;
}

function readCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || {};
  } catch {
    return {};
  }
}

function writeCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

function getProduct(id) {
  return PRODUCTS.find((product) => product.id === id);
}

function cartEntries() {
  const cart = readCart();
  return Object.entries(cart)
    .map(([id, qty]) => ({ product: getProduct(id), qty }))
    .filter((item) => item.product && item.qty > 0);
}

function totals() {
  const subtotal = cartEntries().reduce((sum, item) => sum + item.product.price * item.qty, 0);
  const tax = Math.round(subtotal * 0.18);
  const delivery = subtotal === 0 || subtotal >= 2500 ? 0 : 99;
  return { subtotal, tax, delivery, total: subtotal + tax + delivery };
}

function updateCartCount() {
  const count = cartEntries().reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll("#cartCount").forEach((el) => {
    el.textContent = count;
  });
}

function renderHeroProduct(index = 0) {
  const showcase = document.querySelector("#heroShowcase");
  const image = document.querySelector("#heroProductImage");
  const badge = document.querySelector("#heroProductBadge");
  const category = document.querySelector("#heroProductCategory");
  const title = document.querySelector("#heroProductTitle");
  const benefit = document.querySelector("#heroProductBenefit");
  const price = document.querySelector("#heroProductPrice");
  const rating = document.querySelector("#heroProductRating");
  const dots = document.querySelectorAll("[data-hero-step]");

  if (!showcase || !image || !title) return;

  activeHeroIndex = index % HERO_PRODUCTS.length;
  const spotlight = HERO_PRODUCTS[activeHeroIndex];
  const product = getProduct(spotlight.id);
  if (!product) return;

  showcase.classList.remove("hero-swap");
  void showcase.offsetWidth;
  showcase.classList.add("hero-swap");

  image.src = product.image;
  image.alt = product.imageAlt || product.name;
  image.onerror = () => {
    image.onerror = null;
    image.src = fallbackImage(product.category);
  };
  badge.textContent = product.badge;
  category.textContent = spotlight.label;
  title.textContent = product.name;
  benefit.textContent = spotlight.benefit;
  price.textContent = money(product.price);
  rating.textContent = product.rating;

  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle("active", dotIndex === activeHeroIndex);
  });

}

function startHeroRotation() {
  if (!document.querySelector("#heroShowcase")) return;
  renderHeroProduct(0);
  clearInterval(heroTimer);
  heroTimer = setInterval(() => {
    renderHeroProduct(activeHeroIndex + 1);
  }, 3600);
}

function addToCart(id) {
  const cart = readCart();
  cart[id] = (cart[id] || 0) + 1;
  writeCart(cart);
  toast(`${getProduct(id).name} added to cart`);
  renderCartPage();
  renderCheckoutPage();
}

function setQty(id, qty) {
  const cart = readCart();
  if (qty <= 0) {
    delete cart[id];
  } else {
    cart[id] = qty;
  }
  writeCart(cart);
  renderCartPage();
  renderCheckoutPage();
}

function clearCart() {
  writeCart({});
  renderCartPage();
  renderCheckoutPage();
}

function productCard(product, index = 0) {
  return `
    <div class="col-md-6 col-lg-4" style="--delay:${index * 55}ms">
      <article class="product-card">
        <div class="product-media">
          <img src="${product.image}" alt="${product.imageAlt || product.name}" loading="lazy" onerror="this.onerror=null;this.src='${fallbackImage(product.category)}';">
          <span class="product-badge">${product.badge}</span>
        </div>
        <div class="product-body">
          <div class="product-meta">
            <span class="product-category">${product.category}</span>
            <span class="product-price">${money(product.price)}</span>
          </div>
          <h5>${product.name}</h5>
          <p class="text-muted">${product.description}</p>
          <div class="rating-row">
            <i class="fa-solid fa-star"></i>
            <strong>${product.rating}</strong>
            <small>Verified rating</small>
          </div>
          <div class="product-actions">
            <button class="btn btn-outline-success" type="button" data-view="${product.id}">
              <i class="fa-solid fa-eye me-1"></i>View
            </button>
            <button class="btn btn-success" type="button" data-add="${product.id}">
              <i class="fa-solid fa-cart-plus me-1"></i>Add
            </button>
          </div>
        </div>
      </article>
    </div>
  `;
}

function guidanceCard(item, index = 0) {
  const product = getProduct(item.id);
  if (!product) return "";

  return `
    <article class="guidance-card ${index === 1 ? "featured" : ""}" style="--delay:${index * 90}ms">
      <div class="guidance-media">
        <img src="${product.image}" alt="${product.imageAlt || product.name}" loading="lazy" onerror="this.onerror=null;this.src='${fallbackImage(product.category)}';">
        <span>${product.badge}</span>
      </div>
      <div class="guidance-content">
        <i class="fa-solid ${item.icon}"></i>
        <div>
          <div class="guidance-topline">${product.category}</div>
          <h3>${product.name}</h3>
          <p>${product.description}</p>
        </div>
      </div>
      <ul class="guidance-benefits">
        ${item.benefits.map((benefit) => `<li><i class="fa-solid fa-check"></i>${benefit}</li>`).join("")}
      </ul>
      <div class="guidance-actions">
        <strong>${money(product.price)}</strong>
        <button class="btn btn-warning" type="button" data-add="${product.id}">
          <i class="fa-solid fa-cart-plus me-1"></i>${item.cta}
        </button>
      </div>
    </article>
  `;
}

function renderGuidanceProducts() {
  const grid = document.querySelector("#guidanceGrid");
  if (!grid) return;
  grid.innerHTML = GUIDANCE_PRODUCTS.map(guidanceCard).join("");
}

function renderFeatured() {
  const grid = document.querySelector("#featuredGrid");
  if (!grid) return;
  const featuredIds = ["whey-gold", "creatine", "oats-protein", "vitamin-c-gummies", "trail-mix", "dumbbell-pair", "peanut-butter", "muscle-gain-plan"];
  const featured = featuredIds.map(getProduct).filter(Boolean);
  grid.innerHTML = featured.map(productCard).join("");
}

function renderProducts() {
  const grid = document.querySelector("#productGrid");
  if (!grid) return;

  const search = (document.querySelector("#productSearch")?.value || "").trim().toLowerCase();
  const filtered = PRODUCTS.filter((product) => {
    const matchesFilter = activeFilter === "all" || product.category === activeFilter;
    const text = `${product.name} ${product.category} ${product.description}`.toLowerCase();
    return matchesFilter && text.includes(search);
  });

  grid.innerHTML = filtered.length
    ? filtered.map(productCard).join("")
    : `<div class="col-12"><div class="empty-state">No products found. Try a different search or category.</div></div>`;

  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.classList.toggle("active", button.dataset.filter === activeFilter);
  });
}

function renderCartPage() {
  const holder = document.querySelector("#cartItems");
  if (!holder) return;

  const entries = cartEntries();
  if (!entries.length) {
    holder.innerHTML = `<div class="empty-state">Your cart is empty. Add products from the catalog.</div>`;
  } else {
    holder.innerHTML = entries.map(({ product, qty }) => `
      <div class="cart-item">
        <img src="${product.image}" alt="${product.imageAlt || product.name}" loading="lazy" onerror="this.onerror=null;this.src='${fallbackImage(product.category)}';">
        <div>
          <h5>${product.name}</h5>
          <div class="text-muted">${product.category} | ${money(product.price)} each</div>
          <button class="btn btn-link text-danger p-0 mt-1" type="button" data-remove="${product.id}">Remove</button>
        </div>
        <div class="item-actions">
          <div class="qty-control">
            <button class="btn btn-outline-success" type="button" data-minus="${product.id}">-</button>
            <strong>${qty}</strong>
            <button class="btn btn-outline-success" type="button" data-plus="${product.id}">+</button>
          </div>
          <div class="fw-bold mt-2 text-end">${money(product.price * qty)}</div>
        </div>
      </div>
    `).join("");
  }

  renderTotals();
  const checkoutLink = document.querySelector("#checkoutLink");
  if (checkoutLink) checkoutLink.classList.toggle("disabled", entries.length === 0);
}

function renderTotals() {
  const t = totals();
  const map = {
    cartSubtotal: money(t.subtotal),
    cartTax: money(t.tax),
    cartDelivery: t.delivery === 0 ? "Free" : money(t.delivery),
    cartTotal: money(t.total)
  };
  Object.entries(map).forEach(([id, value]) => {
    document.querySelectorAll(`#${id}`).forEach((el) => {
      el.textContent = value;
    });
  });
}

function renderCheckoutPage() {
  const holder = document.querySelector("#checkoutItems");
  if (!holder) return;
  const entries = cartEntries();

  holder.innerHTML = entries.length
    ? entries.map(({ product, qty }) => `<div class="checkout-mini"><span>${product.name} x ${qty}</span><strong>${money(product.price * qty)}</strong></div>`).join("")
    : `<div class="empty-state">Cart is empty. Add products before checkout.</div>`;

  renderTotals();
}

function openProduct(id) {
  const product = getProduct(id);
  const title = document.querySelector("#productModalTitle");
  const body = document.querySelector("#productModalBody");
  const modalElement = document.querySelector("#productModal");
  if (!product || !title || !body || !modalElement || !window.bootstrap) return;

  title.textContent = product.name;
  body.innerHTML = `
    <div class="modal-product-grid">
      <img src="${product.image}" alt="${product.imageAlt || product.name}" loading="lazy" onerror="this.onerror=null;this.src='${fallbackImage(product.category)}';">
      <div>
        <span class="product-category">${product.category}</span>
        <span class="product-badge" style="position:static;display:inline-block;margin-left:8px;">${product.badge}</span>
        <h3 class="mt-3">${product.name}</h3>
        <p class="text-muted">${product.description}</p>
        <h4 class="text-success">${money(product.price)}</h4>
        <div class="rating-row"><i class="fa-solid fa-star"></i><strong>${product.rating}</strong><small>Customer rating</small></div>
        <ul>${product.details.map((detail) => `<li>${detail}</li>`).join("")}</ul>
        <button class="btn btn-success mt-2" type="button" data-add="${product.id}">
          <i class="fa-solid fa-cart-plus me-2"></i>Add to Cart
        </button>
      </div>
    </div>
  `;
  new bootstrap.Modal(modalElement).show();
}

function syncPayment() {
  const method = document.querySelector("#paymentMethod");
  const cardFields = document.querySelector("#cardFields");
  const payButton = document.querySelector("#payButton");
  if (!method || !cardFields || !payButton) return;
  const isCard = method.value === "card";
  cardFields.style.display = isCard ? "block" : "none";
  payButton.innerHTML = method.value === "paypal"
    ? `<i class="fa-brands fa-paypal me-2"></i>Pay with PayPal`
    : `<i class="fa-solid fa-lock me-2"></i>Place Secure Order`;
}

function handleCheckout(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const status = document.querySelector("#orderStatus");
  const entries = cartEntries();

  if (!entries.length) {
    status.innerHTML = `<div class="alert alert-danger">Your cart is empty. Please add products first.</div>`;
    return;
  }

  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    return;
  }

  const orderId = `PN-${Date.now().toString().slice(-7)}`;
  const method = document.querySelector("#paymentMethod");
  status.innerHTML = `
    <div class="alert alert-success">
      <strong>Order placed successfully.</strong><br>
      Order <strong>${orderId}</strong> placed using ${method.options[method.selectedIndex].text}.
    </div>
  `;
  clearCart();
  form.reset();
  syncPayment();
}

function handleContact(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const status = document.querySelector("#contactStatus");
  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    return;
  }
  status.innerHTML = `<div class="alert alert-success">Your message has been submitted successfully.</div>`;
  form.reset();
}

function toast(message) {
  const area = document.querySelector("#toastArea");
  if (!area) return;
  const node = document.createElement("div");
  node.className = "demo-toast";
  node.textContent = message;
  area.appendChild(node);
  setTimeout(() => node.remove(), 2400);
}

document.addEventListener("click", (event) => {
  const add = event.target.closest("[data-add]");
  const view = event.target.closest("[data-view]");
  const plus = event.target.closest("[data-plus]");
  const minus = event.target.closest("[data-minus]");
  const remove = event.target.closest("[data-remove]");
  const filter = event.target.closest("[data-filter]");

  if (add) addToCart(add.dataset.add);
  if (view) openProduct(view.dataset.view);
  if (plus) {
    const current = readCart()[plus.dataset.plus] || 0;
    setQty(plus.dataset.plus, current + 1);
  }
  if (minus) {
    const current = readCart()[minus.dataset.minus] || 0;
    setQty(minus.dataset.minus, current - 1);
  }
  if (remove) setQty(remove.dataset.remove, 0);
  if (filter) {
    activeFilter = filter.dataset.filter;
    renderProducts();
  }
});

document.querySelector("#productSearch")?.addEventListener("input", renderProducts);
document.querySelector("#clearCartBtn")?.addEventListener("click", clearCart);
document.querySelector("#paymentMethod")?.addEventListener("change", syncPayment);
document.querySelector("#checkoutForm")?.addEventListener("submit", handleCheckout);
document.querySelector("#contactForm")?.addEventListener("submit", handleContact);
document.querySelectorAll(".category-tile img").forEach((img) => {
  img.addEventListener("error", () => {
    img.src = "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=900&auto=format&fit=crop";
  }, { once: true });
});
document.querySelectorAll("[data-hero-step]").forEach((button) => {
  button.addEventListener("click", () => {
    renderHeroProduct(Number(button.dataset.heroStep));
    clearInterval(heroTimer);
    heroTimer = setInterval(() => {
      renderHeroProduct(activeHeroIndex + 1);
    }, 3600);
  });
});

updateCartCount();
startHeroRotation();
renderFeatured();
renderGuidanceProducts();
renderProducts();
renderCartPage();
renderCheckoutPage();
syncPayment();
