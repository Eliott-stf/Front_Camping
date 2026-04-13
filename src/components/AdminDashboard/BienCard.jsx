import { FaChevronRight } from 'react-icons/fa6';

export default function BienCard({ bien, onSelect }) {
  // Image par défaut si le bien n'en a pas
  const defaultImage = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=200&h=200&auto=format&fit=crop';

  return (
    <div
      onClick={() => onSelect(bien)}
      className="carte cursor-pointer group hover:shadow-md hover:border-plum-300 transition-all duration-200 p-3"
    >
      <div className="flex items-center gap-4">
        {/* Conteneur de l'image */}
        <div className="w-16 h-16 rounded-lg overflow-hidden bg-plum-100 shrink-0">
          <img
            src={bien.imageUrl || bien.photos?.[0] || defaultImage}
            alt={bien.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Infos : Titre et Prix */}
        <div className="flex-1 min-w-0 flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-plum-950 truncate">
              {bien.title}
            </h4>
            {/* Optionnel : afficher un bout de description si besoin */}
            {/* <p className="text-xs text-plum-500 truncate mt-0.5">{bien.description}</p> */}
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="text-base font-bold text-plum-700 font-display">
              {bien.price}
            </span>
            <FaChevronRight className="w-4 h-4 text-plum-300 group-hover:text-plum-600 transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );
}