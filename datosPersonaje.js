// datosPersonaje.js

// Función para almacenar los datos del personaje en localStorage
function guardarDatosPersonaje(username, playername, selectedClass, selectedPortrait, stats) {
    localStorage.setItem('username', username);
    localStorage.setItem('playername', playername);
    localStorage.setItem('selectedClass', selectedClass); // Almacena la clase elegida
    localStorage.setItem('selectedPortrait', selectedPortrait); // Almacena el retrato seleccionado

    // Almacenar estadísticas y puntos sin asignar
    localStorage.setItem('strength', stats.strength); // Guarda la fuerza
    localStorage.setItem('agility', stats.agility); // Guarda la agilidad
    localStorage.setItem('intellect', stats.intellect); // Guarda el intelecto
    localStorage.setItem('spirit', stats.spirit); // Guarda el espíritu
    localStorage.setItem('stamina', stats.stamina); // Guarda el aguante
    localStorage.setItem('versatility', stats.versatility); // Guarda la versatilidad
    localStorage.setItem('availablePoints', stats.availablePoints); // Guarda los puntos sin asignar

    // Redirigir a clase.html después de almacenar los datos
    window.location.href = "clase.html"; // Verifica que sea la página correcta
}

// Función para almacenar el retrato del personaje en localStorage
function guardarRetrato(selectedPortrait) {
    localStorage.setItem('selectedPortrait', selectedPortrait); // Almacena el retrato seleccionado

    // Redirigir a la página de clase después de almacenar el retrato
    window.location.href = "stats.html"; // Verifica que sea la página correcta
}

// Función para manejar el retrato desde la página correspondiente
function manejarRetrato() {
    const selectedPortrait = document.querySelector('input[name="portrait"]:checked'); // Suponiendo que hay inputs de tipo radio para seleccionar el retrato
    const errorMessage = document.getElementById("error-message");

    // Verificar que se haya seleccionado un retrato
    if (!selectedPortrait) {
        errorMessage.textContent = "Por favor, selecciona un retrato.";
        errorMessage.style.display = "block"; // Mostrar el mensaje de error
    } else {
        errorMessage.style.display = "none"; // Ocultar el mensaje de error

        // Obtener el valor del retrato seleccionado
        const portraitValue = selectedPortrait.value;

        // Almacenar el retrato
        guardarRetrato(portraitValue);
    }
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
        const selectedPortrait = localStorage.getItem("selectedPortrait"); // Obtiene el retrato seleccionado

        // Obtener estadísticas de los inputs o de localStorage
        const stats = {
            strength: parseInt(localStorage.getItem('strength')) || 0,
            agility: parseInt(localStorage.getItem('agility')) || 0,
            intellect: parseInt(localStorage.getItem('intellect')) || 0,
            spirit: parseInt(localStorage.getItem('spirit')) || 0,
            stamina: parseInt(localStorage.getItem('stamina')) || 0,
            versatility: parseInt(localStorage.getItem('versatility')) || 0, // Nueva estadística
            availablePoints: parseInt(localStorage.getItem('availablePoints')) || 0 // Puntos sin asignar
        };

        // Almacenar los nombres y las estadísticas
        guardarDatosPersonaje(username, playername, selectedClass, selectedPortrait, stats);
    }
}



