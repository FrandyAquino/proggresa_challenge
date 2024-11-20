import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    darkMode: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, darkMode }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
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
                            <p className="text-xl">x</p>
                        </button>
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Modal;
