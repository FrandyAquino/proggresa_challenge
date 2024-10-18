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
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
    return (
        <div className="border rounded-lg shadow-md overflow-hidden bg-white transition-all duration-300 transform">
            <img src={article.urlToImage} alt={article.title} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h2 className="text-black text-xl font-semibold">{article.title}</h2>
                <p className="text-gray-600">{article.description}</p>
                <p className="text-gray-500 mt-2">
                    <strong>Source:</strong> {article.source.name}
                </p>
                <p className="text-gray-500 mt-1">{new Date(article.publishedAt).toLocaleDateString()}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mt-2 inline-block">
                    Read more
                </a>
            </div>
        </div>
    );
};

export default ArticleCard;
