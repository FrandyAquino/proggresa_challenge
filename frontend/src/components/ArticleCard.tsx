import React from 'react';

interface Article {
    source: {
        id: string | null;
        name: string;
    };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

interface ArticleCardProps {
    article: Article;
    darkMode: boolean;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, darkMode }) => {
    return (
        <div className={`border rounded-lg shadow-md overflow-hidden transition-all duration-300 ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
            <img 
                src={article.urlToImage || 'https://via.placeholder.com/400x200?text=No+Image'} 
                alt={article.title} 
                className="w-full h-48 sm:h-56 md:h-64 object-cover"
            />
            <div className="p-4">
                <h2 className={`text-lg sm:text-xl font-semibold mb-2 line-clamp-2 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                    {article.title}
                </h2>
                <p className={`text-sm sm:text-base mb-3 line-clamp-3 ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                    {article.description}
                </p>
                <p className={`text-xs sm:text-sm mb-1 ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                    <strong>Source:</strong> {article.source.name}
                </p>
                <p className={`text-xs sm:text-sm mb-2 ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                    {new Date(article.publishedAt).toLocaleDateString()}
                </p>
                <a 
                    href={article.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={`text-sm sm:text-base font-medium hover:underline ${
                        darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'
                    }`}
                >
                    Read more
                </a>
            </div>
        </div>
    );
};

export default ArticleCard;