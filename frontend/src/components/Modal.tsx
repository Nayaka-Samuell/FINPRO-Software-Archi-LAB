import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4 backdrop-blur-sm transition-all duration-300">
      <div className="bg-cream-100 text-brown-900 rounded-xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-brown-900 hover:text-red-500 transition text-2xl leading-none">&times;</button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
