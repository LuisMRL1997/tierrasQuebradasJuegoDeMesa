const gameBoard = document.getElementById('game-board');
const characterList = document.getElementById('character-list'); // Obtener el elemento para mostrar los personajes
export const boardSize = 32; // 32x32 casillas

import { playerState, placePlayer, movePlayerTo, playerPosition, highlightAvailableMoves } from './movement.js'; // Importar las funciones y playerPosition necesarias

// Crear un tablero de 32x32 (1024 casillas en total)
for (let i = 0; i < boardSize * boardSize; i++) {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    tile.dataset.index = i; // Guardar el índice de la casilla
    gameBoard.appendChild(tile);
}

// Inicializar el jugador
placePlayer(boardSize); // Pasar boardSize como argumento

// Lógica para detectar clics en las casillas
gameBoard.addEventListener('click', (e) => {
    // Verificar si se ha hecho clic en una casilla o en el jugador
    if (e.target.classList.contains('tile') || e.target.classList.contains('player')) {
        const index = parseInt(e.target.classList.contains('tile') ? e.target.dataset.index : e.target.parentElement.dataset.index); // Obtener el índice de la casilla clicada
        const newX = index % boardSize; // Convertir el índice en coordenadas X
        const newY = Math.floor(index / boardSize); // Convertir el índice en coordenadas Y
        
        if (playerState.isPlayerSelected) {
            movePlayerTo(newX, newY, boardSize); // Pasar boardSize al mover al jugador
        } else {
            // Aquí puedes seleccionar el jugador al hacer clic en su casilla
            const playerTileIndex = playerPosition.y * boardSize + playerPosition.x; // Obtener el índice actual del jugador
            if (index === playerTileIndex) {
                playerState.isPlayerSelected = true; // Activar la selección del jugador
                highlightAvailableMoves(boardSize); // Resaltar los movimientos disponibles
            }
        }
    }
});

// Función para cargar personajes desde localStorage
function cargarPersonajes() {
    // Obtener los personajes guardados del localStorage
    const personajesJSON = localStorage.getItem('personajes');
    if (personajesJSON) {
        return JSON.parse(personajesJSON); // Parsear el JSON a un objeto JavaScript
    }
    return []; // Retornar un array vacío si no hay personajes
}

// Función para cargar y mostrar personajes
function mostrarPersonajes() {
    const personajes = cargarPersonajes(); // Cargar los personajes desde localStorage
    characterList.innerHTML = ''; // Limpiar la lista antes de mostrarla

    if (personajes.length === 0) {
        characterList.innerHTML = '<p>No hay personajes guardados.</p>'; // Mensaje si no hay personajes
        return;
    }

    // Crear elementos para cada personaje y añadirlos a la lista
    personajes.forEach(personaje => {
        const personajeDiv = document.createElement('div');
        // Modificar el contenido para incluir estadísticas
        personajeDiv.textContent = `
            Username: ${personaje.username}, 
            Playername: ${personaje.playername}, 
            Clase: ${personaje.selectedClass}, 
            Fuerza: ${personaje.strength}, 
            Agilidad: ${personaje.agility}, 
            Intelecto: ${personaje.intellect}, 
            Espíritu: ${personaje.spirit}, 
            Resistencia: ${personaje.stamina}, 
            Puntos disponibles: ${personaje.availablePoints}
        `;
        characterList.appendChild(personajeDiv);
    });
}


// Ejecutar la función para mostrar personajes al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    mostrarPersonajes(); // Mostrar los personajes al cargar el documento
});
