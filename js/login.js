const API_URL = 'https://v2.api.noroff.dev/auth/login';
const loginForm = document.getElementById('login-form');
const loginBtn = document.getElementById('login-btn');
const errorMessage = document.getElementById('error-message');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = event.target.email.value;
  const password = event.target.password.value;

  loginBtn.disabled = true;
  errorMessage.textContent = '';

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Wrong email or password');
    }

    const data = await response.json();
    const { accessToken } = data.data;


    sessionStorage.setItem('accessToken', accessToken);


    window.location.href = 'dashboard.html';
  } catch (error) {
    errorMessage.textContent = error.message;
  } finally {
    loginBtn.disabled = false;
  }
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