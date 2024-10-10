// player.js

import habilidadesInstance from './menus/habilidades.js';

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

    // Método para agregar un personaje y asignar habilidades
    agregarPersonaje(nuevoPersonaje) {
        const nuevoId = this.asignarId(); // Asignamos un ID automáticamente
        if (nuevoId !== null) {
            nuevoPersonaje.id = nuevoId; // Asignar el ID disponible

            // Seleccionar habilidades basadas en la clase e intelecto
            const habilidadesSeleccionadas = habilidadesInstance.seleccionarHabilidades(nuevoPersonaje.selectedClass, nuevoPersonaje.intelecto);
            nuevoPersonaje.habilidades = habilidadesSeleccionadas; // Asignar las habilidades al personaje

            this.personajes.push(nuevoPersonaje); // Agrega el nuevo personaje al arreglo
            this.guardarPersonajes(); // Guarda el arreglo actualizado
        } else {
            console.error('No se pueden agregar más personajes. Todos los IDs están ocupados.');
        }
    }

    // Método para calcular la salud de un personaje
    calcularSalud(personaje) {
        const saludMaxima = 1 + personaje.nivel + (personaje.stamina / 2); // Salud máxima calculada
        personaje.saludMaxima = saludMaxima;

        // Si el personaje no tiene saludActual, asigna la salud máxima como valor inicial
        if (!personaje.hasOwnProperty('saludActual')) {
            personaje.saludActual = saludMaxima; // Asignar salud inicial como salud máxima
        }

        // Asegurarse de que la salud actual no sea mayor que la salud máxima
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

    // Método para calcular la resistencia del personaje
    calcularResistencia(personaje) {
        const { resistenciaEscudo = 0, resistenciaArmadura = 0, agility = 0, versatility = 0, nivel = 1, selectedClass = '' } = personaje;

        let resistencia = resistenciaEscudo + resistenciaArmadura;

        // Añadir 1 punto por cada múltiplo de 6 en agilidad
        if (agility % 6 === 0 && agility > 0) {
            resistencia += Math.floor(agility / 6);
        }

        // Añadir 1 punto por cada múltiplo de 6 en versatilidad
        if (versatility % 6 === 0 && versatility > 0) {
            resistencia += Math.floor(versatility / 6);
        }

        // Si la clase es evocador, añadir 1 punto extra
        if (selectedClass.toLowerCase() === 'evocador') {
            resistencia += 1;

            // Añadir 1 punto extra cada 3 niveles
            resistencia += Math.floor(nivel / 3);
        }

        console.log(`Resistencia calculada para ${personaje.playername}: ${resistencia}`);
        return resistencia;
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
