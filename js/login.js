const API_URL = 'https://v2.api.noroff.dev/online-shop/auth/login';
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
      throw new Error('Feil e-post eller passord');
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