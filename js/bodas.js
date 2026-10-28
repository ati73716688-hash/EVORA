
/*
  Cambia el número por el WhatsApp oficial de ÉVORA.
  Usa el código de país y solo números.
  Ejemplo de formato: 51987654321
*/
const EVORA_WHATSAPP = "519XXXXXXXX";

const paqueteSelect = document.getElementById("wpPaquete");

document.querySelectorAll(".wp-detail-cta").forEach((boton) => {
  boton.addEventListener("click", () => {
    const paquete = boton.dataset.paquete;

    if (!paqueteSelect) return;

    if (paquete === "Esencial") {
      paqueteSelect.value = "Esencial — S/ 2,900";
    } else if (paquete === "Signature") {
      paqueteSelect.value = "Signature — S/ 5,900";
    } else if (paquete === "Évora Full") {
      paqueteSelect.value = "Évora Full — S/ 9,900";
    }
  });
});

const formulario = document.getElementById("wpWeddingForm");

if (formulario) {
  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const datos = new FormData(formulario);

    const mensaje = [
      "Hola, ÉVORA. Quiero solicitar información sobre los paquetes de bodas.",
      "",
      `Nombre: ${datos.get("nombre")}`,
      `Contacto: ${datos.get("contacto")}`,
      `Paquete: ${datos.get("paquete")}`,
      `Fecha aproximada: ${datos.get("fecha") || "Por definir"}`,
      `Detalles: ${datos.get("mensaje") || "Me gustaría recibir orientación."}`
    ].join("\n");

    const estado = document.getElementById("wpFormStatus");

    if (EVORA_WHATSAPP.includes("X")) {
      estado.textContent =
        "Configura el número oficial de WhatsApp en bodas.js antes de enviar consultas.";
      return;
    }

    const url =
      `https://wa.me/${EVORA_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank", "noopener,noreferrer");

    estado.textContent =
      "WhatsApp se abrió. Revisa el mensaje y pulsa enviar para completar tu consulta.";
  });
}
