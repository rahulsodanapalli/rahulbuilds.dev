import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Edit2, Trash2, X, Check, Loader2 } from 'lucide-react';
import {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} from '../../api/projectsApi';
import type { ProjectItem } from '../../types/project.types';
import { useAuth } from '../../hooks/useAuth';

const projectSpecSchema = z.object({
  challenge: z.string().min(1, 'Challenge spec is required').trim(),
  solution: z.string().min(1, 'Solution spec is required').trim(),
  architecture: z.string().min(1, 'Architecture spec is required').trim(),
  performance: z.string().min(1, 'Performance benchmarks are required').trim(),
  impact: z.string().min(1, 'Impact description is required').trim(),
});

const projectSchema = z.object({
  title: z.string().min(1, 'Project title is required').trim(),
  subtitle: z.string().min(1, 'Project subtitle is required').trim(),
  category: z.string().min(1, 'Project category is required').trim(),
  desc: z.string().min(1, 'Project description is required').trim(),
  imageMockup: z.string().min(1, 'Mockup label is required').trim(),
  specs: projectSpecSchema,
});

type ProjectFormValues = z.infer<typeof projectSchema>;

export default function ProjectForm() {
  const { email } = useAuth();
  const isGuest = email === 'guest@rahulbuilds.dev';

  const { data: projects = [], isLoading } = useGetProjectsQuery();
  const [createProject, { isLoading: isCreating }] = useCreateProjectMutation();
  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();
  const [deleteProject] = useDeleteProjectMutation();

  const [editingId, setEditingId] = useState<string | null>(null);

  // Specifications Tech tag list state
  const [techList, setTechList] = useState<string[]>([]);
  const [techInput, setTechInput] = useState('');
  const [tagError, setTagError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: '',
      subtitle: '',
      category: '',
      desc: '',
      imageMockup: 'doe',
      specs: {
        challenge: '',
        solution: '',
        architecture: '',
        performance: '',
        impact: '',
      },
    },
  });

  const onSubmit = async (values: ProjectFormValues) => {
    if (techList.length === 0) {
      setTagError('Please add at least one tech stack tag for the project specifications.');
      return;
    }
    setTagError(null);

    const payload: Partial<ProjectItem> = {
      title: values.title,
      subtitle: values.subtitle,
      category: values.category,
      desc: values.desc,
      imageMockup: values.imageMockup,
      specs: {
        challenge: values.specs?.challenge ?? '',
        solution: values.specs?.solution ?? '',
        architecture: values.specs?.architecture ?? '',
        performance: values.specs?.performance ?? '',
        impact: values.specs?.impact ?? '',
        tech: techList,
      },
    };

    try {
      if (editingId) {
        await updateProject({ id: editingId, project: payload }).unwrap();
        setEditingId(null);
      } else {
        await createProject(payload).unwrap();
      }
      resetForm();
    } catch (err) {
      console.error('Failed to save project:', err);
    }
  };

  const handleEdit = (project: ProjectItem) => {
    setEditingId(project._id);
    setValue('title', project.title);
    setValue('subtitle', project.subtitle);
    setValue('category', project.category);
    setValue('desc', project.desc);
    setValue('imageMockup', project.imageMockup);
    setValue('specs.challenge', project.specs.challenge);
    setValue('specs.solution', project.specs.solution);
    setValue('specs.architecture', project.specs.architecture);
    setValue('specs.performance', project.specs.performance);
    setValue('specs.impact', project.specs.impact);
    setTechList(project.specs.tech);
    setTagError(null);
  };

  const resetForm = () => {
    setEditingId(null);
    reset({
      title: '',
      subtitle: '',
      category: '',
      desc: '',
      imageMockup: 'doe',
      specs: {
        challenge: '',
        solution: '',
        architecture: '',
        performance: '',
        impact: '',
      },
    });
    setTechList([]);
    setTechInput('');
    setTagError(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id).unwrap();
      } catch (err) {
        console.error('Failed to delete project:', err);
      }
    }
  };

  // Spec tech tags add / remove
  const addTechTag = () => {
    if (techInput.trim()) {
      if (!techList.includes(techInput.trim())) {
        setTechList([...techList, techInput.trim()]);
      }
      setTechInput('');
      setTagError(null);
    }
  };

  const removeTechTag = (index: number) => {
    setTechList(techList.filter((_, i) => i !== index));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="animate-spin text-burnt-orange" size={24} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Input Form Panel */}
      <div className="lg:col-span-7 p-6 rounded-2xl bg-card-white border border-border-cream shadow-minimal">
        <h3 className="text-xs uppercase font-bold tracking-widest text-deep-black mb-6 flex items-center gap-2 font-display">
          {editingId ? <Edit2 size={12} className="text-burnt-orange" /> : <Plus size={12} className="text-burnt-orange" />}
          {editingId ? 'Edit Project Portfolio' : 'Add Project Portfolio'}
        </h3>
        
        {isGuest ? (
          <div className="py-12 text-center text-[10px] uppercase font-bold tracking-widest text-secondary-gray font-sans border border-dashed border-border-cream rounded-xl">
            Data modification disabled in Guest Access Mode
          </div>
        ) : (
          <>

        {tagError && (
          <div className="mb-4 p-3 bg-red-500/5 border border-red-500/20 text-red-600 rounded-xl text-[10px] uppercase font-bold tracking-wider font-sans">
            {tagError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Card 1: Project Metadata */}
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase font-bold tracking-widest text-burnt-orange border-b border-border-cream/80 pb-2 font-sans">
              1. Project Metadata
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Title */}
              <div className="space-y-1">
                <label className="text-[9px] uppercase font-bold tracking-widest text-secondary-gray block font-sans">Title</label>
                <input
                  {...register('title')}
                  type="text"
                  placeholder="e.g. DoE Regulatory Portal"
                  className="w-full px-4 py-3 bg-cream/30 border border-border-cream rounded-xl text-xs text-deep-black placeholder-secondary-gray/40 focus:outline-none focus:border-burnt-orange font-sans transition-all duration-300"
                />
                {errors.title && <p className="text-[9px] text-burnt-orange font-medium font-sans">{errors.title.message}</p>}
              </div>

              {/* Subtitle */}
              <div className="space-y-1">
                <label className="text-[9px] uppercase font-bold tracking-widest text-secondary-gray block font-sans">Subtitle</label>
                <input
                  {...register('subtitle')}
                  type="text"
                  placeholder="e.g. Dept of Energy, Abu Dhabi"
                  className="w-full px-4 py-3 bg-cream/30 border border-border-cream rounded-xl text-xs text-deep-black placeholder-secondary-gray/40 focus:outline-none focus:border-burnt-orange font-sans transition-all duration-300"
                />
                {errors.subtitle && <p className="text-[9px] text-burnt-orange font-medium font-sans">{errors.subtitle.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Category */}
              <div className="space-y-1">
                <label className="text-[9px] uppercase font-bold tracking-widest text-secondary-gray block font-sans">Category</label>
                <input
                  {...register('category')}
                  type="text"
                  placeholder="e.g. Government Enterprise, Utility Analytics"
                  className="w-full px-4 py-3 bg-cream/30 border border-border-cream rounded-xl text-xs text-deep-black placeholder-secondary-gray/40 focus:outline-none focus:border-burnt-orange font-sans transition-all duration-300"
                />
                {errors.category && <p className="text-[9px] text-burnt-orange font-medium font-sans">{errors.category.message}</p>}
              </div>

              {/* Image Mockup Key */}
              <div className="space-y-1">
                <label className="text-[9px] uppercase font-bold tracking-widest text-secondary-gray block font-sans">Image Mockup Label</label>
                <select
                  {...register('imageMockup')}
                  className="w-full px-4 py-3 bg-cream/30 border border-border-cream rounded-xl text-xs text-deep-black focus:outline-none focus:border-burnt-orange font-sans transition-all duration-300"
                >
                  <option value="doe">doe (DoE Portal Mockup)</option>
                  <option value="taqa">taqa (TAQA Compliance Mockup)</option>
                  <option value="generic">generic (Standard Visual Grid)</option>
                </select>
              </div>
            </div>

            {/* Brief Description */}
            <div className="space-y-1">
              <label className="text-[9px] uppercase font-bold tracking-widest text-secondary-gray block font-sans">Brief Description</label>
              <textarea
                {...register('desc')}
                rows={2}
                placeholder="Describe the project briefly..."
                className="w-full px-4 py-3 bg-cream/30 border border-border-cream rounded-xl text-xs text-deep-black placeholder-secondary-gray/40 focus:outline-none focus:border-burnt-orange font-sans transition-all duration-300"
              />
              {errors.desc && <p className="text-[9px] text-burnt-orange font-medium font-sans">{errors.desc.message}</p>}
            </div>
          </div>

          {/* Card 2: Project Specifications */}
          <div className="space-y-4 pt-4 border-t border-border-cream/80">
            <h4 className="text-[10px] uppercase font-bold tracking-widest text-burnt-orange border-b border-border-cream/80 pb-2 font-sans">
              2. Technical Specifications
            </h4>

            {/* Challenge */}
            <div className="space-y-1">
              <label className="text-[9px] uppercase font-bold tracking-widest text-secondary-gray block font-sans">The Challenge</label>
              <textarea
                {...register('specs.challenge')}
                rows={3}
                placeholder="What complex challenge did you face?"
                className="w-full px-4 py-3 bg-cream/30 border border-border-cream rounded-xl text-xs text-deep-black placeholder-secondary-gray/40 focus:outline-none focus:border-burnt-orange font-sans transition-all duration-300"
              />
              {errors.specs?.challenge && (
                <p className="text-[9px] text-burnt-orange font-medium font-sans">{errors.specs.challenge.message}</p>
              )}
            </div>

            {/* Solution */}
            <div className="space-y-1">
              <label className="text-[9px] uppercase font-bold tracking-widest text-secondary-gray block font-sans">The Solution</label>
              <textarea
                {...register('specs.solution')}
                rows={3}
                placeholder="How did you solve this issue?"
                className="w-full px-4 py-3 bg-cream/30 border border-border-cream rounded-xl text-xs text-deep-black placeholder-secondary-gray/40 focus:outline-none focus:border-burnt-orange font-sans transition-all duration-300"
              />
              {errors.specs?.solution && (
                <p className="text-[9px] text-burnt-orange font-medium font-sans">{errors.specs.solution.message}</p>
              )}
            </div>

            {/* Architecture */}
            <div className="space-y-1">
              <label className="text-[9px] uppercase font-bold tracking-widest text-secondary-gray block font-sans">Architecture Layout</label>
              <textarea
                {...register('specs.architecture')}
                rows={3}
                placeholder="How is this product structured technically?"
                className="w-full px-4 py-3 bg-cream/30 border border-border-cream rounded-xl text-xs text-deep-black placeholder-secondary-gray/40 focus:outline-none focus:border-burnt-orange font-sans transition-all duration-300"
              />
              {errors.specs?.architecture && (
                <p className="text-[9px] text-burnt-orange font-medium font-sans">{errors.specs.architecture.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Performance */}
              <div className="space-y-1">
                <label className="text-[9px] uppercase font-bold tracking-widest text-secondary-gray block font-sans">Performance Targets</label>
                <textarea
                  {...register('specs.performance')}
                  rows={3}
                  placeholder="e.g. 30% reduction in paint speed..."
                  className="w-full px-4 py-3 bg-cream/30 border border-border-cream rounded-xl text-xs text-deep-black placeholder-secondary-gray/40 focus:outline-none focus:border-burnt-orange font-sans transition-all duration-300"
                />
                {errors.specs?.performance && (
                  <p className="text-[9px] text-burnt-orange font-medium font-sans">{errors.specs.performance.message}</p>
                )}
              </div>

              {/* Impact */}
              <div className="space-y-1">
                <label className="text-[9px] uppercase font-bold tracking-widest text-secondary-gray block font-sans">Business Impact</label>
                <textarea
                  {...register('specs.impact')}
                  rows={3}
                  placeholder="e.g. Reduced processing delays by 40%..."
                  className="w-full px-4 py-3 bg-cream/30 border border-border-cream rounded-xl text-xs text-deep-black placeholder-secondary-gray/40 focus:outline-none focus:border-burnt-orange font-sans transition-all duration-300"
                />
                {errors.specs?.impact && (
                  <p className="text-[9px] text-burnt-orange font-medium font-sans">{errors.specs.impact.message}</p>
                )}
              </div>
            </div>

            {/* Spec Tech Tags */}
            <div className="space-y-2 pt-2">
              <label className="text-[9px] uppercase font-bold tracking-widest text-secondary-gray block font-sans">
                Technical Stack Tags
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTechTag())}
                  placeholder="Add stack element (e.g. Redux Toolkit) and click add..."
                  className="flex-1 px-4 py-3 bg-cream/30 border border-border-cream rounded-xl text-xs text-deep-black placeholder-secondary-gray/40 focus:outline-none focus:border-burnt-orange font-sans transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={addTechTag}
                  className="px-4 bg-deep-black hover:bg-burnt-orange text-cream text-[10px] uppercase font-bold tracking-wider rounded-xl transition-all duration-300 font-sans"
                >
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-3 max-h-[100px] overflow-y-auto pr-1">
                {techList.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-cream/30 border border-border-cream text-[9px] uppercase font-bold text-burnt-orange rounded-lg flex items-center gap-1.5 shadow-minimal font-sans"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTechTag(idx)}
                      className="text-red-600/70 hover:text-red-600"
                    >
                      <X size={10} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 mt-8 pt-4 border-t border-border-cream/80">
            <button
              type="submit"
              disabled={isCreating || isUpdating}
              className="flex-1 py-4 bg-deep-black text-cream hover:bg-burnt-orange font-semibold uppercase tracking-widest text-[10px] rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-minimal font-sans font-bold"
            >
              {isCreating || isUpdating ? (
                <Loader2 size={12} className="animate-spin text-cream" />
              ) : editingId ? (
                <>
                  <Check size={12} className="text-cream" /> Save updates
                </>
              ) : (
                <>
                  <Plus size={12} className="text-cream" /> Create Project Portfolio
                </>
              )}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-4 border border-border-cream text-secondary-gray hover:text-deep-black hover:bg-cream bg-card-white font-semibold uppercase tracking-widest text-[10px] rounded-xl flex items-center gap-1 transition-all duration-300 interactive font-sans font-bold"
              >
                <X size={12} /> Cancel
              </button>
            )}
          </div>
        </form>
        </>
        )}
      </div>

      {/* Existing Projects Portfolio List */}
      <div className="lg:col-span-5 p-6 rounded-2xl bg-card-white border border-border-cream shadow-minimal">
        <h3 className="text-xs uppercase font-bold tracking-widest text-deep-black mb-6 font-display">
          Projects Portfolio Directory ({projects.length})
        </h3>

        {projects.length === 0 ? (
          <p className="text-[10px] text-muted text-center py-12 font-sans">No project entries registered yet.</p>
        ) : (
          <div className="space-y-4 max-h-[820px] overflow-y-auto pr-2">
            {projects.map((proj: ProjectItem) => (
              <div
                key={proj._id}
                className="p-5 bg-cream/10 border border-border-cream rounded-2xl relative shadow-minimal group"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h4 className="text-xs font-bold text-deep-black leading-snug font-sans">{proj.title}</h4>
                    <p className="text-[9px] font-semibold text-burnt-orange uppercase mt-0.5 font-sans">{proj.category}</p>
                  </div>

                  {!isGuest && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleEdit(proj)}
                        className="p-1.5 hover:text-burnt-orange text-secondary-gray/50 transition-colors duration-200 bg-card-white border border-border-cream rounded-lg"
                        title="Edit Entry"
                      >
                        <Edit2 size={11} />
                      </button>
                      <button
                        onClick={() => handleDelete(proj._id)}
                        className="p-1.5 hover:text-red-600 text-secondary-gray/50 transition-colors duration-200 bg-card-white border border-border-cream rounded-lg"
                        title="Delete Entry"
                      >
                        <Trash2 size={11} />
                      </button>
                    </div>
                  )}
                </div>

                <div className="text-[10px] text-secondary-gray leading-relaxed line-clamp-3 mb-4 font-sans">
                  {proj.desc}
                </div>

                <div className="flex flex-wrap gap-1 border-t border-border-cream/80 pt-3 font-sans">
                  {proj.specs.tech.slice(0, 5).map((t: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-card-white border border-border-cream text-[8px] uppercase font-bold text-secondary-gray/80 rounded-md"
                    >
                      {t}
                    </span>
                  ))}
                  {proj.specs.tech.length > 5 && (
                    <span className="text-[8px] italic text-burnt-orange px-1">
                      + {proj.specs.tech.length - 5} tags
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
