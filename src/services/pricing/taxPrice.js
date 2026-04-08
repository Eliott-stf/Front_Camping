import { TAX_RATES } from "../../constants/appConstant";

/**
 * Calcule la taxe de séjour totale
 */
export const getSejourTax = (nbAdults, nbChildren, nbNights) => {
    const adultes = nbAdults * TAX_RATES.sejour.adulte * nbNights;
    const enfants = nbChildren * TAX_RATES.sejour.enfant * nbNights;
    return adultes + enfants;
};

/**
 * Calcule l'accès piscine total
 */
export const getPiscineTax = (nbAdults, nbChildren, nbNights) => {
    const adultes = nbAdults * TAX_RATES.piscine.adulte * nbNights;
    const enfants = nbChildren * TAX_RATES.piscine.enfant * nbNights;
    return adultes + enfants;
};