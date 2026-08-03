const products = [
  {
    id: "adobada",
    name: "Torta de Adobada",
    category: "tortas",
    price: 95,
    description:
      "Marinated pork torta served with avocado and a warm toasted roll.",
    image: "images/adobada.JPG",
    featured: true,
  },
  {
    id: "pierna",
    name: "Torta de Pierna",
    category: "tortas",
    price: 100,
    description:
      "Sliced pork leg torta with homemade flavor and a soft northern-style roll.",
    image: "images/pierna.JPG",
    featured: true,
  },
  {
    id: "mixta",
    name: "Torta Mixta",
    category: "tortas",
    price: 125,
    description: "A generous mixed torta with adobada, pierna, and avocado.",
    image: "images/mixta.jpg",
    featured: true,
  },
  {
    id: "agua-litro",
    name: "Agua Fresca 1 Liter",
    category: "drinks",
    price: 45,
    description:
      "A refreshing one-liter drink served cold with the flavor of the day.",
    image: "images/agua.jpg",
    featured: false,
  },
  {
    id: "cafe",
    name: "Coffee",
    category: "drinks",
    price: 20,
    description: "Hot coffee, simple and perfect to start the morning.",
    image: "images/cafe.JPG",
    featured: false,
  },
  {
    id: "pastel",
    name: "Cake Slice",
    category: "desserts",
    price: 45,
    description: "A sweet dessert slice to finish your meal.",
    image: "images/pastel.PNG",
    featured: false,
  },
];

const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#primary-nav");

function setupNavigation() {
  if (!menuButton || !navigation) {
    return;
  }

  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuButton.textContent = isOpen ? "✕" : "☰";
    menuButton.setAttribute("aria-expanded", `${isOpen}`);
    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu",
    );
  });

  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("#primary-nav a").forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
}

function buildProductCard(product) {
  const favoriteId = localStorage.getItem("favoriteProduct");
  const isFavorite = favoriteId === product.id;
  const favoriteLabel = isFavorite ? "Saved as Favorite" : "Save Favorite";

  return `<article class="product-card">
    <img src="${product.image}" alt="${product.name}" width="800" height="520" loading="lazy">
    <div class="product-card-content">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p class="product-meta">
        <span>${product.category}</span>
        <span class="price">$${product.price} MXN</span>
      </p>
      <button class="favorite-button" type="button" data-id="${product.id}">${favoriteLabel}</button>
    </div>
  </article>`;
}

function renderProducts(productList, containerSelector) {
  const container = document.querySelector(containerSelector);

  if (!container) {
    return;
  }

  container.innerHTML = productList
    .map((product) => buildProductCard(product))
    .join("");

  container.querySelectorAll(".favorite-button").forEach((button) => {
    button.addEventListener("click", () => {
      saveFavorite(button.dataset.id);
      renderProducts(productList, containerSelector);
      updateFavoriteMessage();
    });
  });
}

function setupMenuFilters() {
  const menuList = document.querySelector("#menu-list");
  const statusMessage = document.querySelector("#menu-status");

  if (!menuList || !statusMessage) {
    return;
  }

  renderProducts(products, "#menu-list");
  statusMessage.textContent = `Showing ${products.length} menu items.`;

  document.querySelectorAll(".filter-button").forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.category;
      const filteredProducts =
        category === "all"
          ? products
          : products.filter((product) => product.category === category);

      document
        .querySelectorAll(".filter-button")
        .forEach((item) => item.classList.remove("active"));
      button.classList.add("active");

      statusMessage.textContent = `Showing ${filteredProducts.length} ${category} item(s).`;
      renderProducts(filteredProducts, "#menu-list");
    });
  });
}

function saveFavorite(productId) {
  const selectedProduct = products.find((product) => product.id === productId);

  if (selectedProduct) {
    localStorage.setItem("favoriteProduct", selectedProduct.id);
  }
}

function updateFavoriteMessage() {
  const message = document.querySelector("#favorite-message");

  if (!message) {
    return;
  }

  const favoriteId = localStorage.getItem("favoriteProduct");
  const favoriteProduct = products.find((product) => product.id === favoriteId);

  message.textContent = favoriteProduct
    ? `Your saved favorite is ${favoriteProduct.name}.`
    : "Choose a favorite product from the menu page.";
}

function setupHomePage() {
  const featuredContainer = document.querySelector("#featured-products");

  if (!featuredContainer) {
    return;
  }

  const featuredProducts = products.filter((product) => product.featured);
  renderProducts(featuredProducts, "#featured-products");
  updateFavoriteMessage();
}

function setupMessageCounter() {
  const messageCount = document.querySelector("#message-count");

  if (!messageCount) {
    return;
  }

  let count = Number(localStorage.getItem("messageCount")) || 0;
  count += 1;
  localStorage.setItem("messageCount", `${count}`);
  messageCount.textContent = `${count}`;
}

function setupFooter() {
  document.querySelectorAll("#currentyear").forEach((year) => {
    year.textContent = `${new Date().getFullYear()}`;
  });

  document.querySelectorAll("#lastModified").forEach((modified) => {
    modified.textContent = `Last Modified: ${document.lastModified}`;
  });
}

setupNavigation();
setupHomePage();
setupMenuFilters();
setupMessageCounter();
setupFooter();
