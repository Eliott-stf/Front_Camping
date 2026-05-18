import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Download, ChevronDown, ChevronRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import PageHeader from '../../../components/AdminDashboard/PageHeader';
import { cn } from '../../../lib/utils';
import { API_ROOT } from '../../../constants/apiConstant';
import { fetchOwners } from '../../../store/User/userSlice';
import { fetchAdminRetribution, clearRetribution } from '../../../store/Retribution/retributionSlice';

export default function AdminRetributions() {
  const dispatch = useDispatch();
  const { owners, loading: usersLoading } = useSelector(state => state.users);
  const { data, loading: retributionsLoading } = useSelector(state => state.retribution);

  const [activeOwner, setActiveOwner] = useState(null);
  const [saison, setSaison] = useState(new Date().getFullYear());

  useEffect(() => {
    dispatch(fetchOwners());
    return () => dispatch(clearRetribution());
  }, [dispatch]);

  const toggleOwner = (ownerId) => {
    if (activeOwner === ownerId) {
      setActiveOwner(null);
      dispatch(clearRetribution());
    } else {
      setActiveOwner(ownerId);
      dispatch(fetchAdminRetribution(ownerId, saison));
    }
  };

  const handleSaisonChange = (e) => {
    setSaison(Number(e.target.value));
    setActiveOwner(null);
    dispatch(clearRetribution());
  };

  const isSimulation = () => {
    const today = new Date();
    const releaseDate = new Date(`${saison}-10-10T00:00:00`);
    return today < releaseDate;
  };

  const formatCurrency = (val) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(val);
  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('fr-FR');

  return (
    <div className="animate-slideup2">
      <div className="flex items-center justify-between">
        <PageHeader
          title="Rétributions"
          subtitle={`Gestion des gains — ${owners ? owners.length : 0} propriétaire(s)`}
        />
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-plum-700">Saison :</label>
          <select
            value={saison}
            onChange={handleSaisonChange}
            className="border-plum-200 bg-white text-plum-900 text-sm rounded-lg focus:ring-plum-500 focus:border-plum-500 block p-2 px-3"
          >
            <option value={saison + 1}>{saison + 1}</option>
            <option value={saison}>{saison}</option>
            <option value={saison - 1}>{saison - 1}</option>
            <option value={saison - 2}>{saison - 2}</option>
          </select>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {usersLoading ? (
          <div className="p-8 text-center text-plum-500">Chargement des propriétaires...</div>
        ) : !owners || owners.length === 0 ? (
          <div className="p-8 text-center text-plum-400">Aucun propriétaire trouvé.</div>
        ) : (
          owners.map(owner => {
            const isOpen = activeOwner === owner.id;

            return (
              <div key={owner.id} className="carte overflow-hidden">
                {/* Header propriétaire */}
                <button
                  onClick={() => toggleOwner(owner.id)}
                  className="w-full flex items-center justify-between p-4 hover:bg-plum-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {isOpen
                      ? <ChevronDown className="w-4 h-4 text-plum-400" />
                      : <ChevronRight className="w-4 h-4 text-plum-400" />
                    }
                    <div className="text-left">
                      <div className="font-medium text-plum-900">
                        {owner.name} {owner.lastname}
                      </div>
                      <div className="text-xs text-plum-500">{owner.email}</div>
                    </div>
                  </div>
                  {isOpen && !retributionsLoading && data && (
                    <span className="text-sm font-semibold text-plum-700">
                      Total : {formatCurrency(data.total_retribution)}
                    </span>
                  )}
                </button>

                {/* Détail rétributions */}
                {isOpen && (
                  <div className="border-t border-plum-100 bg-white">
                    {retributionsLoading ? (
                      <div className="px-6 py-8 text-sm text-center text-plum-400">Calcul en cours...</div>
                    ) : !data || !data.lines || data.lines.length === 0 ? (
                      <div className="px-6 py-4 text-sm text-plum-400 italic">
                        Aucune location enregistrée pour ce propriétaire sur la saison {saison}.
                      </div>
                    ) : (
                      <div className="px-6 py-4">
                        <div className="flex items-center justify-between mb-4 pb-3 border-b border-plum-50">
                          <div className="flex items-center gap-2">
                            {isSimulation() ? (
                              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 text-xs font-medium border border-amber-200">
                                <AlertCircle className="w-3.5 h-3.5" />
                                Simulation en cours (clôture le 10/10/{saison})
                              </div>
                            ) : (
                              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-200">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                Données définitives
                              </div>
                            )}
                          </div>

                          {!isSimulation() ? (
                            <button
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-plum-100 text-plum-700 hover:bg-plum-200 transition-colors text-xs font-medium"
                              onClick={() => {/* Implémentation du PDF si requise */ }}
                            >
                              <Download className="w-3.5 h-3.5" /> PDF Global
                            </button>
                          ) : (
                            <span className="text-xs text-gray-400 italic">
                              Bilan indisponible avant clôture
                            </span>
                          )}
                        </div>

                        {/* Lignes de détail */}
                        <div className="space-y-2">
                          {data.lines.map((line, i) => (
                            <div key={i} className="flex justify-between items-center text-xs text-plum-700 bg-plum-50/50 rounded-lg px-4 py-3 border border-plum-100">
                              <div className="flex flex-col gap-1.5">
                                <span className="font-semibold text-plum-900">
                                  Réf. #{line.booking_id} — {line.product_title}
                                </span>
                                <span className="text-plum-500">
                                  Du {formatDate(line.start_at)} au {formatDate(line.end_at)}
                                </span>
                              </div>
                              <div className="text-right flex flex-col gap-1">
                                <span className="text-plum-500">
                                  Base locative HT : {formatCurrency(line.net_accommodation)}
                                </span>
                                <span className="font-bold text-plum-800">
                                  Gains (35%) : {formatCurrency(line.owner_share)}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}