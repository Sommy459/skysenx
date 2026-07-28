const menuToggle = document.querySelector(".menu-toggle");
const closeMenu = document.querySelector(".close-menu");
const navLinks = document.querySelector(".nav-link");

menuToggle.addEventListener("click", () => {
    navLinks.classList.add("active");
});

closeMenu.addEventListener("click", () => {
    navLinks.classList.remove("active");
});