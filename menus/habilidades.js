// habilidades.js

class Habilidades {
    constructor() {
        this.habilidadesPorClase = {
            aruspice: ['Explosión Arcana', 'Misiles Arcanos', 'Escudo Arcano'],
            evocador: ['Golpe Heroico', 'Corte Mortal', 'Torbellino'],
            conjurador: ['Rayo de Hielo', 'Sanación', 'Ráfaga de Viento'],
            arcanista: ['Puñalada', 'Esquivar', 'Ataque Sorpresa'],
            // Puedes agregar más clases y sus respectivas habilidades aquí
        };
    }

    // Método para obtener las habilidades disponibles según la clase del jugador
    obtenerHabilidadesPorClase(clase) {
        const claseLower = clase.toLowerCase();
        return this.habilidadesPorClase[claseLower] || [];
    }

    // Método para calcular cuántas habilidades puede elegir el jugador según su intelecto
    calcularCantidadHabilidades(intelecto) {
        return 1 + Math.floor(intelecto / 5);
    }

    // Método para permitir que el jugador seleccione habilidades
    seleccionarHabilidades(clase, intelecto) {
        const habilidadesDisponibles = this.obtenerHabilidadesPorClase(clase);
        const cantidadMaxima = this.calcularCantidadHabilidades(intelecto);

        if (habilidadesDisponibles.length === 0) {
            console.error('No hay habilidades disponibles para esta clase.');
            return [];
        }

        console.log(`Habilidades disponibles para ${clase}: ${habilidadesDisponibles.join(', ')}`);
        console.log(`Puedes seleccionar hasta ${cantidadMaxima} habilidades.`);

        // Aquí puedes implementar la lógica para que el jugador seleccione las habilidades,
        // por ejemplo, mediante una interfaz de usuario o alguna forma de interacción.
        // En este ejemplo, simplemente seleccionaremos las primeras habilidades disponibles
        // como una simulación.

        const habilidadesSeleccionadas = habilidadesDisponibles.slice(0, cantidadMaxima);
        console.log(`Habilidades seleccionadas: ${habilidadesSeleccionadas.join(', ')}`);

        return habilidadesSeleccionadas;
    }
}

// Exportar la instancia de Habilidades para usarla en otros módulos
const habilidadesInstance = new Habilidades();
export default habilidadesInstance;
