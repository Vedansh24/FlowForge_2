'use client';

import { useState } from 'react';
import { createProject, getCurrentUser, getUsersByCompany, ProjectRecord } from '@/lib/auth';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProjectCreated: (project: ProjectRecord) => void;
}

export default function CreateProjectModal({
  isOpen,
  onClose,
  onProjectCreated,
}: CreateProjectModalProps) {
  const [projectTitle, setProjectTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [status, setStatus] = useState<'new' | 'ongoing' | 'completed'>('new');
  const [startDate, setStartDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const currentUser = getCurrentUser();
  const users = currentUser ? getUsersByCompany(currentUser.company) : [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate required fields
      if (!projectTitle.trim()) {
        setError('Project title is required.');
        setLoading(false);
        return;
      }

      if (!selectedUser) {
        setError('Please select a user to assign the project to.');
        setLoading(false);
        return;
      }

      // Get selected user's name for display
      const assignedUser = users.find((u) => u.id === selectedUser);
      const userName = assignedUser
        ? `${assignedUser.firstName} ${assignedUser.lastName}`
        : selectedUser;

      if (!currentUser) {
        setError('Unable to resolve current user');
        setLoading(false);
        return;
      }

      const newProject = createProject({
        title: projectTitle,
        description,
        assignedTo: selectedUser,
        priority,
        status,
        startDate,
        dueDate,
        tags,
        company: currentUser.company,
        createdBy: currentUser.id,
      });

      // Reset form
      setProjectTitle('');
      setDescription('');
      setSelectedUser('');
      setPriority('medium');
      setStatus('new');
      setStartDate('');
      setDueDate('');
      setTags('');
      setError('');
      onClose();
      onProjectCreated(newProject);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl transform rounded-xl bg-white p-6 shadow-xl transition-all duration-200 ease-out hover:scale-[1.01]">
        <h2 className="mb-6 text-2xl font-bold text-slate-900">Create Project</h2>

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Project Title */}
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Project Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              placeholder="Enter project title"
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter project description"
              rows={3}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Assign User */}
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Assign User <span className="text-red-500">*</span>
            </label>
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            >
              <option value="">Select a user</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.firstName} {user.lastName} ({user.email})
                </option>
              ))}
            </select>
          </div>

          {/* Priority & Status Row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Priority */}
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as 'new' | 'ongoing' | 'completed')}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              >
                <option value="new">New</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Start Date & Due Date Row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Start Date */}
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Tags <span className="text-xs text-slate-500">(comma-separated)</span>
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g., frontend, urgent, api"
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 transition hover:bg-gray-100 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white transition hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
