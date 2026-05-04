// ===============================
// LOAD SECTIONS
// ===============================
const loadSection = async (id, file) => {
  try {
    const res = await fetch(`pages/${file}`);
    const data = await res.text();

    document.getElementById(id).innerHTML = data;

    // Re-init after load
    initApp();
  } catch (err) {
    console.error(`Error loading ${file}`, err);
  }
};

// Load all sections
["navbar","home","shop","order","gallery","story","contact","footer"]
  .forEach(section => loadSection(section, `${section}.html`));


// ===============================
// INIT APP (SAFE INIT)
// ===============================
function initApp() {
  initMobileMenu();
  initProductFilter();
  initSmoothScroll();
}


// ===============================
// MOBILE MENU (SAFE + GSAP)
// ===============================
function initMobileMenu() {
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  // If navbar not loaded yet → skip
  if (!menuBtn || !mobileMenu) return;

  // Prevent duplicate listeners
  if (menuBtn.dataset.ready) return;
  menuBtn.dataset.ready = "true";

  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  document.querySelectorAll(".mobile-link").forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  });
}

// ===============================
// PRODUCT FILTER (FIXED)
// ===============================
function initProductFilter() {
  const buttons = document.querySelectorAll(".filter-btn");

  buttons.forEach(btn => {
    if (btn.dataset.ready) return;
    btn.dataset.ready = "true";

    btn.addEventListener("click", (e) => {
      const category = btn.dataset.category;
      filterProducts(category, e);
    });
  });
}

function filterProducts(category, event) {
  const cards = document.querySelectorAll(".product-card");
  const buttons = document.querySelectorAll(".filter-btn");

  buttons.forEach(btn => btn.classList.remove("active"));
  if (event) event.target.classList.add("active");

  cards.forEach(card => {
    const match = category === "all" || card.dataset.category === category;

    card.style.display = match ? "block" : "none";
  });
}


// ===============================
// WHATSAPP BUTTON
// ===============================
function openWhatsApp() {
  window.open("https://wa.me/91XXXXXXXXXX", "_blank");
}


// ===============================
// SMOOTH SCROLL (IMPROVED)
// ===============================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {

    if (link.dataset.ready) return;
    link.dataset.ready = "true";

    link.addEventListener("click", function(e) {
      const targetId = this.getAttribute("href");
      const target = document.querySelector(targetId);

      if (!target) return;

      e.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });
}

// ===============================
// OPEN PRODUCT MODAL (IMPROVED)
// ===============================

let selectedProduct = {};

function openProduct(card) {
  const modal = document.getElementById("product-modal");

  const title = card.querySelector("h3").innerText;
  const price = card.querySelector(".price").innerText;
  const img = card.querySelector("img").src;
  const category = card.querySelector(".tag").innerText;

  // 🎯 CUSTOM PRODUCT DATA
  const productData = {
    "Radha Krishna Doll": {
      desc: "Intricately handcrafted crochet dolls symbolizing divine love and harmony. A meaningful décor piece that brings peace and spiritual elegance.",
      rating: "4.9 (120 reviews)",
      hook: "A timeless symbol of love and devotion, handcrafted to elevate your space."
    },
    "Mini Flower Pots": {
      desc: "Charming crochet mini pots that stay fresh forever. Perfect for desks, shelves, and cozy aesthetic corners.",
      rating: "4.7 (80 reviews)",
      hook: "Add a touch of greenery without the maintenance."
    },
    "Flower Bouquet": {
      desc: "A beautiful yarn-crafted bouquet that never fades. Ideal for gifting and creating lasting memories.",
      rating: "4.8 (95 reviews)",
      hook: "A forever bouquet that speaks emotions without words."
    },
    "Sunflower Crochet": {
      desc: "Bright and cheerful crochet sunflower that radiates positivity and warmth in any space.",
      rating: "4.6 (70 reviews)",
      hook: "Bring sunshine indoors with this joyful creation."
    },
    "Hanuman Ji Doll": {
      desc: "Handmade amigurumi Hanuman Ji idol crafted with devotion, symbolizing strength, protection, and positivity.",
      rating: "5.0 (150 reviews)",
      hook: "A spiritual companion that brings strength and peace."
    },
    "Flower Doll": {
      desc: "Adorable crochet doll with delicate floral detailing, perfect for aesthetic décor and gifting.",
      rating: "4.8 (60 reviews)",
      hook: "A cute handcrafted charm that brightens any corner."
    },
    "Crochet Shoulder Bag": {
      desc: "Elegant pastel crochet bag with bow detailing. Stylish, lightweight, and perfect for everyday use.",
      rating: "4.9 (110 reviews)",
      hook: "Style meets handmade elegance in every stitch."
    },
    "Alphabet Keychain": {
      desc: "Personalized crochet alphabet keychain with evil eye charm. A meaningful and stylish accessory.",
      rating: "4.7 (140 reviews)",
      hook: "Carry your identity with a touch of charm."
    },
    "Pastel Bouquet": {
      desc: "Soft pastel crochet bouquet designed for elegant gifting and timeless beauty.",
      rating: "4.9 (85 reviews)",
      hook: "A soft, dreamy bouquet that lasts forever."
    },
    "Shiv Parvati Dolls": {
    desc: "Intricately handcrafted crochet idols of Lord Shiva and Goddess Parvati, symbolizing divine love, strength, and balance. Designed with fine detailing and vibrant elements, this piece brings spiritual elegance and positivity into your space.",
    rating: "5.0 (150 reviews)",
    hook: "A divine presence handcrafted to bring peace, strength, and harmony into your home."
},
    "Sunflower Crochet Bouquet": {
    desc: "A vibrant handcrafted sunflower bouquet designed to radiate positivity and joy. Unlike real flowers, this bouquet never fades, making it a perfect long-lasting gift for your loved ones or a cheerful décor piece.",
    rating: "4.9 (110 reviews)",
    hook: "A forever bouquet that keeps spreading happiness every single day."
}
  };

  const product = productData[title] || {
    desc: "Beautiful handmade product crafted with love and attention to detail.",
    rating: "4.8 (50 reviews)",
    hook: "A unique handcrafted piece made just for you."
  };

  // SET DATA
  document.getElementById("modal-img").src = img;
  document.getElementById("modal-title").innerText = title;
  document.getElementById("modal-price").innerText = price;
  document.getElementById("modal-desc").innerText = product.desc;
  document.getElementById("modal-hook").innerText = product.hook;
  document.getElementById("modal-category").innerText = category;
  document.getElementById("modal-rating").innerText = product.rating;

  // SHOW MODAL
  modal.classList.remove("hidden");
  modal.classList.add("flex");

  document.body.style.overflow = "hidden";
}

function closeModal() {
  const modal = document.getElementById("product-modal");

  modal.classList.add("hidden");
  modal.classList.remove("flex");

  document.body.style.overflow = "auto";
}

function openGalleryProduct(el) {
  const modal = document.getElementById("product-modal");

  const title = el.dataset.title;
  const price = el.dataset.price;
  const desc = el.dataset.desc;
  const img = el.dataset.img;
  const category = el.dataset.category;

  let hook = "";

  if (category.toLowerCase().includes("amigurumi")) {
    hook = "A soulful handmade creation that brings warmth and charm.";
  } else if (category.toLowerCase().includes("spiritual")) {
    hook = "A divine handcrafted piece that brings peace and positivity.";
  } else if (category.toLowerCase().includes("gift")) {
    hook = "A perfect handmade gift that lasts forever.";
  } else {
    hook = "A unique handcrafted piece designed to elevate your style.";
  }

  // Set modal content
  document.getElementById("modal-img").src = img;
  document.getElementById("modal-title").innerText = title;
  document.getElementById("modal-price").innerText = price;
  document.getElementById("modal-desc").innerText = desc;
  document.getElementById("modal-category").innerText = category;
  document.getElementById("modal-hook").innerText = hook;

  // Reviews
  document.getElementById("modal-rating").innerText = "4.8 (95 reviews)";

  modal.classList.remove("hidden");
  modal.classList.add("flex");

  document.body.style.overflow = "hidden";
}

function openShipping() {
  const modal = document.getElementById("shipping-modal");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.style.overflow = "hidden";
}

function closeShipping() {
  const modal = document.getElementById("shipping-modal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.body.style.overflow = "auto";
}

function openFAQ() {
  const modal = document.getElementById("faq-modal");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.style.overflow = "hidden";
}

function closeFAQ() {
  const modal = document.getElementById("faq-modal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.body.style.overflow = "auto";
}
