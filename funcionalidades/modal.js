// modal.js

// Función para abrir un modal
export function abrirModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
    } else {
        console.error(`No se encontró el modal con el ID: ${modalId}`);
    }
}

// Función para cerrar un modal
export function cerrarModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    } else {
        console.error(`No se encontró el modal con el ID: ${modalId}`);
    }
}

// Event listener para cerrar modal con botones que tengan clase 'close-modal'
document.querySelectorAll('.close-modal').forEach(button => {
    button.addEventListener('click', (event) => {
        const modal = event.target.closest('.modal');
        if (modal) {
            modal.style.display = 'none';
        }
    });
});
