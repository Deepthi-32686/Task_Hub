import React, { useState } from 'react';

const SignIn = ({ onSignIn, onSwitchToSignUp }) => {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [error, setError] = useState('');

 const isFormValid = email && password.length >= 6;

 const handleSubmit = (e) => {
    e.preventDefault();
   if (!isFormValid) {
      setError('Please enter valid email and password (min 6 characters)');
     return;
    }
    onSignIn(email);
    setError('');
  };

 return (
    <div className="auth-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
           placeholder="Enter your email"
           required
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
           placeholder="Enter your password"
            minLength="6"
           required
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button
          type="submit" 
          className="btn-submit"
          disabled={!isFormValid}
        >
          Sign In
        </button>

        <p className="switch-text">
          Don't have an account?{' '}
          <button type="button" onClick={onSwitchToSignUp} className="link-button">
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignIn;