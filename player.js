class Player {
    constructor() {
        this.personajes = this.cargarPersonajes(); // Carga los personajes al inicializar
    }

    // Función para cargar personajes desde localStorage
    cargarPersonajes() {
        const personajesJSON = localStorage.getItem('personajes');
        return personajesJSON ? JSON.parse(personajesJSON) : []; // Devuelve el arreglo de personajes o un arreglo vacío
    }

    // Guarda personajes en localStorage
    guardarPersonajes() {
        localStorage.setItem('personajes', JSON.stringify(this.personajes));
    }

    // Método para asignar un ID único del 1 al 4
    asignarId() {
        const idsOcupados = this.personajes.map(personaje => personaje.id); // Extrae los IDs ocupados
        for (let id = 1; id <= 4; id++) {
            if (!idsOcupados.includes(id)) {
                return id; // Devuelve el primer ID disponible del 1 al 4
            }
        }
        return null; // Si todos los IDs están ocupados
    }

    // Método para agregar un personaje
    agregarPersonaje(nuevoPersonaje) {
        const nuevoId = this.asignarId(); // Asignamos un ID automáticamente
        if (nuevoId !== null) {
            nuevoPersonaje.id = nuevoId; // Asignar el ID disponible
            this.personajes.push(nuevoPersonaje); // Agrega el nuevo personaje al arreglo
            this.guardarPersonajes(); // Guarda el arreglo actualizado
        } else {
            console.error('No se pueden agregar más personajes. Todos los IDs están ocupados.');
        }
    }

    // Método para calcular la salud de un personaje
    calcularSalud(personaje) {
        return 1 + personaje.nivel + (personaje.stamina / 2); // Lógica para calcular salud
    }

    // Método para calcular el poder de ataque
    calcularPoderAtaque(personaje) {
        const poderArma = personaje.poderArma || 0; // Aseguramos que tenga poderArma definido
        const versatilidad = personaje.versatility || 0;
        const selectedClass = personaje.selectedClass ? personaje.selectedClass.toLowerCase() : '';

        let bonificacionVersatilidad = 0;

        // Verificar si la clase es Arcanista
        if (versatilidad % 3 === 0 && versatilidad > 0) {
            if (selectedClass === 'arcanista') {
                // Si es Arcanista, 3 de poder por cada 3 de versatilidad
                bonificacionVersatilidad = Math.floor(versatilidad / 3) * 3;
            } else {
                // Para otras clases, 1 de poder por cada 3 de versatilidad
                bonificacionVersatilidad = Math.floor(versatilidad / 3);
            }
        }

        console.log(`Poder de ataque calculado para ${personaje.playername}: ${1 + poderArma + bonificacionVersatilidad}`);
        return 1 + poderArma + bonificacionVersatilidad; // Fórmula del poder de ataque con la nueva condición
    }

    // Método para calcular las acciones del personaje
    calcularAcciones(personaje) {
        if (!personaje.hasOwnProperty('agility') || !personaje.hasOwnProperty('selectedClass')) {
            console.error('El personaje no tiene agilidad o clase definida');
            return undefined; // O algún valor por defecto
        }

        const { agility, selectedClass } = personaje;
        let acciones = 2; // Valor base

        // Aumentar por agilidad, si es un múltiplo de 6
        if (agility % 6 === 0 && agility > 0) {
            acciones += Math.floor(agility / 6);
        }

        // Aumentar en 1 si la clase es "conjurador"
        if (selectedClass.toLowerCase() === 'conjurador') {
            acciones += 1;
        }

        console.log(`Acciones calculadas: ${acciones}`);
        return acciones;
    }

    // Otros métodos para manejar personajes (subir de nivel, etc.)
}

// Exportar la instancia de Player para usarla en otros módulos
const playerInstance = new Player();
export default playerInstance;
