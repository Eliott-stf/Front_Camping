/**
 * Vérifie si le titre d'un hébergement indique une capacité suffisante par REGEX
 * @param {string} title le titre du bien 
 * @param {number} requestedCapacity nb total de voyageurs
 * @returns {boolean} True si le bien peut accueillir le groupe
 */
export const canAccommodate = (title, requestedCapacity) => {
    if (!title) return false;

    let titleLower = title.toLowerCase();

    // Règle spécifique pour les emplacements 
    if (titleLower.includes('emplacement')) {
        return requestedCapacity <= 6; 
    }

    // Suppression des numéros (attrape "n°19")
    titleLower = titleLower.replace(/(n°)\s*-?\s*\d+/g, '');

    const numbersFound = titleLower.match(/\d+/g);

    // S'il n'y a plus aucun chiffre, on affiche par défaut
    if (!numbersFound) {
        return true; 
    }

    const maxCapacity = Math.max(...numbersFound.map(Number));
    
    return maxCapacity >= requestedCapacity;
};

/**
 * Extrait la capacité maximale d'un titre de produit
 * @param {string} title le titre du bien 
 * @returns {number|null} La capacité max ou null si introuvable
 */
export const getMaxCapacity = (title) => {
    if (!title) return null;

    let titleLower = title.toLowerCase();

    // Règle spécifique pour les emplacements (6 personnes max en général)
    if (titleLower.includes('emplacement')) {
        return 6; 
    }

    // Suppression des numéros d'emplacement (attrape "n°19", "n° 2", etc.)
    titleLower = titleLower.replace(/(n°)\s*-?\s*\d+/g, '');

    // Récupère tous les autres chiffres
    const numbersFound = titleLower.match(/\d+/g);

    // S'il n'y a pas de chiffre, on retourne null pour ne pas afficher de bêtise
    if (!numbersFound) {
        return null; 
    }

    // Retourne le chiffre le plus grand trouvé dans le titre
    return Math.max(...numbersFound.map(Number));
};