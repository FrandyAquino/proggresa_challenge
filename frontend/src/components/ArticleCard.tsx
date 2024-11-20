import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Clock, Building2 } from 'lucide-react';

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
    index: number;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, darkMode, index }) => {
    const cardVariants = {
        hidden: { 
            opacity: 0,
            y: 20,
        },
        visible: { 
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut"
            }
        },
        hover: {
            y: -8,
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        }
    };

    const imageVariants = {
        hover: {
            scale: 1.05,
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        }
    };

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className={`group relative rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${
                darkMode 
                    ? 'bg-gray-800/50 hover:bg-gray-800/80 backdrop-blur-sm' 
                    : 'bg-white/50 hover:bg-white/80 backdrop-blur-sm'
            } border border-gray-200/20`}
        >
            <div className="aspect-video overflow-hidden">
                <motion.img 
                    variants={imageVariants}
                    src={article.urlToImage || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&auto=format&fit=crop'} 
                    alt={article.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
            </div>

            <div className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                    <Building2 className={`w-4 h-4 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
                    <span className={`text-xs font-medium ${
                        darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                        {article.source.name}
                    </span>
                    <span className="text-gray-300">•</span>
                    <Clock className={`w-4 h-4 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
                    <time className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {new Date(article.publishedAt).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                        })}
                    </time>
                </div>

                <h2 className={`text-xl font-bold mb-3 line-clamp-2 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                    {article.title}
                </h2>

                <p className={`text-sm mb-4 line-clamp-3 ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                    {article.description}
                </p>

                <motion.a 
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center space-x-2 text-sm font-semibold ${
                        darkMode 
                            ? 'text-indigo-400 hover:text-indigo-300' 
                            : 'text-indigo-600 hover:text-indigo-700'
                    }`}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                >
                    <span>Read full article</span>
                    <ExternalLink className="w-4 h-4" />
                </motion.a>
            </div>
        </motion.div>
    );
};

export default ArticleCard;