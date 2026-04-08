/**
 * Calcule le nombre de nuits entre deux dates
 */
export const getNbNights = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diff = end - start;
    const nights = Math.ceil(diff / (1000 * 60 * 60 * 24));
    
    // Si l'utilisateur met la même date ou une date de départ antérieure
    return nights > 0 ? nights : 1; 
};

/**
 * Retourne la saison pour une date donnée
 * "basse" | "haute" | null (hors période)
 */
export const getSeason = (date) => {
    const d = new Date(date);
    const month = d.getMonth() + 1; // 1-12
    const day = d.getDate();

    // Basse saison : 05 mai au 20 juin
    if ((month === 5 && day >= 5) || (month === 6 && day <= 20)) return "basse";

    // Haute saison : 21 juin au 31 août
    if ((month === 6 && day >= 21) || month === 7 || month === 8) return "haute";

    // Basse saison : 01 septembre au 10 octobre
    if ((month === 9) || (month === 10 && day <= 10)) return "basse";

    return null; // hors période d'ouverture
};

/**
 * Découpe une période en segments basse/haute saison
 * Retourne { basseSaison: nbNuits, hauteSaison: nbNuits }
 */
export const splitSeasonNights = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    let basseSaison = 0;
    let hauteSaison = 0;

    const current = new Date(start);
    while (current < end) {
        const season = getSeason(current);
        if (season === "haute") hauteSaison++;
        else if (season === "basse") basseSaison++;
        current.setDate(current.getDate() + 1);
    }

    return { basseSaison, hauteSaison };
};