import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/expenseTracker.css';

const RoleSelection = () => {
  return (
    <div className="role-selection-page">
      <div className="role-selection-container">
        <div className="role-selection-header">
          <h1>Welcome to Expense Tracker</h1>
          <p>Please select your role to continue</p>
        </div>
        
        <div className="role-options">
          <div className="role-option">
            <Link to="/login/admin" className="role-link admin-role">
              <div className="role-icon">👔</div>
              <h3>Admin</h3>
              <p>Manage users and view reports</p>
            </Link>
          </div>
          
          <div className="role-option">
            <Link to="/login/user" className="role-link user-role">
              <div className="role-icon">👤</div>
              <h3>User</h3>
              <p>Track personal expenses</p>
            </Link>
          </div>
        </div>
        
        <div className="role-signup-links">
          <p>Don't have an account?</p>
          <div className="signup-options">
            <Link to="/signup/admin" className="signup-link admin-signup">Admin Sign Up</Link>
            <Link to="/signup/user" className="signup-link user-signup">User Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;