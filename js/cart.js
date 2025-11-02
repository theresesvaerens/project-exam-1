const container = document.getElementById("cart-items");
const totalContainer = document.getElementById("total-price");


let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    totalContainer.textContent = "Total: 0 NOK";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
  
    const price = Number(item.discountedPrice ?? item.price ?? 0);
    total += price;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    cartItem.innerHTML = `
      <img src="${item.image?.url || "https://via.placeholder.com/150"}" alt="${item.title}">
      <div class="cart-item-details">
        <h2>${item.title}</h2>
        <p>${price.toFixed(2)} NOK</p>
        <button class="remove-btn" data-index="${index}">Remove</button>
      </div>
    `;

    container.appendChild(cartItem);
  });

 
  totalContainer.textContent = `Total: ${total.toFixed(2)} NOK`;


  const removeButtons = document.querySelectorAll(".remove-btn");
  removeButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    });
  });
}


const checkoutBtn = document.getElementById("checkout-btn");
if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) return alert("Your cart is empty.");
    if (confirm("Proceed to checkout? This will clear your cart.")) {
      localStorage.removeItem("cart");
      cart = [];
      renderCart();
      alert("Thank you for your purchase!");
    }
  });
}


renderCart();
