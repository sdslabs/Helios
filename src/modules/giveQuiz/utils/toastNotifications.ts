import { toast, ToastOptions  } from 'react-toastify';

const displayToast = (message: any, options: ToastOptions= {}) => {
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

export default displayToast;

