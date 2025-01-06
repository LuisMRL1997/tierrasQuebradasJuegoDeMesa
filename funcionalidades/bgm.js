// Asegurarse de que `backgroundMusic` persista entre páginas
let backgroundMusic = window.backgroundMusic || new Audio('audio/bgm/general/general01.ogg');

// Guardar en `window` si aún no está guardado
if (!window.backgroundMusic) {
  backgroundMusic.loop = true; // Configuración para repetir la música
  window.backgroundMusic = backgroundMusic;
}

// Función para alternar la música
function toggleMusic() {
  if (backgroundMusic.paused) {
    backgroundMusic.play();
    localStorage.setItem('musicPlaying', 'true');
  } else {
    backgroundMusic.pause();
    localStorage.setItem('musicPlaying', 'false');
  }
  updateMusicIcon();
}

// Función para actualizar el icono del botón de música
function updateMusicIcon() {
  const icon = document.getElementById('icon');
  if (icon) {
    icon.innerHTML = backgroundMusic.paused ? '&#128263;' : '&#128264;';
  }
}

// Comprobar si la música debería seguir reproduciéndose en las siguientes páginas
if (localStorage.getItem('musicPlaying') === 'true' && backgroundMusic.paused) {
  backgroundMusic.play().catch(error => console.error("Error al reproducir la música:", error));
}

// Exponer funciones para poder llamarlas desde otras páginas
window.toggleMusic = toggleMusic;
window.updateMusicIcon = updateMusicIcon;
