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

// Demostración del formulario: valida y prepara un mensaje, pero no lo envía a un servidor.
const quoteForm = document.querySelector("#quoteForm");
const formStatus = document.querySelector("#formStatus");

quoteForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!quoteForm.reportValidity()) return;

  const data = new FormData(quoteForm);
  const nombre = data.get("nombre").trim();
  const evento = data.get("evento");
  formStatus.textContent = `Gracias, ${nombre}. Tu solicitud sobre "${evento}" está lista. Para recibirla realmente, conecta este formulario a un correo o servidor.`;
  quoteForm.reset();
});
