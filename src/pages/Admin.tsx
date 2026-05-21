import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../hooks/useStore';
import type { ProjectItem, ExperienceItem } from '../hooks/useStore';
import { ShieldCheck, Plus, Trash2, ArrowLeft, Database, Download, RotateCcw, Lock, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import MagneticButton from '../components/MagneticButton';

export default function Admin() {
  const { 
    projects, 
    experiences, 
    addProject, 
    deleteProject, 
    addExperience, 
    deleteExperience, 
    resetToDefault 
  } = useStore();

  const [pin, setPin] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Editing console state
  const [activeTab, setActiveTab] = useState<'experiences' | 'projects'>('experiences');
  const [exportModalContent, setExportModalContent] = useState<string | null>(null);

  // Form states - Experience
  const [expRole, setExpRole] = useState('');
  const [expCompany, setExpCompany] = useState('');
  const [expLoc, setExpLoc] = useState('');
  const [expPeriod, setExpPeriod] = useState('');
  const [expDetails, setExpDetails] = useState('');
  const [expTech, setExpTech] = useState('');

  // Form states - Project
  const [projId, setProjId] = useState('');
  const [projTitle, setProjTitle] = useState('');
  const [projSub, setProjSub] = useState('');
  const [projCat, setProjCat] = useState('');
  const [projDesc, setProjDesc] = useState('');
  const [projMock, setProjMock] = useState('custom');
  
  const [specChallenge, setSpecChallenge] = useState('');
  const [specSolution, setSpecSolution] = useState('');
  const [specArch, setSpecArch] = useState('');
  const [specPerf, setSpecPerf] = useState('');
  const [specTech, setSpecTech] = useState('');
  const [specImpact, setSpecImpact] = useState('');

  // Passcode verification
  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '2026') {
      setIsUnlocked(true);
      setLoginError('');
    } else {
      setLoginError('Invalid Administrator Passcode. Please try again.');
    }
  };

  // Add handlers
  const handleAddExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expRole || !expCompany || !expPeriod) return alert("Please fill in core details.");

    const newExp: ExperienceItem = {
      role: expRole,
      company: expCompany,
      location: expLoc || "Remote / Hybrid",
      period: expPeriod,
      details: expDetails.split('\n').filter(d => d.trim() !== ''),
      tech: expTech.split(',').map(t => t.trim()).filter(t => t !== '')
    };

    addExperience(newExp);
    
    // Reset inputs
    setExpRole('');
    setExpCompany('');
    setExpLoc('');
    setExpPeriod('');
    setExpDetails('');
    setExpTech('');
    alert("Experience milestone successfully added to database!");
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projId || !projTitle || !projCat) return alert("Please fill in core project parameters.");

    const newProj: ProjectItem = {
      id: projId.toLowerCase().replace(/\s+/g, '-'),
      title: projTitle,
      subtitle: projSub || "Case Study",
      category: projCat,
      desc: projDesc,
      imageMockup: projMock,
      specs: {
        challenge: specChallenge,
        solution: specSolution,
        architecture: specArch,
        performance: specPerf,
        tech: specTech.split(',').map(t => t.trim()).filter(t => t !== ''),
        impact: specImpact
      }
    };

    addProject(newProj);

    // Reset inputs
    setProjId('');
    setProjTitle('');
    setProjSub('');
    setProjCat('');
    setProjDesc('');
    setProjMock('custom');
    setSpecChallenge('');
    setSpecSolution('');
    setSpecArch('');
    setSpecPerf('');
    setSpecTech('');
    setSpecImpact('');
    alert("Featured Case Study successfully added to database!");
  };

  // Code Export generator
  const triggerExport = () => {
    
    const formatted = `// Copy-paste this configuration straight into src/hooks/useStore.ts
// to make your additions permanent across all user repositories!

export const DEFAULT_EXPERIENCES = ${JSON.stringify(experiences, null, 2)};

export const DEFAULT_PROJECTS = ${JSON.stringify(projects, null, 2)};
`;
    setExportModalContent(formatted);
  };

  // Secure Lock Frame
  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-cream flex flex-col justify-center items-center px-6 selection:bg-luxury-gold/20 select-none">
        
        {/* Return Button */}
        <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-luxury-charcoal/60 hover:text-luxury-black transition-colors duration-300">
          <ArrowLeft size={14} /> Back to Portfolio
        </Link>

        {/* Lock Panel */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-cream-light border border-luxury-black/[0.04] p-8 md:p-10 rounded-3xl shadow-luxury text-center relative"
        >
          <div className="w-12 h-12 bg-luxury-gold/10 border border-luxury-gold/30 rounded-2xl flex items-center justify-center mx-auto mb-6 text-luxury-gold">
            <Lock size={20} />
          </div>

          <h1 className="text-2xl font-light text-luxury-black mb-2 font-sans tracking-tight">
            Administrator Gateway
          </h1>
          <p className="text-xs text-luxury-charcoal/50 mb-8 font-sans">
            Authentication is required to unlock real-time database modifications.
          </p>

          <form onSubmit={handleVerify} className="space-y-6">
            <div className="flex flex-col gap-2 text-left relative">
              <label className="text-[9px] uppercase tracking-widest font-bold text-luxury-charcoal/60" htmlFor="pin">
                Administrator PIN
              </label>
              <div className="relative">
                <input
                  id="pin"
                  type={showPin ? "text" : "password"}
                  placeholder="••••"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="w-full px-4 py-3 bg-cream border border-luxury-black/5 rounded-xl text-center font-mono text-sm tracking-widest focus:outline-none focus:border-luxury-gold transition-all duration-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-luxury-charcoal/40 hover:text-luxury-black transition-colors"
                  aria-label={showPin ? "Hide PIN" : "Show PIN"}
                >
                  {showPin ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {loginError && (
                <span className="text-[10px] text-red-500 text-center mt-2 block font-medium">
                  {loginError}
                </span>
              )}
            </div>

            <MagneticButton>
              <button 
                type="submit" 
                className="w-full py-4 bg-luxury-black hover:bg-luxury-charcoal text-cream font-semibold uppercase tracking-widest text-[10px] rounded-full shadow-luxury transition-all duration-300"
              >
                Authenticate Node
              </button>
            </MagneticButton>
          </form>
        </motion.div>
      </div>
    );
  }

  // Admin Dashboard Frame
  return (
    <div className="min-h-screen bg-cream py-20 px-6 md:px-12 selection:bg-luxury-gold/20 font-sans">
      <div className="max-w-6xl mx-auto w-full">
        
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-luxury-black/5 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-2 text-luxury-gold">
              <ShieldCheck size={18} />
              <span className="text-[10px] uppercase font-bold tracking-widest">
                Database Node Operator v1.2
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-light text-luxury-black tracking-tight">
              Administrative <span className="font-serif italic text-luxury-gold">Console</span>
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={triggerExport}
              className="px-4 py-2 border border-luxury-black/10 hover:border-luxury-black/35 rounded-full flex items-center gap-2 text-[9px] uppercase font-bold text-luxury-charcoal tracking-widest transition-all duration-300 bg-cream-light shadow-sm"
            >
              <Download size={12} className="text-luxury-gold" /> Export Config (JSON)
            </button>

            <button
              onClick={() => {
                if (confirm("Reset local database overrides back to your premium Hyderabad and Abu Dhabi defaults?")) {
                  resetToDefault();
                  alert("Local database reset successful!");
                }
              }}
              className="px-4 py-2 border border-red-200 hover:border-red-400 hover:bg-red-50/50 rounded-full flex items-center gap-2 text-[9px] uppercase font-bold text-red-700 tracking-widest transition-all duration-300 bg-cream-light"
            >
              <RotateCcw size={12} /> Reset Database
            </button>

            <Link
              to="/"
              className="px-4 py-2 bg-luxury-black hover:bg-luxury-charcoal text-cream rounded-full flex items-center gap-2 text-[9px] uppercase font-bold tracking-widest transition-all duration-300 shadow-md"
            >
              <ArrowLeft size={12} className="text-luxury-gold" /> Exit Panel
            </Link>
          </div>
        </div>

        {/* Console Tab Selector */}
        <div className="flex gap-4 mb-10 border-b border-luxury-black/5 pb-4">
          <button
            onClick={() => setActiveTab('experiences')}
            className={`px-6 py-2.5 rounded-xl text-[10px] uppercase tracking-wider font-bold transition-all duration-300 border ${
              activeTab === 'experiences'
                ? 'bg-luxury-black border-luxury-black text-cream shadow-md'
                : 'bg-transparent border-transparent text-luxury-charcoal/60 hover:text-luxury-black'
            }`}
          >
            Manage Career Experiences ({experiences.length})
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-6 py-2.5 rounded-xl text-[10px] uppercase tracking-wider font-bold transition-all duration-300 border ${
              activeTab === 'projects'
                ? 'bg-luxury-black border-luxury-black text-cream shadow-md'
                : 'bg-transparent border-transparent text-luxury-charcoal/60 hover:text-luxury-black'
            }`}
          >
            Manage Featured Case Studies ({projects.length})
          </button>
        </div>

        {/* Tab Panel Context */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Columns: Existing database list viewer */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-xs uppercase tracking-widest font-bold text-luxury-charcoal/40 mb-2 flex items-center gap-2">
              <Database size={12} /> Active Node Registry
            </h2>

            {activeTab === 'experiences' ? (
              <div className="space-y-4">
                {experiences.map((exp, idx) => (
                  <div key={idx} className="bg-cream-light border border-luxury-black/[0.04] p-5 rounded-2xl shadow-luxury flex justify-between items-start gap-4">
                    <div className="space-y-1">
                      <span className="text-[9px] uppercase tracking-wider font-mono text-luxury-gold font-bold block">{exp.period}</span>
                      <h4 className="text-sm font-bold text-luxury-black">{exp.role}</h4>
                      <p className="text-[11px] font-medium text-luxury-charcoal/60">{exp.company}</p>
                    </div>
                    <button
                      onClick={() => {
                        if (confirm(`Delete role "${exp.role}" at "${exp.company}"?`)) {
                          deleteExperience(idx);
                        }
                      }}
                      className="p-2 border border-red-100 hover:border-red-300 text-red-500 rounded-lg bg-cream hover:bg-red-50 transition-colors"
                      aria-label="Delete experience"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {projects.map((proj) => (
                  <div key={proj.id} className="bg-cream-light border border-luxury-black/[0.04] p-5 rounded-2xl shadow-luxury flex justify-between items-start gap-4">
                    <div className="space-y-1">
                      <span className="text-[9px] uppercase tracking-wider font-mono text-luxury-gold font-bold block">{proj.category}</span>
                      <h4 className="text-sm font-bold text-luxury-black">{proj.title}</h4>
                      <p className="text-[11px] font-medium text-luxury-charcoal/60">{proj.subtitle}</p>
                    </div>
                    <button
                      onClick={() => {
                        if (confirm(`Delete case study "${proj.title}"?`)) {
                          deleteProject(proj.id);
                        }
                      }}
                      className="p-2 border border-red-100 hover:border-red-300 text-red-500 rounded-lg bg-cream hover:bg-red-50 transition-colors"
                      aria-label="Delete project"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Columns: Forms to Add new Data */}
          <div className="lg:col-span-7 bg-cream-light border border-luxury-black/[0.03] p-8 rounded-3xl shadow-luxury">
            
            {activeTab === 'experiences' ? (
              <form onSubmit={handleAddExperience} className="space-y-6">
                <h3 className="text-sm uppercase font-bold tracking-widest text-luxury-gold mb-2 flex items-center gap-1.5">
                  <Plus size={16} /> Insert New Experience Milestone
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[9px] uppercase tracking-widest font-bold text-luxury-charcoal/60">Role / Designation</label>
                    <input
                      type="text"
                      placeholder="e.g. Lead Frontend Architect"
                      value={expRole}
                      onChange={(e) => setExpRole(e.target.value)}
                      className="w-full px-4 py-2.5 bg-cream border border-luxury-black/5 rounded-xl text-xs focus:outline-none focus:border-luxury-gold font-medium"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[9px] uppercase tracking-widest font-bold text-luxury-charcoal/60">Company / Organization</label>
                    <input
                      type="text"
                      placeholder="e.g. TAQA Water Solutions"
                      value={expCompany}
                      onChange={(e) => setExpCompany(e.target.value)}
                      className="w-full px-4 py-2.5 bg-cream border border-luxury-black/5 rounded-xl text-xs focus:outline-none focus:border-luxury-gold font-medium"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[9px] uppercase tracking-widest font-bold text-luxury-charcoal/60">Location / Client</label>
                    <input
                      type="text"
                      placeholder="e.g. Abu Dhabi, UAE"
                      value={expLoc}
                      onChange={(e) => setExpLoc(e.target.value)}
                      className="w-full px-4 py-2.5 bg-cream border border-luxury-black/5 rounded-xl text-xs focus:outline-none focus:border-luxury-gold font-medium"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[9px] uppercase tracking-widest font-bold text-luxury-charcoal/60">Timeline Period</label>
                    <input
                      type="text"
                      placeholder="e.g. Aug 24 - Present"
                      value={expPeriod}
                      onChange={(e) => setExpPeriod(e.target.value)}
                      className="w-full px-4 py-2.5 bg-cream border border-luxury-black/5 rounded-xl text-xs focus:outline-none focus:border-luxury-gold font-medium"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[9px] uppercase tracking-widest font-bold text-luxury-charcoal/60">Key Achievements (One per line)</label>
                  <textarea
                    rows={4}
                    placeholder="e.g. Built rigorous RBAC validation gates
Optimized daily water analytics dashboard layout parameters"
                    value={expDetails}
                    onChange={(e) => setExpDetails(e.target.value)}
                    className="w-full px-4 py-2.5 bg-cream border border-luxury-black/5 rounded-xl text-xs focus:outline-none focus:border-luxury-gold font-medium resize-none"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[9px] uppercase tracking-widest font-bold text-luxury-charcoal/60">Tech Stacks (Comma separated)</label>
                  <input
                    type="text"
                    placeholder="e.g. React.js, TypeScript, RTK Query, Zustand"
                    value={expTech}
                    onChange={(e) => setExpTech(e.target.value)}
                    className="w-full px-4 py-2.5 bg-cream border border-luxury-black/5 rounded-xl text-xs focus:outline-none focus:border-luxury-gold font-medium"
                  />
                </div>

                <MagneticButton>
                  <button
                    type="submit"
                    className="px-6 py-3.5 bg-luxury-black hover:bg-luxury-charcoal text-cream font-semibold uppercase tracking-widest text-[9px] rounded-full shadow-md transition-all duration-300"
                  >
                    Commit Experience
                  </button>
                </MagneticButton>

              </form>
            ) : (
              <form onSubmit={handleAddProject} className="space-y-6">
                <h3 className="text-sm uppercase font-bold tracking-widest text-luxury-gold mb-2 flex items-center gap-1.5">
                  <Plus size={16} /> Insert New Case Study
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[9px] uppercase tracking-widest font-bold text-luxury-charcoal/60">Unique ID / Slug</label>
                    <input
                      type="text"
                      placeholder="e.g. water-mesh"
                      value={projId}
                      onChange={(e) => setProjId(e.target.value)}
                      className="w-full px-4 py-2.5 bg-cream border border-luxury-black/5 rounded-xl text-xs focus:outline-none focus:border-luxury-gold font-medium"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-[9px] uppercase tracking-widest font-bold text-luxury-charcoal/60">Project Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Water Flow Controller"
                      value={projTitle}
                      onChange={(e) => setProjTitle(e.target.value)}
                      className="w-full px-4 py-2.5 bg-cream border border-luxury-black/5 rounded-xl text-xs focus:outline-none focus:border-luxury-gold font-medium"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[9px] uppercase tracking-widest font-bold text-luxury-charcoal/60">Mockup Dashboard Type</label>
                    <select
                      value={projMock}
                      onChange={(e) => setProjMock(e.target.value)}
                      className="w-full px-4 py-2.5 bg-cream border border-luxury-black/5 rounded-xl text-xs focus:outline-none focus:border-luxury-gold font-medium"
                    >
                      <option value="doe">DoE (Regulatory Table mock)</option>
                      <option value="taqa">TAQA (Water wave telemetry)</option>
                      <option value="custom">Custom (Interactive API Console)</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[9px] uppercase tracking-widest font-bold text-luxury-charcoal/60">Category</label>
                    <input
                      type="text"
                      placeholder="e.g. Government Enterprise"
                      value={projCat}
                      onChange={(e) => setProjCat(e.target.value)}
                      className="w-full px-4 py-2.5 bg-cream border border-luxury-black/5 rounded-xl text-xs focus:outline-none focus:border-luxury-gold font-medium"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[9px] uppercase tracking-widest font-bold text-luxury-charcoal/60">Subtitle / Client</label>
                    <input
                      type="text"
                      placeholder="e.g. Department of Energy"
                      value={projSub}
                      onChange={(e) => setProjSub(e.target.value)}
                      className="w-full px-4 py-2.5 bg-cream border border-luxury-black/5 rounded-xl text-xs focus:outline-none focus:border-luxury-gold font-medium"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[9px] uppercase tracking-widest font-bold text-luxury-charcoal/60">Short Grid Description</label>
                  <input
                    type="text"
                    placeholder="Short summary displayed on case study list cards..."
                    value={projDesc}
                    onChange={(e) => setProjDesc(e.target.value)}
                    className="w-full px-4 py-2.5 bg-cream border border-luxury-black/5 rounded-xl text-xs focus:outline-none focus:border-luxury-gold font-medium"
                  />
                </div>

                {/* Specs Subdivision */}
                <div className="border-t border-luxury-black/5 pt-6 space-y-6">
                  <h4 className="text-[10px] uppercase font-bold tracking-widest text-luxury-gold">Detailed Specifications Drawer Contents</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-[9px] uppercase tracking-widest font-bold text-luxury-charcoal/60">01 // The Challenge</label>
                      <textarea
                        rows={3}
                        placeholder="Define the primary operational problem..."
                        value={specChallenge}
                        onChange={(e) => setSpecChallenge(e.target.value)}
                        className="w-full px-4 py-2 bg-cream border border-luxury-black/5 rounded-xl text-xs focus:outline-none focus:border-luxury-gold font-medium resize-none"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[9px] uppercase tracking-widest font-bold text-luxury-charcoal/60">02 // The Solution</label>
                      <textarea
                        rows={3}
                        placeholder="Define the exact code/component solution..."
                        value={specSolution}
                        onChange={(e) => setSpecSolution(e.target.value)}
                        className="w-full px-4 py-2 bg-cream border border-luxury-black/5 rounded-xl text-xs focus:outline-none focus:border-luxury-gold font-medium resize-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-[9px] uppercase tracking-widest font-bold text-luxury-charcoal/60">03 // Architecture Details</label>
                      <textarea
                        rows={3}
                        placeholder="Define modules, state tools, RTK cache schemas..."
                        value={specArch}
                        onChange={(e) => setSpecArch(e.target.value)}
                        className="w-full px-4 py-2 bg-cream border border-luxury-black/5 rounded-xl text-xs focus:outline-none focus:border-luxury-gold font-medium resize-none"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[9px] uppercase tracking-widest font-bold text-luxury-charcoal/60">04 // Performance Optimizations</label>
                      <textarea
                        rows={3}
                        placeholder="Define code splitting, ref indexes, bundle reduction metrics..."
                        value={specPerf}
                        onChange={(e) => setSpecPerf(e.target.value)}
                        className="w-full px-4 py-2 bg-cream border border-luxury-black/5 rounded-xl text-xs focus:outline-none focus:border-luxury-gold font-medium resize-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-[9px] uppercase tracking-widest font-bold text-luxury-charcoal/60">05 // Business / User Impact</label>
                      <textarea
                        rows={3}
                        placeholder="Define metric increases, approval latency drops..."
                        value={specImpact}
                        onChange={(e) => setSpecImpact(e.target.value)}
                        className="w-full px-4 py-2 bg-cream border border-luxury-black/5 rounded-xl text-xs focus:outline-none focus:border-luxury-gold font-medium resize-none"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[9px] uppercase tracking-widest font-bold text-luxury-charcoal/60">06 // Technical Stack (Comma separated)</label>
                      <textarea
                        rows={3}
                        placeholder="e.g. React.js, TypeScript, Ant Design, Axios, Zod"
                        value={specTech}
                        onChange={(e) => setSpecTech(e.target.value)}
                        className="w-full px-4 py-2 bg-cream border border-luxury-black/5 rounded-xl text-xs focus:outline-none focus:border-luxury-gold font-medium resize-none"
                      />
                    </div>
                  </div>
                </div>

                <MagneticButton>
                  <button
                    type="submit"
                    className="px-6 py-3.5 bg-luxury-black hover:bg-luxury-charcoal text-cream font-semibold uppercase tracking-widest text-[9px] rounded-full shadow-md transition-all duration-300"
                  >
                    Commit Case Study
                  </button>
                </MagneticButton>

              </form>
            )}

          </div>

        </div>

      </div>

      {/* Code Export Configuration Modal Overlay */}
      <AnimatePresence>
        {exportModalContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-luxury-black/50 backdrop-blur-md p-6 select-none"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-cream w-full max-w-2xl p-8 rounded-3xl border border-luxury-black/5 shadow-2xl relative flex flex-col h-[520px]"
            >
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-luxury-black/5 select-none shrink-0">
                <span className="text-[10px] uppercase font-bold tracking-wider text-luxury-gold">Export Code Configuration</span>
                <button
                  onClick={() => setExportModalContent(null)}
                  className="px-3 py-1 bg-cream-dark/50 border border-luxury-black/10 hover:border-luxury-black/35 rounded-full text-[9px] uppercase font-bold text-luxury-charcoal tracking-widest transition-all duration-300 focus:outline-none"
                >
                  Close
                </button>
              </div>

              <p className="text-[11px] text-luxury-charcoal/60 mb-4 select-none shrink-0">
                If you ever redeploy your website or wipe your browser cache, you can copy the code block below and overwrite the default arrays inside <code className="font-mono bg-cream-dark/40 px-1 rounded">src/hooks/useStore.ts</code>. This commits your dynamic changes permanently for everyone!
              </p>

              <div className="flex-1 min-h-0 bg-luxury-black text-cream-light/85 p-6 rounded-2xl font-mono text-[10px] overflow-y-auto relative select-all border border-white/5 scrollbar-thin">
                <pre>{exportModalContent}</pre>
              </div>

              <div className="mt-6 shrink-0 flex justify-end">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(exportModalContent);
                    alert("Export configuration successfully copied to clipboard!");
                  }}
                  className="px-6 py-3 bg-luxury-black hover:bg-luxury-charcoal text-cream font-semibold uppercase tracking-widest text-[9px] rounded-full shadow-md transition-all duration-300"
                >
                  Copy to Clipboard
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
