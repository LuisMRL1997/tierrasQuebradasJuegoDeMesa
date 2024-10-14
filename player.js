// player.js

import { crearHabilidades } from './menus/constructorHabilidades.js';

class Player {
    constructor() {
        this.personajes = this.cargarPersonajes(); // Carga los personajes al inicializar
    }

    async inicializarHabilidades() {
        for (const personaje of this.personajes) {
            await this.crearHabilidadesPersonaje(personaje);
        }
        this.habilidadesPreparadas = true; // Cambia el estado a listo
    }
        // Método para agregar un personaje
        agregarPersonaje(nuevoPersonaje) {
            const nuevoId = this.asignarId(); // Asignamos un ID automáticamente
            if (nuevoId !== null) {
                nuevoPersonaje.id = nuevoId; // Asignar el ID disponible
                
                nuevoPersonaje.habilidadesPosiblesArray = [];
                nuevoPersonaje.habilidadesAprendidas = 0; 
                nuevoPersonaje.habilidadesAprendidasArray = [];
                nuevoPersonaje.talentosAprendidos = 0;
                nuevoPersonaje.talentosAprendidosArray = [];
                nuevoPersonaje.poderAtaque = 0;
                nuevoPersonaje.movimientos = 0;
                nuevoPersonaje.poderArma = 0;
                nuevoPersonaje.resistencia = 0;
                nuevoPersonaje.resistenciaArmadura = 0;
                nuevoPersonaje.resistenciaEscudo = 0;
                nuevoPersonaje.acciones = 2;
                nuevoPersonaje.saludMaxima = 1;
    
                this.personajes.push(nuevoPersonaje); // Agrega el nuevo personaje al arreglo
                this.guardarPersonajes(); // Guarda el arreglo actualizado
                this.actualizarHabilidades(nuevoPersonaje);
            } else {
                console.error('No se pueden agregar más personajes. Todos los IDs están ocupados.');
            }
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
    
    // Método para calcular las habilidades disponibles basado en el intelecto
    calcularHabilidadesDisponibles(personaje) {
        let habilidades = 1 + Math.floor(personaje.intellect / 5); // 1 + 1 por cada 5 puntos de intelecto
        personaje.habilidadesDisponibles = habilidades; // Guardar la cantidad máxima

        console.log(`Habilidades calculadas para ${personaje.playername}: ${personaje.habilidadesDisponibles}`);
        return habilidades; // Retornar el número de habilidades calculadas
    }

    // Método para calcular los talentos disponibles basado en el nivel
    calcularTalentosDisponibles(personaje) {
        let talentosDisponibles = Math.floor((personaje.nivel + 1) / 2); // 1 por cada nivel impar
        personaje.talentosDisponibles = talentosDisponibles; // Guardar la cantidad máxima

        console.log(`Talentos calculados para ${personaje.playername}: ${personaje.talentosDisponibles}`);
        return talentosDisponibles; // Retornar el número de talentos calculados
    }

    // Método para calcular la salud de un personaje
    calcularSalud(personaje) {
        let saludMaxima = 1 + personaje.nivel + (personaje.stamina / 2); // Salud máxima calculada
        personaje.saludMaxima = saludMaxima;

        if (!personaje.hasOwnProperty('saludActual')) {
            personaje.saludActual = saludMaxima; // Asignar salud inicial como salud máxima
        }
        personaje.saludActual = Math.min(personaje.saludActual, saludMaxima);

        console.log(`Salud calculada para ${personaje.playername}: ${personaje.saludActual}/${saludMaxima}`);
        return personaje.saludMaxima = saludMaxima;
    }

    // Método para calcular el poder de ataque
    calcularPoderAtaque(personaje) {
        let poderArma = personaje.poderArma || 0; // Aseguramos que tenga poderArma definido
        let versatilidad = personaje.versatility || 0;
        let selectedClass = personaje.selectedClass;
        let fuerza = personaje.fuerza || 0;
        let arcanistaVersatilidad = 1;
        let arcanistaIntelecto = 0;
        let intelecto = personaje.intellect;
        
            if (selectedClass === 'arcanista') {
                arcanistaVersatilidad += 2;
                arcanistaIntelecto++;
            } 
            let poderStats = ((fuerza + (versatilidad * 7 * arcanistaVersatilidad) + (intelecto * 4 * arcanistaIntelecto)) / 20);

        let poderAtaque = 1 + poderArma + poderStats;
        // Redondear hacia abajo
        poderAtaque = Math.floor(poderAtaque)
        console.log(`Poder de ataque calculado para ${personaje.playername}: ${poderAtaque}`);
        return personaje.poderAtaque = poderAtaque;
    }

// Método para calcular la resistencia del personaje
calcularResistencia(personaje) {
    let resistenciaEscudo = personaje.resistenciaEscudo || 0; // Asegúrate de tener un valor por defecto
    let resistenciaArmadura = personaje.resistenciaArmadura || 0; // Lo mismo aquí
    let agility = personaje.agility || 0; // Y aquí
    let versatility = personaje.versatility || 0; // También aquí
    let nivel = personaje.nivel || 0; // Y aquí
    let selectedClass = personaje.selectedClass;
    let resistenciaStats = (agility * 4) + (versatility * 4);
    let resistenciaEvocador = 0;

    if (selectedClass === 'evocador') {
        resistenciaEvocador = (1 + (nivel / 2));
    }

    let resistencia = resistenciaEscudo + resistenciaArmadura + (resistenciaStats / 20) + resistenciaEvocador;

    // Redondear hacia abajo
    resistencia = Math.floor(resistencia);

    console.log(`Resistencia calculada para ${personaje.playername}: ${resistencia}`);
    return personaje.resistencia = resistencia;
}


    // Método para calcular las acciones del personaje
    calcularAcciones(personaje) {        
        let agility = personaje.agility || 0;
        let accionesStats = (agility/15)
        let accionConjurador = 0;
        let selectedClass = personaje.selectedClass;

        if (selectedClass === 'conjurador') {
            accionConjurador = 1 ;
        }

        let acciones = 2 + accionConjurador + accionesStats;
        acciones = Math.floor(acciones);
        console.log(`Acciones calculadas: ${acciones}`);
        return personaje.acciones=acciones;
    }

    // Método para calcular la cantidad de movimientos del personaje
    calcularMovimientos(personaje) {
        let agility = personaje.agility || 0;
        let aguante = personaje.stamina || 0;
        let versatilidad = personaje.versatilidad || 0;
        let movimientosStats = (agility * 4) + aguante + (versatilidad * 2);
        let movimientos = 1 + Math.floor(movimientosStats / 20);
        movimientos = Math.floor(movimientos);
        console.log(`Movimientos calculados para ${personaje.playername}: ${movimientos}`);
        return personaje.movimientos = movimientos;
    }

    // Método para actualizar habilidades cuando cambian las estadísticas
    actualizarHabilidades(personaje) {
        // Recalcular poder de ataque y movimientos
        this.calcularPoderAtaque(personaje);
        this.calcularMovimientos(personaje);

        // Recalcular habilidades basadas en el nuevo poder de ataque y movimientos
        this.crearHabilidadesPersonaje(personaje);
    }

    // Nuevo método para crear las habilidades, que debe ejecutarse después de calcular el poder de ataque y los movimientos
    crearHabilidadesPersonaje(personaje) {
        const poderAtaque = personaje.poderAtaque;
        const movimientos = personaje.movimientos;
        console.log('Personaje:', personaje);
        console.log('Poder de ataque:', poderAtaque);
        console.log('Movimientos:', movimientos);
        console.log('Selected Class:', personaje.selectedClass);
  
        // Ahora llamamos a crearHabilidades pasando el poder de ataque y los movimientos ya calculados
        personaje.habilidadesDisponiblesArray = crearHabilidades(poderAtaque, movimientos)[personaje.selectedClass.toLowerCase()];
        this.habilidadesPorClase = personaje.habilidadesDisponiblesArray;
        console.log(`Habilidades asignadas a ${personaje.playername}:`, personaje.habilidadesDisponiblesArray);
      
        // Guardamos el personaje nuevamente con las habilidades asignadas
        this.guardarPersonajes();
        
    }

    // Método para subir de nivel
    subirNivel(personaje) {
        personaje.nivel += 1;
        this.actualizarModalHabilidades(personaje); // Actualiza habilidades al subir de nivel
    }

    // Otros métodos para manejar personajes (subir de nivel, etc.)
}

// Exportar la instancia de Player para usarla en otros módulos
const playerInstance = new Player();
export default playerInstance;
