import { IMAGE_URL } from "./apiConstant";
// ====================
// CLE DU LOCAL STORAGE
// ====================
export const USER_INFOS = "userInfos"


// ====================
// CONFIG DES ROLES
// ====================
export const ROLES = {
    ADMIN: "ADMIN",
    USER: "USER",
    OWNER: "OWNER"
};

// ============================
// CONFIG DE LA NAVBAR/FOOTER
// ============================

//Navigation principale 
export const dataNavbar = [
    { title: "Accueil", path: "/"},
    { title: "Hebergement", path: "/biens" },
]

// ============================
// CONFIG DE MA SECTION HOME PAGE
// ============================

export const dataSections = [
  {
    id: "decouverte",
    badge: "Le Domaine",
    title: "Un havre de paix en pleine nature",
    description: "Plongez dans l'atmosphère unique de notre camping. Situé à l'ombre des pins, profitez d'un cadre verdoyant exceptionnel pour vous ressourcer en famille ou entre amis.",
    imageUrl: `${IMAGE_URL}/Home/lilas.jpg`, 
    reversed: false
  },
  {
    id: "hebergements",
    badge: "Confort",
    title: "Des hébergements tout équipés",
    description: "Du mobil-home premium avec terrasse ombragée aux emplacements nus pour tentes et caravanes, trouvez l'espace qui correspond à vos envies de vacances.",
    imageUrl: `${IMAGE_URL}/Home/lilas.jpg`,
    reversed: true // pr inverser l'image et le texte
  },
  {
    id: "activites",
    badge: "Loisirs",
    title: "Des activités pour tous",
    description: "Piscine chauffée, terrains de pétanque, club enfants et soirées animées : tout est pensé pour créer des souvenirs inoubliables sous le soleil du Sud.",
    imageUrl: `${IMAGE_URL}/Home/lilas.jpg`,
    reversed: false
  }
];

// ================================================
// CONFIG DE LA SEARCH BAR (Type de logement)
// ================================================

export const TYPES = [
    { label: "Tous", value: "" },
    { label: "Mobilhome", value: "M-H" },
    { label: "Caravane", value: "Caravane" },
    { label: "Emplacement", value: "Emplacement" },
];

// ============================
// CONFIG DES TAXES SEJOUR ET PISCINE
// ============================

export const TAX_RATES = {
    sejour: {
        adulte: 0.60,
        enfant: 0.35,
    },
    piscine: {
        adulte: 1.50,
        enfant: 1.00,
    },
};