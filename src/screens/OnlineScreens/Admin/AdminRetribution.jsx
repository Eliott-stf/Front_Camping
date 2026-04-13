import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Download, ChevronDown, ChevronRight, Play } from 'lucide-react';
import PageHeader from '../../../components/AdminDashboard/PageHeader';
import { cn } from '../../../lib/utils';
import { API_ROOT } from '../../../constants/apiConstant';
import { fetchOwners } from '../../../store/User/userSlice';

export default function AdminRetributions() {
  const dispatch = useDispatch();
  const { owners, loading } = useSelector(state => state.users);
  
  const [retributions, setRetributions] = useState({}); // { ownerId: [...factures] }
  const [expanded, setExpanded] = useState({});
  const [generating, setGenerating] = useState(false);
  const [saison] = useState(new Date().getFullYear());

  // Charge tous les owners au montage du composant
  useEffect(() => {
    dispatch(fetchOwners());
  }, [dispatch]);

  // Charge les rétributions d'un owner au clic
  const loadRetributions = async (ownerId) => {
    if (retributions[ownerId]) {
      // Toggle si déjà chargé
      setExpanded(prev => ({ ...prev, [ownerId]: !prev[ownerId] }));
      return;
    }

    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_ROOT}/api/retributions?owner=${ownerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      // Extraire le tableau depuis la réponse API Platform
      const factures = data.member ?? data['hydra:member'] ?? data ?? [];
      setRetributions(prev => ({ ...prev, [ownerId]: factures }));
      setExpanded(prev => ({ ...prev, [ownerId]: true }));
    } catch (e) {
      console.error(e);
    }
  };

  // Déclenche la génération de toutes les rétributions
  const handleGenerate = async () => {
    if (!window.confirm(`Générer toutes les rétributions pour la saison ${saison} ?`)) return;
    setGenerating(true);
    const token = localStorage.getItem('token');

    try {
      const res = await fetch(`${API_ROOT}/api/retributions/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ saison }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur lors de la génération');

      alert(data.message);
      // Reset pour forcer le rechargement des rétributions
      setRetributions({});
      setExpanded({});
    } catch (e) {
      alert(e.message);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="animate-slideup2">
      <div className="flex items-center justify-between">
        <PageHeader
          title="Rétributions"
          subtitle={`Saison ${saison} — ${owners.length} propriétaire(s)`}
        />
        <button
          onClick={handleGenerate}
          disabled={generating}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
            generating
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-plum-600 text-white hover:bg-plum-700'
          )}
        >
          <Play className="w-4 h-4" />
          {generating ? 'Génération...' : `Générer saison ${saison}`}
        </button>
      </div>

      <div className="mt-6 space-y-3">
        {loading ? (
          <div className="p-8 text-center text-plum-500">Chargement...</div>
        ) : owners.length === 0 ? (
          <div className="p-8 text-center text-plum-400">Aucun propriétaire trouvé.</div>
        ) : (
          owners.map(owner => {
            const isOpen     = !!expanded[owner.id];
            const factures   = retributions[owner.id] ?? [];
            const totalSaison = factures.reduce((sum, f) => {
              // Extraction du total depuis les lignes (dernier montant de chaque ligne)
              const lastLine = f.lignes?.[f.lignes.length - 1] ?? '';
              const match    = lastLine.match(/= ([\d.]+)€/);
              return sum + (match ? parseFloat(match[1]) : 0);
            }, 0);

            return (
              <div key={owner.id} className="carte overflow-hidden">
                {/* Header propriétaire */}
                <button
                  onClick={() => loadRetributions(owner.id)}
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
                  {isOpen && factures.length > 0 && (
                    <span className="text-sm font-semibold text-plum-700">
                      Total : {totalSaison.toFixed(2)} €
                    </span>
                  )}
                </button>

                {/* Détail rétributions */}
                {isOpen && (
                  <div className="border-t border-plum-100">
                    {factures.length === 0 ? (
                      <div className="px-6 py-4 text-sm text-plum-400 italic">
                        Aucune rétribution générée pour cette saison.
                      </div>
                    ) : (
                      factures.map(facture => (
                        <div key={facture.id} className="px-6 py-4 border-b border-plum-50 last:border-0">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <span className="font-mono text-xs text-plum-600">{facture.name}</span>
                              <span className="ml-3 text-xs text-plum-400">Saison {facture.saison}</span>
                              <span className="ml-3 text-xs text-plum-400">Émise le {facture.createdAt}</span>
                            </div>
                            {facture.pdfDisponible ? (
                              <a
                                href={`${API_ROOT}${facture.path}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-xs text-plum-600 hover:text-plum-800 underline"
                              >
                                <Download className="w-3 h-3" /> PDF
                              </a>
                            ) : (
                              <span className="text-xs text-gray-400 italic">
                                Disponible après le 10/10/{facture.saison}
                              </span>
                            )}
                          </div>

                          {/* Lignes de détail */}
                          <div className="space-y-1 mt-2">
                            {facture.lignes?.map((ligne, i) => (
                              <div key={i} className="text-xs text-plum-600 bg-plum-50 rounded px-3 py-1.5">
                                {ligne}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))
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