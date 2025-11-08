const container = document.getElementById("cart-items");
const totalPriceEl = document.getElementById("total-price");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    totalPriceEl.textContent = "Total: 0 NOK";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    // Ensure quantity property exists
    if (!item.quantity) item.quantity = 1;

    const price = item.discountedPrice || item.price;
    total += price * item.quantity;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    cartItem.innerHTML = `
      <img src="${item.image?.url || 'https://via.placeholder.com/150'}" alt="${item.title}">
      <div class="cart-item-details">
        <h2>${item.title}</h2>
        <p>Price: ${price.toFixed(2)} NOK</p>
        <div class="quantity-control">
          <button class="decrease-btn" data-index="${index}">-</button>
          <span class="quantity">${item.quantity}</span>
          <button class="increase-btn" data-index="${index}">+</button>
        </div>
        <button class="remove-btn" data-index="${index}">Remove</button>
      </div>
    `;

    container.appendChild(cartItem);
  });

  totalPriceEl.textContent = `Total: ${total.toFixed(2)} NOK`;

  // Event listeners for remove buttons
  const removeButtons = document.querySelectorAll(".remove-btn");
  removeButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    });
  });

  // Event listeners for increase buttons
  const increaseButtons = document.querySelectorAll(".increase-btn");
  increaseButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      cart[index].quantity++;
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    });
  });

  // Event listeners for decrease buttons
  const decreaseButtons = document.querySelectorAll(".decrease-btn");
  decreaseButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      if (cart[index].quantity > 1) {
        cart[index].quantity--;
      } else {
        // If quantity is 1 and user clicks "-", remove the item
        cart.splice(index, 1);
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    });
  });
}

// Optional: Clear cart button
const clearCartBtn = document.getElementById("clear-cart");
if (clearCartBtn) {
  clearCartBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to clear the cart?")) {
      cart = [];
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    }
  });
}

// Optional: Checkout button
const checkoutBtn = document.getElementById("checkout-btn");
if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    window.location.href = "checkout.html";
  });
}

// Initial render
renderCart();

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