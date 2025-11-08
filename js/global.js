function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const count = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const cartCountEl = document.getElementById("cart-count");
  
    if (!cartCountEl) return;
  
    if (count > 0) {
      cartCountEl.textContent = count;
      cartCountEl.style.display = "inline-flex";
    } else {
      cartCountEl.style.display = "none";
    }
  }
  
  document.addEventListener("DOMContentLoaded", updateCartCount);
  