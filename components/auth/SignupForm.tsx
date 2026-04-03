"use client";

import { FormEvent, useState, useEffect } from "react";
import { registerUser, SignupData, getAllCompanies, CompanyRecord } from "@/lib/auth";
import { JOB_ROLES, DEPARTMENTS } from "@/lib/mockData";

interface SignupFormProps {
  onSuccess: () => void;
  defaultRole?: "admin" | "user";
}

export default function SignupForm({ onSuccess, defaultRole }: SignupFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState(false);
  const [companies, setCompanies] = useState<CompanyRecord[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("flowforge_companies");
    if (stored) {
      setCompanies(JSON.parse(stored));
    }
  }, []);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: (defaultRole || "user") as "admin" | "user",
    company: "",
    phoneNumber: "",
    jobRole: "",
    department: "",
    acceptTerms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validation
    if (!formData.firstName.trim()) {
      setError("First name is required.");
      setLoading(false);
      return;
    }

    if (!formData.lastName.trim()) {
      setError("Last name is required.");
      setLoading(false);
      return;
    }

    if (!formData.email.trim()) {
      setError("Email is required.");
      setLoading(false);
      return;
    }

    if (!formData.password) {
      setError("Password is required.");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    if (!formData.company) {
      setError("Please select a company.");
      setLoading(false);
      return;
    }

    if (!formData.phoneNumber.trim()) {
      setError("Phone number is required.");
      setLoading(false);
      return;
    }

    if (!formData.jobRole) {
      setError("Please select a job role.");
      setLoading(false);
      return;
    }

    if (!formData.acceptTerms) {
      setError("You must accept the terms and conditions.");
      setLoading(false);
      return;
    }

    try {
      const response = await registerUser({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        password: formData.password,
        role: formData.role,
        company: formData.company,
        phoneNumber: formData.phoneNumber.trim(),
        jobRole: formData.jobRole,
        department: formData.department || undefined,
      });

      if (response.success) {
        setSuccess(true);
        setTimeout(() => {
          onSuccess();
        }, 2000);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-6 text-center">
        <div className="mb-3 text-4xl">✓</div>
        <h3 className="text-lg font-bold text-emerald-900">Account Created!</h3>
        <p className="mt-2 text-sm text-emerald-700">
          Your account has been successfully created. Redirecting to login...
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {error ? (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="mb-1 block text-sm font-medium text-slate-700">
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
            disabled={loading}
            className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 disabled:bg-slate-100 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
            placeholder="John"
          />
        </div>

        <div>
          <label htmlFor="lastName" className="mb-1 block text-sm font-medium text-slate-700">
            Last Name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
            disabled={loading}
            className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 disabled:bg-slate-100 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
            placeholder="Doe"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          disabled={loading}
          className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 disabled:bg-slate-100 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
          placeholder="john@example.com"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-700">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            disabled={loading}
            className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 disabled:bg-slate-100 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
            placeholder="At least 6 characters"
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="mb-1 block text-sm font-medium text-slate-700">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            disabled={loading}
            className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 disabled:bg-slate-100 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
            placeholder="Confirm password"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="role" className="mb-1 block text-sm font-medium text-slate-700">
            Role
          </label>
          {defaultRole === "admin" ? (
            <div className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-500 bg-slate-50">
              Company Admin
            </div>
          ) : (
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              disabled={loading}
              className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 disabled:bg-slate-100 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
            >
              <option value="user">User (Employee / Intern)</option>
              <option value="admin">Admin (Company Owner)</option>
            </select>
          )}
        </div>

        <div>
          <label htmlFor="company_id" className="mb-1 block text-sm font-medium text-slate-700">
            Company
          </label>
          {companies.length === 0 ? (
            <div className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-500 bg-slate-50">
              No companies available. Please contact your admin.
            </div>
          ) : (
            <select
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              disabled={loading}
              className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 disabled:bg-slate-100 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
            >
              <option value="">Select a company</option>
              {companies.map((company) => (
                <option key={company.id} value={company.name}>
                  {company.name}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="phoneNumber" className="mb-1 block text-sm font-medium text-slate-700">
          Phone Number
        </label>
        <input
          id="phoneNumber"
          name="phoneNumber"
          type="tel"
          value={formData.phoneNumber}
          onChange={handleChange}
          disabled={loading}
          className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 disabled:bg-slate-100 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
          placeholder="+1 (555) 000-0000"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="jobRole" className="mb-1 block text-sm font-medium text-slate-700">
            Job Role
          </label>
          <select
            id="jobRole"
            name="jobRole"
            value={formData.jobRole}
            onChange={handleChange}
            disabled={loading}
            className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 disabled:bg-slate-100 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
          >
            <option value="">Select job role</option>
            {JOB_ROLES.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="department" className="mb-1 block text-sm font-medium text-slate-700">
            Department (Optional)
          </label>
          <select
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            disabled={loading}
            className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 disabled:bg-slate-100 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
          >
            <option value="">Select department</option>
            {DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <input
          id="acceptTerms"
          name="acceptTerms"
          type="checkbox"
          checked={formData.acceptTerms}
          onChange={handleChange}
          disabled={loading}
          className="mt-1 h-4 w-4 rounded border-slate-300 text-slate-900 disabled:bg-slate-100"
        />
        <label htmlFor="acceptTerms" className="text-sm text-slate-700">
          I accept the{" "}
          <a href="#" className="font-medium text-slate-900 hover:underline">
            Terms and Conditions
          </a>{" "}
          and{" "}
          <a href="#" className="font-medium text-slate-900 hover:underline">
            Privacy Policy
          </a>
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition disabled:bg-slate-500 hover:bg-slate-700"
      >
        {loading ? "Creating Account..." : "Create Account"}
      </button>

      <p className="text-center text-sm text-slate-600">
        Already have an account?{" "}
        <a href="/login" className="font-medium text-slate-900 hover:underline">
          Sign in
        </a>
      </p>
    </form>
  );
}
