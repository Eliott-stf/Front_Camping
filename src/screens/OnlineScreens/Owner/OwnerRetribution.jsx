import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Lock, Download, Calendar, Euro, FileText, AlertCircle } from 'lucide-react';
import PageHeader from '../../../components/AdminDashboard/PageHeader';
import { fetchOwnerRetribution, clearRetribution } from '../../../store/Retribution/retributionSlice';

export default function OwnerRetributions() {
  const dispatch = useDispatch();

  const retributionState = useSelector((state) => state.retribution);
  const { data = null, loading = false, isLocked = false, error = null } = retributionState || {};

  // DEBUG: Log pour vérifier ce que le composant reçoit
  useEffect(() => {
    console.log("OwnerRetribution - retributionState reçu :", retributionState);
    console.log("OwnerRetribution - data :", data);
    console.log("OwnerRetribution - loading :", loading);
  }, [retributionState, data, loading]);

  // Initialisation par défaut sur 2024 pour correspondre aux fixtures disponibles
  const [saison, setSaison] = useState(2024);

  // Déclenche la récupération des données lorsque la saison change
  useEffect(() => {
    dispatch(fetchOwnerRetribution(saison));
  }, [dispatch, saison]);

  // Nettoyage unique de l'état Redux UNIQUEMENT quand l'utilisateur quitte la page
  useEffect(() => {
    return () => {
      dispatch(clearRetribution());
    };
  }, [dispatch]);

  const handleSaisonChange = (e) => {
    setSaison(Number(e.target.value));
  };

  const formatCurrency = (val) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(val);
  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });

  return (
    <div className="animate-slideup2">
      <div className="flex items-center justify-between mb-6">
        <PageHeader
          title="Mes Rétributions"
          subtitle="Suivi de vos revenus locatifs"
        />

        {/* Sélecteur d'année */}
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-plum-700 flex items-center gap-2">
            <Calendar className="w-4 h-4" /> Saison :
          </label>
          <select
            value={saison}
            onChange={handleSaisonChange}
            className="border-plum-200 bg-white text-plum-900 text-sm rounded-lg focus:ring-plum-500 focus:border-plum-500 block p-2 px-3 shadow-sm"
          >
            <option value={2026}>2026</option>
            <option value={2025}>2025</option>
            <option value={2024}>2024</option>
            <option value={2023}>2023</option>
          </select>
        </div>
      </div>

      {error && !isLocked && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg flex items-start gap-3 mb-6">
          <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="carte p-12 flex flex-col items-center justify-center space-y-3">
          <div className="w-8 h-8 border-4 border-plum-200 border-t-plum-600 rounded-full animate-spin"></div>
          <p className="text-plum-500 text-sm animate-pulse">Récupération de vos données...</p>
        </div>
      ) : isLocked ? (
        <div className="carte overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-amber-400"></div>
          <div className="p-8 sm:p-12 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-plum-900 mb-2">Bilan en cours de constitution</h3>
            <p className="text-plum-600 max-w-md text-sm leading-relaxed">
              Pour des raisons comptables, les montants des rétributions pour la saison <strong>{saison}</strong> seront calculés et dévoilés à la clôture officielle du camping, le <strong>10 octobre {saison}</strong>.
            </p>
          </div>
        </div>
      ) : data ? (
        <div className="space-y-6">
          {/* En-tête des gains */}
          <div className="carte bg-gradient-to-br from-plum-600 to-plum-800 text-white p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-plum-100 font-medium text-sm mb-1 uppercase tracking-wider">Total de vos gains (saison {saison})</p>
              <h2 className="text-4xl font-black tracking-tight">{formatCurrency(data.total_retribution)}</h2>
              <p className="text-plum-200 text-xs mt-2 flex items-center gap-1.5">
                <Euro className="w-3.5 h-3.5" />
                Base de calcul : 35% du tarif hébergement (hors taxes/options)
              </p>
            </div>
            <button className="bg-white text-plum-700 hover:bg-plum-50 px-5 py-2.5 rounded-lg text-sm font-bold shadow-lg transition-colors flex items-center gap-2 w-full sm:w-auto justify-center">
              <Download className="w-4 h-4" />
              Télécharger le PDF
            </button>
          </div>

          {/* Liste des réservations */}
          <div className="carte overflow-hidden">
            <div className="px-6 py-4 border-b border-plum-100 bg-plum-50/50 flex items-center justify-between">
              <h3 className="font-semibold text-plum-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-plum-500" />
                Détail des locations facturées
              </h3>
              <span className="text-xs font-medium bg-white px-2.5 py-1 rounded-full text-plum-600 border border-plum-200 shadow-sm">
                {data.lines?.length || 0} séjour(s)
              </span>
            </div>

            <div className="divide-y divide-plum-50">
              {data.lines && data.lines.length > 0 ? (
                data.lines.map((line, index) => (
                  <div key={index} className="p-6 hover:bg-plum-50/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1.5">
                        <span className="font-mono text-xs font-bold text-plum-500 bg-plum-100 px-2 py-0.5 rounded">
                          #{line.booking_id}
                        </span>
                        <span className="font-medium text-plum-900">
                          {line.product_title}
                        </span>
                      </div>
                      <p className="text-sm text-plum-500 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        Du {formatDate(line.start_at)} au {formatDate(line.end_at)}
                      </p>
                    </div>

                    <div className="flex flex-row sm:flex-col justify-between sm:justify-end items-center sm:items-end gap-1 sm:text-right bg-white sm:bg-transparent p-3 sm:p-0 rounded-lg border sm:border-none border-plum-100 shadow-sm sm:shadow-none">
                      <div className="text-xs text-plum-400">
                        Base HT : {formatCurrency(line.net_accommodation)}
                      </div>
                      <div className="text-sm font-bold text-emerald-600 bg-emerald-50 sm:bg-transparent px-2 py-1 sm:p-0 rounded">
                        +{formatCurrency(line.owner_share)}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-12 text-center text-plum-400 italic">
                  Aucune location comptabilisée pour vos biens sur la saison {saison}.
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-12 text-center text-plum-400 italic">
          Aucune donnée disponible pour cette saison.
        </div>
      )}
    </div>
  );
}