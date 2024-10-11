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
                    descripcion: 'Ataca al rival con energia sagrada de la virtud y debilita el proximo ataque que haga.',
                    poder: 3,
                    alcance: 1
                },
                {
                    id: 3,
                    nombre: 'Ráfaga de Espinas',
                    descripcion: 'Arroja  espinas al objetivo que quedan clavadas en el y le infligen daño la proxima vez que ataque.',
                    poder: 3,
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
            conjurador: [
                {
                    id: 1,
                    nombre: 'Furia tormenta',
                    descripcion: 'Elextrifica tus armas para golpear. y te energiza, potenciando el daño de tu siguiente ataque.',
                    poder: 4,
                    alcance: 1
                },
                {
                    id: 2,
                    nombre: 'Impácto Tectónico',
                    descripcion:  'Endurece tus armas y tu cuerpo con el poder de la tirra. Lo que te otorga un escudo contra el próximo golpe que recibas',
                    poder: 3,
                    alcance: 1
                },
                {
                    id: 3,
                    nombre: 'Ráfaga de Fuego',
                    descripcion: 'Ataca al objetivo con un torrente de fuego. Inflige daño extra a los enemigos afectados por Maldición del Fuego.',
                    poder: 4,
                    alcance: 1
                },
                {
                  id: 4,
                  nombre: 'Rayo',
                  descripcion: 'Ataca con una descarga eléctrica de gran alcance.',
                  poder: 4,
                  alcance: 3
                },
                {
                  id: 5,
                  nombre: 'Bendicion del Agua',
                  descripcion: 'Bendices a un aliado o a ti con la tranquilidad del agua. Sanando al instante un poco de vida y aumentando permanente su regeneracion. Cada jugador puede estar afectado únicamente por una bendición a la vez.',
                  poder: 3,
                  alcance: 3
                },
                {
                  id: 6,
                  nombre: 'Maldicion de Fuego',
                  descripcion: 'Maldice a un enemigo con la furia del fuego. Reciben daño al instante y recibiendo daño al final de su turno..',
                  poder: 0,
                  alcance: 3
                }
            ],
            evocador: [
              {
                id: 1,
                nombre: 'Tajo Viridian',
                descripcion: 'Potencia tu arma con cristales de Aquilón, aunentando el daño que inflige y atraviesa parte de la armadura del enemigo.',
                poder: 4,
                alcance: 1
                            },
              {
                id: 2,
                nombre: 'EcoImpacto',
                descripcion: 'Potencia tu arma con los vientos del Aquilón, lo que provoca una explosión de eco alrededor del objetivo que inflige daño a los enemigos cercanos',
                poder: 2,
                alcance: 1
                            },
              {
                id: 3,
                nombre: 'Lanza Viridian',
                descripcion: 'Arroja un filoso cristal al objetivo, que ademas reduce su resistencia para el proximo ataque que reciba.',
                poder: 3,
                alcance: 2
                            },
              {
                id: 4,
                nombre: 'Fuerza Implacable',
                descripcion: 'Utiliza su voz potenciada por los vientos del Aquilón para atacar al objetivo, el cual retrocede una casilla.',
                poder: 3,
                alcance: 1
                            },
              {
                id: 5,
                nombre: 'Barrera Aquilonal',
                descripcion: 'Te proteje a ti o a un aliado con una barrera de cristales viridian, que absorben daño de los proximos 2 ataques.',
                poder: 3,
                alcance: 3
                            },
              {
                id: 6,
                nombre: 'Purga',
                descripcion: 'Elimina un efecto beneficioso de un enemigo o un efecto negativo de un aliado.',
                poder: 0,
                alcance: 3
                            }
                        ],
                arcanista: [
                          {
                            id: 1,
                            nombre: 'Corte Láser',
                            descripcion: 'Potencia tus armas con energia Arcana lo que le deja quemaduras al objetivo, que recibe daño al final de cada turno.',
                            poder: 5,
                            alcance: 1
                                                    },
                          {
                            id: 2,
                            nombre: 'Segar',
                            descripcion: 'Ataca con energia del abismo, infligiendo daño extra y absorbiendo como salud psrte del daño hecho.',
                            poder: 3,
                            alcance: 1
                                                    },
                          {
                            id: 3,
                            nombre: 'Desintegrar',
                            descripcion: 'Ataca con un potente haz de energía que inflige una gran cantidad de daño.',
                            poder: 6,
                            alcance: 2
                                                    },
                          {
                            id: 4,
                            nombre: 'Lluvia de estrellas',
                            descripcion: 'Altera el espacio-tiempo a tu alrededor, provocando que cuando lances un hechizo, el cielo se desgarre y lluevan misiles arcanos sobre todos los enemigos.',
                            poder: 3,
                            alcance: 1
                                                    },
                          {
                            id: 5,
                            nombre: 'Hipnosis',
                            descripcion: 'Adormece al objetivo, eliminando hasta una acción de su próximo turno.',
                            poder: 0,
                            alcance: 0
                                                    },
                          {
                            id: 6,
                            nombre: 'Teletransporte',
                            descripcion: 'Te mueves a traves del espacio-tiempo  hasta la casilla seleccionada. Tiene mas alcance que tus movimientos normales.',
                            poder: 0,
                            alcance: 3
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
