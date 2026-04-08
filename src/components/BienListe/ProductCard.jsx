import { Link } from "react-router-dom";
import { API_ROOT } from "../../constants/apiConstant";
import { getNbNights } from "../../services/pricing/datePrice";

export default function ProductCard({ product, startDate, endDate }) {

    const prixTotal = startDate && endDate
        ? (product.price * getNbNights(startDate, endDate))
        : product.price;

    const firstMedia = product.media[0];
    const imgSrc = firstMedia?.path
        ? `${API_ROOT}${firstMedia.path}`
        : null;

    return (
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-plum-50 hover:shadow-md transition-all duration-300 w-full">

            {/* Image avec ratio fixe pour l'alignement de la grille */}
            <div className="relative aspect-[1.2] rounded-2xl overflow-hidden mb-4 bg-plum-100">
                <img
                    src={imgSrc}
                    alt={product.title}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Corps de la carte */}
            <div className="flex flex-col gap-4">

                <div className="flex justify-between items-start gap-2">
                    <div className="flex-1">
                        {/* Titre du bien */}
                        <h3 className="font-display text-lg font-bold text-plum-950 leading-tight line-clamp-2">
                            {product.title}
                        </h3>
                        {/* Sous-titre textuel (remplace l'icône de localisation) */}
                        <p className="text-xs font-medium text-plum-400 mt-1 uppercase tracking-wider">
                            Hébergement disponible
                        </p>
                    </div>

                    {/* Badge de prix épuré */}
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] font-bold text-plum-400 uppercase">
                            a partir de
                        </span>
                        <span className="text-lg font-bold text-plum-900">
                            {prixTotal}€
                        </span>
                    </div>
                </div>

                {/* Séparateur discret */}
                <div className="h-px w-full bg-plum-50" />

                {/* Pied de carte : Bouton d'action textuel */}
                <div className="flex justify-end items-center">
                    <Link
                        to={`/biens/${product.id}`}
                        className="bg-plum-950 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-plum-800 transition-colors inline-block text-center"
                    >
                        RESERVER
                    </Link>
                </div>
            </div>
        </div>
    );
}
