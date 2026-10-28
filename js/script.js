
const menuToggle = document.querySelector("#menuToggle");
const navMenu = document.querySelector("#navMenu");

// Menú de navegación
menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Cerrar menú" : "Abrir menú"
  );
});

navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
  });
});

// Volver al inicio
document.querySelectorAll('a[href="#inicio"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  });
});

// Año actual en el footer
document.querySelector("#year").textContent =
  new Date().getFullYear();

// Animación de aparición de secciones
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}

// Formulario de solicitudes con Web3Forms
const quoteForm = document.getElementById("quoteForm");
const formStatus = document.getElementById("formStatus");

if (quoteForm && formStatus) {
  quoteForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = quoteForm.querySelector(
      'button[type="submit"]'
    );

    const originalText = submitButton.textContent;

    submitButton.disabled = true;
    submitButton.textContent = "Enviando solicitud...";
    formStatus.textContent = "";

    try {
      const response = await fetch(
        "https://api.web3forms.com/submit",
        {
          method: "POST",
          headers: {
            Accept: "application/json"
          },
          body: new FormData(quoteForm)
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "No se pudo enviar la solicitud."
        );
      }

      const nombre =
        quoteForm.elements.namedItem("nombre").value;

      const evento =
        quoteForm.elements.namedItem("evento").value;

      formStatus.textContent =
        `Gracias, ${nombre}. Tu solicitud sobre "${evento}" está lista. Pronto nos pondremos en contacto contigo.`;

      quoteForm.reset();
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      formStatus.textContent = error.message;
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  });
}
