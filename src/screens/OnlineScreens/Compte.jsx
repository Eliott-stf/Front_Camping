import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AccountHeader from "../../components/Compte/AccountHeader";
import ProfileSection from "../../components/Compte/ProfileSection";
import ReservationsList from "../../components/Compte/ReservationList";
import { useAuthContext } from "../../contexts/AuthContext";
import { fetchBookingsByUser } from "../../store/Booking/bookingSlice";


export default function Compte() {
  //on recupère le hook
  const dispatch = useDispatch();
  //on récupère les infos en session par le AuthContext
  const { userId, name, email, lastname } = useAuthContext();
  //On récupère les reservation via le store
  const { userBookings = [], loading = false } = useSelector((state) => state.bookings || {} );


  useEffect(() => {
    if (userId) dispatch(fetchBookingsByUser(userId));
  }, [userId, dispatch]);

  //On met ses infos dans l'objet utilisateur
  const utilisateur = {
    nom: name,
    prenom: lastname,
    email: email,
  };

  return (
    <div className="min-h-screen bg-plum-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl space-y-8">

        <AccountHeader />
        <ProfileSection utilisateur={utilisateur} />
        <div className="separateur" />
        <ReservationsList reservations={userBookings} loading={loading} />
      </div>
    </div>
  );
}