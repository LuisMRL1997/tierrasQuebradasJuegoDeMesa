// movement.js

let playerPosition = { x: 0, y: 0 }; // El jugador empieza en la posición (0, 0)
export let isPlayerSelected = false; // Variable para controlar si el jugador está seleccionado

// Crear un objeto para el estado del jugador
export const playerState = {
    isPlayerSelected: false,
};

// Colocamos al jugador en la casilla actual
function placePlayer(boardSize) { // No es necesario exportar dos veces la misma función
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => tile.innerHTML = ''); // Limpiar cualquier contenido previo
    const playerTileIndex = playerPosition.y * boardSize + playerPosition.x; // Utilizar boardSize aquí
    const playerTile = tiles[playerTileIndex];

    // Verificar que playerTile existe antes de intentar agregar el jugador
    if (!playerTile) {
        console.error(`Casilla no encontrada para el índice: ${playerTileIndex}`);
        return; // Salir de la función si no se encuentra la casilla
    }

    console.log(`Colocando jugador en la casilla ${playerTileIndex}`); // Agrega esto para verificar

    const player = document.createElement('div');
    player.classList.add('player');
    player.style.pointerEvents = 'auto'; // Asegurar que se puede hacer clic en el jugador
    playerTile.appendChild(player);

    // Asegurarnos de que los eventos de clic o toque se registren tanto en el jugador como en la casilla
    addSelectionEvents(playerTile, player, boardSize);
}

// Función para agregar eventos de selección a la casilla y al jugador
function addSelectionEvents(tile, player, boardSize) {
    const selectPlayer = () => {
        playerState.isPlayerSelected = true;
        highlightAvailableMoves(boardSize); // Resaltar casillas disponibles
    };

    // Eventos de clic y toque para la casilla
    tile.addEventListener('click', selectPlayer);
    tile.addEventListener('touchstart', (event) => {
        event.preventDefault(); // Previene el comportamiento por defecto
        selectPlayer();
    });

    // Eventos de clic y toque para el jugador
    player.addEventListener('click', selectPlayer);
    player.addEventListener('touchstart', (event) => {
        event.preventDefault(); // Previene el comportamiento por defecto
        selectPlayer();
    });
}

// Función para iluminar casillas adyacentes y diagonales disponibles para moverse
function highlightAvailableMoves(boardSize) { // Solo exportamos donde es necesario
    const tiles = document.querySelectorAll('.tile');

    // Definir los posibles movimientos (adyacentes y diagonales)
    const possibleMoves = [
        { x: playerPosition.x - 1, y: playerPosition.y },     // Izquierda
        { x: playerPosition.x + 1, y: playerPosition.y },     // Derecha
        { x: playerPosition.x, y: playerPosition.y - 1 },     // Arriba
        { x: playerPosition.x, y: playerPosition.y + 1 },     // Abajo
        { x: playerPosition.x - 1, y: playerPosition.y - 1 }, // Diagonal arriba-izquierda
        { x: playerPosition.x + 1, y: playerPosition.y - 1 }, // Diagonal arriba-derecha
        { x: playerPosition.x - 1, y: playerPosition.y + 1 }, // Diagonal abajo-izquierda
        { x: playerPosition.x + 1, y: playerPosition.y + 1 }  // Diagonal abajo-derecha
    ];

    // Limpiar las casillas previamente iluminadas
    tiles.forEach(tile => tile.classList.remove('highlight'));

    // Iluminar casillas adyacentes y diagonales válidas
    possibleMoves.forEach(move => {
        // Verificar que las coordenadas estén dentro de los límites del tablero
        if (move.x >= 0 && move.x < boardSize && move.y >= 0 && move.y < boardSize) {
            const tileIndex = move.y * boardSize + move.x; // Calcular el índice de la casilla
            const tile = tiles[tileIndex];

            // Asegurarse de que el índice sea correcto y la casilla esté disponible
            if (tile) {
                tile.classList.add('highlight'); // Añadir clase 'highlight' a la casilla
            }
        }
    });
}

// Modificar la función `movePlayerTo` para aceptar `boardSize`
function movePlayerTo(newX, newY, boardSize) { // Exportar solo en el lugar adecuado
    const dx = Math.abs(newX - playerPosition.x);
    const dy = Math.abs(newY - playerPosition.y);

    // Permitir movimiento a casillas adyacentes o diagonales (dx <= 1 y dy <= 1)
    if (dx <= 1 && dy <= 1) {
        playerPosition.x = newX;
        playerPosition.y = newY;
        placePlayer(boardSize); // Recolocar al jugador, pasando boardSize
    } else {
        console.log("Movimiento no permitido: solo puedes moverte a una casilla adyacente o diagonal.");
    }

    playerState.isPlayerSelected = false; // Deseleccionar al jugador después de intentar moverlo

    // Limpiar las casillas resaltadas después del movimiento
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => tile.classList.remove('highlight'));
}

// Agregar manejo de eventos para clics y toques
document.addEventListener('DOMContentLoaded', () => {
    const tiles = document.querySelectorAll('.tile');
    const boardSize = Math.sqrt(tiles.length); // Ajusta esto según el tamaño de tu tablero

    // Agregar eventos de clic y toque a cada casilla del tablero
    tiles.forEach((tile, index) => {
        tile.addEventListener('click', () => handleTileClick(index, boardSize));
        tile.addEventListener('touchstart', (event) => {
            event.preventDefault(); // Previene el comportamiento por defecto
            handleTileClick(index, boardSize);
        });
    });
});

// Función que maneja el clic o el toque en una casilla
function handleTileClick(index, boardSize) {
    const newY = Math.floor(index / boardSize);
    const newX = index % boardSize;

    // Solo mover si el jugador ha sido seleccionado previamente
    if (playerState.isPlayerSelected) {
        movePlayerTo(newX, newY, boardSize); // Llama a la función para mover al jugador
    }
}

// Exportar solo las funciones y variables necesarias al final
export { placePlayer, movePlayerTo, highlightAvailableMoves, playerPosition };
