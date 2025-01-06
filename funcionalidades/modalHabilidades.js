// modalHabilidades.js
import playerInstance from '../player.js';
import { abrirModal, cerrarModal } from './modal.js'; // Importar funciones de apertura/cierre de modal

export let habilidadSeleccionada = null; // Variable para almacenar la habilidad seleccionada

// Variables globales
export let personaje = null;
export let habilidades = [];
export let habilidadesDisponibles = 0;
export let habilidadesDisponiblesArray = [];
export let habilidadesAprendidas = 0;
export let habilidadesRestantes = 0;

// Función para mostrar las habilidades del personaje en el modal
export function mostrarHabilidades(personajeId, playerInstance, habilidadesInstance) {
    // Asignar valores a las variables globales
    personaje = playerInstance.personajes.find(p => p.id == personajeId);
    playerInstance.crearHabilidadesPersonaje(personaje);
    habilidades = personaje.habilidadesDisponiblesArray;
    habilidadesDisponibles = playerInstance.calcularHabilidadesDisponibles(personaje);
    habilidadesAprendidas = personaje.habilidadesAprendidas || 0;
    habilidadesRestantes = habilidadesDisponibles - habilidadesAprendidas;

    const listaHabilidades = document.getElementById('listaHabilidades');
    if (!listaHabilidades) return;
    listaHabilidades.innerHTML = ''; // Limpiar la lista antes de agregar nuevas habilidades
    habilidadSeleccionada = null; // Reiniciar la habilidad seleccionada

    // Mostrar cuántas habilidades se pueden aprender
    const habilidadesInfo = document.getElementById('habilidadesInfo');
    if (habilidadesInfo) {
        if (habilidadesRestantes === 1) {
            habilidadesInfo.textContent = `Tienes 1 punto de habilidad disponible.`;
        } else if (habilidadesRestantes > 1) {
            habilidadesInfo.textContent = `Tienes ${habilidadesRestantes} puntos de habilidad disponibles.`;
        } else {
            habilidadesInfo.textContent = `No tienes puntos de habilidad disponibles.`;
        }
    }

    habilidades.forEach((habilidad) => {
        const li = document.createElement('li');
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'habilidad';
        radio.value = habilidad.nombre;

        radio.addEventListener('change', () => {
            if (radio.checked) {
                habilidadSeleccionada = habilidad;
            }
        });

        const retrato = habilidadesInstance.obtenerRutaRetrato(personaje.selectedClass, habilidad.id);

        li.innerHTML = `
            <img src="${retrato}" alt="Retrato de ${habilidad.nombre}" class="habilidad-retrato">
            <strong>${habilidad.nombre}</strong><br>
            <em>${habilidad.descripcion}</em><br>
            <strong>Poder/curación:</strong> ${habilidad.poder}<br>
            <strong>Alcance:</strong> ${habilidad.alcance}
        `;

        li.prepend(radio);
        listaHabilidades.appendChild(li);
    });

    const modal = document.getElementById('modalHabilidades');
    const botonConfirmar = document.getElementById('confirmarHabilidades');
    const botonCerrar = document.querySelector('.close-modal');
    if (modal && botonConfirmar && botonCerrar) {
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

        modal.classList.add(claseModal);
        botonConfirmar.classList.add(claseModal.replace('modal-', 'class-'));
        botonCerrar.classList.add(claseModal.replace('modal-', 'class-'));
    }

    abrirModal('modalHabilidades'); // Abrir el modal de habilidades
}

// Confirmar selección de habilidades
export function confirmarHabilidades() {
    if (habilidadSeleccionada) {
        if (personaje) {
            if (!personaje.habilidadesAprendidasArray) {
                personaje.habilidadesAprendidasArray = [];
            }

            personaje.habilidadesAprendidasArray.push(habilidadSeleccionada);
            playerInstance.guardarHabilidades(personaje, habilidadSeleccionada);

            console.log('Habilidad seleccionada:', habilidadSeleccionada);
            console.log(`Habilidades aprendidas por ${personaje.playername}:`, personaje.habilidadesAprendidasArray);

            cerrarModal('modalHabilidades');
        } else {
            console.error('Personaje no encontrado');
        }
    } else {
        alert('Por favor, selecciona una habilidad antes de confirmar.');
    }
}

// Condicionar la ejecución del script según la página
if (document.querySelector('#modalHabilidades')) {
    const botonConfirmar = document.getElementById('confirmarHabilidades');
    if (botonConfirmar) {
        botonConfirmar.addEventListener('click', confirmarHabilidades);
    }
}
