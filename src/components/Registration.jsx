import { useState, useRef, useEffect } from 'react';
import Header from "./Header.jsx";

function Registration({ onAuthSuccess }) {
    const [mode, setMode] = useState('Sign in');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const endpoint = mode === 'Sign in' ? '/auth/login' : '/auth/register';

        try {
            const res = await fetch(`http://localhost:8080${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Something went wrong');
            }

            if (mode === 'Sign in') {
                localStorage.setItem('token', data.token);
                onAuthSuccess();
            }

            setMessage(
                mode === 'Sign in' ? 'Entered successfully!' : 'Registered successfully!'
            );
        } catch (err) {
            setMessage(err.message);
        }
    };

    return (
        <div className="px-2 w-full ">
            <Header
                title="List it. Do it."
                options={[
                    { label: "Sign in", value: "Sign in" },
                    { label: "Sign up", value: "Sign up" }
                ]}
                onOptionClick={(value) => setMode(value)}
            />
            {/* Form */}
            <div className="max-w-screen-lg mx-auto">
                <div className="flex justify-center pt-10">
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
                    >
                        <h2 className="text-xl font-bold mb-4 text-center">
                            {mode}
                        </h2>

                        <div className="mb-4">
                            <label className="block mb-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                        >
                            {mode}
                        </button>

                        {message && (
                            <p className="mt-4 text-center text-green-600">{message}</p>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Registration;
