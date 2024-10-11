import { abrirModal, cerrarModal } from './modal.js'; // Importar funciones de apertura/cierre de modal

export let habilidadesSeleccionadas = []; // Array para almacenar habilidades seleccionadas temporalmente

// Función para mostrar las habilidades del personaje en el modal
export function mostrarHabilidades(personajeId, playerInstance, habilidadesInstance) {
    const personaje = playerInstance.personajes.find(p => p.id == personajeId);
    const habilidades = habilidadesInstance.obtenerHabilidadesPorClase(personaje.selectedClass);
    const maxHabilidades = habilidadesInstance.calcularCantidadHabilidades(personaje.intellect);

    const listaHabilidades = document.getElementById('listaHabilidades');
    listaHabilidades.innerHTML = ''; // Limpiar la lista antes de agregar nuevas habilidades
    habilidadesSeleccionadas = []; // Reiniciar la lista de habilidades seleccionadas

    habilidades.forEach((habilidad) => {
        const li = document.createElement('li');
        
        // Crear el checkbox para seleccionar la habilidad
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = habilidad.nombre;

        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                if (habilidadesSeleccionadas.length < maxHabilidades) {
                    habilidadesSeleccionadas.push(habilidad);
                } else {
                    checkbox.checked = false; // Evitar seleccionar más de las permitidas
                    alert(`Solo puedes seleccionar hasta ${maxHabilidades} habilidades.`);
                }
            } else {
                habilidadesSeleccionadas = habilidadesSeleccionadas.filter(h => h.nombre !== habilidad.nombre);
            }
        });

        // Agregar todos los detalles de la habilidad: retrato, nombre, descripción, poder y alcance
        const retrato = habilidadesInstance.obtenerRutaRetrato(personaje.selectedClass, habilidad.id);
        
        li.innerHTML = `
            <img src="${retrato}" alt="Retrato de ${habilidad.nombre}" class="habilidad-retrato">
            <strong>${habilidad.nombre}</strong><br>
            <em>${habilidad.descripcion}</em><br>
            <strong>Poder:</strong> ${habilidad.poder}<br>
            <strong>Alcance:</strong> ${habilidad.alcance}
        `;

        // Añadir el checkbox al elemento de lista
        li.prepend(checkbox);
        listaHabilidades.appendChild(li);
    });

    // Asignar clases dinámicamente según la clase del personaje al modal y botones
    const modal = document.getElementById('modalHabilidades');
    const botonConfirmar = document.getElementById('confirmarHabilidades');
    const botonCerrar = document.querySelector('.close-modal');
    
    // Remover clases anteriores
    modal.classList.remove('modal-aruspice', 'modal-conjurador', 'modal-evocador', 'modal-arcanista');
    botonConfirmar.classList.remove('class-aruspice', 'class-conjurador', 'class-evocador', 'class-arcanista');
    botonCerrar.classList.remove('class-aruspice', 'class-conjurador', 'class-evocador', 'class-arcanista');

    let claseModal = '';
    switch (personaje.selectedClass.toLowerCase()) {
        case 'aruspice':
            claseModal = 'modal-aruspice';
            break;
        case 'conjurador':
            claseModal = 'modal-conjurador';
            break;
        case 'evocador':
            claseModal = 'modal-evocador';
            break;
        case 'arcanista':
            claseModal = 'modal-arcanista';
            break;
    }

    // Agregar la clase al modal y a los botones dentro del modal
    modal.classList.add(claseModal);
    botonConfirmar.classList.add(claseModal.replace('modal-', 'class-'));
    botonCerrar.classList.add(claseModal.replace('modal-', 'class-'));

    abrirModal('modalHabilidades'); // Abrir el modal de habilidades
}

// Confirmar selección de habilidades
export function confirmarHabilidades() {
    console.log('Habilidades seleccionadas:', habilidadesSeleccionadas);
    cerrarModal('modalHabilidades'); // Ocultar el modal
}

// Event listeners para confirmar y cerrar el modal
document.getElementById('confirmarHabilidades').addEventListener('click', confirmarHabilidades);
