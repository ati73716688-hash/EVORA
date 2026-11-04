// Inicializar EmailJS
emailjs.init({
    publicKey: "TU_CLAVE_PUBLICA"
});

// Obtener el paquete seleccionado desde la URL
const parametros = new URLSearchParams(window.location.search);
const paqueteSeleccionado = parametros.get("paquete");

const campoPaquete = document.getElementById("paquete");

if (campoPaquete) {
    campoPaquete.value = paqueteSeleccionado || "Consulta general";
}

// Obtener elementos del formulario
const formulario = document.getElementById("formularioConsulta");
const boton = document.getElementById("btnEnviar");
const respuesta = document.getElementById("respuesta");

// Enviar formulario
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    boton.disabled = true;
    boton.textContent = "Enviando...";
    respuesta.textContent = "";

    emailjs.sendForm(
        "TU_SERVICE_ID",
        "TU_TEMPLATE_ID",
        formulario
    )
    .then(function() {
        respuesta.textContent =
            "¡Tu consulta fue enviada correctamente!";

        respuesta.style.color = "green";

        formulario.reset();

        campoPaquete.value =
            paqueteSeleccionado || "Consulta general";
    })
    .catch(function(error) {
        console.error("Error al enviar:", error);

        respuesta.textContent =
            "No se pudo enviar la consulta. Inténtalo nuevamente.";

        respuesta.style.color = "red";
    })
    .finally(function() {
        boton.disabled = false;
        boton.textContent = "Enviar consulta";
    });
});