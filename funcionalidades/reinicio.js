// reinicio.js 

import playerInstance from '../player.js'; // Importa la instancia de Player

export async function reiniciarJuego() {
    try {
        // Limpiar el localStorage de forma segura
        await new Promise((resolve) => {
            localStorage.removeItem('personajes'); // Elimina solo el arreglo de personajes
            resolve();
        });

        // Reiniciar el array de personajes
        playerInstance.personajes = [];
        playerInstance.guardarPersonajes(); // Guarda el arreglo vacío en localStorage
        
        // Redirigir de forma segura
        setTimeout(() => {
            window.location.href = './username.html'; // Redirige a la página de nombre de usuario
        }, 100); // Añadir un pequeño retardo para asegurarse de que todo se procesa
    } catch (error) {
        console.error("Error al reiniciar el juego:", error);
    }
}
