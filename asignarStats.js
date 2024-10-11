// asignarStats.js

// Variable para el enfriamiento
let cooldown = false;

// Función para manejar el enfriamiento
function handleCooldown() {
    cooldown = true; // Activar enfriamiento
    setTimeout(() => {
        cooldown = false; // Desactivar enfriamiento después de 1 segundo
    }, 10); // 1000 ms = 1 segundo
}

// Función para almacenar los datos del personaje en localStorage
function guardarDatosPersonaje(username, playername, selectedClass, stats) {
    localStorage.setItem('username', username);
    localStorage.setItem('playername', playername);
    localStorage.setItem('selectedClass', selectedClass);

    // Almacenar estadísticas individualmente
    localStorage.setItem('strength', stats.strength);
    localStorage.setItem('agility', stats.agility);
    localStorage.setItem('intellect', stats.intellect);
    localStorage.setItem('spirit', stats.spirit);
    localStorage.setItem('stamina', stats.stamina);
    localStorage.setItem('versatility', stats.versatility);
    localStorage.setItem('availablePoints', stats.availablePoints);

    // Redirigir a game.html después de almacenar los datos
    window.location.href = "todosPersonajes.html";
}

document.addEventListener('DOMContentLoaded', () => {
    // Aquí cargamos la información del jugador, incluyendo la clase
    const playerClass = localStorage.getItem("selectedClass"); // Esta sería la clase seleccionada del jugador (esto sería dinámico)
    
    // Aplicamos la clase a los botones según la clase del jugador
    aplicarClaseABotones(playerClass);
    cargarDatosDesdeLocalStorage();
});

// Función para cargar los datos del jugador desde localStorage
function cargarDatosDesdeLocalStorage() {
    const username = localStorage.getItem('username');
    const characterName = localStorage.getItem('playername');
    const chosenClass = localStorage.getItem('selectedClass');

    // Muestra los valores en los campos correspondientes
    document.getElementById('playerName').textContent = username; 
    document.getElementById('characterName').textContent = characterName; 

    const classSelectElement = document.getElementById('classSelect');
    classSelectElement.textContent = chosenClass;

    // Asignar clases CSS según la clase del personaje
    aplicarClaseABotones(chosenClass);
}

// Función para aplicar la clase a los botones según la clase seleccionada
function aplicarClaseABotones(playerClass) {
    const botones = document.querySelectorAll('.stat-btn'); // Selecciona todos los botones de estadísticas

    // Limpiamos las clases anteriores de los botones
    botones.forEach(boton => {
        boton.classList.remove('class-aruspice', 'class-conjurador', 'class-evocador', 'class-arcanista');
    });

    // Agregamos la nueva clase basada en la clase del jugador
    botones.forEach(boton => {
        switch (playerClass.toLowerCase()) {
            case 'aruspice':
                boton.classList.add('class-aruspice');
                break;
            case 'conjurador':
                boton.classList.add('class-conjurador');
                break;
            case 'evocador':
                boton.classList.add('class-evocador');
                break;
            case 'arcanista':
                boton.classList.add('class-arcanista');
                break;
            default:
                // Si la clase no está definida, no añadimos ninguna clase extra
                break;
        }
    });
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
        const selectedClass = localStorage.getItem("selectedClass");

        // Obtener estadísticas de los inputs
        const stats = {
            strength: document.getElementById('strengthPoints').textContent || 0,
            agility: document.getElementById('agilityPoints').textContent || 0,
            intellect: document.getElementById('intellectPoints').textContent || 0,
            spirit: document.getElementById('spiritPoints').textContent || 0,
            stamina: document.getElementById('staminaPoints').textContent || 0,
            versatility: document.getElementById('versatilityPoints').textContent || 0,
            availablePoints: document.getElementById('availablePoints').textContent || 0
        };

        // Almacenar los nombres y las estadísticas
        guardarDatosPersonaje(username, playername, selectedClass, stats);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const username = localStorage.getItem('username');
    const characterName = localStorage.getItem('playername');
    const chosenClass = localStorage.getItem('selectedClass');

    // Asignar playername aquí
    const playername = characterName; 

    // Muestra los valores en los campos correspondientes
    document.getElementById('playerName').textContent = username; 
    document.getElementById('characterName').textContent = characterName; 

    const classSelectElement = document.getElementById('classSelect');
    classSelectElement.textContent = chosenClass;

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
            classSelectElement.classList.add('default-class');
            break;
    }

    // Total de puntos para asignar
    let totalPoints = 6;

    // Función para actualizar los puntos disponibles
    function updateAvailablePoints() {
        const availablePointsElement = document.getElementById('availablePoints');
        const strength = parseInt(document.getElementById('strengthPoints').textContent) || 0;
        const agility = parseInt(document.getElementById('agilityPoints').textContent) || 0;
        const intellect = parseInt(document.getElementById('intellectPoints').textContent) || 0;
        const spirit = parseInt(document.getElementById('spiritPoints').textContent) || 0;
        const stamina = parseInt(document.getElementById('staminaPoints').textContent) || 0;
        const versatility = parseInt(document.getElementById('versatilityPoints').textContent) || 0;

        const assignedPoints = strength + agility + intellect + spirit + stamina + versatility;
        const availablePoints = totalPoints - assignedPoints;
        availablePointsElement.textContent = availablePoints;

        const submitButton = document.getElementById('submitButton');
        submitButton.disabled = availablePoints < 0; // Habilita el botón si hay puntos suficientes

        // Habilitar/deshabilitar botones +/-
        document.querySelectorAll('.plus-btn').forEach(button => {
            button.disabled = availablePoints <= 0;
        });

        document.querySelectorAll('.minus-btn').forEach(button => {
            const statElement = document.getElementById(`${button.dataset.stat}Points`);
            button.disabled = parseInt(statElement.textContent) <= 0;
        });
    }

    function updateStat(stat, increment) {
        const statElement = document.getElementById(`${stat}Points`);
        let currentPoints = parseInt(statElement.textContent, 10) || 0; // Asegura que sea un número entero
        const availablePointsElement = document.getElementById('availablePoints');
        let availablePoints = parseInt(availablePointsElement.textContent, 10) || 0; // Obtiene puntos disponibles

        if (increment) { // Si se quiere incrementar
            if (availablePoints > 0) { // Verifica si hay puntos disponibles
                currentPoints += 1; // Incrementa de 1
                statElement.textContent = currentPoints; // Actualiza el texto en el elemento
                console.log(`Aumentando ${stat}. Total: ${currentPoints}`);
            }
        } else { // Si se quiere decrementar
            if (currentPoints > 0) { // Verifica que haya puntos para decrementar
                currentPoints -= 1; // Decrementa de 1
                statElement.textContent = currentPoints; // Actualiza el texto en el elemento
                console.log(`Disminuyendo ${stat}. Total: ${currentPoints}`);
            }
        }
        
        // Actualiza los puntos disponibles después de cambiar
        updateAvailablePoints();
    }

    // Manejo de clics en el formulario para actualizar estadísticas
    document.getElementById('statsForm').addEventListener('click', function(event) {
        if (event.target.classList.contains('plus-btn') || event.target.classList.contains('minus-btn')) {
            // Verificar si está en enfriamiento
            if (cooldown) {
                console.log('Enfriamiento activo. Espera un segundo antes de realizar otra acción.');
                return; // Salir de la función si está en enfriamiento
            }

            const stat = event.target.getAttribute('data-stat');
            
            // Actualizar la estadística
            if (event.target.classList.contains('plus-btn')) {
                updateStat(stat, true);
            }
            if (event.target.classList.contains('minus-btn')) {
                updateStat(stat, false);
            }

            // Manejar el enfriamiento
            handleCooldown();
        }
    });

    // Código para manejar la asignación de estadísticas
    document.getElementById('statsForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Evita el envío del formulario
        // Mostrar una alerta de confirmación
    const isConfirmed = confirm("¿Estás seguro? Una vez que aceptes, no podrás revertir esta acción.");
    
    if (isConfirmed) {
        const stats = {
            strength: document.getElementById('strengthPoints').textContent,
            agility: document.getElementById('agilityPoints').textContent,
            intellect: document.getElementById('intellectPoints').textContent,
            spirit: document.getElementById('spiritPoints').textContent,
            stamina: document.getElementById('staminaPoints').textContent,
            versatility: document.getElementById('versatilityPoints').textContent,
            availablePoints: document.getElementById('availablePoints').textContent
        };
                // Almacena los datos del personaje
                guardarDatosPersonaje(username, playername, chosenClass, stats);
    } else {
          console.log("El jugador canceló la confirmación.");
          // No se realiza ninguna acción si se cancela
        }


    });

    updateAvailablePoints(); // Llama a la función al cargar para inicializar
});

