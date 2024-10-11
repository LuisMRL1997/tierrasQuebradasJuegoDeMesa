// reinicio.js

import playerInstance from '../player.js'; // Importa la instancia de Player

// Función para reiniciar el juego
export function reiniciarJuego() {
    // Limpiar el localStorage
    localStorage.removeItem('personajes'); // Elimina solo el arreglo de personajes
    // O simplemente puedes usar: localStorage.clear(); // Esto eliminará todo el localStorage

    // Reiniciar el array de personajes en la instancia de Player
    playerInstance.personajes = []; // Reinicia el arreglo de personajes
    playerInstance.guardarPersonajes(); // Guarda el arreglo vacío en localStorage
    window.location.href = '../username.html'; // Regresa a la página de nombre de usuario
}

// Puedes exportar la función para usarla en otros módulos
