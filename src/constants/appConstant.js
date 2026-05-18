import { FaCampground } from "react-icons/fa";
import { IMAGE_URL } from "./apiConstant";
import { MdOutlineAttachMoney, MdOutlineCalendarViewWeek, MdOutlinePeople, MdOutlineSimCardAlert } from "react-icons/md";
import { TbReceiptEuro } from "react-icons/tb";
import { Calendar, ShieldAlert } from "lucide-react";
import { CiCalendar } from "react-icons/ci";
// ====================
// CLE DU LOCAL STORAGE
// ====================
export const USER_INFOS = "userInfos"


// ====================
// CONFIG DES ROLES
// ====================
export const ROLES = {
    ADMIN: "ROLE_ADMIN",
    USER: "ROLE_USER",
    OWNER: "ROLE_OWNER"
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
// CONFIG DU DASHBOARD
// ============================

//Navigation principale 
export const dataDashboard = [
    { title: "Planning", path: "/admin/planning", icon: CiCalendar },
    { title: "Biens", path: "/admin/biens", icon: FaCampground },
    { title: "Facturation", path: "/admin/facture", icon: TbReceiptEuro },
    { title: "Propriétaires", path: "/admin/proprietaires", icon: MdOutlinePeople },
    { title: "Alertes", path: "/admin/alertes", icon: MdOutlineSimCardAlert },
    { title: "Retributions", path: "/admin/retribution", icon: MdOutlineAttachMoney },
]

//Navigation principale 
export const dataDashboardOwner = [
    { title: "Planning", path: "/owner/planning", icon: CiCalendar },
    { title: "Retributions", path: "/owner/retribution", icon: MdOutlineAttachMoney },
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

// ============================
// CONFIG DES CATEGORIES POUR ADMIN
// ============================
export const CATEGORIES = ['Tous', 'MH Locatif', 'MH Propriétaire', 'Caravane', 'Emplacement', 'Services'];

// ============================
// CONFIG DES CONST POUR PLANNER 
// ============================
export const TIMELINE_CSS = `
  .rct-header-root { background: #fdfafb !important; border-bottom: 1px solid #e9d5f0 !important; }
  .rct-calendar-header { border-color: #e9d5f0 !important; }
  .rct-label-group { background: #fdfafb !important; color: #581c87 !important; font-size: 12px !important; font-weight: 600 !important; text-transform: capitalize !important; border-color: #e9d5f0 !important; }
  .rct-label { background: #fdfafb !important; color: #7e22ce !important; font-size: 11px !important; font-weight: 600 !important; border-color: #e9d5f0 !important; }
  .rct-dateHeader { background: #fdfafb !important; border-left-color: #e9d5f0 !important; color: #7e22ce !important; font-size: 11px !important; font-weight: 500 !important; }
  .rct-dateHeader-primary { background: #fdfafb !important; color: #581c87 !important; font-size: 12px !important; font-weight: 600 !important; text-transform: capitalize !important; }
  .rct-sidebar { border-right: 1px solid #e9d5f0 !important; background: #ffffff !important; }
  .rct-sidebar-row { border-bottom: 1px solid #f4e8f9 !important; background: transparent !important; padding: 0 !important; }
  .rct-sidebar-row:hover { background: #fdfafb !important; }
  .rct-horizontal-lines .rct-hl-even, .rct-horizontal-lines .rct-hl-odd { border-bottom: 1px solid #f4e8f9 !important; background: transparent !important; }
  .rct-vertical-lines .rct-vl { border-left: 1px solid #f4e8f9 !important; }
  .rct-vertical-lines .rct-vl.rct-day-6, .rct-vertical-lines .rct-vl.rct-day-0 { background: rgba(126, 34, 206, 0.04) !important; }
  .rct-cursor-line { border-left: 2px solid #7e22ce !important; opacity: 0.6; }
  .rct-item { line-height: 28px !important; border-radius: 4px !important; border: none !important; }
  .rct-item .rct-item-content { padding: 0 8px !important; font-size: 10px !important; font-weight: 600 !important; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .rct-item:hover { filter: brightness(1.1); cursor: pointer; }
`;

// ─── CONFIG CATÉGORIES ─────────────────────────────────────────────────────────
export const TYPE_CONFIG = {
  "MH Propriétaire": { label: "MH Propriétaire", color: "#6b21a8" },
  "MH Locatif":      { label: "MH Locatif",       color: "#7e22ce" },
  "Emplacement":     { label: "Emplacement",       color: "#9333ea" },
  "Caravane":        { label: "Caravane",          color: "#a855f7" },
};

export const ALL_TYPES = Object.keys(TYPE_CONFIG);
