import React, { useState, useEffect } from 'react';
import ArticleGrid from './components/ArticleGrid';
import { Moon, Sun, User, Menu } from 'lucide-react';
import LoginForm from './auth/LoginForm';
import RegisterForm from './auth/RegisterForm';
import Modal from './components/Modal';

const App: React.FC = () => {
    const [darkMode, setDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode ? JSON.parse(savedMode) : false;
    });
    const [filterOpen, setFilterOpen] = useState(false);
    const [filter, setFilter] = useState('');
    const [selectedTopics] = useState<string[]>([]);
    const [sources, setSources] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [user, setUser] = useState<string | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const savedUser = localStorage.getItem('username');
        if (savedUser) {
            setUser(savedUser);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode((prevMode: boolean) => !prevMode);
    };

    const toggleFilter = () => {
        if (!user) {
            openModal();
            return;
        }
        setFilterOpen(!filterOpen);
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

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <div className={`flex flex-col min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            <header className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg transition-all duration-300`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <h1 className={`text-2xl sm:text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} transition-colors duration-300`}>News Aggregator</h1>

                        <div className="hidden sm:flex items-center space-x-4">
                            {user && (
                                <div className="flex items-center space-x-1">
                                    <User className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-800'}`} />
                                    <span className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{`Hola, ${user}`}</span>
                                </div>
                            )}

                            <button
                                onClick={toggleDarkMode}
                                className={`p-2 rounded-full transition duration-300 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} focus:outline-none`}
                                aria-label={darkMode ? 'Activar modo claro' : 'Activar modo oscuro'}
                            >
                                {darkMode ? (
                                    <Sun className="text-yellow-300 w-5 h-5" />
                                ) : (
                                    <Moon className="text-gray-800 w-5 h-5" />
                                )}
                            </button>

                            {user ? (
                                <button
                                    onClick={handleSignOut}
                                    className="flex items-center bg-red-600 text-white px-3 py-1 rounded-md shadow-md transition duration-200 hover:bg-red-700 focus:outline-none text-sm"
                                >
                                    <User className="mr-1 w-4 h-4" />
                                    <span className="font-medium">Sign Out</span>
                                </button>
                            ) : (
                                <button
                                    onClick={openModal}
                                    className="flex items-center bg-blue-600 text-white px-3 py-1 rounded-md shadow-md transition duration-200 hover:bg-blue-700 focus:outline-none text-sm"
                                >
                                    <User className="mr-1 w-4 h-4" />
                                    <span className="font-medium">Sign In</span>
                                </button>
                            )}
                        </div>

                        <div className="sm:hidden">
                            <button
                                onClick={toggleMobileMenu}
                                className={`p-2 rounded-md ${darkMode ? 'text-white' : 'text-gray-800'}`}
                            >
                                <Menu className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    {mobileMenuOpen && (
                        <div className="sm:hidden py-2">
                            {user && (
                                <div className="flex items-center space-x-1 mb-2">
                                    <User className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-800'}`} />
                                    <span className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{`Hola, ${user}`}</span>
                                </div>
                            )}
                            <div className="flex flex-col space-y-2">
                                <button
                                    onClick={toggleDarkMode}
                                    className={`flex items-center p-2 rounded-md transition duration-300 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} focus:outline-none`}
                                >
                                    {darkMode ? (
                                        <Sun className="text-yellow-300 w-5 h-5 mr-2" />
                                    ) : (
                                        <Moon className="text-gray-800 w-5 h-5 mr-2" />
                                    )}
                                    <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
                                </button>

                                {user ? (
                                    <button
                                        onClick={handleSignOut}
                                        className="flex items-center bg-red-600 text-white px-3 py-2 rounded-md shadow-md transition duration-200 hover:bg-red-700 focus:outline-none text-sm"
                                    >
                                        <User className="mr-2 w-4 h-4" />
                                        <span className="font-medium">Sign Out</span>
                                    </button>
                                ) : (
                                    <button
                                        onClick={openModal}
                                        className="flex items-center bg-blue-600 text-white px-3 py-2 rounded-md shadow-md transition duration-200 hover:bg-blue-700 focus:outline-none text-sm"
                                    >
                                        <User className="mr-2 w-4 h-4" />
                                        <span className="font-medium">Sign In</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </header>

            <main className="flex-grow max-w-7xl mx-auto p-6">
                <Modal isOpen={isModalOpen} onClose={closeModal} darkMode={darkMode}>
                    <h2 className="text-2xl font-bold mb-4">{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</h2>
                    {isLogin ? (
                        <LoginForm onLoginSuccess={handleLoginSuccess} darkMode={darkMode} /> // Pasa la prop darkMode
                    ) : (
                        <RegisterForm onRegisterSuccess={handleLoginSuccess} darkMode={darkMode} /> // Asegúrate de que RegisterForm también lo acepte si es necesario
                    )}
                    <button onClick={toggleForm} className="mt-4 text-blue-500 hover:underline">
                        {isLogin ? '¿No tienes una cuenta? Regístrate aquí' : '¿Ya tienes cuenta? Inicia sesión aquí'}
                    </button>
                </Modal>

                <div className="flex justify-between mb-4">
                    <button
                        onClick={toggleFilter}
                        className={`px-4 py-2 rounded-md transition duration-200 ${darkMode
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : 'bg-blue-500 text-white hover:bg-blue-600'
                            }`}
                    >
                        {filterOpen ? 'Cerrar Filtros' : 'Filtrar Artículos'}
                    </button>
                </div>

                {filterOpen && (
                    <div className={`rounded-md p-4 mb-4 transition-all duration-300 shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'
                        }`}>
                        <h2 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Filtrar por:</h2>
                        <div className="mt-4">
                            <h3 className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Temas</h3>
                            <input
                                type="text"
                                placeholder="Escribir temas o palabras clave"
                                className={`border rounded-md p-2 w-full mt-1 transition duration-200 ${darkMode
                                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                    }`}
                                onChange={(e) => setFilter(e.target.value)}
                            />
                        </div>
                        <div className="mt-4">
                            <h3 className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Fuentes:</h3>
                            <input
                                type="text"
                                placeholder="Escribir fuentes"
                                className={`border rounded-md p-2 w-full mt-1 transition duration-200 ${darkMode
                                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                    }`}
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
                    username={user}
                />
            </main>
        </div>
    );
};

export default App;