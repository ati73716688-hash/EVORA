const menuToggle = document.querySelector("#menuToggle");
const navMenu = document.querySelector("#navMenu");

menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
});

navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();

// Mostrar secciones suavemente al entrar en pantalla.
const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}

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

      formStatus.textContent = `Gracias, ${quoteForm.elements.namedItem("nombre").value}.
      Tu solicitud sobre "${quoteForm.elements.namedItem("evento").value}" está lista. Pronto nos pondremos en contacto contigo.`;

      quoteForm.reset();

      } catch (error) {
       console.error("Error al enviar el formulario:", error);

       formStatus.textContent = error.message;
      } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }

    document.querySelectorAll('a[href="#inicio"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo(0, 0);
  });
});
  });
}
