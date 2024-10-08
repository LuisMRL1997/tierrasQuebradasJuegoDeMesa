// miniMax.js

export function addResizeFunctionality(characterDiv) {
    // Asegurarse de que characterDiv es un personaje antes de agregar la funcionalidad
    if (characterDiv.classList.contains('character-item')) {
        const resizeBtn = document.createElement('button');
        resizeBtn.classList.add('resize-btn');
        resizeBtn.innerText = '↕'; // Botón con el símbolo de minimizar/maximizar
        characterDiv.appendChild(resizeBtn); // Agregar el botón al contenedor de personaje

        resizeBtn.addEventListener('click', (event) => {
            event.stopPropagation(); // Evitar que el evento de clic en el botón active otros eventos
            characterDiv.classList.toggle('minimized'); // Alterna la clase 'minimized'
        });

        // Para pantallas táctiles (eventos touch)
        resizeBtn.addEventListener('touchstart', (event) => {
            event.preventDefault(); // Previene el comportamiento por defecto
            event.stopPropagation(); // Evitar que se active otro evento
            characterDiv.classList.toggle('minimized'); // Alternar la clase 'minimized'
        });
    }
}

// Función para agregar funcionalidad de minimizar/maximizar a un botón
export function addMinMaxFunctionality(button, container) {
    button.addEventListener('click', () => {
        container.classList.toggle('minimized');
        // Cambiar el texto del botón según el estado del contenedor
        if (container.classList.contains('minimized')) {
            button.innerText = '🔼'; // Cambiar a símbolo de maximizar
        } else {
            button.innerText = '🔽'; // Cambiar a símbolo de minimizar
        }
    });
}
