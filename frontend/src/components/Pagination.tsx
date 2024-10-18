import React from 'react';

interface PaginationProps {
    totalArticles: number;
    articlesPerPage: number;
    setCurrentPage: (page: number) => void;
    currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ totalArticles, articlesPerPage, setCurrentPage, currentPage }) => {
    const pageNumbers = [];
    const totalPages = Math.ceil(totalArticles / articlesPerPage);

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="flex justify-center mt-4">
            <nav className="flex space-x-1">
                {pageNumbers.map(number => (
                    <button
                        key={number}
                        onClick={() => setCurrentPage(number)}
                        className={`px-4 py-2 border rounded-md transition-all duration-300 
                            ${currentPage === number 
                                ? 'bg-blue-500 text-white shadow-lg transform scale-105' 
                                : 'bg-gray-200 text-gray-800 hover:bg-gray-300 hover:shadow-md'}`}
                    >
                        {number}
                    </button>
                ))}
            </nav>
        </div>
    );
};

export default Pagination;
