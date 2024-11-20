import React, { useState } from 'react';
import axios from 'axios';

interface LoginFormProps {
    onLoginSuccess: (username: string) => void;
    darkMode: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess, darkMode }) => {
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
            setError(err.response?.data.message || 'Login error');
        }
    };

    return (
        <form onSubmit={handleLogin} className="space-y-6">
            <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Username
                </label>
                <input
                    type="text"
                    value={username}
                    placeholder='Enter a username (not an email)'
                    onChange={(e) => setUsername(e.target.value)}
                    className={`border rounded-md p-3 w-full focus:outline-none focus:ring-2 ${darkMode
                        ? 'bg-gray-800 text-white border-gray-600 focus:ring-blue-400'
                        : 'bg-white text-gray-900 border-gray-300 focus:ring-blue-400'
                        }`}
                    required
                />
            </div>
            <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Password
                </label>
                <input
                    type="password"
                    value={password}
                    placeholder='Enter a password'
                    onChange={(e) => setPassword(e.target.value)}
                    className={`border rounded-md p-3 w-full focus:outline-none focus:ring-2 ${darkMode
                        ? 'bg-gray-800 text-white border-gray-600 focus:ring-blue-400'
                        : 'bg-white text-gray-900 border-gray-300 focus:ring-blue-400'
                        }`}
                    required
                />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
                type="submit"
                className={`w-full py-3 rounded-md transition duration-200 ${darkMode
                    ? 'bg-blue-500 text-white hover:bg-blue-400'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
            >
                Sign in
            </button>
        </form>
    );
};

export default LoginForm;
