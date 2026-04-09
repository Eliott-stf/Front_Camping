import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAvailableProducts } from "../../store/Product/productSlice";
import { TYPES } from "../../constants/appConstant";

export default function SearchBar() {
    const dispatch = useDispatch();
    //State pr les dates
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    // State pr le type Initialisé à "" ("Tous")
    const [selectedType, setSelectedType] = useState(""); 

    //State pour le nomrbe de personnes 
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);

    const handleSearch = () => {
        if (!startDate || !endDate) return;

        // Calcul du total de personnes
        const totalPeople = parseInt(adults) + parseInt(children);

        //on dispatch avec les params
        dispatch(fetchAvailableProducts(startDate, endDate, selectedType, totalPeople, adults, children));
    };

   return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-plum-100 max-w-6xl mx-auto space-y-4">
            <div className="flex flex-col md:flex-row gap-4 items-end">
                
                {/* Sélecteur de Type */}
                <div className="w-full md:w-48">
                    <label className="block text-sm font-medium text-plum-700 mb-1.5 ml-1">Hébergement</label>
                    <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-plum-200 bg-plum-50 text-plum-900 focus:ring-2 focus:ring-plum-500 appearance-none cursor-pointer"
                    >
                        {TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                    </select>
                </div>

                {/* Dates */}
                <div className="flex-1 w-full">
                    <label className="block text-sm font-medium text-plum-700 mb-1.5 ml-1">Arrivée</label>
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-plum-200 bg-plum-50" />
                </div>
                <div className="flex-1 w-full">
                    <label className="block text-sm font-medium text-plum-700 mb-1.5 ml-1">Départ</label>
                    <input type="date" value={endDate} min={startDate} onChange={(e) => setEndDate(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-plum-200 bg-plum-50" />
                </div>

                {/* Compteurs de personnes */}
                <div className="flex gap-2 w-full md:w-auto">
                    <div className="w-24">
                        <label className="block text-sm font-medium text-plum-700 mb-1.5 ml-1">Adultes</label>
                        <input type="number" min="1" value={adults} onChange={(e) => setAdults(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-plum-200 bg-plum-50" />
                    </div>
                    <div className="w-24">
                        <label className="block text-sm font-medium text-plum-700 mb-1.5 ml-1">Enfants</label>
                        <input type="number" min="0" value={children} onChange={(e) => setChildren(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-plum-200 bg-plum-50" />
                    </div>
                </div>

                <button
                    onClick={handleSearch}
                    disabled={!startDate || !endDate}
                    className="w-full md:w-auto px-8 py-3 bg-plum-600 text-white font-medium rounded-xl hover:bg-plum-700 transition-all disabled:opacity-50"
                >
                    Rechercher
                </button>
            </div>
        </div>
    );
}