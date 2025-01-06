// Función para reproducir el sonido del botón
function playButtonSound() {
    const audio = new Audio('audio/boton/boton1.ogg');
    audio.play();
}

// Función para generar el efecto de salpicadura
function createSplashEffect(event) {
    const button = event.target;
    const rect = button.getBoundingClientRect();
    const splash = document.createElement('div');
    splash.classList.add('splash-effect');

    // Coloca el splash en el centro del botón
    splash.style.left = `${event.clientX - rect.left - 25}px`;  // Ajusta la posición
    splash.style.top = `${event.clientY - rect.top - 25}px`;

    // Añadir el splash al contenedor
    button.appendChild(splash);

    // Crear brillitos alrededor
    for (let i = 0; i < 30; i++) { // Aumento la cantidad de brillitos
        const star = document.createElement('div');
        star.classList.add('star');

        const size = Math.random() * 6 + 6; // Tamaño aleatorio más grande
        const xOffset = (Math.random() - 0.5) * 150; // Desplazamiento aleatorio en el eje X (más amplio)
        const yOffset = (Math.random() - 0.5) * 150; // Desplazamiento aleatorio en el eje Y (más amplio)

        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        // Aplicamos los desplazamientos en la animación
        star.style.setProperty('--x-offset', `${xOffset}px`);
        star.style.setProperty('--y-offset', `${yOffset}px`);

        splash.appendChild(star);
    }

    // Eliminar el splash después de la animación
    setTimeout(() => {
        splash.remove();
    }, 600); // El tiempo del efecto, ahora más corto para mayor dinamismo
}

// Función para aplicar los efectos a un botón
function applyButtonEffects(buttonId, redirectUrl) {
    document.getElementById(buttonId).addEventListener('click', (event) => {
        playButtonSound(); // Reproducir el sonido
        createSplashEffect(event); // Añadir el efecto de splash

        // Añadir un retraso antes de redirigir
        setTimeout(() => {
            window.location.href = redirectUrl;
        }, 1000); // 1000ms = 1 segundo
    });
}

// Exportar las funciones para su uso en otros archivos
export { applyButtonEffects };
