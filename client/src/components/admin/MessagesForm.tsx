import { useState } from 'react';
import { Mail, Trash2, Calendar, FolderSync, User, AlertCircle, Loader2 } from 'lucide-react';
import {
  useGetContactMessagesQuery,
  useDeleteContactMessageMutation,
} from '../../services/api/contactApi';
import type { MessageItem } from '../../types/message.types';
import { useAuth } from '../../hooks/useAuth';
import {
  confirmDeleteAlert,
  showLoadingAlert,
  showSuccessToast,
  showErrorToast,
} from '../../utils/alert';
import Swal from 'sweetalert2';

export default function MessagesForm() {
  const { email } = useAuth();
  const isGuest = email === 'guest@rahulbuilds.dev';

  const { data: messages = [], isLoading } = useGetContactMessagesQuery();
  const [deleteContactMessage] = useDeleteContactMessageMutation();

  const [selectedMessage, setSelectedMessage] = useState<MessageItem | null>(null);

  const handleDelete = async (id: string) => {
    const result = await confirmDeleteAlert(
      'Purge Inquiry Record',
      'Are you sure you want to permanently delete this client inquiry brief?'
    );
    if (result.isConfirmed) {
      showLoadingAlert('Purging message logs...');
      try {
        await deleteContactMessage(id).unwrap();
        Swal.close();
        showSuccessToast('Inquiry successfully purged.');
        if (selectedMessage?._id === id) {
          setSelectedMessage(null);
        }
      } catch (err) {
        Swal.close();
        console.error('Failed to purge message:', err);
        showErrorToast('Failed to delete inquiry record.');
      }
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateStr;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="animate-spin text-burnt-orange" size={24} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start select-text">
      {/* Left: Message Master List */}
      <div className="lg:col-span-7 p-6 rounded-2xl bg-card-white border border-border-cream shadow-minimal">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xs uppercase font-bold tracking-widest text-deep-black font-display">
            Inquiries Directory ({messages.length})
          </h3>
          {isGuest && (
            <span className="text-[8px] uppercase tracking-wider font-bold text-burnt-orange bg-burnt-orange/10 px-2 py-1 rounded-md">
              Read-Only
            </span>
          )}
        </div>

        {messages.length === 0 ? (
          <div className="py-24 text-center border border-dashed border-border-cream rounded-2xl flex flex-col items-center justify-center gap-2">
            <Mail className="text-secondary-gray/30" size={32} />
            <p className="text-[10px] text-secondary-gray uppercase tracking-widest font-sans font-bold">
              Secure Communications Log Empty
            </p>
            <p className="text-[9px] text-muted max-w-xs font-sans">
              No briefs or consultations have been logged in the MongoDB instance yet.
            </p>
          </div>
        ) : (
          <div className="space-y-3.5 max-h-[550px] overflow-y-auto pr-2" data-lenis-prevent="true">
            {messages.map((msg) => {
              const isSelected = selectedMessage?._id === msg._id;
              return (
                <div
                  key={msg._id}
                  onClick={() => setSelectedMessage(msg)}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-all duration-300 relative ${
                    isSelected
                      ? 'bg-cream/20 border-burnt-orange shadow-minimal'
                      : 'bg-cream/5 border-border-cream hover:border-burnt-orange/30'
                  }`}
                >
                  <div className="flex justify-between items-start gap-4 mb-2.5">
                    <div>
                      <h4 className="text-xs font-semibold text-deep-black font-sans flex items-center gap-1.5">
                        <User size={12} className="text-secondary-gray/50" /> {msg.name}
                      </h4>
                      <p className="text-[9px] text-muted font-sans font-medium lowercase">
                        {msg.email}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[8px] uppercase tracking-wider font-bold text-burnt-orange bg-burnt-orange/5 border border-burnt-orange/10 px-2 py-0.5 rounded-full font-mono">
                        {msg.projectType}
                      </span>
                      {!isGuest && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(msg._id);
                          }}
                          className="p-1 text-secondary-gray/40 hover:text-red-600 transition-colors"
                          title="Purge Record"
                        >
                          <Trash2 size={12} />
                        </button>
                      )}
                    </div>
                  </div>

                  <p className="text-[11px] text-secondary-gray font-sans font-light line-clamp-2 leading-relaxed">
                    {msg.message}
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-border-cream/50 flex items-center gap-1 text-[8px] font-bold text-muted uppercase tracking-wider font-mono">
                    <Calendar size={10} className="opacity-60" /> {formatDate(msg.createdAt)}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Right: Message Detail Viewer */}
      <div className="lg:col-span-5 p-6 rounded-2xl bg-card-white border border-border-cream shadow-minimal sticky top-6">
        <h3 className="text-xs uppercase font-bold tracking-widest text-deep-black mb-6 font-display flex items-center gap-1.5">
          <FolderSync size={12} className="text-burnt-orange" /> Inquiry Details
        </h3>

        {!selectedMessage ? (
          <div className="py-24 text-center border border-dashed border-border-cream rounded-2xl flex flex-col items-center justify-center gap-1">
            <AlertCircle className="text-secondary-gray/30 mb-1" size={24} />
            <p className="text-[10px] text-secondary-gray uppercase tracking-widest font-sans font-bold">
              Select an Intake Brief
            </p>
            <p className="text-[9px] text-muted max-w-xs font-sans px-4">
              Select a message record on the left to read its full engineering specifications.
            </p>
          </div>
        ) : (
          <div className="space-y-6 text-left">
            <div className="space-y-4 border-b border-border-cream/80 pb-5">
              <div>
                <span className="text-[8px] font-sans font-bold uppercase tracking-wider text-muted/60 block mb-1">
                  01 // Sender Name
                </span>
                <span className="text-sm font-sans font-semibold text-deep-black">
                  {selectedMessage.name}
                </span>
              </div>

              <div>
                <span className="text-[8px] font-sans font-bold uppercase tracking-wider text-muted/60 block mb-1">
                  02 // Email Address
                </span>
                <a
                  href={`mailto:${selectedMessage.email}`}
                  className="text-xs font-sans font-semibold text-burnt-orange hover:underline break-all"
                >
                  {selectedMessage.email}
                </a>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[8px] font-sans font-bold uppercase tracking-wider text-muted/60 block mb-1">
                    03 // Project Focus
                  </span>
                  <span className="text-[9px] uppercase tracking-wider font-bold text-deep-black bg-cream px-2.5 py-1.5 rounded-lg border border-border-cream/50 inline-block font-mono">
                    {selectedMessage.projectType}
                  </span>
                </div>

                <div>
                  <span className="text-[8px] font-sans font-bold uppercase tracking-wider text-muted/60 block mb-1">
                    04 // Logged At
                  </span>
                  <span className="text-[9px] font-sans text-secondary-gray font-semibold pt-1 inline-block">
                    {formatDate(selectedMessage.createdAt)}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <span className="text-[8px] font-sans font-bold uppercase tracking-wider text-muted/60 block mb-2.5">
                05 // Engineering Specifications
              </span>
              <div className="bg-cream/30 border border-border-cream/60 rounded-xl p-4 min-h-[160px] text-xs text-deep-black font-sans font-light leading-relaxed whitespace-pre-wrap">
                {selectedMessage.message}
              </div>
            </div>

            <div className="pt-2 flex justify-start">
              <a
                href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.projectType} Consultation inquiry&body=Hi ${selectedMessage.name},%0D%0A%0D%0AThanks for reaching out! Regarding your inquiry on: "${selectedMessage.message.substring(0, 100)}..."%0D%0A%0D%0A`}
                className="py-3 px-5 bg-deep-black text-cream hover:bg-burnt-orange font-semibold uppercase tracking-widest text-[9px] rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-minimal interactive font-sans"
              >
                <Mail size={12} /> Dispatch Direct Reply
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
