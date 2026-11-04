
document.addEventListener("DOMContentLoaded", function () {

    // 1. ANIMACIONES AL DESPLAZARSE
    const elementos = document.querySelectorAll(
        ".destination-intro, .destination-card, " +
        ".services-content, .process-card, " +
        ".inspiration-heading, .gallery, .destination-cta"
    );

    // Comprobar si el navegador permite animaciones
    const movimientoReducido = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if ("IntersectionObserver" in window && !movimientoReducido) {

        elementos.forEach(function (elemento) {
            elemento.classList.add("revelar");
        });

        const observador = new IntersectionObserver(
            function (entradas, observer) {

                entradas.forEach(function (entrada) {

                    if (entrada.isIntersecting) {
                        entrada.target.classList.add("visible");
                        observer.unobserve(entrada.target);
                    }

                });

            },
            {
                threshold: 0.15
            }
        );

        elementos.forEach(function (elemento) {
            observador.observe(elemento);
        });

    }


    // 2. GALERÍA: AMPLIAR FOTOGRAFÍAS
    const imagenes = document.querySelectorAll(".gallery img");

    imagenes.forEach(function (imagen) {

        imagen.addEventListener("click", function () {

            const visor = document.createElement("div");
            visor.className = "visor-imagen";

            const imagenGrande = document.createElement("img");
            imagenGrande.src = imagen.src;
            imagenGrande.alt = imagen.alt;

            const cerrar = document.createElement("button");
            cerrar.className = "cerrar-visor";
            cerrar.textContent = "×";
            cerrar.setAttribute("aria-label", "Cerrar imagen");

            visor.appendChild(imagenGrande);
            visor.appendChild(cerrar);

            document.body.appendChild(visor);

            // Cerrar con el botón
            cerrar.addEventListener("click", function () {
                visor.remove();
            });

            // Cerrar al hacer clic fuera de la imagen
            visor.addEventListener("click", function (event) {
                if (event.target === visor) {
                    visor.remove();
                }
            });

            // Cerrar con la tecla Escape
            function cerrarConEscape(event) {
                if (event.key === "Escape") {
                    visor.remove();
                    document.removeEventListener(
                        "keydown",
                        cerrarConEscape
                    );
                }
            }

            document.addEventListener("keydown", cerrarConEscape);

        });

    });


    // 3. MARCAR EL ENLACE ACTIVO DEL MENÚ
    const enlaces = document.querySelectorAll(
        '.destino-header nav a[href^="#"]'
    );

    enlaces.forEach(function (enlace) {

        enlace.addEventListener("click", function () {

            enlaces.forEach(function (item) {
                item.classList.remove("activo");
            });

            enlace.classList.add("activo");

        });

    });


    // 4. EFECTO EN LAS TARJETAS
    const tarjetas = document.querySelectorAll(".destination-card");

    tarjetas.forEach(function (tarjeta) {

        tarjeta.addEventListener("mouseenter", function () {
            tarjeta.classList.add("tarjeta-activa");
        });

        tarjeta.addEventListener("mouseleave", function () {
            tarjeta.classList.remove("tarjeta-activa");
        });

    });


    // 5. ACTUALIZAR EL AÑO DEL PIE DE PÁGINA
    const pie = document.querySelector(".destino-footer span");

    if (pie) {
        pie.textContent =
            "© " + new Date().getFullYear() +
            " ÉVORA · EXPERIENCES & EVENTS";
    }

});
