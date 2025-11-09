const API_URL = `https://v2.api.noroff.dev/online-shop/`;

const carouselContainer = document.getElementById("carousel-slide");
const prevBtn = document.getElementById("carousel-prev");
const nextBtn = document.getElementById("carousel-next");
let currentSlide = 0;


const carouselItems = [
  { image: "assets/images/fashionable-model-stylish-hat-red-coat-boots-posing-white-wall-studio.jpg", productId: "5391e16f-d88b-4747-a989-f17fb178459d" },
  { image: "assets/images/black-woman-trench-coat-dancing-sunlight.jpg", productId: "f7bdd538-3914-409d-bd71-8ef962a9a9dd" },
  { image: "assets/images/attractive-young-woman-walking-autumn-wearing-coat.jpg", productId: "7238397e-0ee5-4d5c-9e82-bda666dd2470" }
];

function renderCarouselSlide(index) {
  const item = carouselItems[index];
  if (!item) return;

  carouselContainer.innerHTML = `
    <div class="carousel-item fade-in">
      <img src="${item.image}" class="carousel-image" alt="Produktbilde" loading="lazy">
      <button class="carousel-shop-btn">Shop product</button>
    </div>
  `;

  const img = carouselContainer.querySelector(".carousel-image");
  const btn = carouselContainer.querySelector(".carousel-shop-btn");


  img.addEventListener("click", () => {
    window.location.href = `/product.html?id=${item.productId}`;
  });
  btn.addEventListener("click", () => {
    window.location.href = `/product.html?id=${item.productId}`;
  });
}

function preloadImage(index) {
  const nextIndex = (index + 1) % carouselItems.length;
  const nextImage = new Image();
  nextImage.src = carouselItems[nextIndex].image;
}

function showNextSlide() {
  currentSlide = (currentSlide + 1) % carouselItems.length;
  renderCarouselSlide(currentSlide);
  preloadImage(currentSlide);
}

function showPrevSlide() {
  currentSlide = (currentSlide - 1 + carouselItems.length) % carouselItems.length;
  renderCarouselSlide(currentSlide);
  preloadImage(currentSlide);
}

if (nextBtn) nextBtn.addEventListener("click", showNextSlide);
if (prevBtn) prevBtn.addEventListener("click", showPrevSlide);

renderCarouselSlide(currentSlide);

const productGrid = document.getElementById("product-grid");

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

function renderProducts(products) {
  if (!productGrid) return;

  productGrid.innerHTML = products
    .map((product) => {
      const hasDiscount = product.discountedPrice < product.price;
      const discountPercent = hasDiscount
        ? Math.round(
            ((product.price - product.discountedPrice) / product.price) * 100
          )
        : 0;

      return `
        <div class="product-card" data-id="${product.id || product._id}">
          ${
            hasDiscount
              ? `<div class="sale-badge">-${discountPercent}%</div>`
              : ""
          }
          <img 
            src="${
              product.image?.url ||
              "https://via.placeholder.com/300x300?text=No+Image"
            }" 
            alt="${product.title}" 
            loading="lazy"
          >
          <h3>${product.title}</h3>
          <div class="price">
            ${
              hasDiscount
                ? `
                  <span class="old-price">${product.price.toFixed(2)} NOK</span>
                  <span class="discounted-price">${product.discountedPrice.toFixed(2)} NOK</span>
                `
                : `<span class="normal-price">${product.price.toFixed(
                    2
                  )} NOK</span>`
            }
          </div>
        </div>
      `;
    })
    .join("");

  document.querySelectorAll(".product-card").forEach((card) => {
    card.addEventListener("click", () => {
      const id = card.dataset.id;
      window.location.href = `/product.html?id=${id}`;
    });
  });
}

fetchGridProducts();