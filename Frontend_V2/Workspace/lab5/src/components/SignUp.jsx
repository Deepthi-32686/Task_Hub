import React, { useState } from 'react';

const SignUp = ({ onSignUp }) => {
 const [name, setName] = useState('');
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [confirmPassword, setConfirmPassword] = useState('');
 const [error, setError] = useState('');

const isFormValid = name && email && password.length >= 6 && password === confirmPassword;

const handleSubmit = (e) => {
    e.preventDefault();
  if (!isFormValid) {
     if (password !== confirmPassword) {
        setError('Passwords do not match');
     } else {
        setError('Please fill all fields correctly');
     }
    return;
    }
    
    onSignUp({ name, email, password });
    setError('');
  };

return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          required
          />
        </div>

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
          placeholder="Min 6 characters"
            minLength="6"
          required
          />
        </div>

        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Re-enter password"
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
          Sign Up
        </button>

        <p className="switch-text">
          Already have an account?{' '}
          <button type="button" onClick={() => onSignUp({})} className="link-button">
            Sign In
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignUp;