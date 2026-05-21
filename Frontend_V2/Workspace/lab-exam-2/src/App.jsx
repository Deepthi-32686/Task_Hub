import React, { useState } from 'react';
import LoginForm from './components/LoginForm.jsx';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setCurrentUser(userData.username);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Packaging & Deployment Lab</h1>
        {isAuthenticated && (
          <div className="user-info">
            <span>Welcome, {currentUser}</span>
            <button onClick={handleLogout} className="btn-logout">Logout</button>
          </div>
        )}
      </header>
      
      <main className="app-main">
        {isAuthenticated ? (
          <div className="dashboard">
            <h2>Login Successful!</h2>
            <p>You have successfully logged in to the application.</p>
          </div>
        ) : (
          <LoginForm onLogin={handleLogin} />
        )}
      </main>
    </div>
  );
};

export default App;