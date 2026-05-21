import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

const AdminDashboard = () => {
  const { users, expenses, categories, deactivateUser, addCategory } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', icon: '📦' });

  // Real-time statistics
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.isActive !== false).length;
  const totalExpenses = expenses.length;
  const totalAmount = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);

  // Get recent users (last 5 registered)
  const recentUsers = [...users].sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  ).slice(0, 5);

  // Get user expenses count
  const getUserExpenseCount = (userId) => {
    return expenses.filter(e => e.userId === userId).length;
  };

  // Get user total amount
  const getUserTotalAmount = (userId) => {
    return expenses
      .filter(e => e.userId === userId)
      .reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategory.name) {
      addCategory(newCategory.name, newCategory.icon);
      setNewCategory({ name: '', icon: '📦' });
      setShowAddCategory(false);
    }
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>🎯 Admin Dashboard</h1>
        <p>Real-time system overview and management</p>
      </header>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>{totalUsers}</h3>
            <p>Total Users</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <h3>{activeUsers}</h3>
            <p>Active Users</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <h3>${totalAmount.toFixed(2)}</h3>
            <p>Total Expenses</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-info">
            <h3>{totalExpenses}</h3>
            <p>Transactions</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          User Management
        </button>
        <button 
          className={`tab ${activeTab === 'expenses' ? 'active' : ''}`}
          onClick={() => setActiveTab('expenses')}
        >
          All Expenses
        </button>
        <button 
          className={`tab ${activeTab === 'categories' ? 'active' : ''}`}
          onClick={() => setActiveTab('categories')}
        >
          Categories
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'overview' && (
          <div className="overview-tab">
            <h2>Recent Registrations (Live Updates)</h2>
            <div className="recent-users">
              {recentUsers.map(user => (
                <div key={user.id} className="user-card-mini">
                  <div className="user-avatar">
                    {user.role === 'admin' ? '👨‍💼' : '👤'}
                  </div>
                  <div className="user-info-mini">
                    <h4>{user.name}</h4>
                    <p>{user.email}</p>
                    <span className={`badge ${user.role}`}>{user.role}</span>
                    <small>Registered: {new Date(user.createdAt).toLocaleDateString()}</small>
                  </div>
                </div>
              ))}
            </div>

            <h2>System Overview</h2>
            <div className="overview-grid">
              <div className="overview-item">
                <h3>Categories Available</h3>
                <p className="big-number">{categories.length}</p>
              </div>
              <div className="overview-item">
                <h3>Average Expense per User</h3>
                <p className="big-number">${totalUsers > 0 ? (totalAmount / totalUsers).toFixed(2) : '0.00'}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="users-tab">
            <h2>All Registered Users ({totalUsers})</h2>
            <div className="users-table">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Expenses</th>
                    <th>Total Spent</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td>
                        <div className="user-cell">
                          <span className="avatar">{user.role === 'admin' ? '👨‍💼' : '👤'}</span>
                          {user.name}
                        </div>
                      </td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`badge ${user.role}`}>{user.role.toUpperCase()}</span>
                      </td>
                      <td>{getUserExpenseCount(user.id)}</td>
                      <td>${getUserTotalAmount(user.id).toFixed(2)}</td>
                      <td>
                        <span className={`status ${user.isActive !== false ? 'active' : 'inactive'}`}>
                          {user.isActive !== false ? '✅ Active' : '❌ Deactivated'}
                        </span>
                      </td>
                      <td>
                        <button 
                          className="btn-action"
                          onClick={() => deactivateUser(user.id)}
                          disabled={user.isActive === false}
                        >
                          {user.isActive !== false ? 'Deactivate' : 'Disabled'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'expenses' && (
          <div className="expenses-tab">
            <h2>All System Expenses ({totalExpenses})</h2>
            <div className="expenses-list">
              {expenses.length === 0 ? (
                <p className="no-data">No expenses recorded yet</p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Category</th>
                      <th>Amount</th>
                      <th>Date</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses.map(expense => (
                      <tr key={expense.id}>
                        <td>{expense.userName}</td>
                        <td>{expense.category}</td>
                        <td className="amount">${parseFloat(expense.amount).toFixed(2)}</td>
                        <td>{new Date(expense.date).toLocaleDateString()}</td>
                        <td>{expense.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {activeTab === 'categories' && (
          <div className="categories-tab">
            <div className="categories-header">
              <h2>Expense Categories ({categories.length})</h2>
              <button 
                className="btn-primary"
                onClick={() => setShowAddCategory(!showAddCategory)}
              >
                Add Category
              </button>
            </div>

            {showAddCategory && (
              <form onSubmit={handleAddCategory} className="add-category-form">
                <input
                  type="text"
                  placeholder="Category Name"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                  required
                />
                <input
                  type="text"
                  placeholder="Icon (emoji)"
                  value={newCategory.icon}
                  onChange={(e) => setNewCategory({...newCategory, icon: e.target.value})}
                  maxLength="2"
                />
                <button type="submit" className="btn-primary">Add</button>
              </form>
            )}

            <div className="categories-grid">
              {categories.map(category => (
                <div key={category.id} className="category-card">
                  <span className="category-icon">{category.icon}</span>
                  <h4>{category.name}</h4>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;