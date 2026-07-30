'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/features/auth/context/AuthContext';
import { useUserProfile } from '@/features/profile/context/UserProfileContext';
import { userApi } from '@/lib/api/user';
import toast from 'react-hot-toast';

export default function ProfileSettingsPage() {
  const { user, refreshUser } = useAuth();
  const { careerProfile, updateCareerData } = useUserProfile();

  const [saving, setSaving] = useState(false);
  
  // Basic Profile State
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [headline, setHeadline] = useState('');
  const [bio, setBio] = useState('');
  
  // Career Preferences State (we store inside careerProfile.preferences for now based on typical setup)
  const [targetRole, setTargetRole] = useState('');

  useEffect(() => {
    if (user?.profile) {
      setFirstName(user.profile.firstName || '');
      setLastName(user.profile.lastName || '');
      setHeadline(user.profile.headline || '');
      setBio(user.profile.bio || '');
    }
    if (careerProfile?.preferences) {
      setTargetRole(careerProfile.preferences.targetRole || '');
    }
  }, [user, careerProfile]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      // 1. Update basic profile via user API
      await userApi.updateMyProfile({
        firstName,
        lastName,
        headline,
        bio
      });
      await refreshUser(); // Update AuthContext state
      
      // 2. Update career preferences
      await updateCareerData({
        preferences: {
          ...careerProfile?.preferences,
          targetRole
        }
      });
      
      toast.success('Profile updated successfully!');
    } catch (err: any) {
      toast.error(err.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ width: '100%', maxWidth: '896px', margin: '0 auto' }} className="w-full p-4 md:p-8 mt-16 md:mt-0">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Profile Settings</h1>
        <p className="text-slate-500 mt-2 text-lg">Update your personal and career information.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Personal Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">First Name</label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Last Name</label>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-2">Headline</label>
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="e.g. Full Stack Developer | Next.js | Node.js"
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-2">Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Career Profile</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-2">Target Role</label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g. Software Engineer II"
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="px-6 py-3 font-bold text-slate-700 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors flex items-center justify-center min-w-[120px]"
          >
            {saving ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
