import React from 'react';
import { useAuth } from '../features/auth/hooks/useAuth';
import { useNavigate } from 'react-router';
import './home.scss';

const Home = () => {
    const { user, handleLogout } = useAuth();
    const navigate = useNavigate();

    const onLogout = () => {
        handleLogout();
        navigate('/login');
    };

    return (
        <main className="home-main">
            <div className="home-container">
                <h1>Welcome Home!</h1>
                {user ? (
                    <div className="user-info">
                        <p>Hello, <strong>{user.username || user.email || 'User'}</strong>!</p>
                        <div className="action-buttons" style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
                            <button onClick={() => navigate('/prep')} className="prep-btn" style={{ background: '#10b981' }}>
                                AI Interview Coach
                            </button>
                            <button onClick={onLogout} className="logout-btn">Logout</button>
                        </div>
                    </div>
                ) : (
                    <div className="guest-info">
                        <p>You are not logged in.</p>
                        <button onClick={() => navigate('/login')} className="login-btn">Go to Login</button>
                    </div>
                )}
            </div>
        </main>
    );
};

export default Home;
