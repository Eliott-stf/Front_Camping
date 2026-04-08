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