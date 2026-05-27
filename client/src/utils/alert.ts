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

export const showLoadingAlert = (title: string = 'Processing...') => {
  return Swal.fire({
    title,
    allowOutsideClick: false,
    background: '#FFFFFF',
    color: '#111111',
    customClass: {
      popup: 'rounded-3xl border border-border-cream font-sans shadow-minimal p-6',
      title: 'text-xs uppercase font-bold tracking-widest text-deep-black block text-center',
    },
    didOpen: () => {
      Swal.showLoading();
    }
  });
};

export const showSuccessToast = (message: string) => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    showCloseButton: true,
    width: '340px',
    timer: 2500,
    timerProgressBar: true,
    background: '#FFFFFF',
    color: '#111111',
    customClass: {
      popup: 'rounded-xl border border-border-cream font-sans shadow-minimal p-4',
      title: 'text-xs font-semibold text-deep-black pr-6 text-left',
      closeButton: 'text-secondary-gray hover:text-deep-black focus:outline-none focus:ring-0 shadow-none border-none text-base absolute top-3 right-3 leading-none',
    },
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });

  return Toast.fire({
    icon: 'success',
    title: message
  });
};

export const showErrorToast = (message: string) => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    showCloseButton: true,
    width: '340px',
    timer: 3000,
    timerProgressBar: true,
    background: '#FFFFFF',
    color: '#111111',
    customClass: {
      popup: 'rounded-xl border border-border-cream font-sans shadow-minimal p-4',
      title: 'text-xs font-semibold text-deep-black pr-6 text-left',
      closeButton: 'text-secondary-gray hover:text-deep-black focus:outline-none focus:ring-0 shadow-none border-none text-base absolute top-3 right-3 leading-none',
    },
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });

  return Toast.fire({
    icon: 'error',
    title: message
  });
};
