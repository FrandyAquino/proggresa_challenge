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
            setSuccessMessage('User created successfully. You can log in now.');
            setError('');
            onRegisterSuccess(username);
        } catch (err: any) {
            setError(err.response?.data.message || 'Error creating user');
            setSuccessMessage('');
        }
    };

    return (
        <form onSubmit={handleRegister} className="space-y-6">
            <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Username
                </label>
                <input
                    type="text"
                    value={username}
                    placeholder='Enter a username (not an email)'
                    onChange={(e) => setUsername(e.target.value)}
                    className={`border rounded-md p-3 w-full focus:outline-none focus:ring-2 transition-colors ${
                        darkMode
                            ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500 placeholder-gray-400'
                            : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-400 placeholder-gray-500'
                    }`}
                    required
                />
                <span className='text-gray-600 text-sm'>Minimum 5 characters</span>
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
                    className={`border rounded-md p-3 w-full focus:outline-none focus:ring-2 transition-colors ${
                        darkMode
                            ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500 placeholder-gray-400'
                            : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-400 placeholder-gray-500'
                    }`}
                    required
                />
                <span className='text-gray-600 text-sm'>Minimum 3 characters</span>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}
            <button
                type="submit"
                className={`w-full py-3 rounded-md transition duration-200 ${
                    darkMode ? 'bg-green-600 hover:bg-green-500 text-white' : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
            >
                Register
            </button>
        </form>
    );
};

export default RegisterForm;
