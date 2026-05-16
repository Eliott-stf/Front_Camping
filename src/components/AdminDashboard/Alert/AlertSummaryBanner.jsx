import { AlertTriangle, Check } from 'lucide-react';
import { cn } from "../../../lib/utils";

export default function AlertSummaryBanner({ activeAlertsCount }) {
  const hasAlerts = activeAlertsCount > 0;

  return (
    <div className={cn(
      "carte mb-6 border-2",
      hasAlerts ? "border-rose-200 bg-rose-50" : "border-emerald-200 bg-emerald-50"
    )}>
      <div className="flex items-center gap-3">
        {hasAlerts ? (
          <AlertTriangle className="w-6 h-6 text-rose-600 shrink-0" />
        ) : (
          <Check className="w-6 h-6 text-emerald-600 shrink-0" />
        )}
        <div>
          <h3 className={cn(
            "text-lg font-semibold font-display",
            hasAlerts ? "text-rose-800" : "text-emerald-800"
          )}>
            {hasAlerts
              ? `${activeAlertsCount} alerte${activeAlertsCount > 1 ? 's' : ''} nécessitant une action`
              : 'Toutes les alertes ont été traitées'
            }
          </h3>
          <p className={cn(
            "text-sm",
            hasAlerts ? "text-rose-600" : "text-emerald-600"
          )}>
            {hasAlerts
              ? 'Des données personnelles doivent être examinées conformément au RGPD'
              : 'Conformité RGPD à jour'
            }
          </p>
        </div>
      </div>
    </div>
  );
}