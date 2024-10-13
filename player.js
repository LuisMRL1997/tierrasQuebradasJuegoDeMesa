import habilidadesInstance from './menus/habilidades.js';

class Player {
    constructor() {
        this.personajes = this.cargarPersonajes(); // Carga los personajes al inicializar
    }

    // Función para cargar personajes desde localStorage
    cargarPersonajes() {
        try {
            const personajesJSON = localStorage.getItem('personajes');
            return personajesJSON ? JSON.parse(personajesJSON) : [];
        } catch (error) {
            console.error("Error al cargar personajes del localStorage:", error);
            return [];
        }
    }

    guardarPersonajes() {
        try {
            localStorage.setItem('personajes', JSON.stringify(this.personajes));
        } catch (error) {
            console.error("Error al guardar personajes en el localStorage:", error);
        }
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
            
            nuevoPersonaje.habilidadesAprendidas = 0; // Inicia vacío 
            nuevoPersonaje.habilidadesAprendidasArray = []; // Inicia vacío
            nuevoPersonaje.talentosAprendidos = 0; // Inicia vacío 
            nuevoPersonaje.talentosAprendidosArray = []; // Inicia vacío 

            this.personajes.push(nuevoPersonaje); // Agrega el nuevo personaje al arreglo
            this.guardarPersonajes(); // Guarda el arreglo actualizado
        } else {
            console.error('No se pueden agregar más personajes. Todos los IDs están ocupados.');
        }
    }

// Método para calcular las habilidades disponibles basado en el intelecto
calcularHabilidadesDisponibles(personaje) {
    const habilidades = 1 + Math.floor(personaje.intellect / 5); // 1 + 1 por cada 5 puntos de intelecto
    personaje.habilidadesDisponibles = habilidades; // Guardar la cantidad máxima

    console.log(`Habilidades calculadas para ${personaje.playername}: ${personaje.habilidadesDisponibles}`);
    return habilidades; // Retornar el número de habilidades calculadas
}


// Método para calcular los talentos disponibles basado en el nivel
calcularTalentosDisponibles(personaje) {
    const talentosDisponibles = Math.floor((personaje.nivel + 1) / 2); // 1 por cada nivel impar
    personaje.talentosDisponibles = talentosDisponibles; // Guardar la cantidad máxima

    console.log(`Talentos calculados para ${personaje.playername}: ${personaje.talentosDisponibles}`);
    return talentosDisponibles; // Retornar el número de talentos calculados
}

    // Método para calcular la salud de un personaje
    calcularSalud(personaje) {
        const saludMaxima = 1 + personaje.nivel + (personaje.stamina / 2); // Salud máxima calculada
        personaje.saludMaxima = saludMaxima;

        if (!personaje.hasOwnProperty('saludActual')) {
            personaje.saludActual = saludMaxima; // Asignar salud inicial como salud máxima
        }
        personaje.saludActual = Math.min(personaje.saludActual, saludMaxima);

        console.log(`Salud calculada para ${personaje.playername}: ${personaje.saludActual}/${saludMaxima}`);
        return saludMaxima;
    }

    // Método para calcular el poder de ataque
    calcularPoderAtaque(personaje) {
        const poderArma = personaje.poderArma || 0; // Aseguramos que tenga poderArma definido
        const versatilidad = personaje.versatility || 0;
        const selectedClass = personaje.selectedClass ? personaje.selectedClass.toLowerCase() : '';

        let bonificacionVersatilidad = 0;

        if (versatilidad % 3 === 0 && versatilidad > 0) {
            if (selectedClass === 'arcanista') {
                bonificacionVersatilidad = Math.floor(versatilidad / 3) * 3;
            } else {
                bonificacionVersatilidad = Math.floor(versatilidad / 3);
            }
        }

        console.log(`Poder de ataque calculado para ${personaje.playername}: ${1 + poderArma + bonificacionVersatilidad}`);
        return 1 + poderArma + bonificacionVersatilidad;
    }

    // Método para calcular la resistencia del personaje
    calcularResistencia(personaje) {
        const { resistenciaEscudo = 0, resistenciaArmadura = 0, agility = 0, versatility = 0, nivel = 1, selectedClass = '' } = personaje;
        let resistencia = resistenciaEscudo + resistenciaArmadura;

        if (agility % 6 === 0 && agility > 0) {
            resistencia += Math.floor(agility / 6);
        }
        if (versatility % 6 === 0 && versatility > 0) {
            resistencia += Math.floor(versatility / 6);
        }
        if (selectedClass.toLowerCase() === 'evocador') {
            resistencia += 1;
            resistencia += Math.floor(nivel / 3);
        }

        console.log(`Resistencia calculada para ${personaje.playername}: ${resistencia}`);
        return resistencia;
    }

    // Método para calcular las acciones del personaje
    calcularAcciones(personaje) {
        const { agility, selectedClass } = personaje;
        let acciones = 2;

        if (agility % 6 === 0 && agility > 0) {
            acciones += Math.floor(agility / 6);
        }
        if (selectedClass.toLowerCase() === 'conjurador') {
            acciones += 1;
        }

        console.log(`Acciones calculadas: ${acciones}`);
        return acciones;
    }

    // Método para calcular la cantidad de movimientos del personaje
    calcularMovimientos(personaje) {
        const agility = personaje.agility || 0;
        const movimientos = 1 + Math.floor(agility / 6);
        console.log(`Movimientos calculados para ${personaje.playername}: ${movimientos}`);
        return movimientos;
    }

    // Otros métodos para manejar personajes (subir de nivel, etc.)
}

// Exportar la instancia de Player para usarla en otros módulos
const playerInstance = new Player();
export default playerInstance;