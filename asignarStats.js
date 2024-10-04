// Función para almacenar los datos del personaje en localStorage
function guardarDatosPersonaje(username, playername, selectedClass, stats) {
    localStorage.setItem('username', username);
    localStorage.setItem('playername', playername);
    localStorage.setItem('selectedClass', selectedClass); // Almacena la clase elegida

    // Almacenar estadísticas individualmente
    localStorage.setItem('strength', stats.strength); // Guarda la fuerza
    localStorage.setItem('agility', stats.agility); // Guarda la agilidad
    localStorage.setItem('intellect', stats.intellect); // Guarda el intelecto
    localStorage.setItem('spirit', stats.spirit); // Guarda el espíritu
    localStorage.setItem('stamina', stats.stamina); // Guarda la aguante
    localStorage.setItem('availablePoints', stats.availablePoints); // Guarda los puntos sin asignar

    // Redirigir a game.html después de almacenar los datos
    window.location.href = "todosPersonajes.html";
}

// Función para manejar los datos desde username.html
function manejarDatos() {
    const username = document.getElementById("username").value.trim();
    const playername = document.getElementById("playername").value.trim();
    const errorMessage = document.getElementById("error-message");

    // Verificar que ambos campos no estén vacíos
    if (username === "" || playername === "") {
        errorMessage.textContent = "Por favor, completa ambos campos.";
        errorMessage.style.display = "block"; // Mostrar el mensaje de error
    } else {
        errorMessage.style.display = "none"; // Ocultar el mensaje de error
        const selectedClass = localStorage.getItem("selectedClass"); // Obtiene la clase elegida
        
        // Obtener estadísticas de los inputs
        const stats = {
            strength: document.getElementById('strengthPoints').value || 0,
            agility: document.getElementById('agilityPoints').value || 0,
            intellect: document.getElementById('intellectPoints').value || 0,
            spirit: document.getElementById('spiritPoints').value || 0,
            stamina: document.getElementById('staminaPoints').value || 0,
            availablePoints: document.getElementById('availablePoints').textContent || 0
        };

        // Almacenar los nombres y las estadísticas
        guardarDatosPersonaje(username, playername, selectedClass, stats);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const username = localStorage.getItem('username'); // Obtiene el nombre de usuario
    const characterName = localStorage.getItem('playername'); // Obtiene el nombre del personaje
    const chosenClass = localStorage.getItem('selectedClass'); // Obtiene la clase

    // Muestra los valores en los campos correspondientes
    document.getElementById('playerName').textContent = username; // Asigna el nombre de usuario
    document.getElementById('characterName').textContent = characterName; // Asigna el nombre del personaje

    const classSelectElement = document.getElementById('classSelect');
    classSelectElement.textContent = chosenClass; // Asigna la clase

    // Asigna la clase CSS dependiendo de la clase del personaje
    switch (chosenClass.toLowerCase()) {
        case 'aruspice':
            classSelectElement.classList.add('class-aruspices');
            break;
        case 'conjurador':
            classSelectElement.classList.add('class-conjurador');
            break;
        case 'evocador':
            classSelectElement.classList.add('class-evocador');
            break;
        case 'arcanista':
            classSelectElement.classList.add('class-arcanista');
            break;
        default:
            classSelectElement.classList.add('default-class'); // Clase predeterminada por si no coincide
            break;
    }

    // Total de puntos para asignar
    let totalPoints = 6;

    // Función para actualizar los puntos disponibles
    function updateAvailablePoints() {
        const strength = parseInt(document.getElementById('strengthPoints').value) || 0;
        const agility = parseInt(document.getElementById('agilityPoints').value) || 0;
        const intellect = parseInt(document.getElementById('intellectPoints').value) || 0;
        const spirit = parseInt(document.getElementById('spiritPoints').value) || 0;
        const stamina = parseInt(document.getElementById('staminaPoints').value) || 0;

        const assignedPoints = strength + agility + intellect + spirit + stamina;
        const availablePoints = totalPoints - assignedPoints;

        // Actualiza el campo de puntos disponibles
        document.getElementById('availablePoints').textContent = availablePoints < 0 ? 0 : availablePoints;

        // Habilita o deshabilita el botón de envío según los puntos disponibles
        const submitButton = document.getElementById('submitButton'); // Asegúrate de tener un botón con este ID
        if (availablePoints <= 0) {
            submitButton.disabled = false; // Habilita el botón si no hay puntos disponibles
        } else {
            submitButton.disabled = true; // Deshabilita el botón si hay puntos disponibles
        }

        // Deshabilitar los incrementos si no hay puntos disponibles para aumentar
        const pointInputs = document.querySelectorAll('input[type="number"]');
        pointInputs.forEach(input => {
            if (availablePoints <= 0 && parseInt(input.value) >= 0) {
                input.value = Math.max(0, input.value); // Asegura que el valor no sea menor a 0
                input.setAttribute('max', input.value); // Establece el valor máximo para evitar aumentos
                input.step = "0"; // Cambia el paso a 0 para evitar aumentos
            } else {
                input.step = "1"; // Permite aumentos si hay puntos disponibles
                input.removeAttribute('max'); // Elimina el límite máximo
            }
        });
    }

    // Escucha cambios en los inputs para actualizar los puntos disponibles
    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.addEventListener('input', updateAvailablePoints);
    });

    // Código para manejar la asignación de estadísticas
    document.getElementById('statsForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Evita el envío del formulario

        const stats = {
            strength: document.getElementById('strengthPoints').value,
            agility: document.getElementById('agilityPoints').value,
            intellect: document.getElementById('intellectPoints').value,
            spirit: document.getElementById('spiritPoints').value,
            stamina: document.getElementById('staminaPoints').value,
            availablePoints: document.getElementById('availablePoints').textContent // Obtiene puntos disponibles
        };

        // Preguntar al usuario si está seguro
        const confirmation = confirm("¿Estás seguro de que deseas asignar estas estadísticas?");
        if (confirmation) {
            // Mostrar estadísticas en el div statsDisplay
            const statsDisplay = document.getElementById('statsDisplay');
            statsDisplay.innerHTML = `<h3>Estadísticas Asignadas:</h3>
                                      <p>Fuerza: ${stats.strength}</p>
                                      <p>Agilidad: ${stats.agility}</p>
                                      <p>Intelecto: ${stats.intellect}</p>
                                      <p>Espíritu: ${stats.spirit}</p>
                                      <p>Aguante: ${stats.stamina}</p>`;

            console.log('Estadísticas asignadas:', stats);
            // Almacenar los datos en localStorage
            guardarDatosPersonaje(username, playername, chosenClass, stats);
        } else {
            console.log('Asignación de estadísticas cancelada.');
        }
    });

    // Inicializar la verificación de puntos disponibles al cargar
    updateAvailablePoints();
});
