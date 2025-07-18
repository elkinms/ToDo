import { useState } from 'react';

function Registration({ onAuthSuccess }) {
    const [mode, setMode] = useState('login'); // 'login' | 'register'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const endpoint = mode === 'login' ? '/auth/login' : '/auth/register';

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

            if (mode === 'login') {
                localStorage.setItem('token', data.token);
                onAuthSuccess();
            }

            setMessage(
                mode === 'login' ? 'Enter Successfully!' : 'Registration successfully!'
            );
        } catch (err) {
            setMessage(err.message);
        }
    };

    return (
        <div className="auth-container">
            <h2>{'List it. Do it'}</h2>

            <div>
                <button onClick={() => setMode('login')} disabled={mode === 'login'}>
                    Sign In
                </button>
                <button
                    onClick={() => setMode('register')}
                    disabled={mode === 'register'}
                >
                    Sign Up
                </button>
            </div>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label><br />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Password:</label><br />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" style={{ marginTop: '1rem' }}>
                    {mode === 'login' ? 'Login' : 'Register'}
                </button>
            </form>

            {message && <p style={{ marginTop: '1rem', color: 'green' }}>{message}</p>}
        </div>
    );
}

export default Registration;
