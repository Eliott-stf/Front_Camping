import { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StatCard from '../../../components/AdminDashboard/StatCard';
import PageHeader from '../../../components/AdminDashboard/PageHeader';
import BienCard from '../../../components/AdminDashboard/BienCard';
import { fetchAllProducts } from '../../../store/Product/productSlice';

const CATEGORIES = ['Tous', 'MH Locatif', 'MH Propriétaire', 'Caravane', 'Emplacement'];

export default function AssetsManager() {
  const dispatch = useDispatch();
  
  // 1. Récupération depuis TON store Redux
  const { allProducts = [], loading } = useSelector((state) => state.products);
  
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('Tous');
  const [selectedAsset, setSelectedAsset] = useState(null);

  // 2. Déclenchement de l'action au chargement du composant
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  // 3. Filtrage combiné (Recherche Texte + Catégorie) avec useMemo
  const filteredBiens = useMemo(() => {
    return allProducts.filter(bien => {
      // Vérifie la catégorie (si différent de "Tous")
      const matchCat = filterCat === 'Tous' || bien.category === filterCat;
      
      // Vérifie le texte dans le titre OU la description
      const matchSearch = search.trim() === '' || 
        bien.title?.toLowerCase().includes(search.toLowerCase()) ||
        bien.description?.toLowerCase().includes(search.toLowerCase());

      return matchCat && matchSearch;
    });
  }, [search, filterCat, allProducts]);

  // 4. Calcul des statistiques pour les cartes
  const stats = useMemo(() => {
    const cats = {};
    CATEGORIES.slice(1).forEach(c => { 
        cats[c] = allProducts.filter(a => a.category === c).length; 
    });
    return cats;
  }, [allProducts]);

  // Si Redux est en train de charger, on affiche un spinner
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-plum-500 font-medium">Chargement des biens...</p>
      </div>
    );
  }

  return (
    <div className="animate-slideup2">
      <PageHeader title="Gestion des biens" subtitle={`${allProducts.length} biens enregistrés`} />

      {/* Cartes de Statistiques */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {Object.entries(stats).map(([cat, count]) => (
          <StatCard
             key={cat}
             category={cat}
             count={count}
             isActive={filterCat === cat}
             onClick={() => setFilterCat(cat)}
          />
        ))}
      </div>

      {/* Barre de Recherche et Filtres */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Rechercher par titre ou description..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border border-plum-200 bg-white focus:ring-2 focus:ring-plum-400 focus:border-plum-400 outline-none transition-all text-plum-900 placeholder:text-plum-400"
          />
        </div>
        
        {/* Boutons de catégories (Mobile scrollable, Desktop inline) */}
        <div className="flex items-center gap-1 bg-white rounded-lg border border-plum-200 p-1 overflow-x-auto">
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
      </div>

      {/* Liste des biens */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredBiens.map(bien => (
          <BienCard key={bien._id || bien.id} bien={bien} onSelect={setSelectedAsset} />
        ))}
      </div>

      {/* Message si aucun résultat */}
      {filteredBiens.length === 0 && (
        <div className="carte text-center py-12">
          <p className="text-plum-400 text-sm">Aucun bien ne correspond à votre recherche.</p>
        </div>
      )}
    </div>
  );
}