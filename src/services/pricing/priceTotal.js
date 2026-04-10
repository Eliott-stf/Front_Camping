
import { splitSeasonNights } from "./datePrice";
import { getDiscount } from "./discountPrice";
import { getPiscineTax, getSejourTax } from "./taxPrice";


/**
 * Prix de base * nuits en tenant compte de la saisonnalité
 * Utilisé dans la LISTE des biens (sans taxes ni remise)
 */
export const getBasePrice = (pricePerNight, startDate, endDate, nbPersonnes = 1) => {
    const { basseSaison, hauteSaison } = splitSeasonNights(startDate, endDate);

    const prixBasse = basseSaison * pricePerNight * nbPersonnes;
    const prixHaute = hauteSaison * (pricePerNight * 1.15) * nbPersonnes;

    return Math.round(prixBasse + prixHaute);
};

/**
 * Prix des services sélectionnés
 * prix du service × nombre de nuits
 */
export const getServicesPrice = (services, nbAdults, nbChildren, nbNights) => {
    const result = services.reduce((total, service) => {
        //service.price × nbNights
        const servicePrice = service.price * nbNights;
        return total + servicePrice;
    }, 0);
    return result;
};

/**
 * Prix TOTAL avec toutes les contraintes du cahier des charges 
 * Utilisé dans la FICHE DÉTAIL d'un bien
 * @returns {Object} détail complet du prix
 */
export const getFullPrice = (pricePerNight, startDate, endDate, nbAdults, nbChildren, selectedServices = []) => {
    const { basseSaison, hauteSaison } = splitSeasonNights(startDate, endDate);
    const nbNights = basseSaison + hauteSaison;
    const nbPersonnes = nbAdults + nbChildren;

    // Prix de base saisonnier × nb personnes
    const prixBasse = basseSaison * pricePerNight * nbPersonnes;
    const prixHaute = hauteSaison * (pricePerNight * 1.15) * nbPersonnes;
    const prixBase = prixBasse + prixHaute;

    // Prix des services 
    const prixServices = getServicesPrice(selectedServices, nbAdults, nbChildren, nbNights);

    // Remise par tranche de 7 jours
    const discountRate = getDiscount(nbNights);
    const montantRemise = prixBase * discountRate;
    const prixApresRemise = prixBase - montantRemise;

    // Taxes
    const taxeSejour = getSejourTax(nbAdults, nbChildren, nbNights);

    const total = prixApresRemise + taxeSejour + prixServices;

    return {
        nbNights,
        nbPersonnes,
        basseSaison,
        hauteSaison,
        prixBase: Math.round(prixBase),
        discountRate,
        montantRemise: Math.round(montantRemise),
        prixApresRemise: Math.round(prixApresRemise),
        prixServices: Math.round(prixServices * 100) / 100,
        taxeSejour: Math.round(taxeSejour * 100) / 100,
        total: Math.round(total * 100) / 100,
    };
};