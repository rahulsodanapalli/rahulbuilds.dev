import Swal from 'sweetalert2';

export const confirmDeleteAlert = (title: string, text: string) => {
  return Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#C76B37', // Burnt Orange
    cancelButtonColor: '#6D645B',  // Secondary Gray
    confirmButtonText: 'Yes, delete it',
    cancelButtonText: 'Cancel',
    background: '#FFFFFF',        // Card White
    color: '#111111',             // Deep Black
    customClass: {
      popup: 'rounded-3xl border border-border-cream font-sans shadow-minimal p-6 md:p-8',
      title: 'text-sm md:text-base font-display font-light uppercase tracking-tight text-deep-black mb-2 block',
      htmlContainer: 'text-[11px] md:text-xs text-secondary-gray mb-4',
      confirmButton: 'px-5 py-3 rounded-xl font-semibold uppercase tracking-widest text-[9px] font-sans mx-1 border border-burnt-orange hover:bg-burnt-orange/90 transition-colors',
      cancelButton: 'px-5 py-3 rounded-xl font-semibold uppercase tracking-widest text-[9px] font-sans mx-1 border border-secondary-gray/20 hover:bg-cream transition-colors',
    },
    buttonsStyling: true,
  });
};
