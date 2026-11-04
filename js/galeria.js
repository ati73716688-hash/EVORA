
"use strict";

/* ==========================================
   ÉVORA — GALERÍA DE EVENTOS
   ========================================== */

// Colocar aquí el número oficial cuando esté disponible.
const EG_WHATSAPP_OFICIAL = "";

document.addEventListener("DOMContentLoaded", () => {

  // ELEMENTOS DEL MENÚ
  const menuToggle = document.getElementById("egMenuToggle");
  const nav = document.getElementById("egNav");
  const dropdowns = Array.from(
    document.querySelectorAll(".eg-drop")
  );

  // ELEMENTOS DE LA GALERÍA
  const filters = Array.from(
    document.querySelectorAll(".eg-filter")
  );
  const cards = Array.from(
    document.querySelectorAll(".eg-card")
  );
  const countText = document.getElementById("egCount");

  // ELEMENTOS DEL VISOR DE IMÁGENES
  const lightbox = document.getElementById("egLightbox");
  const lightboxImage = document.getElementById("egLightboxImage");
  const lightboxCategory = document.getElementById("egLightboxCategory");
  const lightboxTitle = document.getElementById("egLightboxTitle");
  const lightboxCount = document.getElementById("egLightboxCount");

  const closeButton = document.getElementById("egClose");
  const previousButton = document.getElementById("egPrev");
  const nextButton = document.getElementById("egNext");

  // ELEMENTOS ADICIONALES
  const whatsapp = document.getElementById("egWhatsapp");
  const toast = document.getElementById("egToast");
  const year = document.getElementById("egYear");

  let activeCard = 0;
  let lastTrigger = null;

  // ACTUALIZAR EL AÑO AUTOMÁTICAMENTE
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  /* ==========================================
     1. MENÚ DE NAVEGACIÓN
     ========================================== */

  function setMenu(open) {

    nav.classList.toggle("is-open", open);

    menuToggle.setAttribute(
      "aria-expanded",
      String(open)
    );

    menuToggle.setAttribute(
      "aria-label",
      open
        ? "Cerrar menú de navegación"
        : "Abrir menú de navegación"
    );

    document.body.classList.toggle("eg-nav-open", open);

    if (!open) {
      dropdowns.forEach((drop) => {
        drop.open = false;
      });
    }
  }

  menuToggle.addEventListener("click", () => {
    setMenu(!nav.classList.contains("is-open"));
  });

  nav.querySelectorAll("a").forEach((link) => {

    link.addEventListener("click", () => {
      setMenu(false);
    });

  });

  document.addEventListener("click", (event) => {

    dropdowns.forEach((drop) => {
      if (!drop.contains(event.target)) {
        drop.open = false;
      }
    });

    if (
      window.innerWidth <= 1160 &&
      nav.classList.contains("is-open") &&
      !nav.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      setMenu(false);
    }

  });

  /* ==========================================
     2. FILTRAR FOTOGRAFÍAS POR CATEGORÍA
     ========================================== */

  filters.forEach((filter) => {

    filter.addEventListener("click", () => {

      const category = filter.dataset.filter;

      // ACTIVAR EL BOTÓN SELECCIONADO
      filters.forEach((button) => {

        const active = button === filter;

        button.classList.toggle("is-active", active);

        button.setAttribute(
          "aria-pressed",
          String(active)
        );

      });

      // MOSTRAR SOLO LAS FOTOGRAFÍAS DE LA CATEGORÍA
      cards.forEach((card) => {

        card.hidden =
          category !== "todos" &&
          card.dataset.category !== category;

      });

      // ACTUALIZAR CANTIDAD DE IMÁGENES
      const count = cards.filter(
        (card) => !card.hidden
      ).length;

      countText.textContent =
        `${count} ${count === 1 ? "imagen" : "imágenes"}`;

    });

  });

  /* ==========================================
     3. MOSTRAR LAS IMÁGENES VISIBLES
     ========================================== */

  function visibleCards() {

    return cards.filter((card) => !card.hidden);

  }

  /* ==========================================
     4. AMPLIAR UNA FOTOGRAFÍA
     ========================================== */

  function displayCard(index) {

    const visible = visibleCards();

    if (visible.length === 0) {
      return;
    }

    activeCard = (index + visible.length) % visible.length;

    const card = visible[activeCard];

    const photo = card.querySelector("img");

    const trigger = card.querySelector(
      ".eg-photo-button"
    );

    lightboxImage.src = photo.getAttribute("src");

    lightboxImage.alt = photo.alt;

    lightboxCategory.textContent = trigger.dataset.label;

    lightboxTitle.textContent = trigger.dataset.title;

    lightboxCount.textContent =
      `${activeCard + 1} / ${visible.length}`;

  }

  /* ==========================================
     5. ABRIR EL VISOR AL HACER CLIC
     ========================================== */

  cards.forEach((card) => {

    card.querySelector(".eg-photo-button")
      .addEventListener("click", (event) => {

        lastTrigger = event.currentTarget;

        const index = visibleCards().indexOf(card);

        displayCard(index);

        if (typeof lightbox.showModal === "function") {
          lightbox.showModal();
        }

      });

  });

  /* ==========================================
     6. CONTROLES DEL VISOR
     ========================================== */

  // CERRAR IMAGEN
  closeButton.addEventListener("click", () => {
    lightbox.close();
  });

  // VER IMAGEN ANTERIOR
  previousButton.addEventListener("click", () => {
    displayCard(activeCard - 1);
  });

  // VER IMAGEN SIGUIENTE
  nextButton.addEventListener("click", () => {
    displayCard(activeCard + 1);
  });

  // CERRAR HACIENDO CLIC FUERA DE LA IMAGEN
  lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {
      lightbox.close();
    }

  });

  // REGRESAR EL FOCO AL BOTÓN ANTERIOR
  lightbox.addEventListener("close", () => {

    if (lastTrigger) {
      lastTrigger.focus();
    }

  });

  /* ==========================================
     7. CONTROLES DEL TECLADO
     ========================================== */

  document.addEventListener("keydown", (event) => {

    // CERRAR MENÚ CON ESCAPE
    if (
      event.key === "Escape" &&
      nav.classList.contains("is-open")
    ) {
      setMenu(false);
    }

    if (!lightbox.open) {
      return;
    }

    // FLECHA DERECHA
    if (event.key === "ArrowRight") {
      displayCard(activeCard + 1);
    }

    // FLECHA IZQUIERDA
    if (event.key === "ArrowLeft") {
      displayCard(activeCard - 1);
    }

  });

  /* ==========================================
     8. BOTÓN DE WHATSAPP
     ========================================== */

  whatsapp.addEventListener("click", () => {

    const number = EG_WHATSAPP_OFICIAL.replace(/\D/g, "");

    if (number.length >= 10) {

      const message =
        "Hola, ÉVORA. Me gustaría consultar sobre sus eventos.";

      window.open(
        `https://wa.me/${number}?text=${encodeURIComponent(message)}`,
        "_blank",
        "noopener,noreferrer"
      );

    } else {

      toast.textContent =
        "El WhatsApp oficial aún no está configurado. " +
        "Puedes consultar desde la página Contacto.";

      toast.hidden = false;

    }

  });

});
