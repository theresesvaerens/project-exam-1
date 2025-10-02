const API_URL = "https://v2.api.noroff.dev/online-shop";

async function fetchProducts() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const json = await response.json();
    const products = json.data;

    renderProducts(products);
  } catch (error) {
    console.error(error);
    document.getElementById("product-grid").innerHTML =
      "<p>Could not load products.</p>";
  }
}

function renderProducts(products) {
  const grid = document.getElementById("product-grid");
  grid.innerHTML = "";

  products.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    const img = document.createElement("img");
    img.src = product.image?.url || "https://via.placeholder.com/200x300?text=No+Image";
    img.alt = product.image?.alt || "Product image";

    const title = document.createElement("h2");
    title.textContent = product.title || "No title";

    const desc = document.createElement("p");
    desc.textContent = product.description || "No description available";

    const price = document.createElement("p");
    price.classList.add("price");
    price.textContent = `Price: $${product.price.toFixed(2)}`;

    const rating = document.createElement("p");
    rating.classList.add("rating");
    rating.textContent = `Rating: ${product.rating || 0} / 5`;

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(desc);
    card.appendChild(price);
    card.appendChild(rating);

    grid.appendChild(card);
  });
}

fetchProducts();
