document.addEventListener("DOMContentLoaded", () => {
  const checkoutItemsContainer = document.getElementById("checkout-items");
  const totalPriceEl = document.getElementById("checkout-total-price");
  const checkoutForm = document.getElementById("checkoutForm");
  const message = document.getElementById("checkout-message");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function displayCart() {
    checkoutItemsContainer.innerHTML = "";
    let total = 0;

    if (!cart.length) {
      checkoutItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
      totalPriceEl.textContent = "0 NOK";
      return;
    }

    cart.forEach(item => {
      const title = item.title || "No title";
      const quantity = item.quantity || 1;
      const price = item.discountedPrice || item.price || 0;
      const image = item.image?.url || 'https://via.placeholder.com/150';
      const productTotal = price * quantity;

      total += productTotal;

      const itemEl = document.createElement("div");
      itemEl.classList.add("checkout-item");
      itemEl.innerHTML = `
        <div class="image-wrapper" style="position: relative; display: inline-block;">
          <img src="${image}" alt="${title}" style="display:block; width:60px; height:60px; border-radius:6px;">
          <span class="quantity-badge" style="
            position: absolute;
            top: -5px;
            left: -5px;
            background: #FFF9F4;
            color: #333;
            padding: 4px 8px;
            border-radius: 50%;
            font-size: 0.8rem;
            font-weight: bold;
          ">${quantity}</span>
        </div>
        <div class="item-info">
          <p><strong>${title}</strong></p>
          <p>Price per item: ${price.toFixed(2)} NOK</p>
          <p><strong>Total: ${productTotal.toFixed(2)} NOK</strong></p>
        </div>
      `;
      checkoutItemsContainer.appendChild(itemEl);
    });

    totalPriceEl.textContent = `${total.toFixed(2)} NOK`;
  }

  displayCart();

  checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const fullname = document.getElementById("fullname").value.trim();
    const address = document.getElementById("address").value.trim();
    const city = document.getElementById("city").value.trim();
    const zipcode = document.getElementById("zipcode").value.trim();
    const country = document.getElementById("country").value.trim();
    const cardnumber = document.getElementById("cardnumber").value.trim();
    const expiry = document.getElementById("expiry").value.trim();
    const cvv = document.getElementById("cvv").value.trim();

  
    if (!fullname || !address || !city || !zipcode || !country ||
        !cardnumber || !expiry || !cvv) {
      message.textContent = "Please fill out all fields correctly.";
      return;
    }

    if (!/^\d{16}$/.test(cardnumber.replace(/\s+/g, ""))) {
      message.textContent = "Card number must be 16 digits.";
      return;
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
      message.textContent = "Expiry must be in MM/YY format.";
      return;
    }

    if (!/^\d{3}$/.test(cvv)) {
      message.textContent = "CVV must be 3 digits.";
      return;
    }


    localStorage.removeItem("cart");
    window.location.href = "success.html";
  });
});

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