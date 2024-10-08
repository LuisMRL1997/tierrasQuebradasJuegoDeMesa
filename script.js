// script.js

import { playerState, placePlayer, movePlayerTo, playerPosition, highlightAvailableMoves } from './actions/movement.js';
import { cargarPersonajes } from './todosPersonajes.js'; // Importamos cargarPersonajes
import { addMinMaxFunctionality } from './funcionalidades/miniMaxi.js'; // Importa las funciones de miniMax.js

const gameBoard = document.getElementById('game-board');
const characterList = document.getElementById('character-list');
const characterListContainer = document.getElementById('character-list-container');
const toggleCharacterListButton = document.getElementById('toggle-character-list');

const turnTimeContainer = document.getElementById('turn-time-container');
const toggleTurnTimeButton = document.getElementById('toggle-turn-time');

const enemiesContainer = document.getElementById('enemies-container');
const toggleEnemiesButton = document.getElementById('toggle-enemies');

const abilitiesContainer = document.getElementById('abilities-container');
const toggleAbilitiesButton = document.getElementById('toggle-abilities');

const boardSize = 10; // Mantener el tamaño del tablero en 10x10 para que coincida con el CSS

// Crear un tablero de 10x10
for (let i = 0; i < boardSize * boardSize; i++) {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    tile.dataset.index = i;
    gameBoard.appendChild(tile);
}

console.log(`${boardSize * boardSize} casillas creadas.`);

// Inicializar el jugador
placePlayer(boardSize);

// Lógica para detectar clics en las casillas
gameBoard.addEventListener('click', (e) => {
    if (e.target.classList.contains('tile') || e.target.classList.contains('player')) {
        const index = parseInt(e.target.classList.contains('tile') ? e.target.dataset.index : e.target.parentElement.dataset.index);
        const newX = index % boardSize;
        const newY = Math.floor(index / boardSize);

        if (playerState.isPlayerSelected) {
            movePlayerTo(newX, newY, boardSize);
        } else {
            const playerTileIndex = playerPosition.y * boardSize + playerPosition.x;
            if (index === playerTileIndex) {
                playerState.isPlayerSelected = true;
                highlightAvailableMoves(boardSize);
            }
        }
    }
});

// Función para mostrar personajes en la lista
function mostrarPersonajes() {
    const personajes = cargarPersonajes();
    characterList.innerHTML = ''; // Limpiar la lista

    personajes.forEach(personaje => {
        const li = document.createElement('li');
        li.innerHTML = `
            Nombre: "${personaje.playername}" (${personaje.username})<br>
            Clase: "${personaje.selectedClass}"<br>
            Frz: "${personaje.strength}" Agi: "${personaje.agility}"<br>
            Int: "${personaje.intellect}" Spr: "${personaje.spirit}"<br>
            Agt: "${personaje.stamina}" Ver: "${personaje.versatility}"  <!-- Aquí añadimos Versatilidad -->
        `;
        characterList.appendChild(li);
    });
}

// Ejecutar la función para mostrar personajes al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    console.log("Página cargada completamente.");
    mostrarPersonajes();

    // Añadir funcionalidad de minimizar/maximizar
    addMinMaxFunctionality(toggleCharacterListButton, characterListContainer);
    addMinMaxFunctionality(toggleTurnTimeButton, turnTimeContainer);
    addMinMaxFunctionality(toggleEnemiesButton, enemiesContainer);
    addMinMaxFunctionality(toggleAbilitiesButton, abilitiesContainer);
});
