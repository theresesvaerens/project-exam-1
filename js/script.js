const API_URL = "https://v2.api.noroff.dev/online-shop";
const slideContainer = document.getElementById("carousel-slide");
let currentSlide = 0;
let products = [];

// Fetch products
async function fetchProducts() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch products");
    const json = await res.json();
    products = json.data;

    renderCarousel(products);
    startCarousel();
  } catch (error) {
    console.error("Error fetching products:", error);
    slideContainer.innerHTML = "<p>Could not load products.</p>";
  }
}

// Render carousel items
function renderCarousel(items) {
  slideContainer.innerHTML = "";

  items.forEach((product, index) => {
    const item = document.createElement("div");
    item.classList.add("carousel-item");
    if (index === 0) item.classList.add("active");

    const img = document.createElement("img");
    img.src = product.image?.url || "https://via.placeholder.com/800x400?text=No+Image";
    img.alt = product.image?.alt || product.title;

    item.append(img);
    item.addEventListener("click", () => {
      window.location.href = `/product.html?id=${product.id}`;
    });

    slideContainer.appendChild(item);
  });
}

// Start automatic slide
function startCarousel() {
  const slides = document.querySelectorAll(".carousel-item");

  setInterval(() => {
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active");
  }, 4000); 
}

fetchProducts();