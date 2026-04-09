import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFullPrice } from "../../services/pricing/priceTotal";
import ButtonLoader from "../../components/Loader/ButtonLoader";
import DescriptionDetail from "../../components/BienDetail/DescriptionDetail";
import PricingCard from "../../components/BienDetail/BookingCard";
import ImgDetail from "../../components/BienDetail/ImgDetail";
import { fetchProductDetail } from "../../store/Product/productSlice";

export default function ProductDetail() {
  //on récupère l'id par l'url
  const { id } = useParams();
  //on récup le hook
  const dispatch = useDispatch();

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

  const handleReservation = () => {
    console.log("Réservation initiée pour l'ID :", id);
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