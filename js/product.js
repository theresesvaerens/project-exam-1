const API_URL = "https://v2.api.noroff.dev/online-shop";
const container = document.getElementById("single-product");

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

if (!productId) {
  container.innerHTML = "<p>Product ID is missing in the URL.</p>";
} else {
  fetchProduct(productId);
}

async function fetchProduct(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error(`Failed to fetch product with ID: ${id}`);

    const json = await res.json();
    const product = json.data;
    renderProduct(product);
  } catch (error) {
    console.error(error);
    container.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}

function renderProduct(product) {
  const hasDiscount = product.discountedPrice < product.price;
  const tags = product.tags?.length ? product.tags.join(", ") : "No tags";

  container.innerHTML = `
    <div class="single-product-container">
      <img src="${product.image?.url || 'https://via.placeholder.com/400x400?text=No+Image'}" alt="${product.title}" />

      <div class="product-details">
        <h1>${product.title}</h1>
        <p class="description">${product.description || "No description available."}</p>

        <div class="price">
          ${
            hasDiscount
              ? `<span class="old-price">${product.price.toFixed(2)} NOK</span>
                 <span class="discounted-price">${product.discountedPrice.toFixed(2)} NOK</span>`
              : `<span class="normal-price">${product.price.toFixed(2)} NOK</span>`
          }
        </div>

        <div class="rating-reviews">
          <span>Rating: ${product.rating.toFixed(1)}</span> | 
          <span>${product.reviews?.length || 0} review${(product.reviews?.length || 0) !== 1 ? "s" : ""}</span>
        </div>

        <div class="tags">
          <strong>Tags:</strong> ${tags}
        </div>

        <button class="add-to-cart">Add to Cart</button>

        <div class="reviews-section">
          <h2>Customer Reviews</h2>
          ${renderReviews(product.reviews)}
        </div>
      </div>
    </div>
  `;

  const addBtn = container.querySelector(".add-to-cart");
  addBtn.addEventListener("click", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      product.quantity = 1;
      cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
  });
}

function renderReviews(reviews) {
  if (!reviews || reviews.length === 0) {
    return "<p>No reviews yet.</p>";
  }

  return reviews.map(review => `
    <div class="review">
      <p><strong>${review.username}</strong> - Rating: ${review.rating}</p>
      <p>${review.description}</p>
    </div>
  `).join("");
}

function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalQuantity = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  if (cartCount) {
    cartCount.textContent = totalQuantity;
    cartCount.style.display = totalQuantity > 0 ? "inline-block" : "none";
  }
}

