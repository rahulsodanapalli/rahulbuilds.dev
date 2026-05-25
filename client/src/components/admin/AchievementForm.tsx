import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Edit2, Trash2, X, Check, Loader2 } from 'lucide-react';
import {
  useGetAchievementsQuery,
  useCreateAchievementMutation,
  useUpdateAchievementMutation,
  useDeleteAchievementMutation,
} from '../../api/achievementsApi';
import type { AchievementItem } from '../../types/project.types';
import { useAuth } from '../../hooks/useAuth';
import { 
  confirmDeleteAlert,
  showLoadingAlert,
  showSuccessToast,
  showErrorToast
} from '../../utils/alert';
import Swal from 'sweetalert2';

const achievementSchema = z.object({
  title: z.string().min(1, 'Achievement title is required').trim(),
  desc: z.string().min(1, 'Description is required').trim(),
  date: z.string().optional(),
});

type AchievementFormValues = z.infer<typeof achievementSchema>;

export default function AchievementForm() {
  const { email } = useAuth();
  const isGuest = email === 'guest@rahulbuilds.dev';

  const { data: achievements = [], isLoading } = useGetAchievementsQuery();
  const [createAchievement, { isLoading: isCreating }] = useCreateAchievementMutation();
  const [updateAchievement, { isLoading: isUpdating }] = useUpdateAchievementMutation();
  const [deleteAchievement] = useDeleteAchievementMutation();

  const [editingId, setEditingId] = useState<string | number | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<AchievementFormValues>({
    resolver: zodResolver(achievementSchema),
    defaultValues: {
      title: '',
      desc: '',
      date: '',
    },
  });

  const onSubmit = async (values: AchievementFormValues) => {
    try {
      if (editingId) {
        await updateAchievement({ id: editingId, achievement: values }).unwrap();
        setEditingId(null);
        showSuccessToast('Achievement updated successfully!');
      } else {
        await createAchievement(values).unwrap();
        showSuccessToast('Achievement created successfully!');
      }
      reset({ title: '', desc: '', date: '' });
    } catch (err) {
      console.error('Failed to save achievement:', err);
      showErrorToast('Failed to save achievement.');
    }
  };

  const handleEdit = (achievement: AchievementItem) => {
    setEditingId(achievement._id);
    setValue('title', achievement.title);
    setValue('desc', achievement.desc);
    setValue('date', achievement.date || '');
  };

  const handleCancel = () => {
    setEditingId(null);
    reset({ title: '', desc: '', date: '' });
  };

  const handleDelete = async (id: string | number) => {
    const result = await confirmDeleteAlert(
      'Delete Achievement',
      'Are you sure you want to permanently delete this achievement milestone?'
    );
    if (result.isConfirmed) {
      showLoadingAlert('Deleting achievement...');
      try {
        await deleteAchievement(id).unwrap();
        Swal.close();
        showSuccessToast('Achievement deleted successfully!');
      } catch (err) {
        Swal.close();
        console.error('Failed to delete achievement:', err);
        showErrorToast('Failed to delete achievement.');
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
          {editingId ? 'Edit Achievement' : 'Add Achievement'}
        </h3>

        {isGuest ? (
          <div className="py-12 text-center text-[10px] uppercase font-bold tracking-widest text-secondary-gray font-sans border border-dashed border-border-cream rounded-xl">
            Data modification disabled in Guest Access Mode
          </div>
        ) : (
          <>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <div className="space-y-1">
            <label className="text-[9px] uppercase font-bold tracking-widest text-secondary-gray block font-sans">Title</label>
            <input
              {...register('title')}
              type="text"
              placeholder="e.g. 99.9% Compliance Uptime"
              className="w-full px-4 py-3 bg-cream/30 border border-border-cream rounded-xl text-xs text-deep-black placeholder-secondary-gray/40 focus:outline-none focus:border-burnt-orange font-sans transition-all duration-300"
            />
            {errors.title && <p className="text-[9px] text-burnt-orange font-medium font-sans">{errors.title.message}</p>}
          </div>

          {/* Date */}
          <div className="space-y-1">
            <label className="text-[9px] uppercase font-bold tracking-widest text-secondary-gray block font-sans">Date (Optional)</label>
            <input
              {...register('date')}
              type="text"
              placeholder="e.g. Dec 2025"
              className="w-full px-4 py-3 bg-cream/30 border border-border-cream rounded-xl text-xs text-deep-black placeholder-secondary-gray/40 focus:outline-none focus:border-burnt-orange font-sans transition-all duration-300"
            />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-[9px] uppercase font-bold tracking-widest text-secondary-gray block font-sans">Description</label>
            <textarea
              {...register('desc')}
              rows={3}
              placeholder="Describe the milestone or achievement impact..."
              className="w-full px-4 py-3 bg-cream/30 border border-border-cream rounded-xl text-xs text-deep-black placeholder-secondary-gray/40 focus:outline-none focus:border-burnt-orange font-sans transition-all duration-300"
            />
            {errors.desc && <p className="text-[9px] text-burnt-orange font-medium font-sans">{errors.desc.message}</p>}
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3 mt-6">
            <button
              type="submit"
              disabled={isCreating || isUpdating}
              className="flex-1 py-3 bg-deep-black text-cream hover:bg-burnt-orange font-semibold uppercase tracking-widest text-[10px] rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-minimal font-sans font-bold"
            >
              {isCreating || isUpdating ? (
                <Loader2 size={12} className="animate-spin text-cream" />
              ) : editingId ? (
                <>
                  <Check size={12} className="text-cream" /> Save updates
                </>
              ) : (
                <>
                  <Plus size={12} className="text-cream" /> Create Achievement
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

      {/* Right: Existing Achievements Grid */}
      <div className="lg:col-span-8 p-6 rounded-2xl bg-card-white border border-border-cream shadow-minimal">
        <h3 className="text-xs uppercase font-bold tracking-widest text-deep-black mb-6 font-display">
          Achievements & Honors Directory ({achievements.length})
        </h3>

        {achievements.length === 0 ? (
          <p className="text-[10px] text-muted text-center py-12 font-sans">No achievements registered yet.</p>
        ) : (
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2" data-lenis-prevent="true">
            {achievements.map((ach: AchievementItem) => (
              <div
                key={ach._id}
                className="p-4 bg-cream/10 border border-border-cream rounded-2xl shadow-minimal flex items-start justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1 font-sans">
                  <div className="flex flex-wrap items-center gap-3">
                    <h4 className="text-xs font-bold text-deep-black leading-snug">{ach.title}</h4>
                    {ach.date && (
                      <span className="px-2 py-0.5 bg-card-white border border-border-cream rounded text-[8px] uppercase tracking-wider font-bold text-burnt-orange">
                        {ach.date}
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-secondary-gray leading-relaxed font-normal">
                    {ach.desc}
                  </p>
                </div>

                {!isGuest && (
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => handleEdit(ach)}
                      className="p-1.5 hover:text-burnt-orange text-secondary-gray/50 transition-colors duration-200 bg-card-white border border-border-cream rounded-lg"
                      title="Edit Entry"
                    >
                      <Edit2 size={11} />
                    </button>
                    <button
                      onClick={() => handleDelete(ach._id)}
                      className="p-1.5 hover:text-red-600 text-secondary-gray/50 transition-colors duration-200 bg-card-white border border-border-cream rounded-lg"
                      title="Delete Entry"
                    >
                      <Trash2 size={11} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
