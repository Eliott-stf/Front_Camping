import { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StatCard from '../../../components/AdminDashboard/StatCard';
import PageHeader from '../../../components/AdminDashboard/PageHeader';
import BienCard from '../../../components/AdminDashboard/BienCard';
import { fetchAllProducts } from '../../../store/Product/productSlice';
import { CATEGORIES } from '../../../constants/appConstant';

// Fonction qui détermine la catégorie d'un bien selon son titre
const getCategory = (bien) => {
    const title = bien.title?.toLowerCase() ?? '';
    const hasOwner = bien.user?.some(u => u.isOwner === true);
  
    if (title.includes('m-h') && hasOwner) return 'MH Propriétaire';
    if (title.includes('m-h'))             return 'MH Locatif';
    if (title.includes('caravane'))        return 'Caravane';
    if (title.includes('emplacement'))     return 'Emplacement';
    return 'Services';
};

export default function AdminBiens() {
    const dispatch = useDispatch();
    const { allProducts = [], loading } = useSelector((state) => state.products);

    const [filterCat, setFilterCat] = useState('Tous');
    const [selectedAsset, setSelectedAsset] = useState(null);

    useEffect(() => {
        dispatch(fetchAllProducts());
    }, [dispatch]);

    const filteredBiens = useMemo(() => {
        if (filterCat === 'Tous') return allProducts;
        return allProducts.filter(bien => getCategory(bien) === filterCat);
    }, [filterCat, allProducts]);

    const stats = useMemo(() => {
        const result = {};
        CATEGORIES.slice(1).forEach(cat => {
            result[cat] = allProducts.filter(b => getCategory(b) === cat).length;
        });
        return result;
    }, [allProducts]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-plum-500 font-medium">Chargement des biens...</p>
            </div>
        );
    }

    return (
        <div className="animate-slideup2">
            <PageHeader
                title="Gestion des biens"
                subtitle={`${allProducts.length} biens enregistrés`}
            />

            {/* Statistiques */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                <StatCard
                    category="Tous"
                    count={allProducts.length}
                    isActive={filterCat === 'Tous'}
                    onClick={() => setFilterCat('Tous')}
                />
                {CATEGORIES.slice(1).map(cat => (
                    <StatCard
                        key={cat}
                        category={cat}
                        count={stats[cat] ?? 0}
                        isActive={filterCat === cat}
                        onClick={() => setFilterCat(cat)}
                    />
                ))}
            </div>

            {/* Filtres */}
            <div className="flex items-center gap-1 bg-white rounded-lg border border-plum-200 p-1 overflow-x-auto mb-4">
                {CATEGORIES.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setFilterCat(cat)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                            filterCat === cat
                                ? "bg-plum-700 text-white shadow-sm"
                                : "text-plum-600 hover:bg-plum-50"
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Liste */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredBiens.map(bien => (
                    <BienCard
                        key={bien.id}
                        bien={bien}
                        onSelect={setSelectedAsset}
                    />
                ))}
            </div>

            {filteredBiens.length === 0 && (
                <div className="carte text-center py-12">
                    <p className="text-plum-400 text-sm">Aucun bien trouvé.</p>
                </div>
            )}
        </div>
    );
}