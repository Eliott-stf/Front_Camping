export default function InfoField({ label, value, icon }) {
  return (
    <div className="rounded-md bg-plum-50 px-4 py-3">
      <span className="block text-xs font-medium text-plum-500 uppercase tracking-wide mb-1">
        {label}
      </span>
      <span className="flex items-center gap-2 text-plum-900 font-medium">
        {icon}
        {value}
      </span>
    </div>
  );
}