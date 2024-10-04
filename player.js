export class Player {
    constructor(userName, characterName, playerClass) {
        this.userName = userName; // Nombre del usuario
        this.characterName = characterName; // Nombre del personaje
        this.level = 1; // Nivel inicial
        this.playerClass = playerClass; // Clase del jugador
        this.stats = {
            strength: 0,      // Fuerza
            agility: 0,       // Agilidad
            intellect: 0,     // Intelecto
            spirit: 0,        // Espíritu
            stamina: 0,       // Aguante
            unspentPoints: 0,  // Puntos sin utilizar
        };

        // Establecer estadísticas iniciales según la clase
        this.initializeStats();
        
        this.inventory = []; // Inventario
        this.experience = 0; // Barra de experiencia
        this.experienceToLevelUp = 100 + ((this.level - 1) * 53); // Experiencia necesaria para subir de nivel
    }

    // Método para asignar puntos a una estadística específica
    assignPoints(stat, points) {
        if (this.stats.unspentPoints < points) {
            console.log(`${this.characterName}: No tienes suficientes puntos sin utilizar.`);
            return;
        }

        if (this.stats[stat] !== undefined) {
            this.stats[stat] += points;
            this.stats.unspentPoints -= points; // Resta los puntos asignados
        } else {
            console.log(`${this.characterName}: Estadística no válida.`);
        }
    }

    // Método para añadir puntos sin utilizar
    addUnspentPoints(points) {
        this.stats.unspentPoints += points;
    }

    // Método para añadir experiencia y verificar si sube de nivel
    addExperience(points) {
        this.experience += points;
        this.checkLevelUp(); // Verificar si debe subir de nivel
    }

    // Método para verificar y realizar la subida de nivel
    checkLevelUp() {
        while (this.experience >= this.experienceToLevelUp) {
            this.experience -= this.experienceToLevelUp; // Resta la experiencia necesaria
            this.level++; // Sube el nivel
            this.experienceToLevelUp += 50; // Aumenta la experiencia necesaria para el siguiente nivel
            console.log(`${this.characterName} ha subido al nivel ${this.level}!`);
        }
    }

    // Método para mostrar las estadísticas del jugador
    displayStats() {
        console.log(`--- ${this.characterName} ---`);
        console.log(`Usuario: ${this.userName}`);
        console.log(`Clase: ${this.playerClass}`);
        console.log(`Nivel: ${this.level}`);
        console.log(`Fuerza: ${this.stats.strength}`);
        console.log(`Agilidad: ${this.stats.agility}`);
        console.log(`Intelecto: ${this.stats.intellect}`);
        console.log(`Espíritu: ${this.stats.spirit}`);
        console.log(`Aguante: ${this.stats.stamina}`);
        console.log(`Puntos sin utilizar: ${this.stats.unspentPoints}`);
        console.log(`Experiencia: ${this.experience}/${this.experienceToLevelUp}`);
        console.log(`Inventario: ${this.inventory.length} items`);
    }
}
