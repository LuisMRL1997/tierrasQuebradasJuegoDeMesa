// Función para almacenar los datos del personaje en localStorage
function guardarDatosPersonaje(username, playername, selectedClass) {
    localStorage.setItem('username', username);
    localStorage.setItem('playername', playername);
    localStorage.setItem('selectedClass', selectedClass); // Almacena la clase elegida

    // Guardar estadísticas y puntos sin asignar
    const strength = localStorage.getItem('strength'); // Obtiene la fuerza
    const agility = localStorage.getItem('agility'); // Obtiene la agilidad
    const intellect = localStorage.getItem('intellect'); // Obtiene el intelecto
    const spirit = localStorage.getItem('spirit'); // Obtiene el espíritu
    const stamina = localStorage.getItem('stamina'); // Obtiene la aguante
    const availablePoints = localStorage.getItem('availablePoints'); // Obtiene puntos sin asignar

    // Almacenar estadísticas individualmente
    if (strength) {
        localStorage.setItem('strength', strength); // Guarda la fuerza
    }
    if (agility) {
        localStorage.setItem('agility', agility); // Guarda la agilidad
    }
    if (intellect) {
        localStorage.setItem('intellect', intellect); // Guarda el intelecto
    }
    if (spirit) {
        localStorage.setItem('spirit', spirit); // Guarda el espíritu
    }
    if (stamina) {
        localStorage.setItem('stamina', stamina); // Guarda la aguante
    }
    if (availablePoints) {
        localStorage.setItem('availablePoints', availablePoints); // Guarda los puntos sin asignar
    }

    // Redirigir a clase.html después de almacenar los datos
    window.location.href = "clase.html";
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
        // Almacenar los nombres
        const selectedClass = localStorage.getItem("selectedClass"); // Obtiene la clase elegida
        guardarDatosPersonaje(username, playername, selectedClass);
    }
}
