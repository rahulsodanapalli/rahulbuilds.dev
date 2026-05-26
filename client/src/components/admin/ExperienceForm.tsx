import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Edit2, Trash2, X, Check, Loader2, Calendar, MapPin } from 'lucide-react';
import {
  useGetExperiencesQuery,
  useCreateExperienceMutation,
  useUpdateExperienceMutation,
  useDeleteExperienceMutation,
} from '../../services/api/experienceApi';
import type { ExperienceItem } from '../../types/experience.types';
import { useAuth } from '../../hooks/useAuth';
import { 
  confirmDeleteAlert,
  showLoadingAlert,
  showSuccessToast,
  showErrorToast
} from '../../utils/alert';
import Swal from 'sweetalert2';

const experienceSchema = z.object({
  role: z.string().min(1, 'Role title is required').trim(),
  company: z.string().min(1, 'Company name is required').trim(),
  location: z.string().min(1, 'Location is required').trim(),
  period: z.string().min(1, 'Period is required').trim(),
});

type ExperienceFormValues = z.infer<typeof experienceSchema>;

export default function ExperienceForm() {
  const { email } = useAuth();
  const isGuest = email === 'guest@rahulbuilds.dev';

  const { data: experiences = [], isLoading } = useGetExperiencesQuery();
  const [createExperience, { isLoading: isCreating }] = useCreateExperienceMutation();
  const [updateExperience, { isLoading: isUpdating }] = useUpdateExperienceMutation();
  const [deleteExperience] = useDeleteExperienceMutation();

  const [editingId, setEditingId] = useState<string | null>(null);

  // Dynamic tags and bullet points state
  const [detailsList, setDetailsList] = useState<string[]>([]);
  const [detailInput, setDetailInput] = useState('');
  const [techList, setTechList] = useState<string[]>([]);
  const [techInput, setTechInput] = useState('');

  const [listError, setListError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      role: '',
      company: '',
      location: '',
      period: '',
    },
  });

  const onSubmit = async (values: ExperienceFormValues) => {
    if (detailsList.length === 0) {
      setListError('Please add at least one work detail bullet point.');
      return;
    }
    if (techList.length === 0) {
      setListError('Please add at least one technology tag.');
      return;
    }
    setListError(null);

    const payload = {
      ...values,
      details: detailsList,
      tech: techList,
    };

    try {
      if (editingId) {
        await updateExperience({ id: editingId, exp: payload }).unwrap();
        setEditingId(null);
        showSuccessToast('Experience updated successfully!');
      } else {
        await createExperience(payload).unwrap();
        showSuccessToast('Experience created successfully!');
      }
      resetForm();
    } catch (err) {
      console.error('Failed to save experience:', err);
      showErrorToast('Failed to save experience.');
    }
  };

  const handleEdit = (exp: ExperienceItem) => {
    setEditingId(exp._id);
    setValue('role', exp.role);
    setValue('company', exp.company);
    setValue('location', exp.location);
    setValue('period', exp.period);
    setDetailsList(exp.details);
    setTechList(exp.tech);
    setListError(null);
  };

  const resetForm = () => {
    setEditingId(null);
    reset({ role: '', company: '', location: '', period: '' });
    setDetailsList([]);
    setTechList([]);
    setDetailInput('');
    setTechInput('');
    setListError(null);
  };

  const handleDelete = async (id: string) => {
    const result = await confirmDeleteAlert(
      'Delete Career Entry',
      'Are you sure you want to permanently delete this experience entry from your timeline?'
    );
    if (result.isConfirmed) {
      showLoadingAlert('Deleting experience...');
      try {
        await deleteExperience(id).unwrap();
        Swal.close();
        showSuccessToast('Experience deleted successfully!');
      } catch (err) {
        Swal.close();
        console.error('Failed to delete experience:', err);
        showErrorToast('Failed to delete experience.');
      }
    }
  };

  // Details add / delete
  const addDetail = () => {
    if (detailInput.trim()) {
      setDetailsList([...detailsList, detailInput.trim()]);
      setDetailInput('');
      setListError(null);
    }
  };

  const removeDetail = (index: number) => {
    setDetailsList(detailsList.filter((_, i) => i !== index));
  };

  // Tech add / delete
  const addTech = () => {
    if (techInput.trim()) {
      if (!techList.includes(techInput.trim())) {
        setTechList([...techList, techInput.trim()]);
      }
      setTechInput('');
      setListError(null);
    }
  };

  const removeTech = (index: number) => {
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
      <div className="lg:col-span-6 p-6 rounded-2xl bg-card-white border border-border-cream shadow-minimal">
        <h3 className="text-xs uppercase font-bold tracking-widest text-deep-black mb-6 flex items-center gap-2 font-display">
          {editingId ? <Edit2 size={12} className="text-burnt-orange" /> : <Plus size={12} className="text-burnt-orange" />}
          {editingId ? 'Edit Career Entry' : 'Add Career Entry'}
        </h3>

        {isGuest ? (
          <div className="py-12 text-center text-[10px] uppercase font-bold tracking-widest text-secondary-gray font-sans border border-dashed border-border-cream rounded-xl">
            Data modification disabled in Guest Access Mode
          </div>
        ) : (
          <>
        {listError && (
          <div className="mb-4 p-3 bg-red-500/5 border border-red-500/20 text-red-600 rounded-xl text-[10px] uppercase font-bold tracking-wider font-sans">
            {listError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Role */}
            <div className="space-y-1">
              <label className="text-[9px] uppercase font-bold tracking-widest text-secondary-gray block font-sans">Role Title</label>
              <input
                {...register('role')}
                type="text"
                placeholder="e.g. Frontend Architect"
                className="w-full px-4 py-3 bg-cream/30 border border-border-cream rounded-xl text-xs text-deep-black placeholder-secondary-gray/40 focus:outline-none focus:border-burnt-orange font-sans transition-all duration-300"
              />
              {errors.role && <p className="text-[9px] text-burnt-orange font-medium font-sans">{errors.role.message}</p>}
            </div>

            {/* Company */}
            <div className="space-y-1">
              <label className="text-[9px] uppercase font-bold tracking-widest text-secondary-gray block font-sans">Company Name</label>
              <input
                {...register('company')}
                type="text"
                placeholder="e.g. Innovatech"
                className="w-full px-4 py-3 bg-cream/30 border border-border-cream rounded-xl text-xs text-deep-black placeholder-secondary-gray/40 focus:outline-none focus:border-burnt-orange font-sans transition-all duration-300"
              />
              {errors.company && <p className="text-[9px] text-burnt-orange font-medium font-sans">{errors.company.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Location */}
            <div className="space-y-1">
              <label className="text-[9px] uppercase font-bold tracking-widest text-secondary-gray block font-sans">Location</label>
              <input
                {...register('location')}
                type="text"
                placeholder="e.g. Hyderabad, India"
                className="w-full px-4 py-3 bg-cream/30 border border-border-cream rounded-xl text-xs text-deep-black placeholder-secondary-gray/40 focus:outline-none focus:border-burnt-orange font-sans transition-all duration-300"
              />
              {errors.location && <p className="text-[9px] text-burnt-orange font-medium font-sans">{errors.location.message}</p>}
            </div>

            {/* Period */}
            <div className="space-y-1">
              <label className="text-[9px] uppercase font-bold tracking-widest text-secondary-gray block font-sans">Duration / Period</label>
              <input
                {...register('period')}
                type="text"
                placeholder="e.g. Aug 24 - Present"
                className="w-full px-4 py-3 bg-cream/30 border border-border-cream rounded-xl text-xs text-deep-black placeholder-secondary-gray/40 focus:outline-none focus:border-burnt-orange font-sans transition-all duration-300"
              />
              {errors.period && <p className="text-[9px] text-burnt-orange font-medium font-sans">{errors.period.message}</p>}
            </div>
          </div>

          {/* Details Lists (Bullet points) */}
          <div className="space-y-2 pt-2">
            <label className="text-[9px] uppercase font-bold tracking-widest text-secondary-gray block font-sans">
              Key Directives & Impact (Details)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={detailInput}
                onChange={(e) => setDetailInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addDetail())}
                placeholder="Write bullet point and click add..."
                className="flex-1 px-4 py-3 bg-cream/30 border border-border-cream rounded-xl text-xs text-deep-black placeholder-secondary-gray/40 focus:outline-none focus:border-burnt-orange font-sans transition-all duration-300"
              />
              <button
                type="button"
                onClick={addDetail}
                className="px-4 bg-deep-black hover:bg-burnt-orange text-cream text-[10px] uppercase font-bold tracking-wider rounded-xl transition-all duration-300 font-sans"
              >
                Add
              </button>
            </div>
            
            <ul className="space-y-2 mt-3 max-h-[160px] overflow-y-auto pr-1">
              {detailsList.map((detail, idx) => (
                <li
                  key={idx}
                  className="p-2.5 bg-cream/20 border border-border-cream rounded-xl text-[10px] text-secondary-gray flex items-start justify-between gap-3 font-sans"
                >
                  <span className="leading-relaxed flex-1 text-deep-black">{detail}</span>
                  <button
                    type="button"
                    onClick={() => removeDetail(idx)}
                    className="text-red-600/70 hover:text-red-600 shrink-0"
                  >
                    <X size={12} />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech stack tags */}
          <div className="space-y-2 pt-2">
            <label className="text-[9px] uppercase font-bold tracking-widest text-secondary-gray block font-sans">
              Technologies Used
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
                placeholder="Write tag (e.g. Next.js) and click add..."
                className="flex-1 px-4 py-3 bg-cream/30 border border-border-cream rounded-xl text-xs text-deep-black placeholder-secondary-gray/40 focus:outline-none focus:border-burnt-orange font-sans transition-all duration-300"
              />
              <button
                type="button"
                onClick={addTech}
                className="px-4 bg-deep-black hover:bg-burnt-orange text-cream text-[10px] uppercase font-bold tracking-wider rounded-xl transition-all duration-300 font-sans"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5 mt-3 max-h-[100px] overflow-y-auto pr-1">
              {techList.map((t, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-cream/30 border border-border-cream text-[9px] uppercase font-bold text-burnt-orange rounded-lg flex items-center gap-1.5 shadow-minimal font-sans"
                >
                  {t}
                  <button
                    type="button"
                    onClick={() => removeTech(idx)}
                    className="text-red-600/70 hover:text-red-600"
                  >
                    <X size={10} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 mt-6 pt-2">
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
                  <Plus size={12} className="text-cream" /> Create Career Entry
                </>
              )}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
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

      {/* Existing Experiences Timeline Directory */}
      <div className="lg:col-span-6 p-6 rounded-2xl bg-card-white border border-border-cream shadow-minimal">
        <h3 className="text-xs uppercase font-bold tracking-widest text-deep-black mb-6 font-display">
          Career Timeline Directory ({experiences.length})
        </h3>

        {experiences.length === 0 ? (
          <p className="text-[10px] text-muted text-center py-12 font-sans">No timeline items registered yet.</p>
        ) : (
          <div className="space-y-4 max-h-[660px] overflow-y-auto pr-2" data-lenis-prevent="true">
            {experiences.map((exp: ExperienceItem) => (
              <div
                key={exp._id}
                className="p-5 bg-cream/10 border border-border-cream rounded-2xl relative shadow-minimal group"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h4 className="text-xs font-bold text-deep-black leading-snug font-sans">{exp.role}</h4>
                    <p className="text-[10px] font-semibold text-burnt-orange uppercase mt-0.5 font-sans">{exp.company}</p>
                  </div>

                  {!isGuest && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleEdit(exp)}
                        className="p-1.5 hover:text-burnt-orange text-secondary-gray/50 transition-colors duration-200 bg-card-white border border-border-cream rounded-lg"
                        title="Edit Entry"
                      >
                        <Edit2 size={11} />
                      </button>
                      <button
                        onClick={() => handleDelete(exp._id)}
                        className="p-1.5 hover:text-red-600 text-secondary-gray/50 transition-colors duration-200 bg-card-white border border-border-cream rounded-lg"
                        title="Delete Entry"
                      >
                        <Trash2 size={11} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Sub Metadata */}
                <div className="flex flex-wrap gap-4 text-[9px] text-muted mb-3 border-t border-border-cream/80 pt-2 font-sans">
                  <span className="flex items-center gap-1">
                    <Calendar size={10} className="text-burnt-orange" /> {exp.period}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={10} className="text-burnt-orange" /> {exp.location}
                  </span>
                </div>

                {/* Directives Snippet */}
                <div className="space-y-1 mb-3 font-sans">
                  <p className="text-[8px] uppercase tracking-wider font-bold text-muted">Directives Preview</p>
                  <ul className="list-disc list-inside text-[9px] text-secondary-gray leading-normal pl-1 space-y-0.5">
                    {exp.details.slice(0, 2).map((det: string, i: number) => (
                      <li key={i} className="truncate text-deep-black">
                        {det}
                      </li>
                    ))}
                    {exp.details.length > 2 && (
                      <li className="list-none text-[8px] italic text-burnt-orange">
                        + {exp.details.length - 2} more bullet points
                      </li>
                    )}
                  </ul>
                </div>

                {/* Tech stacks tags */}
                <div className="flex flex-wrap gap-1 font-sans">
                  {exp.tech.map((t: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-card-white border border-border-cream text-[8px] uppercase font-bold text-secondary-gray/80 rounded-md"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
