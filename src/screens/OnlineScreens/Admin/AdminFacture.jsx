import { useState, useMemo, useEffect } from 'react';
import { Search, Download, Ban } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../../../components/AdminDashboard/PageHeader';
import { cn } from '../../../lib/utils'
import { fetchAllFactures } from '../../../store/Facture/factureSlice';
import { deleteBooking } from '../../../store/Booking/bookingSlice';
import { API_ROOT } from '../../../constants/apiConstant';


export default function AdminFacture() {
  const dispatch = useDispatch();
  const { factures, loading } = useSelector((state) => state.factures);

  const [search, setSearch] = useState('');
  const [cancelledIds, setCancelledIds] = useState(new Set());
  const [cancellingId, setCancellingId] = useState(null);

  useEffect(() => {
    dispatch(fetchAllFactures());
  }, [dispatch]);

  const filtered = useMemo(() => {
    if (!factures) return [];
    return factures.filter(inv => {
      const matchSearch = !search ||
        (inv.client && inv.client.toLowerCase().includes(search.toLowerCase())) ||
        (inv.name && inv.name.toLowerCase().includes(search.toLowerCase()));
      return matchSearch;
    });
  }, [search, factures]);

  const handleCancel = async (id, name) => {
    if (!window.confirm("Êtes-vous sûr de vouloir annuler cette facture ? La réservation sera supprimée et un avoir sera généré.")) {
      return;
    }

    // Extraction du bookingId depuis le name : FACT-YYYYMMDD-{bookingId}-{uniqid}
    const parts = name.split('-');
    const bookingId = parts[2] ? parseInt(parts[2]) : null;

    if (!bookingId) {
      alert("Impossible d'identifier la réservation liée à cette facture.");
      return;
    }

    setCancellingId(id);

    try {
      const token = localStorage.getItem('token');

      // 1. Annulation de la facture côté Symfony (génère l'avoir + supprime les bookings)
      const response = await fetch(`${API_ROOT}/api/factures/${id}/cancel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Une erreur est survenue lors de l'annulation.");
      }

      // 2. Suppression du booking dans le store Redux
      await dispatch(deleteBooking(bookingId)).unwrap();

      // 3. Mise à jour visuelle
      setCancelledIds(prev => new Set([...prev, id]));

      // 4. Rafraîchissement de la liste des factures (ramène aussi le nouvel avoir)
      dispatch(fetchAllFactures());

      alert(`Facture annulée. Avoir généré : ${data.avoirName}`);

    } catch (error) {
      console.error("Erreur d'annulation :", error);
      alert(error.message);
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <div className="animate-slideup2">
      <PageHeader title="Facturation" subtitle={`${factures?.length || 0} factures émises`} />

      {/* Filters */}
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

      {/* Invoices table */}
      <div className="carte p-0 overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center text-plum-500">Chargement des factures...</div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-plum-50 border-b border-plum-200">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-plum-600">N° Facture</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-plum-600">Client</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-plum-600">Date de création</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-plum-600">Document</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-plum-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(inv => {
                  const isCancelled = cancelledIds.has(inv.id) || inv.name?.startsWith('AVOIR-');
                  const isCancelling = cancellingId === inv.id;

                  return (
                    <tr key={inv.id} className={cn(
                      "border-b border-plum-100 hover:bg-plum-50/50 transition-colors",
                      isCancelled && "opacity-50 bg-gray-50 hover:bg-gray-50"
                    )}>
                      <td className="px-4 py-3 font-mono text-xs text-plum-700">
                        {inv.name}
                        {inv.name?.startsWith('AVOIR-') && (
                          <span className="ml-2 inline-block bg-red-100 text-red-600 text-[10px] font-semibold px-1.5 py-0.5 rounded">
                            AVOIR
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 font-medium text-plum-900">{inv.client}</td>
                      <td className="px-4 py-3 text-plum-600">
                        {new Date(inv.createdAt).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="px-4 py-3 text-plum-600">
                        <a
                          href={`${API_ROOT}${inv.path}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            "flex items-center gap-1 underline w-max",
                            isCancelled ? "text-gray-400 cursor-not-allowed" : "text-plum-500 hover:text-plum-700"
                          )}
                          onClick={(e) => isCancelled && e.preventDefault()}
                        >
                          <Download className="w-3 h-3" /> PDF
                        </a>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          {isCancelled ? (
                            <span className="text-xs font-medium text-plum-400 italic">Annulée</span>
                          ) : (
                            <button
                              onClick={() => handleCancel(inv.id, inv.name)}
                              disabled={isCancelling}
                              className={cn(
                                "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                                isCancelling
                                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                  : "text-plum-600 bg-plum-50 hover:bg-plum-100 hover:text-plum-700"
                              )}
                              title="Annuler la facture et supprimer la réservation"
                            >
                              {isCancelling ? 'Annulation...' : 'Annuler'}
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