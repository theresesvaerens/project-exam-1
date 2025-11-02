document.addEventListener("DOMContentLoaded", () => {
    const checkoutForm = document.getElementById("checkoutForm");
    const message = document.getElementById("checkout-message");
  
    checkoutForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      // Collect values
      const fullname = document.getElementById("fullname").value.trim();
      const address = document.getElementById("address").value.trim();
      const city = document.getElementById("city").value.trim();
      const zipcode = document.getElementById("zipcode").value.trim();
      const country = document.getElementById("country").value.trim();
      const cardnumber = document.getElementById("cardnumber").value.trim();
      const expiry = document.getElementById("expiry").value.trim();
      const cvv = document.getElementById("cvv").value.trim();
  
      // Simple validation
      if (!fullname || !address || !city || !zipcode || !country ||
          !cardnumber || !expiry || !cvv) {
        message.textContent = "Please fill out all fields correctly.";
        return;
      }
  
      // Validate card number (simple 16-digit check)
      if (!/^\d{16}$/.test(cardnumber.replace(/\s+/g, ""))) {
        message.textContent = "Card number must be 16 digits.";
        return;
      }
  
      // Validate expiry (MM/YY)
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
        message.textContent = "Expiry must be in MM/YY format.";
        return;
      }
  
      // Validate CVV (3 digits)
      if (!/^\d{3}$/.test(cvv)) {
        message.textContent = "CVV must be 3 digits.";
        return;
      }
  
      // Clear cart in localStorage after successful validation
      localStorage.removeItem("cart");
  
      // Redirect to success page
      window.location.href = "success.html";
    });
  });
  