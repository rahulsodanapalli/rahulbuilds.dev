import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Layers, Briefcase, Award, FolderOpen,Loader2, Mail } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

// Admin forms imports
import SkillsForm from '../components/admin/SkillsForm';
import ExperienceForm from '../components/admin/ExperienceForm';
import ProjectForm from '../components/admin/ProjectForm';
import AchievementForm from '../components/admin/AchievementForm';
import MessagesForm from '../components/admin/MessagesForm';
import { IoMdLogOut } from 'react-icons/io';


type DashboardTab = 'projects' | 'experience' | 'skills' | 'achievements' | 'messages';

export default function AdminDashboard() {
  const { logout, email, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<DashboardTab>('projects');

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const tabs = [
    { id: 'projects' as DashboardTab, label: 'Projects Spec', icon: <FolderOpen size={16} /> },
    { id: 'experience' as DashboardTab, label: 'Career Journey', icon: <Briefcase size={16} /> },
    { id: 'skills' as DashboardTab, label: 'Skills & Armament', icon: <Layers size={16} /> },
    { id: 'achievements' as DashboardTab, label: 'Achievements', icon: <Award size={16} /> },
    { id: 'messages' as DashboardTab, label: 'Client Inquiries', icon: <Mail size={16} /> },
  ];

  return (
    <div className="min-h-screen w-full bg-cream text-deep-black py-4 px-6 md:px-10 select-none relative overflow-hidden bg-noise">
      {/* Subtle border geometry */}
      <div className="absolute w-[600px] h-[600px] rounded-full border border-border-cream/30 pointer-events-none top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 z-0" />

      <div className="max-w-10xl mx-auto relative z-10">
        {/* Header Dashboard Nav */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-4
         border-b border-border-cream pb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Shield size={16} className="text-burnt-orange" />
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-secondary-gray font-sans">
                System Administrator Console
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-light tracking-tight text-deep-black uppercase font-display">
              Admin <span className="italic font-normal text-burnt-orange text-4xl md:text-5xl">Dashboard</span>
            </h1>
            <p className="text-[9px] font-bold text-muted uppercase tracking-wider mt-1 flex items-center gap-1 font-sans">
              Logged in as: <span className="text-burnt-orange font-normal lowercase">{email}</span>
            </p>
            {email === 'guest@rahulbuilds.dev' && (
              <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 text-red-600 rounded-xl flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest font-sans inline-flex">
                <Shield size={14} className="text-red-500" />
                Read-Only Guest Access Mode
              </div>
            )}
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            disabled={loading}
            className="px-2 py-2 border border-red-200 bg-card-white hover:border-red-500 hover:bg-red-50/50 text-red-600 font-bold uppercase tracking-widest text-[9px] rounded-full flex items-center gap-2 transition-all duration-300 interactive shadow-minimal font-sans"
          >
            {loading ? (
              <Loader2 size={12} className="animate-spin" />
            ) : (
              <IoMdLogOut size={13} className="text-red-500" />
            )}
            Log Out
          </button>
        </div>

        {/* Tab Controls Selector Grid */}
        <div className="flex flex-wrap gap-2.5 mb-2 pb-2 overflow-x-auto">
          {tabs.map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-3.5 rounded-2xl border font-bold uppercase tracking-widest text-[9px] md:text-[10px] flex items-center gap-2.5 transition-all duration-300 interactive font-sans ${isSelected
                  ? 'bg-deep-black text-cream border-deep-black shadow-minimal'
                  : 'bg-card-white text-secondary-gray hover:text-deep-black border-border-cream shadow-minimal'
                  }`}
              >
                <span className={isSelected ? 'text-burnt-orange' : 'text-secondary-gray/50'}>
                  {tab.icon}
                </span>
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Active Tab Panel Dynamic Container */}
        <div className="w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {activeTab === 'projects' && <ProjectForm />}
              {activeTab === 'experience' && <ExperienceForm />}
              {activeTab === 'skills' && <SkillsForm />}
              {activeTab === 'achievements' && <AchievementForm />}
              {activeTab === 'messages' && <MessagesForm />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
