
"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    const dropdownToggle = document.querySelector(".nav-dropdown-toggle");
    const dropdown = document.querySelector(".nav-dropdown");
    const yearElement = document.getElementById("year");

    const mobileQuery = window.matchMedia("(max-width: 900px)");

    // Actualizar el año del pie de página.
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Abrir y cerrar el menú principal.
    function setMenu(open) {
        if (!menuToggle || !navMenu) {
            return;
        }

        navMenu.classList.toggle("open", open);
        menuToggle.setAttribute("aria-expanded", String(open));
        menuToggle.setAttribute(
            "aria-label",
            open ? "Cerrar menú de navegación" : "Abrir menú de navegación"
        );
        document.body.classList.toggle("menu-open", open);

        if (!open) {
            setDropdown(false);
        }
    }

    // Abrir y cerrar el desplegable de servicios.
    function setDropdown(open) {
        if (!dropdown || !dropdownToggle) {
            return;
        }

        dropdown.classList.toggle("open", open);
        dropdownToggle.setAttribute("aria-expanded", String(open));
    }

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navMenu.classList.contains("open");
            setMenu(!isOpen);
        });

        // Cerrar el menú al seleccionar un enlace.
        navMenu.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                if (mobileQuery.matches) {
                    setMenu(false);
                }
            });
        });
    }

    if (dropdownToggle && dropdown) {
        dropdownToggle.addEventListener("click", () => {
            const isOpen = dropdown.classList.contains("open");
            setDropdown(!isOpen);
        });
    }

    // Cerrar los menús al hacer clic fuera de ellos.
    document.addEventListener("click", (event) => {
        const target = event.target;

        if (!(target instanceof Element)) {
            return;
        }

        if (
            dropdown &&
            !dropdown.contains(target)
        ) {
            setDropdown(false);
        }

        if (
            mobileQuery.matches &&
            navMenu &&
            menuToggle &&
            !navMenu.contains(target) &&
            !menuToggle.contains(target)
        ) {
            setMenu(false);
        }
    });

    // Cerrar los menús con la tecla Escape.
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            setMenu(false);
            setDropdown(false);
        }
    });

    // Restablecer el menú al cambiar entre móvil y escritorio.
    function handleViewportChange() {
        setMenu(false);
        setDropdown(false);
    }

    if (typeof mobileQuery.addEventListener === "function") {
        mobileQuery.addEventListener("change", handleViewportChange);
    } else {
        mobileQuery.addListener(handleViewportChange);
    }

    // Animaciones de aparición de las secciones.
    const revealElements = document.querySelectorAll(".reveal");
    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (
        revealElements.length > 0 &&
        !prefersReducedMotion &&
        "IntersectionObserver" in window
    ) {
        const observer = new IntersectionObserver(
            (entries, currentObserver) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        currentObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach((element) => {
            observer.observe(element);
        });

        // Activar las animaciones solo cuando están preparadas.
        document.documentElement.classList.add("js-enabled");
    } else {
        // Mostrar el contenido si no se pueden usar las animaciones.
        revealElements.forEach((element) => {
            element.classList.add("visible");
        });
    }
});
