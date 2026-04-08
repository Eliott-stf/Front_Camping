/**
 * Calcule la remise par tranche de 7 jours
 * 5% par tranche de 7 jours
 */
export const getDiscount = (nbNights) => {
    const tranches = Math.floor(nbNights / 7);
    return tranches * 0.05; 
};