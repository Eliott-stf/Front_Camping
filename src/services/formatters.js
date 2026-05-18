export const formatCurrency = (value) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value);
};

export const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
};