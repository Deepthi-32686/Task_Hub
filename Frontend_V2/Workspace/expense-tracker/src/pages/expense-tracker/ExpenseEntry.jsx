import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext.jsx';

const ExpenseEntry = () => {
  const { addExpense, categories, currentUser } = useAuth();
  
  const [formData, setFormData] = useState({
    amount: '',
    category: categories[0]?.name || 'Food',
    date: new Date().toISOString().split('T')[0],
    description: ''
  });
  
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const isFormValid = formData.amount && parseFloat(formData.amount) > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isFormValid) {
      setError('Please enter a valid amount');
      return;
    }

    const result = addExpense({
      amount: parseFloat(formData.amount),
      category: formData.category,
      date: formData.date,
      description: formData.description
    });

    if (result.success) {
      setSuccess('Expense added successfully!');
      setError('');
      setFormData({
        amount: '',
        category: categories[0]?.name || 'Food',
        date: new Date().toISOString().split('T')[0],
        description: ''
      });
      
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  return (
    <div className="expense-entry">
      <div className="entry-header">
        <h2>💰 Add New Expense</h2>
        <p>Welcome, {currentUser?.name}!</p>
      </div>

      <div className="entry-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Amount ($):</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label>Category:</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="category-select"
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.name}>
                  {cat.icon} {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Date:</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter expense details..."
              rows="4"
            />
          </div>

          {success && <div className="success-message">{success}</div>}
          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="btn-primary" disabled={!isFormValid}>
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExpenseEntry;