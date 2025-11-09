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

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();

  const token = localStorage.getItem('accessToken');
  console.log("Token:", token); 

  const loginIcon = document.querySelector('.nav-links .login-link');
  const cartLink = document.querySelector('.nav-links .cart-link');

  let logoutBtn = document.getElementById('logout-btn');
  if (!logoutBtn && cartLink) {
    logoutBtn = document.createElement('button');
    logoutBtn.id = 'logout-btn';
    logoutBtn.classList.add('logout-btn');
    logoutBtn.innerHTML = '<i class="fa-solid fa-arrow-right-from-bracket"></i>';
    cartLink.after(logoutBtn);
  }

  if (token) {
    if (loginIcon) loginIcon.style.display = 'none';
    if (logoutBtn) logoutBtn.style.display = 'inline-flex';
  } else {
    if (loginIcon) loginIcon.style.display = 'inline-flex';
    if (logoutBtn) logoutBtn.style.display = 'none';
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('cart');
      updateCartCount();

      window.location.href = '/index.html';
    });
  }
});