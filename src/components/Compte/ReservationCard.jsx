import { CiCalendar } from "react-icons/ci";
import { FiUsers } from "react-icons/fi";
import { getNbNights } from "../../services/pricing/datePrice";
import { API_ROOT } from "../../constants/apiConstant";
import { formaterDate } from "../../services/formateDate"
import { Link } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteBooking } from "../../store/Booking/bookingSlice";

export default function ReservationCard({ reservation }) {
    //On récupère le hook
    const dispatch = useDispatch();

    const { id, products, startAt, endAt, nbAdult, nbChildren } = reservation;

    //variables d'affichage 
    const product = products?.[0];
    const media = product?.media?.[0];
    const imgSrc = media?.path ? `${API_ROOT}${media.path}` : null;
    const nbNights = startAt && endAt ? getNbNights(startAt, endAt) : 0;
    const nbPersonnes = (nbAdult ?? 0) + (nbChildren ?? 0);

    // On formate les dates avant de les afficher
    const dateDebutFormatee = formaterDate(startAt);
    const dateFinFormatee = formaterDate(endAt);

    const handleAnnuler = () => {
        if (window.confirm("Êtes-vous sûr de vouloir annuler cette réservation ?")) {
            //On recup les dataaaaa
            dispatch(deleteBooking(id))
        }
    };

    return (
        <div className="carte flex flex-col gap-4 sm:flex-row sm:items-center">

            {/* Image */}
            <div className="w-full sm:w-24 h-24 rounded-xl overflow-hidden bg-plum-100 shrink-0">
                {imgSrc ? (
                    <img src={imgSrc} alt={product?.title} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-plum-400 text-xs">
                        Pas d'image
                    </div>
                )}
            </div>

            {/* Infos */}
            <div className="space-y-1 flex-1">
                <p className="font-semibold text-plum-950">{product?.title ?? "—"}</p>
                <div className="flex flex-wrap items-center gap-3 text-sm text-plum-600">
                    <span className="flex items-center gap-1">
                        <CiCalendar className="h-3.5 w-3.5" />
                        {nbNights} nuit{nbNights > 1 ? "s" : ""}
                    </span>
                    <span className="flex items-center gap-1">
                        <CiCalendar className="h-3.5 w-3.5" />
                        {dateDebutFormatee} - {dateFinFormatee}
                    </span>
                    <span className="flex items-center gap-1">
                        <FiUsers className="h-3.5 w-3.5" />
                        {nbPersonnes} personne{nbPersonnes > 1 ? "s" : ""}
                    </span>
                </div>
            </div>

            <div className="shrink-0 flex items-center sm:pl-4 sm:border-l sm:border-plum-100 self-end sm:self-stretch">
                <button
                    onClick={handleAnnuler}
                    className="px-4 py-2 text-sm font-medium text-white bg-plum-600 rounded-lg transition-colors hover:bg-plum-700 active:bg-plum-800"
                    title="Annuler la réservation"
                >
                    Annuler
                </button>
            </div>
        </div>
    );

}