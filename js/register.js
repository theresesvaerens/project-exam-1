const API_BASE = "https://v2.api.noroff.dev/auth";

document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const message = document.getElementById("message");

      try {
        const res = await fetch(`${API_BASE}/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();

        if (res.ok) {
          message.textContent = "User registered successfully! You can now log in.";
          message.style.color = "green";
          registerForm.reset();
        } else {
          message.textContent = data.errors?.[0]?.message || "Registration failed. Please try again.";
          message.style.color = "red";
        }
      } catch (error) {
        message.textContent = "Connection error. Please check your internet and try again.";
        message.style.color = "red";
        console.error(error);
      }
    });
  }