import React from 'react';

interface PaginationProps {
    totalArticles: number;
    articlesPerPage: number;
    setCurrentPage: (page: number) => void;
    currentPage: number;
    darkMode: boolean;
}

const Pagination: React.FC<PaginationProps> = ({ totalArticles, articlesPerPage, setCurrentPage, currentPage, darkMode }) => {
    const pageNumbers = [];
    const totalPages = Math.ceil(totalArticles / articlesPerPage);

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="flex justify-center mt-4">
            <nav className="flex flex-wrap justify-center space-x-1 space-y-1">
                {pageNumbers.map(number => (
                    <button
                        key={number}
                        onClick={() => setCurrentPage(number)}
                        className={`px-4 py-2 border rounded-md transition-all duration-300 
                            ${currentPage === number 
                                ? darkMode
                                    ? 'bg-blue-600 text-white shadow-lg transform scale-105' 
                                    : 'bg-blue-500 text-white shadow-lg transform scale-105'
                                : darkMode
                                    ? 'bg-gray-700 text-gray-200 hover:bg-gray-600 hover:shadow-md'
                                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300 hover:shadow-md'
                            }`}
                    >
                        {number}
                    </button>
                ))}
            </nav>
        </div>
    );
};

export default Pagination;