"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Sun, Moon, Zap, Users, CheckCircle, ArrowRight, BarChart3, Layers } from "lucide-react";

export default function HomePage() {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (newTheme: string) => {
    const html = document.documentElement;
    if (newTheme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Navigation with Theme Toggle */}
      <div className="fixed right-6 top-6 z-50">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <Moon className="w-5 h-5 text-gray-900 dark:text-white" />
          ) : (
            <Sun className="w-5 h-5 text-gray-900 dark:text-white" />
          )}
        </button>
      </div>

      <Navbar />

      <main className="overflow-hidden">
        {/* Hero Section */}
        <section className="relative px-4 py-20 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-50 dark:from-indigo-950/30 to-transparent pointer-events-none" />
          
          <div className="relative mx-auto max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <h1 className="text-5xl sm:text-6xl font-black leading-tight">
                  <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Manage Workflows Smarter
                  </span>
                  {" "}with FlowForge
                </h1>
                
                <p className="mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  Bring clarity to project management, task assignment, and team productivity. 
                  FlowForge is the all-in-one platform for modern teams to collaborate effortlessly.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href="/login"
                    className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-base font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a
                    href="/signup"
                    className="inline-flex items-center gap-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 px-8 py-4 text-base font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
                  >
                    Sign Up
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

                <div className="mt-8 flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>No credit card required • 14-day free trial</span>
                </div>
              </div>

              {/* Dashboard Preview */}
              <div className="relative">
                <div className="rounded-2xl bg-gradient-to-br from-indigo-100 dark:from-indigo-900/30 to-purple-100 dark:to-purple-900/30 p-8 shadow-2xl backdrop-blur-sm border border-indigo-200 dark:border-indigo-800">
                  <div className="rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-6 shadow-inner">
                    <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                      Dashboard Preview
                    </p>
                    
                    <div className="mt-6 space-y-3">
                      <div className="h-3 w-3/4 rounded-full bg-gray-200 dark:bg-gray-700" />
                      <div className="h-3 w-full rounded-full bg-gray-200 dark:bg-gray-700" />
                      <div className="h-3 w-2/3 rounded-full bg-gray-200 dark:bg-gray-700" />
                    </div>

                    <div className="mt-6 grid grid-cols-3 gap-3">
                      <div className="rounded-lg bg-indigo-50 dark:bg-indigo-900/20 h-20 border border-indigo-200 dark:border-indigo-700" />
                      <div className="rounded-lg bg-purple-50 dark:bg-purple-900/20 h-20 border border-purple-200 dark:border-purple-700" />
                      <div className="rounded-lg bg-pink-50 dark:bg-pink-900/20 h-20 border border-pink-200 dark:border-pink-700" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-4 py-20 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/50">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                Powerful Features Built for Teams
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Everything you need to manage projects, assign tasks, and track progress in one place.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Feature 1 */}
              <div className="group rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 group-hover:scale-110 transition-transform duration-300">
                  <Layers className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="mt-4 text-xl font-bold">Project Management</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Create, organize, and track projects with intuitive Kanban boards and status workflows.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="group rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="mt-4 text-xl font-bold">Smart Task Assignment</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Assign tasks to team members, set priorities, and track progress in real-time.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="group rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-pink-100 dark:bg-pink-900/30 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                </div>
                <h3 className="mt-4 text-xl font-bold">Team Collaboration</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Keep your entire team synchronized with real-time updates and collaborative workflows.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                Get Started in 4 Simple Steps
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                From setup to collaboration, FlowForge makes it effortless.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {/* Step 1 */}
              <div className="relative">
                <div className="rounded-xl border-2 border-indigo-200 dark:border-indigo-800 bg-white dark:bg-gray-800 p-8">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-indigo-600 text-white font-bold text-lg">
                    1
                  </div>
                  <h3 className="mt-4 text-lg font-bold">Create Company</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
                    Set up your company workspace in seconds.
                  </p>
                </div>
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-indigo-600 to-transparent" />
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className="rounded-xl border-2 border-purple-200 dark:border-purple-800 bg-white dark:bg-gray-800 p-8">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-purple-600 text-white font-bold text-lg">
                    2
                  </div>
                  <h3 className="mt-4 text-lg font-bold">Invite Users</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
                    Add team members with different roles.
                  </p>
                </div>
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-purple-600 to-transparent" />
              </div>

              {/* Step 3 */}
              <div className="relative">
                <div className="rounded-xl border-2 border-pink-200 dark:border-pink-800 bg-white dark:bg-gray-800 p-8">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-pink-600 text-white font-bold text-lg">
                    3
                  </div>
                  <h3 className="mt-4 text-lg font-bold">Create Projects</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
                    Organize work into projects and tasks.
                  </p>
                </div>
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-pink-600 to-transparent" />
              </div>

              {/* Step 4 */}
              <div className="relative">
                <div className="rounded-xl border-2 border-blue-200 dark:border-blue-800 bg-white dark:bg-gray-800 p-8">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-lg">
                    4
                  </div>
                  <h3 className="mt-4 text-lg font-bold">Track Progress</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
                    Monitor tasks and team productivity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="px-4 py-20 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-50 dark:from-indigo-950/30 to-purple-50 dark:to-purple-950/30">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">99.9%</div>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Uptime SLA</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">10K+</div>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Active Teams</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-pink-600 dark:text-pink-400">24/7</div>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Support Available</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Ready to transform your team's workflow?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Join thousands of teams already using FlowForge to manage their workflows smarter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/signup"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-base font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                Start Free Trial
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/login"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 px-8 py-4 text-base font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
              >
                Sign In
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
