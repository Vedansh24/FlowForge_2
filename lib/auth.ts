// REAL USER AUTHENTICATION SYSTEM

export type UserRole = "admin" | "user" | "superadmin";

// User data stored in localStorage
export interface StoredUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string; // In production, this would be hashed
  role: string;
  company: string;
  phoneNumber?: string;
  jobRole?: string;
  department?: string;
  createdAt: string;
}
export function getAllUsers(): StoredUser[] {
  if (typeof window === "undefined") return []

  const stored = localStorage.getItem("flowforge_users")

  if (!stored) return []

  try {
    return JSON.parse(stored)
  } catch {
    return []
  }
}

// Current session user
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  company: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  user: AuthUser;
  role: UserRole;
}

export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  company: string;
  phoneNumber?: string;
  jobRole?: string;
  department?: string;
}

export interface AdminSignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string;
  phoneNumber: string;
  jobTitle: string;
  companyName: string;
  companyEmail: string;
  companySize: string;
  industry?: string;
  companyWebsite?: string;
  acceptTerms: boolean;
}

export interface CompanyRecord {
  id: string;
  name: string;
  email: string;
  size: string;
  industry?: string;
  website?: string;
  createdAt: string;
}

export interface SignupResponse {
  success: boolean;
  message: string;
  user?: AuthUser;
}

// STORAGE KEYS
const USERS_STORAGE_KEY = "flowforge_users";
const COMPANIES_STORAGE_KEY = "flowforge_companies";
const CURRENT_USER_STORAGE_KEY = "flowforge_current_user";
const SUPERADMIN_STORAGE_KEY = "flowforge_superadmin_auth";

// SUPER ADMIN (unchanged)
const SUPER_ADMIN_EMAIL = "super@admin.com";
const SUPER_ADMIN_PASSWORD = "123456";

// ============ UTILITY FUNCTIONS ============

function getStoredUsers(): StoredUser[] {
  if (typeof window === "undefined") return [];
  try {
    const data = window.localStorage.getItem(USERS_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveStoredUsers(users: StoredUser[]): void {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  }
}

function generateUserId(): string {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function generateCompanyId(): string {
  return `company_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function getStoredCompanies(): CompanyRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const data = window.localStorage.getItem(COMPANIES_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveStoredCompanies(companies: CompanyRecord[]): void {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(COMPANIES_STORAGE_KEY, JSON.stringify(companies));
  }
}

// ============ REGISTRATION FUNCTIONS ============

export async function registerUser(data: SignupData): Promise<SignupResponse> {
  // Validate required fields
  if (!data.firstName?.trim() || !data.lastName?.trim() || !data.email?.trim() || !data.password || !data.company?.trim()) {
    return { success: false, message: "Missing required fields." };
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return { success: false, message: "Invalid email format." };
  }

  // Validate password strength
  if (data.password.length < 6) {
    return { success: false, message: "Password must be at least 6 characters long." };
  }

  // Check for existing user
  const users = getStoredUsers();
  const existingUser = users.find(user => user.email.toLowerCase() === data.email.toLowerCase());

  if (existingUser) {
    return { success: false, message: "An account with this email already exists." };
  }

  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));

  // Create new user
  const newUser: StoredUser = {
    id: generateUserId(),
    firstName: data.firstName.trim(),
    lastName: data.lastName.trim(),
    email: data.email.trim().toLowerCase(),
    password: data.password, // In production, hash this
    role: data.role,
    company: data.company.trim(),
    phoneNumber: data.phoneNumber?.trim(),
    jobRole: data.jobRole,
    department: data.department,
    createdAt: new Date().toISOString(),
  };

  // Save to localStorage
  users.push(newUser);
  saveStoredUsers(users);

  // Create auth user object
  const authUser: AuthUser = {
    id: newUser.id,
    email: newUser.email,
    name: `${newUser.firstName} ${newUser.lastName}`,
    role: newUser.role,
    company: newUser.company,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
  };

  return {
    success: true,
    message: "Account created successfully! Redirecting to login...",
    user: authUser,
  };
}

export async function registerAdmin(data: AdminSignupData): Promise<SignupResponse> {
  // Validate required fields
  if (
    !data.firstName?.trim() ||
    !data.lastName?.trim() ||
    !data.email?.trim() ||
    !data.password ||
    !data.companyName?.trim() ||
    !data.companyEmail?.trim() ||
    !data.companySize?.trim() ||
    !data.phoneNumber?.trim() ||
    !data.jobTitle?.trim() ||
    !data.acceptTerms
  ) {
    return { success: false, message: "Missing required fields for admin/company registration." };
  }

  if (data.password.length < 6) {
    return { success: false, message: "Password must be at least 6 characters long." };
  }

  if (data.password !== data.confirmPassword) {
    return { success: false, message: "Passwords do not match." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email) || !emailRegex.test(data.companyEmail)) {
    return { success: false, message: "Email or company email format is invalid." };
  }

  const users = getStoredUsers();
  if (users.find((u) => u.email.toLowerCase() === data.email.toLowerCase())) {
    return { success: false, message: "An account with this email already exists." };
  }

  const companies = getStoredCompanies();
  if (companies.find((c) => c.name.toLowerCase() === data.companyName.trim().toLowerCase())) {
    return { success: false, message: "A company with this name already exists." };
  }

  // Create company record
  const newCompany: CompanyRecord = {
    id: generateCompanyId(),
    name: data.companyName.trim(),
    email: data.companyEmail.trim().toLowerCase(),
    size: data.companySize,
    industry: data.industry || "",
    website: data.companyWebsite?.trim() || "",
    createdAt: new Date().toISOString(),
  };

  companies.push(newCompany);
  saveStoredCompanies(companies);

  // Create and save admin user
  const newUser: StoredUser = {
    id: generateUserId(),
    firstName: data.firstName.trim(),
    lastName: data.lastName.trim(),
    email: data.email.trim().toLowerCase(),
    password: data.password,
    role: "admin",
    company: newCompany.name,
    phoneNumber: data.phoneNumber.trim(),
    jobRole: data.jobTitle.trim(),
    department: undefined,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  saveStoredUsers(users);

  const authUser: AuthUser = {
    id: newUser.id,
    email: newUser.email,
    name: `${newUser.firstName} ${newUser.lastName}`,
    role: newUser.role,
    company: newUser.company,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
  };

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  return {
    success: true,
    message: "Admin account and company created successfully. Redirecting to login...",
    user: authUser,
  };
}

// ============ LOGIN FUNCTIONS ============

export async function login(email: string, password: string): Promise<AuthResponse> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Get stored users
  const users = getStoredUsers();

  // Find user by email and password
  const user = users.find(u =>
    u.email.toLowerCase() === email.toLowerCase() &&
    u.password === password
  );

  if (!user) {
    throw new Error("Invalid email or password.");
  }

  // Create auth user object
  const authUser: AuthUser = {
    id: user.id,
    email: user.email,
    name: `${user.firstName} ${user.lastName}`,
    role: user.role,
    company: user.company,
    firstName: user.firstName,
    lastName: user.lastName,
  };

  // Store current session
  if (typeof window !== "undefined") {
    window.localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify({
      user: authUser,
      role: user.role,
      loginTime: new Date().toISOString(),
    }));
  }

  return { user: authUser, role: user.role };
}

// ============ SESSION MANAGEMENT ============

export function logout(): void {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
  }
}

export function getCurrentUser(): AuthUser | null {
  if (typeof window === "undefined") return null;

  try {
    const data = window.localStorage.getItem(CURRENT_USER_STORAGE_KEY);
    if (!data) return null;

    const session = JSON.parse(data);
    return session.user || null;
  } catch {
    return null;
  }
}

export function getCurrentRole(): UserRole | null {
  if (typeof window === "undefined") return null;

  try {
    const data = window.localStorage.getItem(CURRENT_USER_STORAGE_KEY);
    if (!data) return null;

    const session = JSON.parse(data);
    return session.role || null;
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null;
}

export function isAuthenticatedAdmin(): boolean {
  return isAdmin();
}

export function isAdmin(): boolean {
  return getCurrentRole() === "admin";
}

export function isUser(): boolean {
  return getCurrentRole() === "user";
}

// ============ SUPER ADMIN (legacy support) ============

export interface SuperAdminUser {
  email: string;
  role: "superadmin";
}

export async function loginSuperAdmin(email: string, password: string): Promise<SuperAdminUser> {
  if (email === SUPER_ADMIN_EMAIL && password === SUPER_ADMIN_PASSWORD) {
    const user = { email, role: "superadmin" } as SuperAdminUser;
    if (typeof window !== "undefined") {
      window.localStorage.setItem(SUPERADMIN_STORAGE_KEY, JSON.stringify(user));
    }
    return user;
  }
  throw new Error("Invalid super admin credentials.");
}

export function logoutSuperAdmin() {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(SUPERADMIN_STORAGE_KEY);
  }
}

export function getCurrentSuperAdmin(): SuperAdminUser | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(SUPERADMIN_STORAGE_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as SuperAdminUser;
    if (parsed?.email === SUPER_ADMIN_EMAIL && parsed?.role === "superadmin") {
      return parsed;
    }
  } catch {
    return null;
  }
  return null;
}

export function isAuthenticatedSuperAdmin(): boolean {
  return getCurrentSuperAdmin() !== null;
}

// ============ LEGACY COMPATIBILITY ============

export function logoutAdmin() {
  logout();
}

export function logoutUser() {
  logout();
}

export function getCurrentAdmin(): AuthUser | null {
  const user = getCurrentUser();
  return user?.role === "admin" ? user : null;
}

// ============ USER MANAGEMENT ============

export function getAllCompanies(): CompanyRecord[] {
  return getStoredCompanies();
}

export function getUsersByCompany(company: string): StoredUser[] {
  if (!company) return [];
  return getStoredUsers().filter((user) => user.company === company);
}

// ============ TASK MANAGEMENT ============

export interface TaskRecord {
  id: string;
  title: string;
  projectId: string;
  projectTitle: string;
  assignedTo: string; // userId
  company: string;
  status: "pending" | "in-progress" | "completed";
  createdAt: string;
}

const TASKS_STORAGE_KEY = "flowforge_tasks";

function getStoredTasks(): TaskRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const data = window.localStorage.getItem(TASKS_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveStoredTasks(tasks: TaskRecord[]): void {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  }
}

function generateTaskId(): string {
  return `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export async function assignTask(data: {
  title: string;
  assignedTo: string;
  projectId: string;
  status?: "pending" | "in-progress" | "completed";
}): Promise<{ success: boolean; message: string; taskId?: string }> {
  if (!data.title?.trim() || !data.assignedTo?.trim() || !data.projectId?.trim()) {
    return { success: false, message: "Missing required task fields." };
  }

  const users = getStoredUsers();
  const assignedUser = users.find((u) => u.id === data.assignedTo);
  const taskCompany = assignedUser?.company || "";

  // Get project title from projectId
  const projects = getStoredProjects();
  const selectedProject = projects.find((p) => p.id === data.projectId);
  const projectTitle = selectedProject?.title || "Unknown Project";

  const newTask: TaskRecord = {
    id: generateTaskId(),
    title: data.title.trim(),
    projectId: data.projectId,
    projectTitle: projectTitle,
    assignedTo: data.assignedTo,
    company: taskCompany,
    status: data.status || "pending",
    createdAt: new Date().toISOString(),
  };

  const tasks = getStoredTasks();
  tasks.push(newTask);
  saveStoredTasks(tasks);

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    success: true,
    message: "Task assigned successfully.",
    taskId: newTask.id,
  };
}

export function getAllTasks(): TaskRecord[] {
  return getStoredTasks();
}

export function getTasksByCompany(company: string): TaskRecord[] {
  if (!company) return [];
  return getStoredTasks().filter((task) => task.company === company);
}

export function getTasksByUser(userId: string): TaskRecord[] {
  const currentUser = getCurrentUser();
  if (!currentUser) return [];

  return getStoredTasks().filter((task) => {
    const matchesUser = task.assignedTo === userId;
    const matchesCompany = task.company === currentUser.company;
    return matchesUser && matchesCompany;
  });
}

// ============ PROJECT MANAGEMENT ============

export interface ProjectRecord {
  id: string;
  title: string;
  description: string;
  assignedTo: string; // userId
  company?: string;
  priority: "low" | "medium" | "high";
  status: "new" | "ongoing" | "completed";
  startDate: string;
  dueDate: string;
  tags: string[]; // comma-separated tags stored as array
  createdAt: string;
}

const PROJECTS_STORAGE_KEY = "flowforge_projects";

function getStoredProjects(): ProjectRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const data = window.localStorage.getItem(PROJECTS_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveStoredProjects(projects: ProjectRecord[]): void {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
  }
}

function generateProjectId(): string {
  return `project_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function createProject(data: {
  title: string;
  description?: string;
  assignedTo: string;
  priority: "low" | "medium" | "high";
  status: "new" | "ongoing" | "completed";
  startDate?: string;
  dueDate?: string;
  tags?: string;
  company?: string;
  createdBy?: string;
}): ProjectRecord {
  if (!data.title?.trim() || !data.assignedTo?.trim()) {
    throw new Error("Project title and assigned user are required.");
  }

  const assignedToUserId = data.assignedTo;
  const users = getStoredUsers();
  const assignedUser = users.find((u) => u.id === assignedToUserId);
  const company = data.company || assignedUser?.company || "";

  const newProject: ProjectRecord = {
    id: generateProjectId(),
    title: data.title.trim(),
    description: data.description?.trim() || "",
    assignedTo: data.assignedTo,
    company,
    priority: data.priority || "medium",
    status: data.status || "new",
    startDate: data.startDate || new Date().toISOString().split("T")[0],
    dueDate: data.dueDate || "",
    tags: data.tags
      ? data.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0)
      : [],
    createdAt: new Date().toISOString(),
  };

  const projects = getStoredProjects();
  const updated = [...projects, newProject];
  saveStoredProjects(updated);

  return newProject;
}

export function getAllProjects(): ProjectRecord[] {
  return getStoredProjects();
}

export function getProjectsByCompany(company: string): ProjectRecord[] {
  if (!company) return [];
  return getStoredProjects().filter((project) => project.company === company);
}

export function getProjectsByUser(userId: string): ProjectRecord[] {
  const currentUser = getCurrentUser();
  if (!currentUser) return [];

  return getStoredProjects().filter((project) => {
    const matchesUser = project.assignedTo === userId;
    const matchesCompany = project.company ? project.company === currentUser.company : false;
    return matchesUser && matchesCompany;
  });
}

export function updateProjectStatus(
  projectId: string,
  newStatus: "new" | "ongoing" | "completed"
): boolean {
  const projects = getStoredProjects();
  const project = projects.find((p) => p.id === projectId);
  if (!project) return false;
  project.status = newStatus;
  saveStoredProjects(projects);
  return true;
}

// Get all projects for use in dropdowns/forms
export function getProjectsForSelection(): Array<{ id: string; title: string }> {
  const projects = getStoredProjects();
  return projects.map((p) => ({ id: p.id, title: p.title }));
}

