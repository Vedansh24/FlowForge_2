"use client";

import { useState, useEffect } from "react";
import { CompanyRow } from "./CompanyTable";

interface EditCompanyModalProps {
  company: CompanyRow;
  onSave: (companyId: string, updatedData: Partial<CompanyRow>) => void;
  onClose: () => void;
}

export default function EditCompanyModal({ company, onSave, onClose }: EditCompanyModalProps) {
  const [formData, setFormData] = useState<Partial<CompanyRow>>(company);

  useEffect(() => {
    setFormData(company);
  }, [company]);

  const handleChange = (field: keyof CompanyRow, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(company.id, formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md transform rounded-xl bg-white p-6 shadow-xl transition-all duration-200 ease-out hover:scale-[1.01]">
        <h3 className="text-lg font-semibold text-slate-900">Edit Company</h3>
        <p className="mt-1 text-sm text-slate-600">Update company details below.</p>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Company Name</label>
            <input
              type="text"
              value={formData.name || ""}
              onChange={(e) => handleChange("name", e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Admin Email</label>
            <input
              type="email"
              value={formData.adminEmail || ""}
              onChange={(e) => handleChange("adminEmail", e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Total Users</label>
            <input
              type="number"
              value={formData.totalUsers || 0}
              onChange={(e) => handleChange("totalUsers", parseInt(e.target.value) || 0)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Active Projects</label>
            <input
              type="number"
              value={formData.activeProjects || 0}
              onChange={(e) => handleChange("activeProjects", parseInt(e.target.value) || 0)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Status</label>
            <select
              value={formData.status || "Active"}
              onChange={(e) => handleChange("status", e.target.value as "Active" | "Inactive")}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
