import { toast, ToastOptions  } from 'react-toastify';

export const displayToast = (message: any, options: ToastOptions= {}) => {
 const defaultOptions: ToastOptions = {
    position: 'top-center',
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: false,
    closeButton: false,
    progress: undefined,
    type: 'warning',
    toastId: 'customToast',
 };

 const mergedOptions = { ...defaultOptions, ...options };

 toast(message, mergedOptions);
};

export const displayErrorToast = (message: any, options: ToastOptions= {}) => {
   const defaultOptions: ToastOptions = {
      position: 'bottom-center',
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      type: 'error',
      toastId: 'customToast',
   };
  
   const mergedOptions = { ...defaultOptions, ...options };
  
   toast(message, mergedOptions);
  };


