// habilidades.js

import { crearHabilidades } from './constructorHabilidades.js';

class Habilidades {
    constructor() {
        // Utilizamos la función importada para obtener las habilidades por clase
        this.habilidadesPorClase = crearHabilidades();
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

    // Método para construir la ruta del retrato automáticamente
    obtenerRutaRetrato(clase, id) {
        return `retratos/habilidades/${clase.toLowerCase()}/${id}.png`;
    }

    // Método para permitir que el jugador seleccione habilidades manualmente
    seleccionarHabilidades(clase, intelecto) {
        const habilidadesDisponibles = this.obtenerHabilidadesPorClase(clase);
        const cantidadMaxima = this.calcularCantidadHabilidades(intelecto);

        if (habilidadesDisponibles.length === 0) {
            console.error('No hay habilidades disponibles para esta clase.');
            return [];
        }

        console.log(`Habilidades disponibles para ${clase}:`);
        habilidadesDisponibles.forEach((habilidad, index) => {
            const retrato = this.obtenerRutaRetrato(clase, habilidad.id);
            console.log(`${index + 1}. ${habilidad.nombre} (ID: ${habilidad.id}) - ${habilidad.descripcion} - Poder: ${habilidad.poder}, Alcance: ${habilidad.alcance}, Retrato: ${retrato}`);
        });
        console.log(`Puedes seleccionar hasta ${cantidadMaxima} habilidades.`);

        // Simulación de selección de habilidades por parte del jugador.
        const indicesSeleccionados = [0, 1]; // Por ejemplo, el jugador selecciona la primera y la segunda habilidad
        const habilidadesSeleccionadas = indicesSeleccionados
            .slice(0, cantidadMaxima) // Limitamos a la cantidad máxima de habilidades
            .map(indice => {
                const habilidad = habilidadesDisponibles[indice];
                habilidad.retrato = this.obtenerRutaRetrato(clase, habilidad.id);
                return habilidad;
            });

        console.log('Habilidades seleccionadas:');
        habilidadesSeleccionadas.forEach(habilidad => {
            console.log(`${habilidad.nombre} (ID: ${habilidad.id}) - Poder: ${habilidad.poder}, Alcance: ${habilidad.alcance}, Retrato: ${habilidad.retrato}`);
        });

        return habilidadesSeleccionadas;
    }
}

// Exportar la instancia de Habilidades para usarla en otros módulos
const habilidadesInstance = new Habilidades();
export default habilidadesInstance;
