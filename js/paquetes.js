
"use strict";

/* ==========================================
   ÉVORA - PÁGINA DE PAQUETES
   ========================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ======================================
       1. ELEMENTOS DEL HTML
    ======================================= */

    const menuButton = document.getElementById("pkMenuButton");

    const nav = document.getElementById("pkNav");

    const dropdowns = document.querySelectorAll(
        ".pk-dropdown"
    );

    const preguntas = document.querySelectorAll(
        ".pk-faq-items details"
    );

    const year = document.getElementById("pkYear");


    /* ======================================
       2. ACTUALIZAR AÑO AUTOMÁTICAMENTE
    ======================================= */

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* ======================================
       3. ABRIR Y CERRAR MENÚ
    ======================================= */

    function controlarMenu(abierto) {

        if (!menuButton || !nav) {
            return;
        }

        nav.classList.toggle("pk-open", abierto);

        menuButton.setAttribute(
            "aria-expanded",
            String(abierto)
        );

        menuButton.setAttribute(
            "aria-label",
            abierto
                ? "Cerrar menú de navegación"
                : "Abrir menú de navegación"
        );

        document.body.classList.toggle(
            "pk-menu-open",
            abierto
        );

        if (!abierto) {

            dropdowns.forEach(function (dropdown) {
                dropdown.open = false;
            });

        }

    }


    /* ======================================
       4. BOTÓN PARA CELULARES
    ======================================= */

    if (menuButton && nav) {

        menuButton.addEventListener("click", function () {

            const abierto = nav.classList.contains(
                "pk-open"
            );

            controlarMenu(!abierto);

        });

    }


    /* ======================================
       5. CERRAR MENÚ AL ELEGIR ENLACE
    ======================================= */

    if (nav) {

        const enlaces = nav.querySelectorAll("a");

        enlaces.forEach(function (enlace) {

            enlace.addEventListener("click", function () {
                controlarMenu(false);
            });

        });

    }


    /* ======================================
       6. SUBMENÚS DESPLEGABLES
    ======================================= */

    dropdowns.forEach(function (dropdown) {

        dropdown.addEventListener("toggle", function () {

            if (dropdown.open) {

                dropdowns.forEach(function (otroDropdown) {

                    if (otroDropdown !== dropdown) {
                        otroDropdown.open = false;
                    }

                });

            }

        });

    });


    /* ======================================
       7. CERRAR AL HACER CLIC FUERA
    ======================================= */

    document.addEventListener("click", function (evento) {

        dropdowns.forEach(function (dropdown) {

            if (!dropdown.contains(evento.target)) {
                dropdown.open = false;
            }

        });

        if (
            menuButton &&
            nav &&
            window.innerWidth <= 1160 &&
            nav.classList.contains("pk-open") &&
            !nav.contains(evento.target) &&
            !menuButton.contains(evento.target)
        ) {

            controlarMenu(false);

        }

    });


    /* ======================================
       8. CERRAR CON LA TECLA ESCAPE
    ======================================= */

    document.addEventListener("keydown", function (evento) {

        if (evento.key === "Escape") {

            if (!nav) {
                return;
            }

            const estabaAbierto = nav.classList.contains(
                "pk-open"
            );

            controlarMenu(false);

            dropdowns.forEach(function (dropdown) {
                dropdown.open = false;
            });

            if (estabaAbierto && menuButton) {
                menuButton.focus();
            }

        }

    });


    /* ======================================
       9. ADAPTAR MENÚ AL TAMAÑO DE PANTALLA
    ======================================= */

    window.addEventListener("resize", function () {

        if (window.innerWidth > 1160) {
            controlarMenu(false);
        }

    });


    /* ======================================
       10. PREGUNTAS FRECUENTES
    ======================================= */

    preguntas.forEach(function (pregunta) {

        pregunta.addEventListener("toggle", function () {

            if (pregunta.open) {

                preguntas.forEach(function (otraPregunta) {

                    if (otraPregunta !== pregunta) {
                        otraPregunta.open = false;
                    }

                });

            }

        });

    });

});
