import React, { useState } from 'react';
import TaskList from './components/TaskList.jsx';
import Registration from './components/Registration.jsx';
import './App.css';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(
        !!localStorage.getItem('token')
    );

    const handleAuthSuccess = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    return (
        <div>
            {isAuthenticated ? (
                <TaskList onLogout={handleLogout} />
            ) : (
                <Registration onAuthSuccess={handleAuthSuccess} />
            )}
        </div>
    );
}

export default App;
