import { useState, useEffect } from 'react';

type ToastType = 'success' | 'error';

let addToastHandler: (msg: string, type: ToastType) => void = () => {};

export const toast = {
  success: (msg: string) => addToastHandler(msg, 'success'),
  error: (msg: string) => addToastHandler(msg, 'error'),
};

export const ToastContainer = () => {
  const [toasts, setToasts] = useState<{ id: number; msg: string; type: ToastType }[]>([]);

  useEffect(() => {
    addToastHandler = (msg, type) => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, msg, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3000);
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`px-4 py-2 rounded shadow text-white font-medium ${
            t.type === 'success' ? 'bg-green-600' : 'bg-red-600'
          }`}
        >
          {t.msg}
        </div>
      ))}
    </div>
  );
};
