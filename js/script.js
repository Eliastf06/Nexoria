document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const openLoginModalBtn = document.getElementById('openLoginModal');
    const loginModal = document.getElementById('loginModal');
    const closeLoginModalBtn = document.querySelector('.modal .close-button');

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
            if (window.innerWidth <= 768 && !navMenu.contains(event.target) && !navToggle.contains(event.target) && !openLoginModalBtn.contains(event.target) && !loginModal.contains(event.target)) {
                closeMenu();
            }
        });

        // Cierra el menú cuando se hace clic en un enlace (para navegación interna)
        navMenu.querySelectorAll('a:not(#openLoginModal)').forEach(link => { // Excluye el botón de login
            link.addEventListener('click', () => {
                // Pequeño retardo para que la navegación por ancla se complete antes de cerrar el menú
                setTimeout(closeMenu, 300);
            });
        });
    }

    // Lógica para el Modal de Login
    if (openLoginModalBtn && loginModal && closeLoginModalBtn) {
        openLoginModalBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Evita que el enlace de navegación se comporte como ancla
            loginModal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Evita el scroll del body cuando el modal está abierto
            closeMenu(); // Cierra el menú hamburguesa si está abierto al abrir el modal
        });

        closeLoginModalBtn.addEventListener('click', () => {
            loginModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restaura el scroll del body
        });

        // Cierra el modal si se hace clic fuera del contenido del modal
        window.addEventListener('click', (event) => {
            if (event.target === loginModal) {
                loginModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        // Opcional: Manejar el envío del formulario de login
        const loginForm = loginModal.querySelector('.login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;

                // Aquí iría la lógica de autenticación real (ej. fetch a una API)
                console.log('Intentando iniciar sesión con:', { username, password });

                // Ejemplo de lógica simple (reemplazar con autenticación real)
                if (username === 'test' && password === 'password') {
                    alert('¡Inicio de sesión exitoso!');
                    loginModal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                    // Aquí podrías redirigir al usuario o cambiar el estado de la UI
                } else {
                    alert('Usuario o contraseña incorrectos.');
                }
            });
        }
    }

    // Animación suave de scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Asegurarse de que no sea el botón de login
            if (this.id === 'openLoginModal') return;

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