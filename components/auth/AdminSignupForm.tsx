"use client";

import { FormEvent, useState } from "react";
import { registerAdmin, AdminSignupData } from "@/lib/auth";

interface AdminSignupFormProps {
  onSuccess: () => void;
}

export default function AdminSignupForm({ onSuccess }: AdminSignupFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState<AdminSignupData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    jobTitle: "",
    companyName: "",
    companyEmail: "",
    companySize: "",
    industry: "",
    companyWebsite: "",
    acceptTerms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!formData.firstName.trim()) return setErrorAndStop("First name is required.");
    if (!formData.lastName.trim()) return setErrorAndStop("Last name is required.");
    if (!formData.email.trim()) return setErrorAndStop("Email is required.");
    if (!formData.password) return setErrorAndStop("Password is required.");
    if (formData.password !== formData.confirmPassword) return setErrorAndStop("Passwords do not match.");
    if (!formData.phoneNumber.trim()) return setErrorAndStop("Phone number is required.");
    if (!formData.jobTitle.trim()) return setErrorAndStop("Job title is required.");

    if (!formData.companyName.trim()) return setErrorAndStop("Company name is required.");
    if (!formData.companyEmail.trim()) return setErrorAndStop("Company email is required.");
    if (!formData.companySize.trim()) return setErrorAndStop("Company size is required.");
    if (!formData.acceptTerms) return setErrorAndStop("You must accept terms and conditions.");

    try {
      const response = await registerAdmin(formData);
      if (response.success) {
        setSuccess(true);
        setTimeout(() => onSuccess(), 1200);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const setErrorAndStop = (msg: string) => {
    setError(msg);
    setLoading(false);
    return;
  };

  if (success) {
    return (
      <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-6 text-center">
        <div className="mb-3 text-4xl">✓</div>
        <h3 className="text-lg font-bold text-emerald-900">Admin Account Created!</h3>
        <p className="mt-2 text-sm text-emerald-700">Redirecting to login...</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {error ? <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">{error}</div> : null}

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
        <h2 className="mb-4 text-lg font-semibold text-slate-800">Company Info</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Company Name*</label>
            <input
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              disabled={loading}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
              placeholder="Acme Corp"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Company Email*</label>
            <input
              name="companyEmail"
              type="email"
              value={formData.companyEmail}
              onChange={handleChange}
              disabled={loading}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
              placeholder="office@acme.com"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Company Size*</label>
            <select
              name="companySize"
              value={formData.companySize}
              onChange={handleChange}
              disabled={loading}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
            >
              <option value="">Select size</option>
              <option value="1-10">1-10</option>
              <option value="11-50">11-50</option>
              <option value="51-200">51-200</option>
              <option value="201-500">201-500</option>
              <option value="500+">500+</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Industry (optional)</label>
            <select
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              disabled={loading}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
            >
              <option value="">Select optional industry</option>
              <option value="Software">Software</option>
              <option value="Financial Services">Financial Services</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Retail">Retail</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-slate-700">Company Website (optional)</label>
            <input
              name="companyWebsite"
              type="url"
              value={formData.companyWebsite}
              onChange={handleChange}
              disabled={loading}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
              placeholder="https://www.acme.com"
            />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
        <h2 className="mb-4 text-lg font-semibold text-slate-800">Admin Info</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">First Name*</label>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              disabled={loading}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
              placeholder="Jane"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Last Name*</label>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              disabled={loading}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
              placeholder="Doe"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 mt-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Email*</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
              placeholder="jane@acme.com"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Phone Number*</label>
            <input
              name="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handleChange}
              disabled={loading}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
              placeholder="+1 555-123-4567"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 mt-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Password*</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
              placeholder="Strong password"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Confirm Password*</label>
            <input
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={loading}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
              placeholder="Re-enter password"
            />
          </div>
        </div>

        <div className="mt-3">
          <label className="mb-1 block text-sm font-medium text-slate-700">Job Title*</label>
          <input
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            disabled={loading}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
            placeholder="Founder, CEO"
          />
        </div>
      </div>

      <div className="flex items-start gap-2">
        <input
          id="acceptTerms"
          name="acceptTerms"
          type="checkbox"
          checked={formData.acceptTerms}
          onChange={handleChange}
          disabled={loading}
          className="mt-1 h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-200"
        />
        <label htmlFor="acceptTerms" className="text-sm text-slate-700">
          I agree to the <a href="#" className="font-medium text-slate-900 hover:underline">Terms & Conditions</a> and <a href="#" className="font-medium text-slate-900 hover:underline">Privacy Policy</a>.
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:bg-slate-400"
      >
        {loading ? "Creating Admin Account..." : "Create Admin Account"}
      </button>
    </form>
  );
}
