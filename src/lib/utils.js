import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { API_ROOT } from "../constants/apiConstant";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Retourne l'URL complète d'une image (gère URLs complètes et chemins relatifs)
export function getImageUrl(path, fallback = null) {
  if (!path) return fallback;
  // Si c'est déjà une URL complète, l'utiliser directement
  if (path.startsWith('http')) return path;
  // Sinon ajouter l'API_ROOT
  return `${API_ROOT}${path}`;
}