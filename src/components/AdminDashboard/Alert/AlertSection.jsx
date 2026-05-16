import { cn } from "../../../lib/utils";

const severityStyles = {
  danger: { bg: 'bg-rose-50', border: 'border-rose-200', icon: 'text-rose-600', badge: 'bg-rose-100 text-rose-700' },
  warning: { bg: 'bg-amber-50', border: 'border-amber-200', icon: 'text-amber-600', badge: 'bg-amber-100 text-amber-700' },
};

export default function AlertSection({ title, description, icon: Icon, count, severity, children }) {
  const s = severityStyles[severity];

  return (
    <div className="carte">
      <div className="flex items-start gap-3 mb-4">
        <div className={cn("p-2 rounded-lg", s.bg)}>
          <Icon className={cn("w-5 h-5", s.icon)} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-plum-950 font-display">{title}</h3>
            <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full", s.badge)}>
              {count}
            </span>
          </div>
          <p className="text-xs text-plum-500 mt-0.5">{description}</p>
        </div>
      </div>
      <div className="space-y-2">
        {children}
      </div>
    </div>
  );
}