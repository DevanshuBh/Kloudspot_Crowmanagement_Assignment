import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Cloud } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await axios.post('http://localhost:8080/api/auth/login', { email });
            if (res.data.token) {
                navigate('/dashboard');
            }
        } catch (err) {
            setError('Invalid ID. Try "parking_solutions"');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa]">
            <div className="w-full max-w-md">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-3 mb-3">
                        <Cloud className="w-10 h-10 text-kloudspot-teal" fill="currentColor" />
                        <span className="text-3xl font-bold text-kloudspot-teal tracking-tight">kloudspot</span>
                    </div>
                    <p className="text-gray-500 font-medium">Crowd Management Solution</p>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-10">
                    <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Sign In</h2>

                    {error && (
                        <div className="mb-6 p-3 rounded bg-red-50 border border-red-100 text-red-600 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Log In ID</label>
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="parking_solutions"
                                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:border-kloudspot-teal focus:ring-1 focus:ring-kloudspot-teal transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:border-kloudspot-teal focus:ring-1 focus:ring-kloudspot-teal transition-colors pr-12"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3.5 rounded-md bg-kloudspot-teal text-white font-bold hover:bg-[#2b756f] transition-all shadow-sm"
                        >
                            {isLoading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
