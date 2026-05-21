import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [error, setError] = useState('');

  const isFormValid = formData.email && formData.password;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isFormValid) {
      setError('Please fill all fields');
      return;
    }

    const result = login(formData.email, formData.password);

    if (result.success) {
      navigate(result.user.role === 'admin' ? '/admin/dashboard' : '/home');
    } else {
      setError(result.error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Welcome Back</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="btn-primary" disabled={!isFormValid}>
            Login
          </button>

          <p className="auth-link">
            Don't have an account? <a href="/signup/user">Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;