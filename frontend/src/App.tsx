import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArticleGrid from './components/ArticleGrid';
import { Moon, Sun, User, Menu, Newspaper, Filter, X } from 'lucide-react';
import LoginForm from './auth/LoginForm';
import RegisterForm from './auth/RegisterForm';
import Modal from './components/Modal';

const App: React.FC = () => {
    const [darkMode, setDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode ? JSON.parse(savedMode) : false;
    });
    const [filter, setFilter] = useState('');
    const [filterOpen, setFilterOpen] = useState(false);
    const [selectedTopics] = useState<string[]>([]);
    const [sources, setSources] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [user, setUser] = useState<string | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode);
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }, [darkMode]);

    useEffect(() => {
        const savedUser = localStorage.getItem('username');
        if (savedUser) setUser(savedUser);
    }, []);

    const toggleDarkMode = () => setDarkMode((prev: any) => !prev);
    const toggleFilter = () => !user ? openModal() : setFilterOpen(!filterOpen);
    const toggleForm = () => setIsLogin(!isLogin);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

    const handleLoginSuccess = (username: string) => {
        setUser(username);
        localStorage.setItem('username', username);
        closeModal();
    };

    const handleSignOut = () => {
        setUser(null);
        localStorage.removeItem('username');
        localStorage.removeItem('token');
    };

    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'
            }`}>
            <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center space-x-3"
                        >
                            <Newspaper className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                            <h1 className="text-2xl font-bold">NewsHub</h1>
                        </motion.div>

                        <div className="hidden md:flex items-center space-x-6">
                            {user && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex items-center space-x-2"
                                >
                                    <User className="h-4 w-4" />
                                    <span className="font-medium">{user}</span>
                                </motion.div>
                            )}

                            <button
                                onClick={toggleDarkMode}
                                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                aria-label="Toggle theme"
                            >
                                <motion.div
                                    initial={false}
                                    animate={{ rotate: darkMode ? 180 : 0 }}
                                >
                                    {darkMode ? (
                                        <Sun className="h-5 w-5 text-yellow-500" />
                                    ) : (
                                        <Moon className="h-5 w-5 text-gray-600" />
                                    )}
                                </motion.div>
                            </button>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={user ? handleSignOut : openModal}
                                className={`btn ${user
                                    ? 'bg-red-600 hover:bg-red-700 text-white'
                                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                                    }`}
                            >
                                {user ? 'Sign Out' : 'Sign In'}
                            </motion.button>
                        </div>

                        <button
                            onClick={toggleMobileMenu}
                            className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                            <Menu className="h-6 w-6" />
                        </button>
                    </div>

                    <AnimatePresence>
                        {mobileMenuOpen && (
                            <motion.div
                                initial={{ opacity: 0, maxHeight: 0 }}
                                animate={{ opacity: 1, maxHeight: '9999px' }} 
                                exit={{ opacity: 0, maxHeight: 0 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="md:hidden py-4 overflow-hidden"
                            >
                                <nav className="flex flex-col space-y-4">
                                    {user && (
                                        <div className="flex items-center space-x-2 px-2">
                                            <User className="h-4 w-4" />
                                            <span className="font-medium">{user}</span>
                                        </div>
                                    )}

                                    <button
                                        onClick={toggleDarkMode}
                                        className="flex items-center space-x-2 px-2 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                                    >
                                        {darkMode ? (
                                            <Sun className="h-4 w-4 text-yellow-500" />
                                        ) : (
                                            <Moon className="h-4 w-4" />
                                        )}
                                        <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
                                    </button>

                                    <button
                                        onClick={user ? handleSignOut : openModal}
                                        className={`flex items-center space-x-2 px-2 py-2 rounded-md ${user
                                            ? 'bg-red-600 hover:bg-red-700 text-white'
                                            : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                                            }`}
                                    >
                                        <User className="h-4 w-4" />
                                        <span>{user ? 'Sign Out' : 'Sign In'}</span>
                                    </button>
                                </nav>
                            </motion.div>
                        )}
                    </AnimatePresence>


                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Modal isOpen={isModalOpen} onClose={closeModal} darkMode={darkMode}>
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold">
                            {isLogin ? 'Welcome Back' : 'Create Account'}
                        </h2>
                        {isLogin ? (
                            <LoginForm onLoginSuccess={handleLoginSuccess} darkMode={darkMode} />
                        ) : (
                            <RegisterForm onRegisterSuccess={handleLoginSuccess} darkMode={darkMode} />
                        )}
                        <button
                            onClick={toggleForm}
                            className="w-full text-indigo-600 dark:text-indigo-400 hover:underline"
                        >
                            {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
                        </button>
                    </div>
                </Modal>

                <div className="space-y-6">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleFilter}
                        className={`btn ${filterOpen
                            ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                            : 'bg-indigo-600 text-white hover:bg-indigo-700'
                            }`}
                    >
                        {filterOpen ? (
                            <X className="inline-block w-4 h-4 mr-2" />
                        ) : (
                            <Filter className="inline-block w-4 h-4 mr-2" />
                        )}
                        {filterOpen ? 'Close Filters' : 'Filter Articles'}
                    </motion.button>

                    <div className="relative">
                        <AnimatePresence mode="popLayout">
                            {filterOpen && (
                                <motion.div
                                    initial={{ opacity: 0, height: 'auto' }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 500,
                                        damping: 30,
                                        opacity: { duration: 0.2 }
                                    }}
                                    className="bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-4 p-6 space-y-4 overflow-hidden"
                                >
                                    <div className="space-y-2">
                                        <h3 className="font-medium">Topics</h3>
                                        <input
                                            type="text"
                                            placeholder="Enter topics or keywords"
                                            onChange={(e) => setFilter(e.target.value)}
                                            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="font-medium">Sources</h3>
                                        <input
                                            type="text"
                                            placeholder="Enter sources"
                                            onChange={(e) => setSources(e.target.value)}
                                            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <motion.div
                            layout
                            transition={{
                                type: "spring",
                                damping: 20
                            }}
                        >
                            <ArticleGrid
                                darkMode={darkMode}
                                filter={filter}
                                selectedTopics={selectedTopics}
                                sources={sources}
                                username={user}
                            />
                        </motion.div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default App;