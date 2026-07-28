// ===============================
// IMAGE SLIDER
// ===============================

const track = document.querySelector(".slider-track");
const slides = document.querySelectorAll(".slider-track img");
const dotsContainer = document.querySelector(".slider-dots");

let currentIndex = 0;

function getVisibleSlides() {
  if (window.innerWidth <= 480) return 1;
  if (window.innerWidth <= 768) return 2;
  return 3;
}

function createDots() {
  if (!dotsContainer) return;

  dotsContainer.innerHTML = "";

  const totalDots = slides.length - getVisibleSlides() + 1;

  for (let i = 0; i < totalDots; i++) {
    const dot = document.createElement("span");

    dot.classList.add("dot");

    if (i === currentIndex) {
      dot.classList.add("active");
    }

    dot.addEventListener("click", () => {
      currentIndex = i;
      updateSlider();
    });

    dotsContainer.appendChild(dot);
  }
}

function updateDots() {
  const dots = document.querySelectorAll(".dot");

  dots.forEach((dot) => {
    dot.classList.remove("active");
  });

  if (dots[currentIndex]) {
    dots[currentIndex].classList.add("active");
  }
}

function updateSlider() {
  if (!track || slides.length === 0) return;

  const slideWidth = slides[0].offsetWidth + 20;

  track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

  updateDots();
}

function nextSlide() {
  const maxIndex = slides.length - getVisibleSlides();

  currentIndex++;

  if (currentIndex > maxIndex) {
    currentIndex = 0;
  }

  updateSlider();
}

if (track && slides.length > 0 && dotsContainer) {
  createDots();
  updateSlider();

  setInterval(nextSlide, 3000);

  window.addEventListener("resize", () => {
    currentIndex = 0;
    createDots();
    updateSlider();
  });
}

// ===============================
// TESTIMONIAL CAROUSEL
// ===============================

const testimonialTrack = document.querySelector(".testimonial-track");
const testimonialCards = document.querySelectorAll(".testimonial-card");
const testimonialDots = document.querySelector(".testimonial-dots");
const testimonialPrev = document.querySelector(".testimonial-prev");
const testimonialNext = document.querySelector(".testimonial-next");

let testimonialIndex = 0;
let testimonialTimer;

function getVisibleTestimonials() {
  return window.innerWidth <= 640 ? 1 : 2;
}

function getMaxTestimonialIndex() {
  return Math.max(testimonialCards.length - getVisibleTestimonials(), 0);
}

function buildTestimonialDots() {
  if (!testimonialDots) return;

  testimonialDots.innerHTML = "";

  for (let i = 0; i <= getMaxTestimonialIndex(); i++) {
    const dot = document.createElement("button");
    dot.classList.add("testimonial-dot");
    dot.type = "button";
    dot.setAttribute("aria-label", `Show testimonial ${i + 1}`);

    if (i === testimonialIndex) {
      dot.classList.add("active");
    }

    dot.addEventListener("click", () => {
      testimonialIndex = i;
      updateTestimonialCarousel();
      restartTestimonialTimer();
    });

    testimonialDots.appendChild(dot);
  }
}

function updateTestimonialDots() {
  document.querySelectorAll(".testimonial-dot").forEach((dot, index) => {
    dot.classList.toggle("active", index === testimonialIndex);
  });
}

function updateTestimonialCarousel() {
  if (!testimonialTrack || testimonialCards.length === 0) return;

  testimonialIndex = Math.min(testimonialIndex, getMaxTestimonialIndex());

  const gap = parseFloat(getComputedStyle(testimonialTrack).gap) || 0;
  const slideWidth = testimonialCards[0].offsetWidth + gap;

  testimonialTrack.style.transform = `translateX(-${testimonialIndex * slideWidth}px)`;
  updateTestimonialDots();
}

function nextTestimonial() {
  testimonialIndex += 1;

  if (testimonialIndex > getMaxTestimonialIndex()) {
    testimonialIndex = 0;
  }

  updateTestimonialCarousel();
}

function prevTestimonial() {
  testimonialIndex -= 1;

  if (testimonialIndex < 0) {
    testimonialIndex = getMaxTestimonialIndex();
  }

  updateTestimonialCarousel();
}

function restartTestimonialTimer() {
  clearInterval(testimonialTimer);
  testimonialTimer = setInterval(nextTestimonial, 4000);
}

if (testimonialTrack && testimonialCards.length > 0) {
  buildTestimonialDots();
  updateTestimonialCarousel();
  restartTestimonialTimer();

  if (testimonialNext) {
    testimonialNext.addEventListener("click", () => {
      nextTestimonial();
      restartTestimonialTimer();
    });
  }

  if (testimonialPrev) {
    testimonialPrev.addEventListener("click", () => {
      prevTestimonial();
      restartTestimonialTimer();
    });
  }

  window.addEventListener("resize", () => {
    testimonialIndex = 0;
    buildTestimonialDots();
    updateTestimonialCarousel();
  });
}

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

// const faqs = document.querySelectorAll(".faq-item");

// faqs.forEach((item) => {
//   const question = item.querySelector(".faq-question");

//   question.addEventListener("click", () => {
//     faqs.forEach((faq) => {
//       if (faq !== item) {
//         faq.classList.remove("active");
//       }
//     });

//     item.classList.toggle("active");
//   });
// });

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
