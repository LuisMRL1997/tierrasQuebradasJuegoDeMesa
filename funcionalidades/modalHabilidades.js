//modalHabilidades.js
import { abrirModal, cerrarModal } from './modal.js'; // Importar funciones de apertura/cierre de modal

export let habilidadSeleccionada = null; // Variable para almacenar la habilidad seleccionada

// Variables globales
export let personaje = null;
export let habilidades = [];
export let habilidadesDisponibles = 0;
export let habilidadesAprendidas = 0;
export let habilidadesRestantes = 0;

// Función para mostrar las habilidades del personaje en el modal
export function mostrarHabilidades(personajeId, playerInstance, habilidadesInstance) {
    // Asignar valores a las variables globales
    personaje = playerInstance.personajes.find(p => p.id == personajeId);
    habilidades = habilidadesInstance.obtenerHabilidadesPorClase(personaje.selectedClass);
    habilidadesDisponibles = playerInstance.calcularHabilidadesDisponibles(personaje);
    habilidadesAprendidas = personaje.habilidadesAprendidas || 0;
    habilidadesRestantes = habilidadesDisponibles - habilidadesAprendidas;

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
            <strong>Poder/curación:</strong> ${habilidad.poder}<br>
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
        // Verificar que el personaje exista
        if (personaje) {
            // Si no tiene el array de habilidades aprendidas, inicializarlo
            if (!personaje.habilidadesAprendidasArray) {
                personaje.habilidadesAprendidasArray = [];
            }

            // Agregar la habilidad seleccionada al array de habilidades aprendidas
            personaje.habilidadesAprendidasArray.push(habilidadSeleccionada);
            
            // Incrementar el contador de habilidades aprendidas
            personaje.habilidadesAprendidas += 1;


            console.log('Habilidad seleccionada:', habilidadSeleccionada);
            console.log(`Habilidades aprendidas por ${personaje.playername}:`, personaje.habilidadesAprendidasArray);
            
            // Cerrar el modal
            cerrarModal('modalHabilidades');
        } else {
            console.error('Personaje no encontrado');
        }
    } else {
        alert('Por favor, selecciona una habilidad antes de confirmar.');
    }
}

// Event listeners para confirmar y cerrar el modal
document.getElementById('confirmarHabilidades').addEventListener('click', confirmarHabilidades);
