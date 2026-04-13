import { cn } from "../../lib/utils";

export default function StatCard({ category, count, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "carte py-3 px-4 text-center transition-all cursor-pointer",
        isActive && "border-plum-400 bg-plum-50 shadow-md"
      )}
    >
      <p className="text-2xl font-bold text-plum-950 font-display">{count}</p>
      <p className="text-xs text-plum-500 mt-0.5">{category}</p>
    </button>
  );
}