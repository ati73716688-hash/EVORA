document.addEventListener("DOMContentLoaded", function () {

    // ANIMACIONES AL DESPLAZARSE
    const elementos = document.querySelectorAll(
        ".destination-intro, .destination-card, " +
        ".services-content, .process-card, " +
        ".inspiration-heading, .gallery, .destination-cta"
    );

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


    // GALERÍA: AMPLIAR FOTOGRAFÍAS
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

            function cerrarVisor() {
                visor.remove();
                document.removeEventListener("keydown", cerrarConEscape);
            }

            cerrar.addEventListener("click", cerrarVisor);

            visor.addEventListener("click", function (event) {
                if (event.target === visor) {
                    cerrarVisor();
                }
            });

            function cerrarConEscape(event) {
                if (event.key === "Escape") {
                    cerrarVisor();
                }
            }

            document.addEventListener("keydown", cerrarConEscape);

        });

    });


    // EFECTO EN LAS TARJETAS
    const tarjetas = document.querySelectorAll(".destination-card");

    tarjetas.forEach(function (tarjeta) {

        tarjeta.addEventListener("mouseenter", function () {
            tarjeta.classList.add("tarjeta-activa");
        });

        tarjeta.addEventListener("mouseleave", function () {
            tarjeta.classList.remove("tarjeta-activa");
        });

    });


    // AÑO AUTOMÁTICO EN EL PIE DE PÁGINA
    const pie = document.querySelector(".destino-footer span");

    if (pie) {
        pie.textContent =
            "© " + new Date().getFullYear() +
            " ÉVORA · EXPERIENCES & EVENTS";
    }

});
