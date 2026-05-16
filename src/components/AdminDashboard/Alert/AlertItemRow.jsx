import { Trash2, Check } from 'lucide-react';
import { cn } from "../../../lib/utils";

export default function AlertItemRow({ 
  isDeleted, 
  isConfirming, 
  onDeleteTrigger, 
  onConfirmDelete, 
  onCancelDelete, 
  children 
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 p-3 rounded-lg border transition-all",
        isDeleted
          ? "bg-plum-50 border-plum-200 opacity-50"
          : "bg-white border-plum-100 hover:border-plum-300"
      )}
    >
      {children}

      {!isDeleted && (
        <div className="flex items-center gap-1 shrink-0">
          {isConfirming ? (
            <>
              <button
                onClick={onConfirmDelete}
                className="px-3 py-1.5 text-xs font-medium bg-rose-600 text-white rounded-md hover:bg-rose-700 transition-colors"
              >
                Confirmer
              </button>
              <button
                onClick={onCancelDelete}
                className="px-3 py-1.5 text-xs font-medium text-plum-600 rounded-md hover:bg-plum-100 transition-colors"
              >
                Annuler
              </button>
            </>
          ) : (
            <button
              onClick={onDeleteTrigger}
              className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 hover:text-rose-700 transition-colors"
              title="Supprimer les données"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {isDeleted && (
        <span className="text-xs text-emerald-600 font-medium flex items-center gap-1 shrink-0">
          <Check className="w-3 h-3" /> Traité
        </span>
      )}
    </div>
  );
}