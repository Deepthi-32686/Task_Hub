import React from 'react';
import { useAuth } from '../context/AuthContext.jsx';

const UserProfile = () => {
 const { isAuthenticated, login, logout } = useAuth();

return (
    <div className="profile-container">
      <h1>Global State with Context API</h1>
      {isAuthenticated ? (
        <div>
          <p>You are logged in!</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          <p>Please login</p>
          <button onClick={login}>Login</button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;