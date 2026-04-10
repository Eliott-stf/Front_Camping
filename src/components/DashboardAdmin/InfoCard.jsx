
export default function InfoCard({ icon: Icon, label, value, suffix, trend }) {

  return (
    <div className="carte group hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-plum-500 uppercase tracking-wider mb-1">{label}</p>
          <p className="text-2xl md:text-3xl font-bold text-plum-950 font-display">
            {value}
            {suffix && <span className="text-lg text-plum-500 ml-1">{suffix}</span>}
          </p>
          {trend && (
            <p className={cn(
              "text-xs mt-1 font-medium",
              trend > 0 ? "text-emerald-600" : "text-rose-600"
            )}>
              {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% vs mois dernier
            </p>
          )}
        </div>
        <div className={cn("p-2.5 rounded-xl", c.bg)}>
          <Icon className={cn("w-5 h-5", c.icon)} />
        </div>
      </div>
    </div>
  );
}