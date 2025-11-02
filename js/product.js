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

function getStars(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  let starsHTML = "";
  for (let i = 0; i < fullStars; i++) starsHTML += `<i class="fa-solid fa-star"></i>`;
  if (halfStar) starsHTML += `<i class="fa-solid fa-star-half-stroke"></i>`;
  for (let i = 0; i < emptyStars; i++) starsHTML += `<i class="fa-regular fa-star"></i>`;

  return starsHTML;
}

function renderProduct(product) {
  const hasDiscount = product.discountedPrice < product.price;

  container.innerHTML = `
    <div class="single-product-container">
      <img 
        src="${product.image?.url || "https://via.placeholder.com/400x400?text=No+Image"}" 
        alt="${product.title}" 
      />
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

        <div class="rating">
          ${getStars(product.rating)} <span>${product.rating.toFixed(1)}</span>
        </div>

        <button class="add-to-cart">Add to Cart</button>
      </div>
    </div>
  `;

  const addBtn = container.querySelector(".add-to-cart");
  addBtn.addEventListener("click", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];


    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      alert("This product is already in your cart!");
      return;
    }

 
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`${product.title} was added to your cart!`);
  });
}
