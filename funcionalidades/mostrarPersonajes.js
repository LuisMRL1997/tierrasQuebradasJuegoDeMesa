import playerInstance from '../player.js'; // Importar la instancia de Player desde player.js
import habilidadesInstance from '../menus/habilidades.js'; // Importar la instancia de habilidades.js
import { abrirModal } from './modal.js'; // Importar la lógica para abrir el modal
import { mostrarHabilidades } from './modalHabilidades.js'; // Importar la lógica para mostrar habilidades

// Función para mostrar personajes en el HTML
export function mostrarPersonajes() {
    const personajes = playerInstance.cargarPersonajes(); // Cargar personajes desde player.js
    const personajesContainer = document.getElementById('personajesContainer');
    const aceptarButton = document.getElementById('aceptar');

    if (personajes.length === 0) {
        personajesContainer.innerHTML = '<p>No hay personajes almacenados.</p>'; // Mensaje si no hay personajes
        return; 
    }

    personajes.forEach((personaje, index) => {
        const saludMaxima = playerInstance.calcularSalud(personaje); // Calcula la salud máxima
        const habilidadesDisponibles = playerInstance.calcularHabilidadesDisponibles(personaje);
        const talentosDisponibles = playerInstance.calcularTalentosDisponibles(personaje);
        const poderAtaque = playerInstance.calcularPoderAtaque(personaje); // Calcula el poder de ataque
        const resistencia = playerInstance.calcularResistencia(personaje); // Calcula la resistencia
        const movimientos = playerInstance.calcularMovimientos(personaje); // Calcula los movimientos
        playerInstance.crearHabilidadesPersonaje(personaje);

        const personajeDiv = document.createElement('div');
        personajeDiv.className = 'personaje';

        // Comprobar si selectedPortrait está definido
        let portraitSrc = '';
        if (personaje.selectedPortrait) {
            const basePath = `retratos/jugadores/${personaje.selectedClass}/`;
            const portraitId = personaje.selectedPortrait.split('-')[1];
            portraitSrc = `${basePath}${portraitId.padStart(2, '0')}.png`; // Formato '01.png', '02.png', etc.
        } else {
            portraitSrc = 'retratos/jugadores/aruspice/01.png'; // Ruta a un retrato por defecto
        }

        personajeDiv.innerHTML = `
            <h2>Jugador Nº (${personaje.id})</h2>
            <img src="${portraitSrc}" alt="Retrato de ${personaje.playername}" class="personaje-retrato">
            <p><strong>Nombre del Jugador:</strong> ${personaje.playername} (${personaje.username})</p>
            <p><strong>Clase:</strong> ${personaje.selectedClass}</p>
            <p><strong>Nivel:</strong> ${personaje.nivel || 1}</p> 
            <p><strong>Salud:</strong> ${personaje.saludActual}/${saludMaxima}</p> 
            <p><strong>Fuerza:</strong> ${personaje.strength}</p>
            <p><strong>Agilidad:</strong> ${personaje.agility}</p>
            <p><strong>Intelecto:</strong> ${personaje.intellect}</p>
            <p><strong>Espíritu:</strong> ${personaje.spirit}</p>
            <p><strong>Aguante:</strong> ${personaje.stamina}</p>
            <p><strong>Versatilidad:</strong> ${personaje.versatility || 0}</p> 
            <p><strong>Poder de Ataque:</strong> ${personaje.poderAtaque}</p> 
            <p><strong>Resistencia:</strong> ${personaje.resistencia}</p>
            <p><strong>Movimientos:</strong> ${personaje.movimientos}</p>

            <!-- Añadimos la nueva información de talentos y habilidades -->
            <p><strong>Habilidades:</strong> ${personaje.habilidadesAprendidas}/${personaje.habilidadesDisponibles}</p>
            <p><strong>Talentos:</strong> ${personaje.talentosAprendidos}/${personaje.talentosDisponibles}</p>
        `;

        // Crear un botón para ver las habilidades del personaje
        const botonHabilidades = document.createElement('button');
        botonHabilidades.textContent = 'Aprender Habilidades';
        
        // Asignar la clase al botón según la clase del personaje
        let claseBoton = '';
        switch (personaje.selectedClass.toLowerCase()) {
            case 'aruspice':
                claseBoton = 'class-aruspice';
                break;
            case 'conjurador':
                claseBoton = 'class-conjurador';
                break;
            case 'evocador':
                claseBoton = 'class-evocador';
                break;
            case 'arcanista':
                claseBoton = 'class-arcanista';
                break;
            default:
                claseBoton = '';
        }
        botonHabilidades.className = `boton-habilidades ${claseBoton}`; // Añadir clase dinámica
        personajeDiv.appendChild(botonHabilidades);
        personajesContainer.appendChild(personajeDiv);

        // Añadir el evento para mostrar habilidades al botón
        botonHabilidades.addEventListener('click', () => {
            // Actualiza las habilidades en el modal antes de abrirlo
            let poderAtaque = personaje.poderAtaque;
            let movimientos = personaje.movimientos;
            let selectedClass = personaje.selectedClass;
            habilidadesInstance.actualizarModalHabilidades(selectedClass, poderAtaque, movimientos);
            mostrarHabilidades(personaje.id, playerInstance, habilidadesInstance);
            abrirModal(modalHabilidades); // Abrir el modal
            
        });

        // Asignar clase dinámica al botón "Aceptar" según el primer personaje
        if (index === 0) {
            aceptarButton.className = `aceptar-boton ${claseBoton}`;
        }
    });
}

// Redirigir a la página del juego al hacer clic en "Aceptar"
document.getElementById('aceptar').addEventListener('click', () => {
    window.location.href = 'game.html';
}); 
