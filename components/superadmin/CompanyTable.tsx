import Link from "next/link";

export interface CompanyRow {
  id: string;
  name: string;
  adminEmail: string;
  totalUsers: number;
  activeProjects: number;
  status: "Active" | "Inactive";
}

interface CompanyTableProps {
  companies: CompanyRow[];
  onEdit: (company: CompanyRow) => void;
  onDelete: (companyId: string) => void;
}

export default function CompanyTable({ companies, onEdit, onDelete }: CompanyTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Company Name</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Admin Email</th>
            <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">Total Users</th>
            <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">Active Projects</th>
            <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">Status</th>
            <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {companies.map((company) => (
            <tr key={company.id}>
              <td className="px-4 py-3 text-sm text-slate-800">{company.name}</td>
              <td className="px-4 py-3 text-sm text-slate-700">{company.adminEmail}</td>
              <td className="px-4 py-3 text-right text-sm font-medium text-slate-900">{company.totalUsers}</td>
              <td className="px-4 py-3 text-right text-sm font-medium text-slate-900">{company.activeProjects}</td>
              <td className="px-4 py-3 text-center text-sm">
                <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                  company.status === "Active"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-slate-100 text-slate-600"
                }`}>
                  {company.status}
                </span>
              </td>
              <td className="px-4 py-3 text-center text-sm">
                <div className="inline-flex gap-2">
                  <button
                    onClick={() => onEdit(company)}
                    className="rounded-md border border-slate-300 px-2 py-1 text-xs text-slate-700 transition hover:bg-slate-100"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(company.id)}
                    className="rounded-md border border-red-300 px-2 py-1 text-xs text-red-600 transition hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
