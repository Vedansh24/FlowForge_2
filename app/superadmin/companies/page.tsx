"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import CompanyTable, { CompanyRow } from "@/components/superadmin/CompanyTable";
import EditCompanyModal from "@/components/superadmin/EditCompanyModal";
import { isAuthenticatedSuperAdmin } from "@/lib/auth";

const initialCompanies: CompanyRow[] = [
  {
    id: "c01",
    name: "Vertex Labs",
    adminEmail: "admin@vertexlabs.com",
    totalUsers: 42,
    activeProjects: 11,
    status: "Active",
  },
  {
    id: "c02",
    name: "Omega Dynamics",
    adminEmail: "operations@omegadynamics.com",
    totalUsers: 27,
    activeProjects: 7,
    status: "Inactive",
  },
  {
    id: "c03",
    name: "Nova Ventures",
    adminEmail: "ceo@novaventures.io",
    totalUsers: 98,
    activeProjects: 24,
    status: "Active",
  },
];

export default function SuperAdminCompaniesPage() {
  const [companies, setCompanies] = useState<CompanyRow[]>(initialCompanies);
  const [editingCompany, setEditingCompany] = useState<CompanyRow | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticatedSuperAdmin()) {
      router.replace("/superadmin/login");
    }
  }, [router]);

  const handleDelete = async (companyId: string) => {
    if (confirm("Are you sure you want to delete this company?")) {
      // Simulate backend call
      setCompanies((prev) => prev.filter((c) => c.id !== companyId));
    }
  };

  const handleUpdate = async (companyId: string, updatedData: Partial<CompanyRow>) => {
    // Simulate backend call
    setCompanies((prev) =>
      prev.map((c) => (c.id === companyId ? { ...c, ...updatedData } : c))
    );
    setEditingCompany(null);
  };

  const handleEdit = (company: CompanyRow) => {
    setEditingCompany(company);
  };

  const handleCloseModal = () => {
    setEditingCompany(null);
  };

  return (
    <DashboardLayout role="superadmin">
      <section className="space-y-6">
        <header>
          <h2 className="text-2xl font-bold text-slate-900">Companies</h2>
          <p className="text-sm text-slate-600">Manage company details and status.</p>
        </header>

        <CompanyTable companies={companies} onEdit={handleEdit} onDelete={handleDelete} />

        {editingCompany && (
          <EditCompanyModal
            company={editingCompany}
            onSave={handleUpdate}
            onClose={handleCloseModal}
          />
        )}
      </section>
    </DashboardLayout>
  );
}

