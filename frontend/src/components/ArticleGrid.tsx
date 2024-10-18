import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ArticleCard from './ArticleCard';
import Pagination from './Pagination';

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

const ArticleGrid: React.FC<ArticleGridProps> = ({ filter, selectedTopics, sources, username }) => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 15;
    const [debouncedFilter, setDebouncedFilter] = useState(filter);
    const [debouncedSources, setDebouncedSources] = useState(sources);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedFilter(filter);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [filter]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSources(sources);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [sources]);

    const getCacheKey = () => `articles_${username || 'guest'}_${selectedTopics.join(',')}_${debouncedSources}_${debouncedFilter}`;

    const loadCachedArticles = () => {
        const cacheKey = getCacheKey();
        const cachedData = localStorage.getItem(cacheKey);
        if (cachedData) {
            const parsedData = JSON.parse(cachedData);
            const { articles, timestamp } = parsedData;
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
        const dataToCache = {
            articles,
            timestamp: Date.now(),
        };
        localStorage.setItem(cacheKey, JSON.stringify(dataToCache));
    };

    const fetchArticles = async () => {
        setLoading(true);
        try {
            let url = 'http://localhost:5000/api/articles';
            const categoryParam = selectedTopics.length > 0 ? `category=${selectedTopics.join(',')}` : '';
            const sourcesParam = debouncedSources ? `sources=${encodeURIComponent(debouncedSources)}` : '';
            const filterParam = debouncedFilter ? `q=${encodeURIComponent(debouncedFilter)}` : '';
            const token2 = localStorage.getItem("token");

            const params = [categoryParam, sourcesParam, filterParam].filter(param => param).join('&');
            if (params) {
                url += `?${params}`;
            }

            const response = await axios.get(url, {
                headers: {
                    Authorization: token2 ? `Bearer ${token2}` : undefined,
                },
            });

            setArticles(response.data);
            cacheArticles(response.data);
            setError(null);
        } catch (err) {
            console.error('Error al cargar los artículos:', err);
            setError('Error al cargar los artículos');
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
        const isValidArticle = 
            article.title && article.title !== "[Removed]" &&
            article.description && article.description !== "[Removed]" &&
            article.content && article.content !== "[Removed]" &&
            article.url && article.url !== "[Removed]" &&
            article.source.name && article.source.name !== "[Removed]";

        const topicMatch = selectedTopics.length === 0 || selectedTopics.includes(article.source.name);
        const keywordMatch = (article.title?.toLowerCase().includes(debouncedFilter.toLowerCase()) || false) ||
            (article.description?.toLowerCase().includes(debouncedFilter.toLowerCase()) || false);
        const sourceMatch = debouncedSources === '' || (article.source.name?.toLowerCase().includes(debouncedSources.toLowerCase()) || false);

        return isValidArticle && topicMatch && keywordMatch && sourceMatch;
    });

    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);

    if (loading) return <p className="text-center">Cargando artículos...</p>;
    if (error) return <p className="text-red-500 text-center">{error}</p>;

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-300">
                {currentArticles.map((article) => (
                    <ArticleCard key={article.url} article={article} />
                ))}
            </div>
            <Pagination
                totalArticles={filteredArticles.length}
                articlesPerPage={articlesPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
        </div>
    );
};

export default ArticleGrid;
