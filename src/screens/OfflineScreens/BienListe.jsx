import { useSelector } from "react-redux";
import SearchBar from "../../components/BienListe/SearchBar";
import ProductCard from "../../components/BienListe/ProductCard";

export default function BienListe() {
  const { availableProducts = [], loading = false, startDate, endDate } = useSelector((state) => state.products || {});

  return (

    <div className="max-w-7xl mx-auto px-6 pt-32 pb-16 min-h-screen">
      <h1 className="font-display text-4xl text-plum-950 mb-10 text-center">
        Rechercher un hébergement
      </h1>

      <div className="mb-12">
        <SearchBar />
      </div>

      {loading && (
        <p className="text-center text-plum-600 py-10">Chargement des biens...</p>
      )}

       {console.log(availableProducts)};
      

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {availableProducts?.map((product) => (
          <ProductCard key={product.id} product={product} startDate={startDate} endDate={endDate} />
        ))}
      </div>

      {!loading && availableProducts?.length === 0 && (
        <p className="text-center text-plum-800 py-10">
          Aucun bien disponible pour cette période.
        </p>
      )}
    </div>
  );
}