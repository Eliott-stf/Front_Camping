import { useState, useEffect } from 'react';
import { Download, FileText } from 'lucide-react';
import { useSelector } from 'react-redux';
import { cn } from '../../../lib/utils';
import { API_ROOT } from '../../../constants/apiConstant';

export default function OwnerRetributions() {
  const { user } = useSelector(state => state.auth); // adapter selon ton slice auth
  const [factures, setFactures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saison] = useState(new Date().getFullYear());

  useEffect(() => {
    if (!user?.id) return;
    const token = localStorage.getItem('token');

    fetch(`${API_ROOT}/api/retributions?owner=${user.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.json())
      .then(data => {
        setFactures(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user]);

  const totalSaison = factures
    .filter(f => f.saison == saison)
    .reduce((sum, f) => {
      const lastLine = f.lignes?.[f.lignes.length - 1] ?? '';
      const match    = lastLine.match(/= ([\d.]+)€/);
      return sum + (match ? parseFloat(match[1]) : 0);
    }, 0);

  return (
    <div className="animate-slideup2">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-plum-900">Mes rétributions</h1>
        <p className="text-sm text-plum-500 mt-1">Saison {saison}</p>
      </div>

      {/* Récap saison */}
      {!loading && factures.length > 0 && (
        <div className="carte mb-6 p-4 flex items-center justify-between">
          <div>
            <div className="text-xs text-plum-500 uppercase tracking-wide mb-1">Total saison {saison}</div>
            <div className="text-2xl font-bold text-plum-900">{totalSaison.toFixed(2)} €</div>
            <div className="text-xs text-plum-400 mt-1">
              {factures.filter(f => f.saison == saison).length} facture(s) de rétribution
            </div>
          </div>
          <div className="text-plum-200">
            <FileText className="w-12 h-12" />
          </div>
        </div>
      )}

      {/* Liste des factures */}
      <div className="space-y-4">
        {loading ? (
          <div className="p-8 text-center text-plum-500">Chargement...</div>
        ) : factures.length === 0 ? (
          <div className="carte p-8 text-center text-plum-400 italic">
            Aucune rétribution disponible pour cette saison.
            {new Date() < new Date(`${saison}-10-10`) && (
              <p className="mt-2 text-xs">
                Les rétributions seront générées en fin de saison (après le 10 octobre {saison}).
              </p>
            )}
          </div>
        ) : (
          factures.map(facture => (
            <div key={facture.id} className="carte p-0 overflow-hidden">
              {/* En-tête facture */}
              <div className="flex items-center justify-between px-5 py-4 bg-plum-50 border-b border-plum-100">
                <div>
                  <span className="font-mono text-xs text-plum-700">{facture.name}</span>
                  <span className="ml-3 text-xs text-plum-400">Émise le {facture.createdAt}</span>
                </div>
                {facture.pdfDisponible ? (
                  <a
                    href={`${API_ROOT}${facture.path}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-plum-600 text-white text-xs font-medium hover:bg-plum-700 transition-colors"
                  >
                    <Download className="w-3 h-3" /> Télécharger PDF
                  </a>
                ) : (
                  <span className="text-xs text-gray-400 italic px-3 py-1.5">
                    Disponible après le 10/10/{facture.saison}
                  </span>
                )}
              </div>

              {/* Lignes de détail (une par booking) */}
              <div className="divide-y divide-plum-50">
                {facture.lignes?.map((ligne, i) => {
                  // Extraction du montant de rétribution depuis le label
                  const match = ligne.match(/= ([\d.]+)€$/);
                  const montant = match ? parseFloat(match[1]) : null;

                  return (
                    <div key={i} className="px-5 py-3 flex items-center justify-between">
                      <span className="text-xs text-plum-700 flex-1 pr-4">{ligne}</span>
                      {montant !== null && (
                        <span className="text-xs font-semibold text-plum-900 whitespace-nowrap">
                          {montant.toFixed(2)} €
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}