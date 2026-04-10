import { useAuthContext } from "../../contexts/AuthContext";

export default function PricingCard({ prix, onReserve }) {
    
const { userId } = useAuthContext();

    return (
        <div className="bg-white rounded-2xl border border-plum-100 shadow-sm p-6 flex flex-col gap-3 h-fit">
            {prix ? (
                <>
                    <div className="flex justify-between text-sm text-plum-700">
                        <span>Durée</span>
                        <span>{prix.nbNights + 1} jours</span>
                    </div>
                    <div className="flex justify-between text-sm text-plum-700">
                        <span>Prix de base</span>
                        <span>{prix.prixBase}€</span>
                    </div>

                    {prix.discountRate > 0 && (
                        <div className="flex justify-between text-sm text-green-600">
                            <span>Remise ({prix.discountRate * 100}%)</span>
                            <span>-{prix.montantRemise}€</span>
                        </div>
                    )}

                    <div className="flex justify-between text-sm text-plum-700">
                        <span>Taxe de séjour</span>
                        <span>{prix.taxeSejour}€</span>
                    </div>

                    {prix.prixServices > 0 && (
                        <div className="flex justify-between text-sm text-plum-700">
                            <span>Accès piscine</span>
                            <span>{prix.prixServices}€</span>
                        </div>
                    )}

                    <div className="border-t border-plum-100 pt-3 flex justify-between font-medium text-plum-950 text-lg">
                        <span>Total</span>
                        <span>{prix.total}€</span>
                    </div>
                </>
            ) : (
                <p className="text-plum-500 text-sm text-center">
                    Revenez depuis la recherche pour voir le prix calculé.
                </p>
            )}

            <button
                onClick={onReserve}
                disabled={!prix}
                className="mt-2 w-full py-3 bg-plum-600 text-white font-medium rounded-xl hover:bg-plum-700 transition-all disabled:opacity-50"
            >
                {userId ? "Je réserve ce séjour" : "Connectez-vous pour réserver"}
            </button>
        </div>
    );
}