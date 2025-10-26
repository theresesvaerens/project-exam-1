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
  slideContainer.innerHTML = products.map(product => {
    const hasDiscount = product.discountedPrice < product.price;
    const discountPercent = Math.round(
      ((product.price - product.discountedPrice) / product.price) * 100
    );

    return `
      <div class="product-card" data-id="${product.id}">
        ${hasDiscount ? `<div class="sale-badge">-${discountPercent}%</div>` : ""}
        <img src="${product.image.url}" alt="${product.title}">
        <h3>${product.title}</h3>
        <div class="price">
          ${
            hasDiscount
              ? `
                <span class="old-price">${product.price.toFixed(2)} NOK</span>
                <span class="discounted-price">${product.discountedPrice.toFixed(2)} NOK</span>
              `
              : `
                <span class="normal-price">${product.price.toFixed(2)} NOK</span>
              `
          }
        </div>
      </div>
    `;
  }).join('');


  document.querySelectorAll(".product-card").forEach(card => {
    card.addEventListener("click", () => {
      const id = card.dataset.id;
      window.location.href = `/singleproduct.html?id=${id}`;
    });
  });
}

fetchProducts();