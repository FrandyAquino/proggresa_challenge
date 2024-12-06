import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import ArticleCard from './ArticleCard';
import Pagination from './Pagination';
import { Loader2 } from 'lucide-react';

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

interface ArticleGridProps {
    darkMode: boolean;
    filter: string;
    selectedTopics: string[];
    sources: string;
    username: string | null;
}

const CACHE_DURATION_MS = 15 * 60 * 1000;

const ArticleGrid: React.FC<ArticleGridProps> = ({ darkMode, filter, selectedTopics, sources, username }) => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 12;
    const [debouncedFilter, setDebouncedFilter] = useState(filter);
    const [debouncedSources, setDebouncedSources] = useState(sources);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedFilter(filter);
            setCurrentPage(1);
        }, 300);
        return () => clearTimeout(handler);
    }, [filter]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSources(sources);
            setCurrentPage(1);
        }, 300);
        return () => clearTimeout(handler);
    }, [sources]);

    const getCacheKey = () => `articles_${username || 'guest'}_${selectedTopics.join(',')}_${debouncedSources}_${debouncedFilter}`;

    const loadCachedArticles = () => {
        const cacheKey = getCacheKey();
        const cachedData = localStorage.getItem(cacheKey);
        if (cachedData) {
            const { articles, timestamp } = JSON.parse(cachedData);
            if (Date.now() - timestamp < CACHE_DURATION_MS) {
                setArticles(articles);
                setLoading(false);
                return true;
            }
        }
        return false;
    };

    const cacheArticles = (articles: Article[]) => {
        const cacheKey = getCacheKey();
        localStorage.setItem(cacheKey, JSON.stringify({
            articles,
            timestamp: Date.now(),
        }));
    };

    const fetchArticles = async () => {
        setLoading(true);
        try {
            let url = 'https://newshub-server.vercel.app/api/articles';
            const params = [
                selectedTopics.length > 0 ? `category=${selectedTopics.join(',')}` : '',
                debouncedSources ? `sources=${encodeURIComponent(debouncedSources)}` : '',
                debouncedFilter ? `q=${encodeURIComponent(debouncedFilter)}` : ''
            ].filter(Boolean).join('&');

            if (params) url += `?${params}`;

            const token = localStorage.getItem("token");
            const response = await axios.get(url, {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            });

            setArticles(response.data);
            cacheArticles(response.data);
            setError(null);
        } catch (err) {
            console.error('Error loading articles:', err);
            setError('Failed to load articles. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!loadCachedArticles()) {
            fetchArticles();
        }
    }, [debouncedFilter, debouncedSources, selectedTopics]);

    const filteredArticles = articles.filter(article => {
        const isValidArticle = [
            article.title,
            article.description,
            article.content,
            article.url,
            article.source.name
        ].every(field => field && field !== "[Removed]");

        return isValidArticle &&
            (!selectedTopics.length || selectedTopics.includes(article.source.name)) &&
            (!debouncedFilter || 
                article.title?.toLowerCase().includes(debouncedFilter.toLowerCase()) ||
                article.description?.toLowerCase().includes(debouncedFilter.toLowerCase())) &&
            (!debouncedSources || 
                article.source.name?.toLowerCase().includes(debouncedSources.toLowerCase()));
    });

    const currentArticles = filteredArticles.slice(
        (currentPage - 1) * articlesPerPage,
        currentPage * articlesPerPage
    );

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
                staggerChildren: 0.1
            }
        },
        exit: { opacity: 0, y: 20 }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center space-y-4"
                >
                    <Loader2 className={`w-12 h-12 animate-spin ${
                        darkMode ? 'text-indigo-400' : 'text-indigo-600'
                    }`} />
                    <p className={`text-lg font-medium ${
                        darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                        Loading articles...
                    </p>
                </motion.div>
            </div>
        );
    }

    if (error) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-center p-8"
            >
                <p className="text-red-500 text-lg font-medium">{error}</p>
            </motion.div>
        );
    }

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-8"
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentPage}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {currentArticles.map((article, index) => (
                        <ArticleCard
                            key={article.url}
                            article={article}
                            darkMode={darkMode}
                            index={index}
                        />
                    ))}
                </motion.div>
            </AnimatePresence>

            {filteredArticles.length > articlesPerPage && (
                <Pagination
                    totalArticles={filteredArticles.length}
                    articlesPerPage={articlesPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                    darkMode={darkMode}
                />
            )}
        </motion.div>
    );
};

export default ArticleGrid;
