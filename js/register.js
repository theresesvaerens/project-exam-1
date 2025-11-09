const API_BASE = "https://v2.api.noroff.dev/auth/register";

document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");
  const message = document.getElementById("message");

  if (!registerForm) return;

  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!name || !email || !password) {
      message.textContent = "All fields are required.";
      message.style.color = "red";
      return;
    }

    try {
      const res = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      console.log("Response:", data);

      if (res.ok) {
        message.textContent = "Registration successful! You can now log in.";
        message.style.color = "green";
        registerForm.reset();
      } else {
        message.textContent =
          data.errors?.map(e => e.message).join(", ") ||
          data.message ||
          "Registration failed.";
        message.style.color = "red";
      }
    } catch (error) {
      console.error("Error:", error);
      message.textContent = "Connection error. Please try again later.";
      message.style.color = "red";
    }
  });
});


