const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    templeName: "Salt Lake Utah",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 253015,
    imageUrl:
      "https://www.churchofjesuschrist.org/imgs/c8f9e392284fb5ab45815e69507af83d668097bd/full/%2C500/0/default"
  },
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 41010,
    imageUrl:
      "https://www.churchofjesuschrist.org/imgs/b0332690ddef21c555acb194507644bdff8690d0/full/%2C500/0/default"
  },
  {
    templeName: "Paris France",
    location: "Le Chesnay, France",
    dedicated: "2017, May, 21",
    area: 44175,
    imageUrl:
      "https://www.churchofjesuschrist.org/imgs/76b9cf4bbdfaa0c5ac83e1ad129854da057c37d9/full/800%2C/0/default"
  }
];

const menuButton = document.querySelector("#menu");
const navigation = document.querySelector("#primary-navigation");
const filterLinks = document.querySelectorAll("[data-filter]");
const pageHeading = document.querySelector("#page-heading");
const templeCards = document.querySelector("#temple-cards");

function createTempleCard(temple) {
  const card = document.createElement("section");
  card.classList.add("temple-card");

  const content = document.createElement("div");
  content.classList.add("temple-card__content");

  const name = document.createElement("h2");
  name.textContent = temple.templeName;

  const location = document.createElement("p");
  location.innerHTML =
    `<span class="label">Location:</span> ${temple.location}`;

  const dedicated = document.createElement("p");
  dedicated.innerHTML =
    `<span class="label">Dedicated:</span> ${temple.dedicated}`;

  const area = document.createElement("p");
  area.innerHTML =
    `<span class="label">Size:</span> ${temple.area.toLocaleString()} sq ft`;

  const image = document.createElement("img");
  image.src = temple.imageUrl;
  image.alt = `${temple.templeName} Temple`;
  image.loading = "lazy";
  image.width = 400;
  image.height = 300;

  content.append(name, location, dedicated, area);
  card.append(content, image);

  return card;
}

function displayTemples(templeList) {
  templeCards.replaceChildren();

  templeList.forEach((temple) => {
    templeCards.appendChild(createTempleCard(temple));
  });
}

function getDedicatedYear(temple) {
  return Number.parseInt(temple.dedicated.slice(0, 4), 10);
}

function getFilteredTemples(filter) {
  switch (filter) {
    case "old":
      return temples.filter((temple) => getDedicatedYear(temple) < 1900);
    case "new":
      return temples.filter((temple) => getDedicatedYear(temple) > 2000);
    case "large":
      return temples.filter((temple) => temple.area > 90000);
    case "small":
      return temples.filter((temple) => temple.area < 10000);
    default:
      return temples;
  }
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");

  menuButton.textContent = isOpen ? "✕" : "☰";
  menuButton.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu"
  );
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

filterLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const selectedFilter = link.dataset.filter;

    filterLinks.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");

    pageHeading.textContent =
      selectedFilter === "home" ? "Home" : capitalize(selectedFilter);

    displayTemples(getFilteredTemples(selectedFilter));

    navigation.classList.remove("open");
    menuButton.textContent = "☰";
    menuButton.setAttribute("aria-label", "Open navigation menu");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

document.querySelector("#currentyear").textContent =
  new Date().getFullYear();

document.querySelector("#lastModified").textContent =
  `Last Modified: ${document.lastModified}`;

displayTemples(temples);
