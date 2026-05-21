import React, { useState, useMemo } from 'react';
import { useAuth } from '../../../context/AuthContext.jsx';
import ExpenseList from '../../components/expense-tracker/ExpenseList';
import CategoryFilter from '../../components/expense-tracker/CategoryFilter';

const ExpenseReport = () => {
  const { expenses, categories, deleteExpense } = useAuth();
  
  const [selectedCategory, setSelectedCategory] = useState('');
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  // Filter expenses based on criteria
  const filteredExpenses = useMemo(() => {
    let result = [...expenses];
    
    // Apply category filter
    if (selectedCategory) {
      result = result.filter(expense => expense.category === selectedCategory);
    }
    
    // Apply date range filter
    if (dateRange.startDate && dateRange.endDate) {
      result = result.filter(expense => {
        const expenseDate = new Date(expense.date);
        const startDate = new Date(dateRange.startDate);
        const endDate = new Date(dateRange.endDate);
        return expenseDate >= startDate && expenseDate <= endDate;
      });
    }
    
    // Apply sorting
    result.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (sortBy === 'date') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      
      if (typeof aValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      return sortOrder === 'asc' 
        ? aValue.localeCompare(bValue) 
        : bValue.localeCompare(aValue);
    });
    
    return result;
  }, [expenses, selectedCategory, dateRange, sortBy, sortOrder]);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = filteredExpenses.reduce((sum, exp) => sum + parseFloat(exp.amount || 0), 0);
    const avg = filteredExpenses.length > 0 ? total / filteredExpenses.length : 0;
    const highest = filteredExpenses.length > 0 
      ? Math.max(...filteredExpenses.map(exp => parseFloat(exp.amount || 0)))
      : 0;
    const lowest = filteredExpenses.length > 0 
      ? Math.min(...filteredExpenses.map(exp => parseFloat(exp.amount || 0)))
      : 0;
      
    return { total, avg, highest, lowest, count: filteredExpenses.length };
  }, [filteredExpenses]);

  const handleDelete = (id) => {
    deleteExpense(id);
  };

  const handleDateRangeChange = (field, value) => {
    setDateRange(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setDateRange({ startDate: '', endDate: '' });
  };

  const exportData = () => {
    const csvContent = [
      ['Date', 'Description', 'Category', 'Amount'],
      ...filteredExpenses.map(expense => [
        new Date(expense.date).toLocaleDateString(),
        expense.description,
        expense.category,
        parseFloat(expense.amount).toFixed(2)
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `expense-report-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="expense-report-page">
      <div className="page-header">
        <h1>Expense Reports</h1>
        <p>Detailed analysis and reporting of your expenses</p>
      </div>
      
      <div className="report-content">
        {/* Filters Section */}
        <div className="filters-section">
          <div className="filter-row">
            <div className="filter-group">
              <label>Category Filter</label>
              <CategoryFilter
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                showAllOption={true}
              />
            </div>
            
            <div className="filter-group">
              <label>Date Range</label>
              <div className="date-range-inputs">
                <input
                  type="date"
                  value={dateRange.startDate}
                  onChange={(e) => handleDateRangeChange('startDate', e.target.value)}
                  className="date-input"
                />
                <span>to</span>
                <input
                  type="date"
                  value={dateRange.endDate}
                  onChange={(e) => handleDateRangeChange('endDate', e.target.value)}
                  className="date-input"
                />
              </div>
            </div>
          </div>
          
          <div className="filter-actions">
            <button className="clear-button" onClick={clearFilters}>
              Clear Filters
            </button>
            <button className="export-button" onClick={exportData} disabled={filteredExpenses.length === 0}>
              Export CSV
            </button>
          </div>
        </div>
        
        {/* Statistics Section */}
        <div className="stats-section">
          <h3>Report Statistics</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">{stats.count}</div>
              <div className="stat-label">Total Expenses</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">${stats.total.toFixed(2)}</div>
              <div className="stat-label">Total Amount</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">${stats.avg.toFixed(2)}</div>
              <div className="stat-label">Average Amount</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">${stats.highest.toFixed(2)}</div>
              <div className="stat-label">Highest Expense</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">${stats.lowest.toFixed(2)}</div>
              <div className="stat-label">Lowest Expense</div>
            </div>
          </div>
        </div>
        
        {/* Expense List */}
        <div className="expense-list-section">
          <div className="list-header">
            <h3>Detailed Expense List</h3>
            <div className="sort-controls">
              <label>Sort by:</label>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="date">Date</option>
                <option value="amount">Amount</option>
                <option value="category">Category</option>
                <option value="description">Description</option>
              </select>
              <select 
                value={sortOrder} 
                onChange={(e) => setSortOrder(e.target.value)}
                className="sort-select"
              >
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
              </select>
            </div>
          </div>
          
          <ExpenseList
            expenses={filteredExpenses}
            onEdit={() => {}}
            onDelete={handleDelete}
            showActions={true}
            sortBy={sortBy}
            sortOrder={sortOrder}
          />
        </div>
      </div>
    </div>
  );
};

export default ExpenseReport;