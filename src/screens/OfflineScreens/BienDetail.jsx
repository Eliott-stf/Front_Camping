import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFullPrice } from "../../services/pricing/priceTotal";
import ButtonLoader from "../../components/Loader/ButtonLoader";
import DescriptionDetail from "../../components/BienDetail/DescriptionDetail";
import PricingCard from "../../components/BienDetail/BookingCard";
import ImgDetail from "../../components/BienDetail/ImgDetail";
import { fetchProductDetail } from "../../store/Product/productSlice";
import axios from "axios";
import { API_URL } from "../../constants/apiConstant";
import { createBooking } from "../../store/Booking/bookingSlice";
import { useAuthContext } from "../../contexts/AuthContext";

export default function ProductDetail() {
  //on récupère l'id par l'url
  const { id } = useParams();
  //on récup le hook
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //On récupère l'id de l'user
  const { userId } = useAuthContext();


  useEffect(() => {
    dispatch(fetchProductDetail(id))
  }, [dispatch, id])

  //On récup nos state du store
  const { productDetail, startDate, endDate, adults, children, loading } = useSelector((state) => state.products);

  if (loading) return <ButtonLoader />
  if (!productDetail) return <p className="text-center pt-32 text-plum-800">Bien introuvable.</p>;

  const prix = startDate && endDate
    ? getFullPrice(productDetail.price, startDate, endDate, adults, children)
    : null;

  const handleReservation = async () => {
    try {
        const response = await axios.post(
            `${API_URL}/bookings`,
            {
                startAt: startDate,
                endAt: endDate,
                nbAdult: adults,
                nbChildren: children,
                products: [`/api/products/${productDetail.id}`],
                user: `/api/users/${userId}`, // depuis useAuthContext
            },
            {
                headers: { "Content-Type": "application/ld+json" }
            }
        );
        navigate(`/`);
    } catch (error) {
        console.log("Erreur réservation :", error);
    }
};

  return (
    <div className="max-w-6xl mx-auto px-6 pt-32 pb-16">

      <ImgDetail product={productDetail} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <DescriptionDetail product={productDetail} />
        <PricingCard prix={prix} adults={adults} children={children} onReserve={handleReservation} />
      </div>

    </div>
  );
}