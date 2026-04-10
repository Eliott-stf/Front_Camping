export default function BanniereSaison({ rules }) {
  if (!rules) return null;

  return (
    <div className="carte mb-6 bg-gradient-to-r from-plum-600 to-plum-800 border-none text-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <p className="text-plum-200 text-xs uppercase tracking-wider font-medium">
            Saison en cours
          </p>
          <p className="text-lg font-semibold">
            Haute saison : {rules.hauteSaison.start} → {rules.hauteSaison.end}
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-plum-200">
          <span className="bg-white/20 px-3 py-1 rounded-full text-white text-xs font-medium">
            +{rules.supplement * 100}% tarifs
          </span>
          <span className="bg-white/20 px-3 py-1 rounded-full text-white text-xs font-medium">
            -{rules.remise7j * 100}% / 7 jours
          </span>
        </div>
      </div>
    </div>
  );
}