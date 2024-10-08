// todosPersonajes.js

import playerInstance from './player.js'; // Importar la instancia de Player desde player.js

// Función para cargar personajes desde localStorage (en caso de necesitarse aquí también)
export function cargarPersonajes() {
    const personajesJSON = localStorage.getItem('personajes');
    return personajesJSON ? JSON.parse(personajesJSON) : [];
}

// Función para verificar si un personaje ya existe
function existePersonaje(username, playername) {
    const personajes = playerInstance.cargarPersonajes(); // Usa la función de player.js para cargar personajes
    return personajes.some(personaje => 
        personaje.username === username || personaje.playername === playername
    );
}

// Función para manejar la asignación de estadísticas y guardar todos los datos
export function manejarDatosCompleto() { // Aquí exportamos la función
    const username = localStorage.getItem("username");
    const playername = localStorage.getItem("playername");
    const selectedClass = localStorage.getItem("selectedClass");

    // Obtiene las estadísticas del localStorage
    const stats = {
        strength: parseInt(localStorage.getItem('strength')) || 0,
        agility: parseInt(localStorage.getItem('agility')) || 0,
        intellect: parseInt(localStorage.getItem('intellect')) || 0,
        spirit: parseInt(localStorage.getItem('spirit')) || 0,
        stamina: parseInt(localStorage.getItem('stamina')) || 0,
        versatility: parseInt(localStorage.getItem('versatility')) || 0,
        availablePoints: parseInt(localStorage.getItem('availablePoints')) || 0
    };

    // Verificar si ya existe un personaje con el mismo username o playername
    if (existePersonaje(username, playername)) {
        console.log("El personaje ya existe. No se agregará de nuevo.");
        return;
    }

    // Si no existe, crear un nuevo personaje
    const nuevoPersonaje = {
        username: username,
        playername: playername,
        selectedClass: selectedClass,
        nivel: 1, // Nivel inicial del personaje
        strength: stats.strength,
        agility: stats.agility,
        intellect: stats.intellect,
        spirit: stats.spirit,
        stamina: stats.stamina,
        versatility: stats.versatility,
        availablePoints: stats.availablePoints
    };

    // Agregar el nuevo personaje utilizando el método de player.js
    playerInstance.agregarPersonaje(nuevoPersonaje);
    console.log("Nuevo personaje agregado:", nuevoPersonaje);
}

// Ejecutar la función para manejar los datos al cargar el archivo solo si hay datos para agregar
document.addEventListener('DOMContentLoaded', () => {
    const username = localStorage.getItem("username");
    const playername = localStorage.getItem("playername");

    // Verificar que existan los datos antes de manejar la creación del personaje
    if (username && playername) {
        manejarDatosCompleto();
    }
});
