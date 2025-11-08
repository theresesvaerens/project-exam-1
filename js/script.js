// === BASE URL ===
const API_URL = "https://v2.api.noroff.dev/online-shop";

// === CAROUSEL ===
const carouselContainer = document.getElementById("carousel-slide");
let currentSlide = 0;

// Fetch products for the homepage carousel
async function fetchCarouselProducts() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch carousel products");

    const json = await res.json();
    const products = json.data.slice(0, 5); // Show only the first 5 products
    renderCarousel(products);
    startCarousel();
  } catch (error) {
    console.error("Error fetching carousel:", error);
    if (carouselContainer)
      carouselContainer.innerHTML = "<p>Could not load carousel.</p>";
  }
}

// Create carousel slides dynamically
function renderCarousel(products) {
  if (!carouselContainer) return;
  carouselContainer.innerHTML = "";

  products.forEach((product, index) => {
    const item = document.createElement("div");
    item.classList.add("carousel-item");
    if (index === 0) item.classList.add("active");

    const img = document.createElement("img");
    img.src = product.image?.url || "https://via.placeholder.com/800x400?text=No+Image";
    img.alt = product.image?.alt || product.title;

    item.append(img);
    item.addEventListener("click", () => {
      // Redirect to single product page when clicked
      window.location.href = `/product.html?id=${product.id}`;
    });

    carouselContainer.appendChild(item);
  });
}

// Start automatic carousel rotation
function startCarousel() {
  const slides = document.querySelectorAll(".carousel-item");
  if (slides.length === 0) return;

  setInterval(() => {
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active");
  }, 4000); // Change slide every 4 seconds
}

// === PRODUCT GRID ===
const productGrid = document.getElementById("product-grid");

// Fetch products for the product grid
async function fetchGridProducts() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch grid products");

    const json = await res.json();
    const products = json.data;
    renderProducts(products);
  } catch (error) {
    console.error("Error fetching grid:", error);
    if (productGrid)
      productGrid.innerHTML = "<p>Could not load products.</p>";
  }
}

// Render all products inside the grid
function renderProducts(products) {
  if (!productGrid) return;

  productGrid.innerHTML = products.map(product => {
    const hasDiscount = product.discountedPrice < product.price;
    const discountPercent = hasDiscount
      ? Math.round(((product.price - product.discountedPrice) / product.price) * 100)
      : 0;

    return `
      <div class="product-card" data-id="${product.id}">
        ${hasDiscount ? `<div class="sale-badge">-${discountPercent}%</div>` : ""}
        <img src="${product.image?.url || "https://via.placeholder.com/300x300?text=No+Image"}" alt="${product.title}">
        <h3>${product.title}</h3>
        <div class="price">
          ${
            hasDiscount
              ? `
                <span class="old-price">${product.price.toFixed(2)} NOK</span>
                <span class="discounted-price">${product.discountedPrice.toFixed(2)} NOK</span>
              `
              : `<span class="normal-price">${product.price.toFixed(2)} NOK</span>`
          }
        </div>
      </div>
    `;
  }).join('');

  // Add click event to each product card → open product.html with ID
  document.querySelectorAll(".product-card").forEach(card => {
    card.addEventListener("click", () => {
      const id = card.dataset.id;
      window.location.href = `/product.html?id=${id}`;
    });
  });
}

// === INITIALIZE ===
fetchCarouselProducts();
fetchGridProducts();

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const cartCountEl = document.getElementById("cart-count");

  if (count > 0) {
    cartCountEl.textContent = count;
    cartCountEl.style.display = "inline-flex";
  } else {
    cartCountEl.style.display = "none";
  }
}
updateCartCount();
