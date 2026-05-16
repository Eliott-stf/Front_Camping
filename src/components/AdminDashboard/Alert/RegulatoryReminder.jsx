export default function RegulatoryReminder() {
  return (
    <div className="carte mt-6 bg-plum-50 border-plum-200">
      <h3 className="text-sm font-semibold text-plum-950 font-display mb-3">Rappel réglementaire</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-plum-700">
        <div>
          <p className="font-medium text-plum-800 mb-1">Données locataires</p>
          <p>Conservation max. 1 an après le départ, sauf obligation légale contraire.</p>
        </div>
        <div>
          <p className="font-medium text-plum-800 mb-1">Factures</p>
          <p>Durée de conservation légale : 3 ans (droit commercial) ou 6 ans (droit fiscal).</p>
        </div>
        <div>
          <p className="font-medium text-plum-800 mb-1">Contrats propriétaires</p>
          <p>Conservation 1 an après expiration, puis archivage intermédiaire.</p>
        </div>
      </div>
    </div>
  );
}