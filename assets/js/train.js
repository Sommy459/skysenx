// ===============================
// FULL SCREEN MOBILE MENU
// ===============================

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const closeMenu = document.getElementById("closeMenu");

if (menuToggle && navMenu) {
  // Open Menu
  menuToggle.addEventListener("click", () => {
    navMenu.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  // Close Menu Button
  if (closeMenu) {
    closeMenu.addEventListener("click", () => {
      navMenu.classList.remove("active");
      document.body.style.overflow = "auto";
    });
  }

  // Close Menu When Link Is Clicked
  document.querySelectorAll(".nav-link a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      document.body.style.overflow = "auto";
    });
  });

  // Close Menu When Clicking Outside
  navMenu.addEventListener("click", (e) => {
    if (e.target === navMenu) {
      navMenu.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });
}


// FA

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const btn = item.querySelector(".faq-btn");

  btn.addEventListener("click", () => {
    faqItems.forEach((faq) => {
      if (faq !== item) {
        faq.classList.remove("active");

        const icon = faq.querySelector("i");

        icon.classList.remove("fa-chevron-up");
        icon.classList.add("fa-chevron-down");
      }
    });

    item.classList.toggle("active");

    const icon = item.querySelector("i");

    if (item.classList.contains("active")) {
      icon.classList.remove("fa-chevron-down");
      icon.classList.add("fa-chevron-up");
    } else {
      icon.classList.remove("fa-chevron-up");
      icon.classList.add("fa-chevron-down");
    }
  });
});