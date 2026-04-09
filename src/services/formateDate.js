export const formaterDate = (dateString) => {
  if (!dateString) return "—";
  
  const date = new Date(dateString);
  const options = { weekday: 'long', day: '2-digit', month: '2-digit' };
  
  // toLocaleDateString('fr-FR') va donner par exemple "lundi 06/04"
  const formatted = date.toLocaleDateString('fr-FR', options);
  
  // On met la première lettre en majuscule
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};