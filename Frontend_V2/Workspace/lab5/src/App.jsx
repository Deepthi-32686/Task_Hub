import React, { useState } from 'react';
import SignIn from './components/SignIn.jsx';
import SignUp from './components/SignUp.jsx';

const App = () => {
 const [isAuthenticated, setIsAuthenticated] = useState(false);
 const [currentUser, setCurrentUser] = useState(null);
 const [showSignUp, setShowSignUp] = useState(false);

 const handleSignIn = (email) => {
    setIsAuthenticated(true);
    setCurrentUser(email);
  };

 const handleSignUp = (userData) => {
   console.log('New user registered:', userData);
    setShowSignUp(false);
  };

 const handleSignOut = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

 return (
    <div className="app">
      <header className="app-header">
        <h1>Authentication System</h1>
        {isAuthenticated && (
          <div className="user-info">
            <span>Welcome, {currentUser}</span>
            <button onClick={handleSignOut} className="btn-signout">Sign Out</button>
          </div>
        )}
      </header>

      <main className="app-main">
        {isAuthenticated ? (
          <div className="dashboard">
            <h2>Dashboard</h2>
            <p>You are successfully signed in!</p>
          </div>
        ) : showSignUp ? (
          <SignUp onSignUp={handleSignUp} />
        ) : (
          <SignIn 
            onSignIn={handleSignIn} 
            onSwitchToSignUp={() => setShowSignUp(true)} 
          />
        )}
      </main>
    </div>
  );
};

export default App;