// modalHabilidades.js

import { abrirModal, cerrarModal } from './modal.js'; // Importar funciones de apertura/cierre de modal
import playerInstance from '../player.js'; // Ajustar la importación de player.js

export let habilidadSeleccionada = null; // Variable para almacenar la habilidad seleccionada

// Función para mostrar las habilidades del personaje en el modal
export function mostrarHabilidades(personajeId, playerInstance, habilidadesInstance) {
    const personaje = playerInstance.personajes.find(p => p.id == personajeId);
    const habilidades = habilidadesInstance.obtenerHabilidadesPorClase(personaje.selectedClass);

    // Calcular las habilidades disponibles - aprendidas
    const habilidadesDisponibles = playerInstance.calcularHabilidadesDisponibles(personaje);
    const habilidadesAprendidas = personaje.habilidadesAprendidas || 0;
    const habilidadesRestantes = habilidadesDisponibles - habilidadesAprendidas;

    const listaHabilidades = document.getElementById('listaHabilidades');
    listaHabilidades.innerHTML = ''; // Limpiar la lista antes de agregar nuevas habilidades
    habilidadSeleccionada = null; // Reiniciar la habilidad seleccionada

// Mostrar cuántas habilidades se pueden aprender
const habilidadesInfo = document.getElementById('habilidadesInfo');

// Pluralización y mensaje natural
if (habilidadesRestantes === 1) {
    habilidadesInfo.textContent = `Tienes 1 punto de habilidad disponible.`;
} else if (habilidadesRestantes > 1) {
    habilidadesInfo.textContent = `Tienes ${habilidadesRestantes} puntos de habilidad disponibles.`;
} else {
    habilidadesInfo.textContent = `No tienes puntos de habilidad disponibles.`;
}

    habilidades.forEach((habilidad) => {
        const li = document.createElement('li');
        
        // Crear el radio para seleccionar la habilidad (solo una a la vez)
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'habilidad'; // Asegurar que solo se pueda seleccionar uno
        radio.value = habilidad.nombre;

        radio.addEventListener('change', () => {
            if (radio.checked) {
                habilidadSeleccionada = habilidad;
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

        // Añadir el radio al elemento de lista
        li.prepend(radio);
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
    if (habilidadSeleccionada) {
        console.log('Habilidad seleccionada:', habilidadSeleccionada);
        cerrarModal('modalHabilidades'); // Ocultar el modal
    } else {
        alert('Por favor, selecciona una habilidad antes de confirmar.');
    }
}

// Event listeners para confirmar y cerrar el modal
document.getElementById('confirmarHabilidades').addEventListener('click', confirmarHabilidades);
