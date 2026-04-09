import { getMaxCapacity } from "../../services/capacityFilter";

export default function DescriptionDetail({ product }) {
    //On récup la description du produit
    const descriptionText = product?.description || "Hébergement confortable et bien situé, idéal pour profiter pleinement de votre séjour en camping.";

    // Calcul de la capacité maximale
    const maxCapacity = getMaxCapacity(product?.title);

    return (
        <div>
            <div className="h-px w-full bg-plum-100 mb-4" />
            <h2 className="text-xl font-medium text-plum-900 mb-3">Descriptif de l'hébergement</h2>
            <p className="text-plum-700 leading-relaxed whitespace-pre-line">
                {descriptionText}
            </p>
            <br />
            <p className="text-plum-700 leading-relaxed whitespace-pre-line">
               Le {product?.title} peut accueillir jusqu'à {maxCapacity} personnes .
            </p>
        </div>
    );
}