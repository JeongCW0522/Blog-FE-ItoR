import { createContext, useContext, useState, useCallback } from 'react';
import { Toast } from '@/components';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({ show: false, type: 'error', message: '' });

  const showToast = useCallback((type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 2000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast show={toast.show} text={toast.message} type={toast.type} />
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
