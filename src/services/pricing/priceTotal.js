
import { splitSeasonNights } from "./datePrice";
import { getDiscount } from "./discountPrice";
import { getPiscineTax, getSejourTax } from "./taxPrice";


/**
 * Prix de base * nuits en tenant compte de la saisonnalité
 * Utilisé dans la LISTE des biens (sans taxes ni remise)
 */
export const getBasePrice = (pricePerNight, startDate, endDate) => {
    const { basseSaison, hauteSaison } = splitSeasonNights(startDate, endDate);

    const prixBasse = basseSaison * pricePerNight;
    // +15% haute saison
    const prixHaute = hauteSaison * (pricePerNight * 1.15); 

    return Math.round(prixBasse + prixHaute);
};

/**
 * Prix TOTAL avec toutes les contraintes du cahier des charges 
 * Utilisé dans la FICHE DÉTAIL d'un bien
 * @returns {Object} détail complet du prix
 */
export const getFullPrice = (pricePerNight, startDate, endDate, nbAdults, nbChildren) => {
    const { basseSaison, hauteSaison } = splitSeasonNights(startDate, endDate);
    const nbNights = basseSaison + hauteSaison;

    // Prix de base saisonnier
    const prixBasse = basseSaison * pricePerNight;
    const prixHaute = hauteSaison * (pricePerNight * 1.15);
    const prixBase = prixBasse + prixHaute;

    // Remise par tranche de 7 jours
    const discountRate = getDiscount(nbNights);
    const montantRemise = prixBase * discountRate;
    const prixApresRemise = prixBase - montantRemise;

    // Taxes
    const taxeSejour = getSejourTax(nbAdults, nbChildren, nbNights);
    const taxePiscine = getPiscineTax(nbAdults, nbChildren, nbNights);

    const total = prixApresRemise + taxeSejour + taxePiscine;

    return {
        nbNights,
        basseSaison,
        hauteSaison,
        prixBase: Math.round(prixBase),
        discountRate,
        montantRemise: Math.round(montantRemise),
        prixApresRemise: Math.round(prixApresRemise),
        taxeSejour: Math.round(taxeSejour * 100) / 100,
        taxePiscine: Math.round(taxePiscine * 100) / 100,
        total: Math.round(total * 100) / 100,
    };
};