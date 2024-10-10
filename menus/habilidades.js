// habilidades.js

class Habilidades {
    constructor() {
        this.habilidadesPorClase = {
            aruspice: [
                {
                    id: 1,
                    nombre: 'Golpe Virtuoso',
                    descripcion: 'Potencia tus armas, asestando un gran golpe al enemigo.',
                    poder: 4,
                    alcance: 1
                },
                {
                    id: 2,
                    nombre: 'Expiacion',
                    descripcion: 'Ataca al rival con energiasagrada de la virtud y debilita el proximo ataque que haga.',
                    poder: 4,
                    alcance: 1
                },
                {
                    id: 3,
                    nombre: 'Rafaga de Espinas',
                    descripcion: 'Ataca con espinas al objetivo y lo vuelve bulnerable a estas, duplicando el daño que recibes de espinas.',
                    poder: 2,
                    alcance: 1
                },
                {
                  id: 4,
                  nombre: 'Luz Sagrada',
                  descripcion: 'Te sanas a ti o al aliado seleccionado.',
                  poder: 4,
                  alcance: 3
                },
                {
                  id: 5,
                  nombre: 'Potenciar',
                  descripcion: 'Te potencias a ti o al aliado seleccionado, aumentando el próximo ataque que hace y dandole una proteccion de hechizos.',
                  poder: 6,
                  alcance: 3
                },
                {
                  id: 6,
                  nombre: 'Piel de espinas',
                  descripcion: 'Hace crecer espinas en ti o en el aliado seleccionado, lo que devuelve parte del daño recibido.',
                  poder: 1,
                  alcance: 3
                }
            ],
            evocador: [
                {
                    id: 4,
                    nombre: 'Golpe Heroico',
                    descripcion: 'Un golpe devastador que inflige gran daño.',
                    poder: 40,
                    alcance: 1
                },
                {
                    id: 5,
                    nombre: 'Corte Mortal',
                    descripcion: 'Un corte veloz que daña a los enemigos cercanos.',
                    poder: 35,
                    alcance: 1
                },
                {
                    id: 6,
                    nombre: 'Torbellino',
                    descripcion: 'Un ataque giratorio que golpea a múltiples enemigos.',
                    poder: 25,
                    alcance: 2
                }
            ],
            // Agrega más clases y habilidades según sea necesario
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
        // Supongamos que el jugador ingresa los números de las habilidades que desea seleccionar.
        // En una aplicación real, esto sería una entrada de usuario (por ejemplo, a través de una interfaz gráfica).

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
