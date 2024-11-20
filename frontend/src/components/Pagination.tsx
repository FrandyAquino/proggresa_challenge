import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    totalArticles: number;
    articlesPerPage: number;
    setCurrentPage: (page: number) => void;
    currentPage: number;
    darkMode: boolean;
}

const Pagination: React.FC<PaginationProps> = ({ 
    totalArticles, 
    articlesPerPage, 
    setCurrentPage, 
    currentPage, 
    darkMode 
}) => {
    const totalPages = Math.ceil(totalArticles / articlesPerPage);
    
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);
    
    if (endPage - startPage < 4) {
        startPage = Math.max(1, endPage - 4);
    }

    const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center items-center space-x-2 mt-8"
        >
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg ${
                    darkMode
                        ? 'bg-gray-800 hover:bg-gray-700 disabled:bg-gray-900'
                        : 'bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50'
                } disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
            >
                <ChevronLeft className="w-5 h-5" />
            </motion.button>

            <div className="flex space-x-2">
                {pages.map(number => (
                    <motion.button
                        key={number}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setCurrentPage(number)}
                        className={`min-w-[40px] h-10 rounded-lg font-medium transition-all ${
                            currentPage === number
                                ? darkMode
                                    ? 'bg-indigo-600 text-white shadow-indigo-500/30'
                                    : 'bg-indigo-500 text-white shadow-indigo-500/30'
                                : darkMode
                                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        } ${currentPage === number ? 'shadow-lg' : ''}`}
                    >
                        {number}
                    </motion.button>
                ))}
            </div>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-lg ${
                    darkMode
                        ? 'bg-gray-800 hover:bg-gray-700 disabled:bg-gray-900'
                        : 'bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50'
                } disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
            >
                <ChevronRight className="w-5 h-5" />
            </motion.button>
        </motion.div>
    );
};

export default Pagination;