const API_URL = "https://v2.api.noroff.dev/online-shop";
const slideContainer = document.getElementById("product-grid");

async function fetchProducts() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch products");
    const json = await res.json();
    const products = json.data;

    renderProducts(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    slideContainer.innerHTML = "<p>Could not load products.</p>";
  }
}

function renderProducts(products) {
  slideContainer.innerHTML = products.map(product => `
    <div class="product-card">
      <img src="${product.image.url}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>${product.price} NOK</p>
    </div>
  `).join('');
}

fetchProducts();