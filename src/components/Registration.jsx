import { useState, useEffect } from 'react';
import Header from "./Header.jsx";

function Registration({ onAuthSuccess }) {
    const [mode, setMode] = useState('Sign in');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Clean fields when switch mode
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setMessage('');
    }, [mode]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const endpoint = mode === 'Sign in' ? '/auth/login' : '/auth/register';
        const payload =
            mode === 'Sign in'
                ? { email, password }
                : { email, password, firstName, lastName };

        try {
            const res = await fetch(`http://localhost:8080${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Something went wrong');
            }

            if (data.token) {
                localStorage.setItem('token', data.token);
                setMessage(
                    mode === 'Sign in' ? 'Entered successfully!' : 'Registered successfully!'
                );

                setTimeout(() => {
                    onAuthSuccess();
                }, 1000); // задержка 1 секунда
            }

            setMessage(
                mode === 'Sign in' ? 'Entered successfully!' : 'Registered successfully!'
            );
        } catch (err) {
            setMessage(err.message);
        }
    };

    return (
        <div className="pl-2 w-full">
            <Header
                options={[
                    { label: "Sign in", value: "Sign in" },
                    { label: "Sign up", value: "Sign up" }
                ]}
                onOptionClick={(value) => setMode(value)}
            />

            <div className="max-w-screen-lg mx-auto">
                <div className="flex justify-center pt-10">
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white p-8 rounded-md shadow-md w-full max-w-sm"
                    >
                        <h2 className="text-xl font-bold mb-4 text-center">
                            {mode}
                        </h2>

                        {mode === 'Sign up' && (
                            <>
                                <div className="mb-4">
                                    <label className="block mb-1">First name</label>
                                    <input
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block mb-1">Last name</label>
                                    <input
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                            </>
                        )}

                        <div className="mb-4">
                            <label className="block mb-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                        >
                            {mode}
                        </button>

                        <p className="mt-4 text-center text-sm text-gray-600">
                            {mode === 'Sign in' ? (
                                <>
                                    Don't have an account?{' '}
                                    <button
                                        type="button"
                                        className="text-blue-500 hover:underline"
                                        onClick={() => setMode('Sign up')}
                                    >
                                        Sign up
                                    </button>
                                </>
                            ) : (
                                <>
                                    Already have an account?{' '}
                                    <button
                                        type="button"
                                        className="text-blue-500 hover:underline"
                                        onClick={() => setMode('Sign in')}
                                    >
                                        Sign in
                                    </button>
                                </>
                            )}
                        </p>

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
