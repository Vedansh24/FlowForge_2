interface StatsCardProps {
  label: string;
  value: number;
  colorClass?: string;
}

export default function StatsCard({ label, value, colorClass = "bg-slate-100" }: StatsCardProps) {
  return (
    <div className={`rounded-xl border border-gray-200 p-5 shadow-sm transition-all duration-200 hover:shadow-md ${colorClass}`}>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <h3 className="mt-3 text-3xl font-semibold text-gray-800">{value}</h3>
    </div>
  );
}
