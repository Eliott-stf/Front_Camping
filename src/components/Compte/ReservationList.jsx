import { CiCalendar } from "react-icons/ci";
import ReservationCard from "./ReservationCard";


export default function ReservationsList({ reservations, loading }) {
  return (
    <div className="animate-slideup2">
      <h2 className="titre text-xl font-semibold mb-5 flex items-center gap-2">
        <CiCalendar className="h-5 w-5 text-plum-600" />
        Mes réservations
      </h2>

      <div className="space-y-4">
        {/* Affichage pendant le chargement */}
        {loading && (
          <p className="text-sm text-plum-500">Chargement de vos réservations...</p>
        )}

        {/* Affichage si c'est chargé mais vide */}
        {!loading && reservations?.length === 0 && (
          <p className="text-sm text-plum-500">Vous n'avez aucune réservation pour le moment.</p>
        )}

        {/* CORRECTION : Le ?.map empêche l'application de crasher si reservations est null */}
        {!loading && reservations?.map((r) => (
          <ReservationCard key={r.id} reservation={r} />
        ))}
      </div>
    </div>
  );
}