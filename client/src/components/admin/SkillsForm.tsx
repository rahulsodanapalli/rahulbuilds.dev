import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Edit2, Trash2, X, Check, Loader2 } from 'lucide-react';
import {
  useGetSkillsQuery,
  useCreateSkillMutation,
  useUpdateSkillMutation,
  useDeleteSkillMutation,
} from '../../api/skillsApi';
import type { SkillItem } from '../../types/skill.types';
import { useAuth } from '../../hooks/useAuth';
import { confirmDeleteAlert } from '../../utils/alert';

const skillSchema = z.object({
  name: z.string().min(1, 'Skill name is required').trim(),
  category: z.string().min(1, 'Skill category is required').trim(),
  level: z.string().optional(),
});

type SkillFormValues = z.infer<typeof skillSchema>;

const DEFAULT_CATEGORIES = [
  'Frontend Core',
  'State Management',
  'Forms & Schema',
  'Data Viz & Charts',
  'Performance tuning',
  'AI Tools & Workflow',
];

export default function SkillsForm() {
  const { email } = useAuth();
  const isGuest = email === 'guest@rahulbuilds.dev';

  const { data: skills = [], isLoading } = useGetSkillsQuery();
  const [createSkill, { isLoading: isCreating }] = useCreateSkillMutation();
  const [updateSkill, { isLoading: isUpdating }] = useUpdateSkillMutation();
  const [deleteSkill] = useDeleteSkillMutation();

  const [editingId, setEditingId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<SkillFormValues>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      name: '',
      category: 'Frontend Core',
      level: 'Expert',
    },
  });

  const onSubmit = async (values: SkillFormValues) => {
    try {
      if (editingId) {
        await updateSkill({ id: editingId, skill: values }).unwrap();
        setEditingId(null);
      } else {
        await createSkill(values).unwrap();
      }
      reset({ name: '', category: 'Frontend Core', level: 'Expert' });
    } catch (err) {
      console.error('Failed to save skill:', err);
    }
  };

  const handleEdit = (skill: SkillItem) => {
    setEditingId(skill._id);
    setValue('name', skill.name);
    setValue('category', skill.category);
    setValue('level', skill.level || 'Expert');
  };

  const handleCancel = () => {
    setEditingId(null);
    reset({ name: '', category: 'Frontend Core', level: 'Expert' });
  };

  const handleDelete = async (id: string) => {
    const result = await confirmDeleteAlert(
      'Delete Skill Element',
      'Are you sure you want to permanently delete this skill from your armament?'
    );
    if (result.isConfirmed) {
      try {
        await deleteSkill(id).unwrap();
      } catch (err) {
        console.error('Failed to delete skill:', err);
      }
    }
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
      {/* Left: Input Form Panel */}
      <div className="lg:col-span-4 p-6 rounded-2xl bg-card-white border border-border-cream shadow-minimal">
        <h3 className="text-xs uppercase font-bold tracking-widest text-deep-black mb-6 flex items-center gap-2 font-display">
          {editingId ? <Edit2 size={12} className="text-burnt-orange" /> : <Plus size={12} className="text-burnt-orange" />}
          {editingId ? 'Edit Skill Element' : 'Add Skill Element'}
        </h3>

        {isGuest ? (
          <div className="py-12 text-center text-[10px] uppercase font-bold tracking-widest text-secondary-gray font-sans border border-dashed border-border-cream rounded-xl">
            Data modification disabled in Guest Access Mode
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name */}
              <div className="space-y-1">
                <label className="text-[9px] uppercase font-bold tracking-widest text-secondary-gray block font-sans">Skill Name</label>
                <input
                  {...register('name')}
                  type="text"
                  placeholder="e.g. Next.js, Redux"
                  className="w-full px-4 py-3 bg-cream/30 border border-border-cream rounded-xl text-xs text-deep-black placeholder-secondary-gray/40 focus:outline-none focus:border-burnt-orange font-sans transition-all duration-300"
                />
                {errors.name && <p className="text-[9px] text-burnt-orange font-medium">{errors.name.message}</p>}
              </div>

              {/* Category */}
              <div className="space-y-1">
                <label className="text-[9px] uppercase font-bold tracking-widest text-secondary-gray block font-sans">Category</label>
                <select
                  {...register('category')}
                  className="w-full px-4 py-3 bg-cream/30 border border-border-cream rounded-xl text-xs text-deep-black focus:outline-none focus:border-burnt-orange font-sans transition-all duration-300"
                >
                  {DEFAULT_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Proficiency Level */}
              <div className="space-y-1">
                <label className="text-[9px] uppercase font-bold tracking-widest text-secondary-gray block font-sans">Level (Optional)</label>
                <input
                  {...register('level')}
                  type="text"
                  placeholder="e.g. Expert, Intermediate"
                  className="w-full px-4 py-3 bg-cream/30 border border-border-cream rounded-xl text-xs text-deep-black placeholder-secondary-gray/40 focus:outline-none focus:border-burnt-orange font-sans transition-all duration-300"
                />
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-3 mt-6">
                <button
                  type="submit"
                  disabled={isCreating || isUpdating}
                  className="flex-1 py-3 bg-deep-black text-cream hover:bg-burnt-orange font-semibold uppercase tracking-widest text-[10px] rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-minimal interactive font-sans font-bold"
                >
                  {isCreating || isUpdating ? (
                    <Loader2 size={12} className="animate-spin text-cream" />
                  ) : editingId ? (
                    <>
                      <Check size={12} className="text-cream" /> Save Updates
                    </>
                  ) : (
                    <>
                      <Plus size={12} className="text-cream" /> Create Skill
                    </>
                  )}
                </button>

                {editingId && (
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-3 border border-border-cream text-secondary-gray hover:text-deep-black hover:bg-cream bg-card-white font-semibold uppercase tracking-widest text-[10px] rounded-xl flex items-center gap-1 transition-all duration-300 interactive font-sans font-bold"
                  >
                    <X size={12} /> Cancel
                  </button>
                )}
              </div>
            </form>
          </>
        )}
      </div>

      {/* Right: Existing Skills Grid */}
      <div className="lg:col-span-8 p-6 rounded-2xl bg-card-white border border-border-cream shadow-minimal">
        <h3 className="text-xs uppercase font-bold tracking-widest text-deep-black mb-6 font-display">
          Existing Skills Directory ({skills.length})
        </h3>

        {skills.length === 0 ? (
          <p className="text-[10px] text-muted text-center py-12 font-sans">No skills registered yet.</p>
        ) : (
          <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2">
            {DEFAULT_CATEGORIES.map((category) => {
              const catSkills = skills.filter((s: SkillItem) => s.category === category);
              if (catSkills.length === 0) return null;

              return (
                <div key={category} className="space-y-2 pb-4 border-b border-border-cream/80 last:border-0 last:pb-0">
                  <h4 className="text-[10px] uppercase font-bold tracking-widest text-burnt-orange mb-2 font-sans">
                    {category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {catSkills.map((skill: SkillItem) => (
                      <div
                        key={skill._id}
                        className="px-3 py-2 bg-cream/20 border border-border-cream rounded-xl flex items-center gap-3 shadow-minimal"
                      >
                        <div className="text-left font-sans">
                          <p className="text-xs font-semibold text-deep-black">{skill.name}</p>
                          {skill.level && (
                            <p className="text-[8px] uppercase tracking-wider font-bold text-muted">
                              {skill.level}
                            </p>
                          )}
                        </div>

                        {!isGuest && (
                          <div className="flex items-center gap-1.5 border-l border-border-cream/80 pl-2">
                            <button
                              onClick={() => handleEdit(skill)}
                              className="p-1 hover:text-burnt-orange text-secondary-gray/50 transition-colors duration-200"
                              title="Edit Skill"
                            >
                              <Edit2 size={12} />
                            </button>
                            <button
                              onClick={() => handleDelete(skill._id)}
                              className="p-1 hover:text-red-600 text-secondary-gray/50 transition-colors duration-200"
                              title="Delete Skill"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
