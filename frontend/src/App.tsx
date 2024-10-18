import React, { useState, useEffect } from 'react';
import ArticleGrid from './components/ArticleGrid';
import { FaMoon, FaSun, FaUser } from 'react-icons/fa';
import LoginForm from './auth/LoginForm';
import RegisterForm from './auth/RegisterForm';
import Modal from './components/Modal';

const App: React.FC = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);
    const [filter, setFilter] = useState('');
    const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
    const [sources, setSources] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [user, setUser] = useState<string | null>(null);

    useEffect(() => {
        const savedUser = localStorage.getItem('username');
        if (savedUser) {
            setUser(savedUser);
        }
    }, []);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const toggleFilter = () => {
        if (!user) {
            openModal();
            return;
        }
        setFilterOpen(!filterOpen);
    };

    const handleTopicClick = (topic: string) => {
        if (selectedTopics.includes(topic)) {
            setSelectedTopics(selectedTopics.filter(t => t !== topic));
        } else {
            setSelectedTopics([...selectedTopics, topic]);
        }
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

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
        <div className={`flex flex-col min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            <header className={`flex justify-between items-center p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg rounded-md transition-all duration-300`}>
                <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} transition-colors duration-300`}>Customizable News Aggregator</h1>

                <div className="flex items-center space-x-4">
                    {user && (
                        <div className="flex items-center space-x-1">
                            <FaUser className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-gray-800'}`} />
                            <span className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{`Hola, ${user}`}</span>
                        </div>
                    )}

                    <button
                        onClick={toggleDarkMode}
                        className={`p-2 rounded-full transition duration-300 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} focus:outline-none`}
                        aria-label={darkMode ? 'Activar modo claro' : 'Activar modo oscuro'}
                    >
                        {darkMode ? (
                            <FaSun className="text-yellow-300 w-6 h-6" />
                        ) : (
                            <FaMoon className="text-gray-800 w-6 h-6" />
                        )}
                    </button>

                    {user ? (
                        <button
                            onClick={handleSignOut}
                            className="flex items-center bg-red-600 text-white px-4 py-2 rounded-md shadow-md transition duration-200 hover:bg-red-700 focus:outline-none text-sm"
                        >
                            <FaUser className="mr-1 w-4 h-4" />
                            <span className="font-medium">Sign Out</span>
                        </button>
                    ) : (
                        <button
                            onClick={openModal}
                            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md shadow-md transition duration-200 hover:bg-blue-700 focus:outline-none text-sm"
                        >
                            <FaUser className="mr-1 w-4 h-4" />
                            <span className="font-medium">Sign In</span>
                        </button>
                    )}
                </div>
            </header>

            <main className="flex-grow max-w-7xl mx-auto p-6">
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <h2 className="text-2xl font-bold mb-4">{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</h2>
                    {isLogin ? <LoginForm onLoginSuccess={handleLoginSuccess} /> : <RegisterForm onRegisterSuccess={handleLoginSuccess} />}
                    <button onClick={toggleForm} className="mt-4 text-blue-500 hover:underline">
                        {isLogin ? '¿No tienes una cuenta? Regístrate aquí' : '¿Ya tienes cuenta? Inicia sesión aquí'}
                    </button>
                </Modal>

                <div className="flex justify-between mb-4">
                    <button
                        onClick={toggleFilter}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md transition duration-200 hover:bg-blue-600"
                    >
                        {filterOpen ? 'Cerrar Filtros' : 'Filtrar Artículos'}
                    </button>
                </div>

                {filterOpen && (
                    <div className="bg-gray-100 rounded-md p-4 mb-4 transition-all duration-300 shadow-lg">
                        <h2 className="text-lg font-semibold mb-2">Filtrar por:</h2>
                        <div className="mt-4">
                            <h3 className="font-medium">Temas</h3>
                            <input
                                type="text"
                                placeholder="Escribir temas o palabras clave"
                                className={`border rounded-md p-2 w-full mt-1 transition duration-200 ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}
                                onChange={(e) => setFilter(e.target.value)}
                            />
                        </div>
                        <div className="mt-4">
                            <h3 className="font-medium">Fuentes:</h3>
                            <input
                                type="text"
                                placeholder="Escribir fuentes"
                                className={`border rounded-md p-2 w-full mt-1 transition duration-200 ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}
                                onChange={(e) => setSources(e.target.value)}
                            />
                        </div>
                    </div>
                )}
                <ArticleGrid
                    darkMode={darkMode}
                    filter={filter}
                    selectedTopics={selectedTopics}
                    sources={sources}
                    username={user} />
            </main>
        </div>
    );
};

export default App;
