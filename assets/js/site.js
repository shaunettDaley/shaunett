const menuToggle = document.querySelector(".menu-toggle");
const menuLinks = document.querySelector("#primary-links");
const compactNavigation = window.matchMedia("(max-width: 51rem)");

function setMenuOpen(open) {
  menuToggle.setAttribute("aria-expanded", String(open));
  menuLinks.hidden = compactNavigation.matches && !open;
}

function updateNavigation() {
  const focusIsInMenu = menuLinks.contains(document.activeElement);
  const toggleHasFocus = document.activeElement === menuToggle;
  menuToggle.hidden = !compactNavigation.matches;
  setMenuOpen(compactNavigation.matches && focusIsInMenu);
  if (!compactNavigation.matches && toggleHasFocus) {
    menuLinks.querySelector("a").focus();
  }
}

menuToggle.addEventListener("click", () => {
  setMenuOpen(menuToggle.getAttribute("aria-expanded") === "false");
});

menuToggle.closest("nav").addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false);
    menuToggle.focus();
  }
});

menuLinks.addEventListener("click", (event) => {
  const link = event.target.closest("a");
  if (!link || !compactNavigation.matches) return;

  const target = document.getElementById(link.hash.slice(1));
  target.setAttribute("tabindex", "-1");
  target.focus({ preventScroll: true });
  setMenuOpen(false);
});

compactNavigation.addEventListener("change", updateNavigation);
updateNavigation();
