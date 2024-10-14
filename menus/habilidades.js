// habilidades.js

import { crearHabilidades } from './constructorHabilidades.js';

class Habilidades {
    crearHabilidadesConstructor (selectedClass, poderAtaque, movimientos){
        // Utilizamos la función importada para obtener las habilidades por clase
        this.habilidadesPorClase = crearHabilidades(poderAtaque, movimientos);
    
}
    // Método para obtener las habilidades disponibles según la clase del jugador
    obtenerHabilidadesPorClase(clase) {
        const claseLower = clase.toLowerCase();
        return this.habilidadesPorClase[claseLower] || [];
    }

    // Método para construir la ruta del retrato automáticamente
    obtenerRutaRetrato(clase, id) {
        return `retratos/habilidades/${clase.toLowerCase()}/${id}.png`;
    }

    // Método para permitir que el jugador seleccione habilidades manualmente
    seleccionarHabilidades(clase) {
        const habilidadesDisponibles = this.obtenerHabilidadesPorClase(clase);
        const habilidadesSeleccionadas = []; // Inicializa un arreglo para las habilidades seleccionadas

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

        // Aquí deberías implementar la lógica para que el jugador seleccione habilidades
        // Suponiendo que las habilidades seleccionadas se almacenan en el arreglo habilidadesSeleccionadas
        console.log('Habilidades seleccionadas:');
        habilidadesSeleccionadas.forEach(habilidad => {
            console.log(`${habilidad.nombre} (ID: ${habilidad.id}) - Poder/Curación: ${habilidad.poder}, Alcance: ${habilidad.alcance}, Retrato: ${habilidad.retrato}`);
        });

        return habilidadesSeleccionadas;
    }
    

    // Método para actualizar las habilidades en el modal
    actualizarModalHabilidades(selectedClass, poderAtaque, movimientos) {
        const habilidadesDisponibles = this.crearHabilidadesConstructor(selectedClass, poderAtaque, movimientos);
        console.log(`Habilidades disponibles actualizadas para ${selectedClass}:`, habilidadesDisponibles);
    }
}

// Exportar la instancia de Habilidades para usarla en otros módulos
const habilidadesInstance = new Habilidades();
export default habilidadesInstance;
