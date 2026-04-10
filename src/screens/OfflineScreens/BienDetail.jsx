import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { API_URL } from "../../constants/apiConstant";
import { useAuthContext } from "../../contexts/AuthContext";
import { fetchProductDetail, fetchServices } from "../../store/Product/productSlice";
import { getFullPrice } from "../../services/pricing/priceTotal";

import ButtonLoader from "../../components/Loader/ButtonLoader";
import DescriptionDetail from "../../components/BienDetail/DescriptionDetail";
import PricingCard from "../../components/BienDetail/BookingCard";
import ImgDetail from "../../components/BienDetail/ImgDetail";
import Options from "../../components/BienDetail/Option";

export default function ProductDetail() {
  //on récupère l'id par l'url
  const { id } = useParams();
  //on récup le hook
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //On récupère l'id de l'user
  const { userId } = useAuthContext();
  //On récup nos state du store
  const { productDetail, startDate, endDate, adults, children, loading, services } = useSelector((state) => state.products);
  const [selectedServices, setSelectedServices] = useState([]);
  const [prix, setPrix] = useState(null);

  useEffect(() => {
    //data du biens
    dispatch(fetchProductDetail(id));
    //data des options (pisicne)
    dispatch(fetchServices());
  }, [dispatch, id]);

  // Recalcule le prix quand les dates, capacité ou services changent
  useEffect(() => {
    if (startDate && endDate && productDetail) {
      const calculatedPrice = getFullPrice(productDetail.price, startDate, endDate, adults, children, selectedServices);
      setPrix(calculatedPrice);
    }
  }, [startDate, endDate, adults, children, selectedServices, productDetail]);

  if (loading) return <ButtonLoader />;
  if (!productDetail) return <p className="text-center pt-32 text-plum-800">Bien introuvable.</p>;

  const handleReservation = async () => {
    if (!userId) {
        navigate("/login", { state: { from: `/product/${id}` } });
        return;
    }

    try {
        const generatedBookingIds = [];

        // 1. Booking de l'hébergement principal
        const mainRes = await axios.post(
            `${API_URL}/bookings`,
            {
                startAt: startDate,
                endAt: endDate,
                nbAdult: adults,
                nbChildren: children,
                products: [`/api/products/${productDetail.id}`],
                user: `/api/users/${userId}`,
            },
            { headers: { "Content-Type": "application/ld+json" } }
        );
        generatedBookingIds.push(mainRes.data.id); // On stocke l'ID

        // 2. Booking des services
        const serviceQuantities = selectedServices.reduce((acc, service) => {
            if (!acc[service.id]) acc[service.id] = { service, quantity: 0 };
            acc[service.id].quantity += 1;
            return acc;
        }, {});

        for (const key in serviceQuantities) {
            const { service, quantity } = serviceQuantities[key];
            const isEnfant = service.title.toLowerCase().includes('enfant');
            
            const nbAdultService   = isEnfant ? 0 : quantity;
            const nbChildrenService = isEnfant ? quantity : 0;

            if (nbAdultService === 0 && nbChildrenService === 0) continue;

            const servRes = await axios.post(
                `${API_URL}/bookings`,
                {
                    startAt: startDate,
                    endAt: endDate,
                    nbAdult: nbAdultService,
                    nbChildren: nbChildrenService,
                    products: [`/api/products/${service.id}`],
                    user: `/api/users/${userId}`,
                },
                { headers: { "Content-Type": "application/ld+json" } }
            );
            generatedBookingIds.push(servRes.data.id); // On stocke l'ID
        }

        // 3. Génération de la facture unique regroupant tout
        await axios.post(
            `${API_URL}/checkout/invoice`,
            {
                bookingIds: generatedBookingIds,
                userId: userId 
            },
            { headers: { "Content-Type": "application/json" } } // Important : json classique ici, pas ld+json
        );

        navigate(`/`);
    } catch (error) {
        console.error("Erreur réservation :", error);
    }
};

  return (
    <div className="max-w-6xl mx-auto px-6 pt-32 pb-16">
      <ImgDetail product={productDetail} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <DescriptionDetail product={productDetail} />
          <Options
            services={services}
            adults={adults}
            childrenCount={children}
            onUpdate={(updatedServices) => setSelectedServices(updatedServices)}
          />
        </div>

        <PricingCard prix={prix} adults={adults} children={children} onReserve={handleReservation} />
      </div>
    </div>
  );
}