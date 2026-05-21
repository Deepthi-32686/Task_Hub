import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([
    { id: 1, name: 'Food', icon: '🍔' },
    { id: 2, name: 'Travel', icon: '🚗' },
    { id: 3, name: 'Shopping', icon: '🛒' },
    { id: 4, name: 'Entertainment', icon: '🎬' },
    { id: 5, name: 'Bills', icon: '📄' },
    { id: 6, name: 'Rent', icon: '🏠' },
    { id: 7, name: 'Healthcare', icon: '🏥' },
    { id: 8, name: 'Education', icon: '📚' },
    { id: 9, name: 'Others', icon: '📦' }
  ]);

  // Load data from localStorage on mount
  useEffect(() => {
    const storedUsers = localStorage.getItem('expenseTrackerUsers');
    const storedExpenses = localStorage.getItem('expenseTrackerExpenses');
    const storedCategories = localStorage.getItem('expenseTrackerCategories');
    
    if (storedUsers) setUsers(JSON.parse(storedUsers));
    if (storedExpenses) setExpenses(JSON.parse(storedExpenses));
    if (storedCategories) setCategories(JSON.parse(storedCategories));
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('expenseTrackerUsers', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('expenseTrackerExpenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('expenseTrackerCategories', JSON.stringify(categories));
  }, [categories]);

  const signup = (userData) => {
    const newUser = {
      id: Date.now(),
      ...userData,
      createdAt: new Date().toISOString(),
      expenses: []
    };
    
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    return { success: true };
  };

  const login = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      return { success: true, user };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const addExpense = (expenseData) => {
    if (!currentUser) return;

    const newExpense = {
      id: Date.now(),
      userId: currentUser.id,
      userEmail: currentUser.email,
      userName: currentUser.name,
      ...expenseData,
      createdAt: new Date().toISOString()
    };

    setExpenses(prev => [...prev, newExpense]);

    // Update user's expense array
    setUsers(prev => prev.map(user => 
      user.id === currentUser.id 
        ? { ...user, expenses: [...user.expenses, newExpense.id] }
        : user
    ));

    return { success: true };
  };

  const updateExpense = (id, updatedData) => {
    setExpenses(prev => prev.map(expense =>
      expense.id === id ? { ...expense, ...updatedData } : expense
    ));
    return { success: true };
  };

  const deleteExpense = (id) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
    return { success: true };
  };

  const updateUserProfile = (userId, profileData) => {
    setUsers(prev => prev.map(user =>
      user.id === userId ? { ...user, ...profileData } : user
    ));
    
    if (currentUser && currentUser.id === userId) {
      setCurrentUser(prev => ({ ...prev, ...profileData }));
    }
    
    return { success: true };
  };

  const deactivateUser = (userId) => {
    setUsers(prev => prev.map(user =>
      user.id === userId ? { ...user, isActive: false } : user
    ));
    return { success: true };
  };

  const addCategory = (categoryName, icon) => {
    const newCategory = {
      id: Date.now(),
      name: categoryName,
      icon: icon || '📦'
    };
    setCategories(prev => [...prev, newCategory]);
    return { success: true, category: newCategory };
  };

  const value = {
    currentUser,
    users,
    expenses,
    categories,
    signup,
    login,
    logout,
    addExpense,
    updateExpense,
    deleteExpense,
    updateUserProfile,
    deactivateUser,
    addCategory
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
