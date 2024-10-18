import React, { useState } from 'react';
import axios from 'axios';

interface RegisterFormProps {
    onRegisterSuccess: (username: string) => void;
    darkMode: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegisterSuccess, darkMode }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/users', {
                username,
                password,
            });
            setSuccessMessage('Usuario creado con éxito. Puedes iniciar sesión ahora.');
            setError('');
            onRegisterSuccess(username);
        } catch (err: any) {
            setError(err.response?.data.message || 'Error al crear el usuario');
            setSuccessMessage('');
        }
    };

    return (
        <form onSubmit={handleRegister} className="space-y-6">
            <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Nombre de usuario
                </label>
                <input
                    type="text"
                    value={username}
                    placeholder='Escribe un nombre de usuario (no un correo)'
                    onChange={(e) => setUsername(e.target.value)}
                    className={`border rounded-md p-3 w-full focus:outline-none focus:ring-2 transition-colors ${
                        darkMode
                            ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500 placeholder-gray-400'
                            : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-400 placeholder-gray-500'
                    }`}
                    required
                />
                <span className='text-gray-600 text-sm'>Minimo 5 caracteres</span>

            </div>
            <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Contraseña
                </label>
                <input
                    type="password"
                    value={password}
                    placeholder='Ingrese una contraseña'
                    onChange={(e) => setPassword(e.target.value)}
                    className={`border rounded-md p-3 w-full focus:outline-none focus:ring-2 transition-colors ${
                        darkMode
                            ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500 placeholder-gray-400'
                            : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-400 placeholder-gray-500'
                    }`}
                    required
                />
                <span className='text-gray-600 text-sm'>Minimo 3 caracteres</span>

            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}
            <button
                type="submit"
                className={`w-full py-3 rounded-md transition duration-200 ${
                    darkMode ? 'bg-green-600 hover:bg-green-500 text-white' : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
            >
                Registrarse
            </button>
        </form>
    );
};

export default RegisterForm;
