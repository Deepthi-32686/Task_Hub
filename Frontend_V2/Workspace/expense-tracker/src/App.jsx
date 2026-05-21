import React from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import ExpenseEntry from "./pages/expense-tracker/ExpenseEntry";
import ExpenseDashboard from "./pages/expense-tracker/ExpenseDashboard";
import ExpenseReport from "./pages/expense-tracker/ExpenseReport";
import RoleSelection from "./auth/RoleSelection";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import AdminDashboard from "./auth/AdminDashboard";
import './App.css';

// Protected Route using Context
const ProtectedRoute = ({ children, allowedRoles = ['user', 'admin'] }) => {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return <Navigate to="/role" replace />;
  }

  if (!allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/role" replace />;
  }

  return children;
};

// Main App Component with Header
const AppContent = () => {
  const { currentUser, logout } = useAuth();

  return (
    <BrowserRouter>
      <div className="app-container">
        <header className="app-header">
          <div className="header-content">
            <h1 className="app-title">💰 Expense Tracker</h1>
            {currentUser && (
              <nav className="main-nav">
                {currentUser.role === 'user' && (
                  <>
                    <Link to="/home" className="nav-link">Entry</Link>
                    <Link to="/dashboard" className="nav-link">Dashboard</Link>
                    <Link to="/reports" className="nav-link">Reports</Link>
                  </>
                )}
                {currentUser.role === 'admin' && (
                  <Link to="/admin/dashboard" className="nav-link">Admin Dashboard</Link>
                )}
                <button 
                  className="nav-link logout-button"
                  onClick={logout}
                >
                  Logout
                </button>
              </nav>
            )}
          </div>
        </header>

        <main className="app-main">
          <Routes>
            {/* Public Routes */}
            <Route path="/role" element={<RoleSelection />} />
            <Route path="/login/user" element={<Login />} />
            <Route path="/login/admin" element={<Login />} />
            <Route path="/signup/user" element={<Signup />} />
            <Route path="/signup/admin" element={<Signup />} />
            
            {/* User Protected Routes */}
            <Route 
              path="/home" 
              element={
                <ProtectedRoute allowedRoles={['user']}>
                  <ExpenseEntry />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/entry" 
              element={
                <ProtectedRoute allowedRoles={['user']}>
                  <ExpenseEntry />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute allowedRoles={['user']}>
                  <ExpenseDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/reports" 
              element={
                <ProtectedRoute allowedRoles={['user']}>
                  <ExpenseReport />
                </ProtectedRoute>
              } 
            />
            
            {/* Admin Protected Routes */}
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Default redirect */}
            <Route path="*" element={<Navigate to="/role" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

// Root App Component wrapped with AuthProvider
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;