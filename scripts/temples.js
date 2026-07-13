const menuButton = document.querySelector("#menu");
const navigation = document.querySelector("nav");

menuButton.addEventListener("click", () => {
  navigation.classList.toggle("open");

  if (navigation.classList.contains("open")) {
    menuButton.textContent = "✕";
    menuButton.setAttribute("aria-label", "Close navigation menu");
    menuButton.setAttribute("aria-expanded", "true");
  } else {
    menuButton.textContent = "☰";
    menuButton.setAttribute("aria-label", "Open navigation menu");
    menuButton.setAttribute("aria-expanded", "false");
  }
});

// Footer
document.querySelector("#currentyear").textContent = new Date().getFullYear();

document.querySelector("#lastModified").textContent =
  `Last Modified: ${document.lastModified}`;
