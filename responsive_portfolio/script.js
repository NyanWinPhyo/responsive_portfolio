"use strict";

/* =========================
   ELEMENTS
========================= */

const body = document.body;
const header = document.querySelector(".header");

const themeButton = document.getElementById("themeButton");
const menuButton = document.getElementById("menuButton");
const navLinksContainer = document.getElementById("navLinks");

const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section[id]");

const revealElements = document.querySelectorAll(".reveal");

const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");

const typingText = document.getElementById("typingText");

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

const currentYear = document.getElementById("currentYear");

/* =========================
   CURRENT YEAR
========================= */

currentYear.textContent = new Date().getFullYear();

/* =========================
   DARK MODE
========================= */

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "dark") {
  body.classList.add("dark-theme");
  updateThemeIcon();
}

themeButton.addEventListener("click", () => {
  body.classList.toggle("dark-theme");

  const currentTheme = body.classList.contains("dark-theme")
    ? "dark"
    : "light";

  localStorage.setItem("portfolio-theme", currentTheme);

  updateThemeIcon();
});

function updateThemeIcon() {
  const icon = themeButton.querySelector("i");

  if (body.classList.contains("dark-theme")) {
    icon.className = "fa-solid fa-sun";
    themeButton.setAttribute("aria-label", "Switch to light mode");
  } else {
    icon.className = "fa-solid fa-moon";
    themeButton.setAttribute("aria-label", "Switch to dark mode");
  }
}

/* =========================
   MOBILE NAVIGATION
========================= */

menuButton.addEventListener("click", () => {
  navLinksContainer.classList.toggle("open");

  const icon = menuButton.querySelector("i");
  const isOpen = navLinksContainer.classList.contains("open");

  icon.className = isOpen
    ? "fa-solid fa-xmark"
    : "fa-solid fa-bars";

  menuButton.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu"
  );
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinksContainer.classList.remove("open");

    const icon = menuButton.querySelector("i");
    icon.className = "fa-solid fa-bars";
  });
});

/* Close menu when clicking outside */

document.addEventListener("click", (event) => {
  const clickedInsideMenu =
    navLinksContainer.contains(event.target) ||
    menuButton.contains(event.target);

  if (!clickedInsideMenu) {
    navLinksContainer.classList.remove("open");

    const icon = menuButton.querySelector("i");
    icon.className = "fa-solid fa-bars";
  }
});

/* =========================
   HEADER SCROLL STYLE
========================= */

window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

/* =========================
   ACTIVE NAVIGATION LINK
========================= */

function updateActiveNavigation() {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", updateActiveNavigation);

/* =========================
   TYPING EFFECT
========================= */

const typingPhrases = [
  "engineering systems.",
  "automation solutions.",
  "software applications.",
  "embedded prototypes.",
  "ideas into reality."
];

let phraseIndex = 0;
let letterIndex = 0;
let isDeleting = false;

function typeText() {
  const currentPhrase = typingPhrases[phraseIndex];

  if (!isDeleting) {
    letterIndex++;
  } else {
    letterIndex--;
  }

  typingText.textContent = currentPhrase.substring(0, letterIndex);

  let typingSpeed = isDeleting ? 45 : 85;

  if (!isDeleting && letterIndex === currentPhrase.length) {
    typingSpeed = 1500;
    isDeleting = true;
  }

  if (isDeleting && letterIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % typingPhrases.length;
    typingSpeed = 400;
  }

  window.setTimeout(typeText, typingSpeed);
}

typeText();

/* =========================
   SCROLL REVEAL
========================= */

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

/* =========================
   PROJECT FILTER
========================= */

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => {
      item.classList.remove("active");
    });

    button.classList.add("active");

    const selectedFilter = button.dataset.filter;

    projectCards.forEach((card) => {
      const projectCategories = card.dataset.category.split(" ");

      if (
        selectedFilter === "all" ||
        projectCategories.includes(selectedFilter)
      ) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });
  });
});

/* =========================
   CONTACT FORM
========================= */

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !subject || !message) {
    formMessage.textContent = "Please complete all fields.";
    return;
  }

  formMessage.textContent =
    `Thanks, ${name}. Your message form is working locally.`;

  contactForm.reset();

  /*
    This form currently does not send an actual email.

    Later, you can connect it to:
    - Formspree
    - EmailJS
    - Netlify Forms
    - Your own backend
  */
});