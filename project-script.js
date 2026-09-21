"use strict";

const body = document.body;
const themeButton = document.getElementById("projectThemeButton");
const currentYear = document.getElementById("projectCurrentYear");

/* =========================
   CURRENT YEAR
========================= */

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

/* =========================
   THEME
========================= */

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "dark") {
  body.classList.add("dark-theme");
}

updateThemeIcon();

if (themeButton) {
  themeButton.addEventListener("click", () => {
    body.classList.toggle("dark-theme");

    const currentTheme = body.classList.contains("dark-theme")
      ? "dark"
      : "light";

    localStorage.setItem("portfolio-theme", currentTheme);

    updateThemeIcon();
  });
}

function updateThemeIcon() {
  if (!themeButton) return;

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
   IMAGE LIGHTBOX
========================= */

const lightbox = document.getElementById("projectLightbox");
const lightboxImage = document.getElementById("projectLightboxImage");
const lightboxCaption = document.getElementById("projectLightboxCaption");
const lightboxClose = document.getElementById("projectLightboxClose");
const lightboxBackdrop = document.querySelector(
  ".project-lightbox-backdrop"
);

const lightboxTriggers = document.querySelectorAll(
  ".project-lightbox-trigger"
);

function openLightbox(trigger) {
  if (!lightbox || !lightboxImage) return;

  const image = trigger.querySelector("img");

  lightboxImage.src = trigger.href;
  lightboxImage.alt = image?.alt || "Project screenshot";

  const figure = trigger.closest("figure");
  const caption = figure?.querySelector("figcaption");

  if (lightboxCaption) {
    lightboxCaption.textContent =
      caption?.textContent.trim() || "";
  }

  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");

  document.body.classList.add("lightbox-open");

  lightboxClose?.focus();
}

function closeLightbox() {
  if (!lightbox || !lightboxImage) return;

  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");

  document.body.classList.remove("lightbox-open");

  setTimeout(() => {
    lightboxImage.src = "";
  }, 180);
}

lightboxTriggers.forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    event.preventDefault();

    openLightbox(trigger);
  });
});

lightboxClose?.addEventListener("click", closeLightbox);

lightboxBackdrop?.addEventListener("click", closeLightbox);

document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    lightbox?.classList.contains("is-open")
  ) {
    closeLightbox();
  }
});