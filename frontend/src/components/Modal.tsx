import React, { ReactNode } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    darkMode: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, darkMode }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div
                className={`rounded-lg p-6 w-full max-w-md shadow-lg relative transition-colors ${
                    darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
                }`}
            >
                <button
                    onClick={onClose}
                    className={`absolute top-3 right-3 transition-colors ${
                        darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                    <p className='text-xl'>x</p>
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
