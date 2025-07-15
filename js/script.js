document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    // Función para cerrar el menú
    const closeMenu = () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    };

    // Toggle para el menú de navegación en móvil
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Cierra el menú si se hace clic fuera de él (solo en móviles)
        document.addEventListener('click', (event) => {
            if (window.innerWidth <= 768 && !navMenu.contains(event.target) && !navToggle.contains(event.target)) {
                closeMenu();
            }
        });

        // Cierra el menú cuando se hace clic en un enlace (para navegación interna)
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                // Pequeño retardo para que la navegación por ancla se complete antes de cerrar el menú
                setTimeout(closeMenu, 300);
            });
        });
    }

    // Animación suave de scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Pequeño efecto de parallax en el hero section (opcional)
    const hero = document.getElementById('hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            hero.style.backgroundPositionY = `${scrollY * 0.5}px`;
        });
    }
});