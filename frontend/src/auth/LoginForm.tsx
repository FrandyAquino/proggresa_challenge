import React, { useState } from 'react';
import axios from 'axios';

interface LoginFormProps {
    onLoginSuccess: (username: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:5000/api/users/login', {
            username,
            password,
        });
        const { token } = response.data.data;
        localStorage.setItem('token', token); 
        setError('');
        onLoginSuccess(username);
    } catch (err: any) {
        setError(err.response?.data.message || 'Error en el inicio de sesión');
    }
};


    return (
        <form onSubmit={handleLogin} className="space-y-6">
            <div>
                <label className="block text-sm font-medium mb-1">Nombre de usuario</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Contraseña</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
                type="submit"
                className="bg-blue-500 text-white w-full py-3 rounded-md hover:bg-blue-600 transition duration-200"
            >
                Iniciar Sesión
            </button>
        </form>
    );
};

export default LoginForm;
