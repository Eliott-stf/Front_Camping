import { useState, useMemo, useEffect } from 'react';
import { Search, Download } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../../../components/AdminDashboard/PageHeader';
import { cn } from '../../../lib/utils';
import { fetchAllFactures, cancelInvoice } from '../../../store/Facture/factureSlice';
import { API_ROOT } from '../../../constants/apiConstant';

export default function AdminFacture() {
  const dispatch = useDispatch();

  // Utilisation sécurisée des sélecteurs du slice
  const { factures, loading } = useSelector((state) => state.factures);
  const [search, setSearch] = useState('');
  const [cancellingId, setCancellingId] = useState(null);

  useEffect(() => {
    dispatch(fetchAllFactures());
  }, [dispatch]);

  // Filtrage des données de facturation
  const filtered = useMemo(() => {
    if (!factures) return [];
    return factures.filter(inv => {
      const matchSearch = !search ||
        (inv.client && inv.client.toLowerCase().includes(search.toLowerCase())) ||
        (inv.name && inv.name.toLowerCase().includes(search.toLowerCase()));
      return matchSearch;
    });
  }, [search, factures]);

  // Gestion simplifiée de l'annulation via le Thunk Redux
  const handleCancel = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir annuler cette facture ? Le statut passera en annulé et un document d'annulation sera généré.")) {
      return;
    }

    setCancellingId(id);
    try {
      await dispatch(cancelInvoice(id));
    } catch (error) {
      console.error("Erreur d'annulation :", error);
    } finally {
      setCancellingId(null);
    }
  };

  // Optimisation de l'affichage du chargement pour éviter le flash complet de la table
  const isInitialLoading = loading && factures.length === 0;

  return (
    <div className="animate-slideup2">
      <PageHeader title="Facturation" subtitle={`${factures?.length || 0} factures émises`} />

      {/* Zone de recherche */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4 mt-6">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-plum-400" />
          <input
            type="text"
            placeholder="Rechercher par client ou n° de facture..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border border-plum-200 bg-white focus:ring-2 focus:ring-plum-400 focus:border-plum-400 outline-none transition-all text-plum-900 placeholder:text-plum-400"
          />
        </div>
      </div>

      {/* Tableau des pièces comptables */}
      <div className="carte p-0 overflow-hidden">
        <div className="overflow-x-auto">
          {isInitialLoading ? (
            <div className="p-8 text-center text-plum-500">Chargement des factures...</div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-plum-50 border-b border-plum-200">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-plum-600">N° Facture</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-plum-600">Client</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-plum-600">Date de création</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-plum-600">Documents PDF</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-plum-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(inv => {
                  const isCancelled = inv.status === 'cancelled';
                  const isCancelling = cancellingId === inv.id;

                  return (
                    <tr key={inv.id} className={cn(
                      "border-b border-plum-100 hover:bg-plum-50/50 transition-colors",
                      isCancelled && "bg-red-50/30 hover:bg-red-50/40"
                    )}>
                      {/* Numéro et Badge de Statut */}
                      <td className="px-4 py-3 font-mono text-xs text-plum-700">
                        {inv.name}
                        {isCancelled && (
                          <span className="ml-2 inline-block bg-red-100 text-red-600 text-[10px] font-bold px-1.5 py-0.5 rounded">
                            ANNULÉE
                          </span>
                        )}
                      </td>

                      <td className="px-4 py-3 font-medium text-plum-900">{inv.client}</td>

                      <td className="px-4 py-3 text-plum-600">
                        {new Date(inv.createdAt).toLocaleDateString('fr-FR')}
                      </td>

                      {/* Colonne des Documents : affiche la facture et l'avoir si annulée */}
                      <td className="px-4 py-3 text-plum-600">
                        <div className="flex flex-col gap-1.5">
                          <a
                            href={`${API_ROOT}${inv.path}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 underline text-xs text-plum-500 hover:text-plum-700 w-max"
                          >
                            <Download className="w-3 h-3" /> PDF
                          </a>
                          {isCancelled && (inv.cancellationPath || inv.cancellation_path) && (
                            <a
                              href={`${API_ROOT}${inv.cancellationPath || inv.cancellation_path}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 underline text-xs text-red-600 hover:text-red-800 font-medium w-max"
                            >
                              <Download className="w-3 h-3" /> Document d'annulation (Avoir)
                            </a>
                          )}
                        </div>
                      </td>

                      {/* Actions de contrôle */}
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          {isCancelled ? (
                            <span className="text-xs font-medium text-red-500 italic">Aucune action</span>
                          ) : (
                            <button
                              onClick={() => handleCancel(inv.id)}
                              disabled={isCancelling}
                              className={cn(
                                "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                                isCancelling
                                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                  : "text-plum-600 bg-plum-50 hover:bg-plum-100 hover:text-plum-700"
                              )}
                              title="Annuler la facture et générer l'avoir"
                            >
                              {isCancelling ? 'Traitement...' : 'Annuler'}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-4 py-8 text-center text-plum-500">
                      Aucune facture trouvée.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}