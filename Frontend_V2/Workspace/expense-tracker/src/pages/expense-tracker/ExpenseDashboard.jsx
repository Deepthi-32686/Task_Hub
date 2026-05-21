import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext.jsx';

const ExpenseDashboard = () => {
  const { expenses, currentUser, categories } = useAuth();
  const [filterPeriod, setFilterPeriod] = useState('all');

  // Get current user's expenses
  const userExpenses = expenses.filter(e => e.userId === currentUser?.id);

  // Filter by period
  const filteredExpenses = userExpenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    const now = new Date();
    
    if (filterPeriod === 'today') {
      return expenseDate.toDateString() === now.toDateString();
    } else if (filterPeriod === 'week') {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      return expenseDate >= weekAgo;
    } else if (filterPeriod === 'month') {
      return expenseDate.getMonth() === now.getMonth() && 
             expenseDate.getFullYear() === now.getFullYear();
    }
    return true; // 'all'
  });

  // Calculate totals
  const totalAmount = filteredExpenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
  
  // Group by category
  const expensesByCategory = categories.map(cat => {
    const catExpenses = filteredExpenses.filter(e => e.category === cat.name);
    const catTotal = catExpenses.reduce((sum, e) => sum + parseFloat(e.amount), 0);
    return {
      ...cat,
      count: catExpenses.length,
      total: catTotal,
      percentage: totalAmount > 0 ? (catTotal / totalAmount * 100) : 0
    };
  }).filter(cat => cat.count > 0);

  return (
    <div className="expense-dashboard">
      <header className="dashboard-header">
        <h2>📊 Expense Dashboard</h2>
        <select 
          value={filterPeriod} 
          onChange={(e) => setFilterPeriod(e.target.value)}
          className="period-select"
        >
          <option value="all">All Time</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </header>

      {/* Summary Cards */}
      <div className="summary-grid">
        <div className="summary-card">
          <h3>Total Spent</h3>
          <p className="big-amount">${totalAmount.toFixed(2)}</p>
        </div>
        <div className="summary-card">
          <h3>Transactions</h3>
          <p className="big-number">{filteredExpenses.length}</p>
        </div>
        <div className="summary-card">
          <h3>Categories Used</h3>
          <p className="big-number">{expensesByCategory.length}</p>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="category-breakdown">
        <h3>Spending by Category</h3>
        <div className="categories-list">
          {expensesByCategory.map(cat => (
            <div key={cat.id} className="category-item">
              <div className="category-header">
                <span className="category-icon">{cat.icon}</span>
                <h4>{cat.name}</h4>
                <span className="category-count">{cat.count} items</span>
              </div>
              <div className="category-bar">
                <div 
                  className="bar-fill"
                  style={{ width: `${cat.percentage}%` }}
                ></div>
              </div>
              <div className="category-footer">
                <span>${cat.total.toFixed(2)}</span>
                <span>{cat.percentage.toFixed(1)}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Expenses */}
      <div className="recent-expenses">
        <h3>Recent Transactions</h3>
        <div className="expenses-table">
          {filteredExpenses.length === 0 ? (
            <p className="no-data">No expenses found for this period</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {[...filteredExpenses].reverse().slice(0, 10).map(expense => (
                  <tr key={expense.id}>
                    <td>{new Date(expense.date).toLocaleDateString()}</td>
                    <td>{expense.category}</td>
                    <td>{expense.description || '-'}</td>
                    <td className="amount">${parseFloat(expense.amount).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpenseDashboard;