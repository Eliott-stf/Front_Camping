import { FaChevronRight } from 'react-icons/fa6';
import { API_ROOT } from '../../constants/apiConstant';

export default function BienCard({ bien, onSelect }) {
  const firstMedia = bien.media?.[0];
  const imgSrc = firstMedia?.path
    ? `${API_ROOT}${firstMedia.path}`
    : 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=200&h=200&auto=format&fit=crop';
  const isProprietaire = bien.user?.some(u => u.isOwner === true);
  const proprio = isProprietaire ? bien.user.find(u => u.isOwner === true) : null;

  return (
    <div
      onClick={() => onSelect(bien)}
      className="carte cursor-pointer group hover:shadow-md hover:border-plum-300 transition-all duration-200 p-3"
    >
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-lg overflow-hidden bg-plum-100 shrink-0">
          <img
            src={imgSrc}
            alt={bien.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0 flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-plum-950 truncate">
              {bien.title}
            </h4>
            {proprio && (
              <p className="text-xs text-plum-400 mt-0.5 truncate">
                Propriétaire : {proprio.name} {proprio.lastname}
              </p>
            )}
            <p className="text-xs text-plum-400 mt-0.5 truncate">
              {bien.type}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="text-base font-bold text-plum-700 font-display">
              {bien.price}€
            </span>
            <FaChevronRight className="w-4 h-4 text-plum-300 group-hover:text-plum-600 transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );
}