import React, { ReactNode } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
                <button
                    onClick={onClose}
                    className="text-gray-600 hover:text-gray-900 absolute top-3 right-3"
                >
                    ×
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
