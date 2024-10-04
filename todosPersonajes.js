// Función para cargar personajes desde localStorage
function cargarPersonajes() {
    // Obtener los personajes almacenados en localStorage
    const personajesJSON = localStorage.getItem('personajes');
    return personajesJSON ? JSON.parse(personajesJSON) : []; // Devuelve el arreglo de personajes o un arreglo vacío si no hay personajes
}

// Función para agregar un personaje al almacenamiento
function agregarPersonaje(username, playername, selectedClass, stats) {
    const personajes = cargarPersonajes(); // Carga los personajes existentes

    // Verificar si ya existe un personaje con el mismo username o playername
    const existePersonaje = personajes.some(personaje => 
        personaje.username === username || personaje.playername === playername
    );

    // Si el personaje ya existe, no lo agregues
    if (existePersonaje) {
        console.log("El personaje ya existe. No se agregará de nuevo.");
        return;
    }

    // Crea un nuevo personaje con un ID único
    const nuevoPersonaje = {
        id: personajes.length + 1, // Asigna un ID basado en la longitud actual del arreglo
        username: username,
        playername: playername,
        selectedClass: selectedClass,
        ...stats // Usa el spread operator para incluir las estadísticas
    };

    personajes.push(nuevoPersonaje); // Agrega el nuevo personaje al arreglo

    // Guarda el arreglo actualizado en localStorage
    localStorage.setItem('personajes', JSON.stringify(personajes));
}

// Función para manejar la asignación de estadísticas y guardar todos los datos
function manejarDatosCompleto() {
    const username = localStorage.getItem("username");
    const playername = localStorage.getItem("playername");
    const selectedClass = localStorage.getItem("selectedClass");

    // Obtiene las estadísticas
    const stats = {
        strength: parseInt(localStorage.getItem('strength')) || 0,
        agility: parseInt(localStorage.getItem('agility')) || 0,
        intellect: parseInt(localStorage.getItem('intellect')) || 0,
        spirit: parseInt(localStorage.getItem('spirit')) || 0,
        stamina: parseInt(localStorage.getItem('stamina')) || 0,
        availablePoints: parseInt(localStorage.getItem('availablePoints')) || 0 // Asegúrate de que este valor esté presente
    };

    // Agregar el personaje al localStorage
    agregarPersonaje(username, playername, selectedClass, stats);
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
