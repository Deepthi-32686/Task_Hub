# 📘 Enterprise Expense Tracker System
## Complete Academic Project Documentation (CO1-CO6)

---

# Project Overview

**Project Title:** Enterprise Expense Tracker (Admin + User SaaS Model)

**Domain:** Front-End Engineering with React

**Architecture:** Component-Driven, Role-Based Access Control (RBAC)

**Deployment:** Vite Build System + Cloud Platform (Vercel/Netlify)

---

# Problem Statement

Traditional expense management systems lack real-time visibility, role-based access control, and intuitive user interfaces. This project addresses these gaps by implementing a dual-role SaaS application where:

- **Users** can track personal expenses with categorization and analytics
- **Admins** have system-wide oversight with real-time user monitoring and reporting capabilities

---

# CO1: Foundations of Front-End Engineering & Framework Design

## 1.1 Problem Frameworks Solve

### Challenge Addressed:
Managing complex UI state in traditional DOM manipulation leads to:
- Inconsistent UI states
- Difficult debugging
- Poor maintainability
- Performance bottlenecks

### Solution:
React's component-based architecture provides:
- Isolated state management
- Predictable UI updates
- Reusable components
- Scalable code organization

## 1.2 Imperative vs Declarative UI

### Imperative Approach (Traditional):
```javascript
// Manual DOM manipulation
const form = document.getElementById('expenseForm');
form.addEventListener('submit', function(e) {
  e.preventDefault();
  const amount = document.getElementById('amount').value;
  const listItem = document.createElement('li');
  listItem.textContent = amount;
  document.getElementById('list').appendChild(listItem);
});
```

### Declarative Approach (React):
```javascript
// State-driven UI
const [expenses, setExpenses] = useState([]);

const addExpense = (expense) => {
  setExpenses([...expenses, expense]);
};

return (
  <ul>
    {expenses.map(exp => <ExpenseItem key={exp.id} data={exp} />)}
  </ul>
);
```

## 1.3 Engineering Constraints in Front-End Systems

### Performance Limitations:
- Browser rendering engine constraints
- Memory management for large datasets
- Network latency for API calls
- User interaction responsiveness

### Solutions Implemented:
- Virtual DOM for efficient updates
- Lazy loading for code splitting
- Memoization for expensive calculations
- Debounced search/filter operations

## 1.4 Virtual DOM as Engineering Abstraction

### How It Works:
```
User Action → State Change → Virtual DOM Creation
     ↓
Diff Algorithm (Old VDOM vs New VDOM)
     ↓
Minimal DOM Updates (Patching)
     ↓
UI Updated Efficiently
```

### Benefits:
- Reduces expensive DOM operations
- Batches multiple state changes
- Optimizes re-rendering cycles

## 1.5 Unidirectional Data Flow

### Data Flow Pattern:
```
Parent Component (State)
       ↓
    Props
       ↓
Child Component (UI Rendering)
       ↓
Event Callbacks
       ↓
Parent Component (State Update)
```

### Implementation Example:
```javascript
// Parent
const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  
  const addExpense = (newExpense) => {
    setExpenses([...expenses, newExpense]);
  };
  
  return <ExpenseForm onAdd={addExpense} />;
};

// Child
const ExpenseForm = ({ onAdd }) => {
  const handleSubmit = (data) => {
    onAdd(data); // Callback to parent
  };
  
  return <form onSubmit={handleSubmit}>...</form>;
};
```

## 1.6 Component-Driven Thinking

### Component Hierarchy:
```
App
├── Header
│   ├── Logo
│   └── Navigation
├── AuthModule
│   ├── Login
│   └── Signup
├── UserModule
│   ├── ExpenseEntry
│   ├── Dashboard
│   └── Reports
└── AdminModule
    ├── UserManagement
    ├── ExpenseOverview
    └── Analytics
```

### Key Architectural Concepts:

1. **Composition over Inheritance:**
   - Combine small, focused components
   - Avoid deep inheritance chains

2. **Immutability:**
   - Never modify state directly
   - Always create new objects/arrays

3. **Reactive Systems:**
   - UI automatically responds to state changes
   - No manual DOM updates needed

---

# CO2: JavaScript & TypeScript Engineering for Frameworks

## 2.1 ES6+ Essentials

### Arrow Functions:
```javascript
// Traditional
function addExpense(expense) {
  return { ...expense, timestamp: Date.now() };
}

// Arrow Function
const addExpense = (expense) => ({
  ...expense,
  timestamp: Date.now()
});
```

### Destructuring:
```javascript
// Props Destructuring
const ExpenseCard = ({ title, amount, category }) => (
  <div>
    <h3>{title}</h3>
    <p>${amount}</p>
    <span>{category}</span>
  </div>
);

// State Destructuring
const [expenses, setExpenses] = useState([]);
```

### Spread Operator:
```javascript
// Array Operations
const updatedExpenses = [...expenses, newExpense];
const filtered = expenses.filter(exp => exp.category === 'Food');

// Object Operations
const updatedUser = { ...user, lastLogin: new Date() };
```

### Modules:
```javascript
// Export
export const calculateTotal = (expenses) => {
  return expenses.reduce((sum, exp) => sum + exp.amount, 0);
};

// Import
import { calculateTotal } from './utils/calculations';
```

## 2.2 Closures in State Management

### Hook Implementation:
```javascript
const useState = (initialValue) => {
  let state = initialValue;
  
  const setState = (newValue) => {
    state = newValue;
    render(); // Trigger re-render
  };
  
  return [state, setState]; // Closure maintains state reference
};
```

## 2.3 Functional Programming Principles

### Pure Functions:
```javascript
// Pure: Same input → Same output, no side effects
const calculateTax = (amount, rate) => amount * rate;

// Impure: Depends on external state
let taxRate = 0.1;
const calculateTaxImpure = (amount) => amount * taxRate;
```

### Higher-Order Functions:
```javascript
// Map for transformation
const expenseCards = expenses.map(exp => (
  <ExpenseCard key={exp.id} data={exp} />
));

// Filter for conditional rendering
const foodExpenses = expenses.filter(exp => exp.category === 'Food');

// Reduce for aggregation
const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
```

## 2.4 Async Engineering

### Promise Chain:
```javascript
fetchExpenses()
  .then(data => setExpenses(data))
  .catch(error => setError(error.message));
```

### Async/Await:
```javascript
const loadExpenses = async () => {
  try {
    const response = await fetch('/api/expenses');
    const data = await response.json();
    setExpenses(data);
  } catch (error) {
    setError(error.message);
  }
};
```

## 2.5 Module Architecture

### Project Structure:
```
src/
├── components/          # Reusable UI components
│   ├── common/         # Buttons, Inputs, Cards
│   ├── layout/         # Header, Footer, Sidebar
│   └── expense/        # Expense-specific components
├── pages/              # Page-level components
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   └── AdminPanel.jsx
├── context/            # Global state management
│   └── AuthContext.jsx
├── hooks/              # Custom React hooks
│   └── useExpenses.js
├── services/           # API service layer
│   ├── authService.js
│   └── expenseService.js
├── utils/              # Helper functions
│   ├── calculations.js
│   └── validators.js
└── App.jsx             # Root component
```

## 2.6 TypeScript Engineering (Optional Enhancement)

### Type Safety:
```typescript
interface Expense {
  id: number;
  amount: number;
  category: string;
  date: string;
  description: string;
}

interface User {
  id: number;
  email: string;
  role: 'user' | 'admin';
}

// Type-safe component props
const ExpenseCard: React.FC<{ expense: Expense }> = ({ expense }) => {
  return <div>{expense.amount}</div>;
};
```

---

# CO3: React Component Model (Engineering View)

## 3.1 Component as Deterministic UI Function

### Formula:
```
UI = f(state, props)
```

### Example:
```javascript
// Component Function
const ExpenseSummary = ({ totalExpenses, user }) => {
  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <p>Total Spent: ${totalExpenses}</p>
    </div>
  );
};

// Render: Deterministic based on props
<ExpenseSummary 
  totalExpenses={5000} 
  user={{ name: 'John', role: 'admin' }} 
/>
```

## 3.2 Props: Configuration Contract

### Prop Types:
```javascript
// Data Props
const ExpenseList = ({ expenses, categories }) => { ... }

// Event Props
const ExpenseForm = ({ onSubmit, onCancel }) => { ... }

// Render Props
const DataTable = ({ data, renderItem }) => { ... }
```

### Prop Validation:
```javascript
ExpenseCard.propTypes = {
  title: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  category: PropTypes.oneOf(['Food', 'Travel', 'Shopping']),
  onDelete: PropTypes.func
};
```

## 3.3 State: Runtime Dynamic Data

### State Characteristics:
- Changes over time
- Triggers re-render when updated
- Local to component (unless lifted)

### Example:
```javascript
const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  
  // State drives UI
  return (
    <div>
      {loading ? <Spinner /> : <ExpenseList data={expenses} />}
      <FilterButtons value={filter} onChange={setFilter} />
    </div>
  );
};
```

## 3.4 Side Effects Management

### useEffect Patterns:
```javascript
// Data Fetching
useEffect(() => {
  const fetchExpenses = async () => {
    setLoading(true);
    const data = await api.getExpenses();
    setExpenses(data);
    setLoading(false);
  };
  
  fetchExpenses();
}, []); // Empty deps = run once on mount

// Subscription Cleanup
useEffect(() => {
  const subscription = eventBus.subscribe('expenseAdded', handleNewExpense);
  
  return () => {
    subscription.unsubscribe(); // Cleanup on unmount
  };
}, [handleNewExpense]);

// Conditional Effect
useEffect(() => {
  if (userId) {
    loadUserExpenses(userId);
  }
}, [userId]); // Run when userId changes
```

## 3.5 Hooks Engineering

### useState - State Management:
```javascript
const [formData, setFormData] = useState({
  amount: '',
  category: 'Food',
  date: new Date().toISOString().split('T')[0]
});
```

### useMemo - Performance Optimization:
```javascript
const filteredExpenses = useMemo(() => {
  console.log('Computing filtered expenses...');
  return expenses.filter(exp => {
    return exp.category === filter && 
           exp.amount >= minAmount &&
           exp.date >= startDate;
  });
}, [expenses, filter, minAmount, startDate]); // Only recompute when deps change
```

### useCallback - Function Memoization:
```javascript
const handleDelete = useCallback((id) => {
  setExpenses(prev => prev.filter(exp => exp.id !== id));
}, []); // Function reference stays stable

// Prevents unnecessary re-renders of child components
<ExpenseList 
  expenses={expenses} 
  onDelete={handleDelete} // Stable reference
/>
```

### useContext - Global State Access:
```javascript
const AuthContext = createContext();

const UserProfile = () => {
  const { currentUser, logout } = useContext(AuthContext);
  
  return (
    <div>
      <h2>{currentUser.name}</h2>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
```

## 3.6 Reconciliation Logic

### Key-Based Optimization:
```javascript
// BAD: Index as key (causes issues on reorder)
{expenses.map((exp, index) => (
  <ExpenseCard key={index} data={exp} />
))}

// GOOD: Unique ID as key
{expenses.map(exp => (
  <ExpenseCard key={exp.id} data={exp} />
))}
```

### Diff Algorithm:
1. Compare element types (same type → keep)
2. Compare attributes (changed → update)
3. Compare children (recurse)
4. Use keys to track list items

## 3.7 Controlled vs Uncontrolled Components

### Controlled (React-Driven):
```javascript
const ControlledForm = () => {
  const [value, setValue] = useState('');
  
  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};
```

### Uncontrolled (DOM-Driven):
```javascript
const UncontrolledForm = () => {
  const inputRef = useRef();
  
  const handleSubmit = () => {
    console.log(inputRef.current.value);
  };
  
  return (
    <input ref={inputRef} defaultValue="" />
  );
};
```

## 3.8 Styling Engineering Approaches

### CSS Modules (Scoped):
```css
/* ExpenseCard.module.css */
.card {
  padding: 1rem;
  border-radius: 8px;
}

.amount {
  color: #27ae60;
  font-weight: bold;
}
```

```javascript
import styles from './ExpenseCard.module.css';

const ExpenseCard = () => (
  <div className={styles.card}>
    <span className={styles.amount}>$500</span>
  </div>
);
```

### Tailwind CSS (Utility-First):
```javascript
const ExpenseCard = ({ data }) => (
  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
    <h3 className="text-lg font-semibold text-gray-800">{data.title}</h3>
    <p className="text-green-600 font-bold mt-2">${data.amount}</p>
    <span className="text-sm text-gray-500">{data.category}</span>
  </div>
);
```

---

# CO4: State Architecture, Async Data Engineering & API Integration

## 4.1 State Engineering Strategies

### Lifting State Up:
```javascript
// BEFORE: State in multiple children
const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
};

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
};

// AFTER: Shared state in parent
const App = () => {
  const [expenses, setExpenses] = useState([]);
  
  return (
    <>
      <ExpenseList expenses={expenses} />
      <Dashboard expenses={expenses} />
    </>
  );
};
```

### State Co-location:
```javascript
// Keep state close to where it's used
const ExpenseForm = () => {
  // Form state LOCAL to form component
  const [formData, setFormData] = useState({});
  
  return <form>...</form>;
};

const ExpenseList = () => {
  // List state LOCAL to list component
  const [filter, setFilter] = useState('all');
  
  return <ul>...</ul>;
};
```

### Derived State:
```javascript
const Dashboard = ({ expenses }) => {
  // Derived from props (no need to store in state)
  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const average = expenses.length > 0 ? total / expenses.length : 0;
  const highest = Math.max(...expenses.map(e => e.amount));
  
  return (
    <div>
      <p>Total: ${total}</p>
      <p>Average: ${average}</p>
      <p>Highest: ${highest}</p>
    </div>
  );
};
```

## 4.2 Global State Management

### Context API Implementation:
```javascript
// Create Context
const AuthContext = createContext(null);

// Provider Component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [expenses, setExpenses] = useState([]);
  
  const login = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) setCurrentUser(user);
    return user;
  };
  
  const logout = () => setCurrentUser(null);
  
  const addExpense = (expenseData) => {
    const newExpense = {
      id: Date.now(),
      userId: currentUser.id,
      ...expenseData
    };
    setExpenses(prev => [...prev, newExpense]);
  };
  
  const value = {
    currentUser,
    users,
    expenses,
    login,
    logout,
    addExpense
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
```

### Usage in Components:
```javascript
const ExpenseEntry = () => {
  const { currentUser, addExpense } = useAuth();
  
  const handleSubmit = (data) => {
    addExpense(data);
  };
  
  return <ExpenseForm onSubmit={handleSubmit} />;
};

const AdminDashboard = () => {
  const { users, expenses } = useAuth();
  
  return (
    <div>
      <h2>Total Users: {users.length}</h2>
      <h2>Total Expenses: {expenses.length}</h2>
    </div>
  );
};
```

## 4.3 Role-Based Access Control (RBAC)

### Protected Route Component:
```javascript
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  if (!allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  return children;
};

// Usage in Router
<Routes>
  <Route path="/admin" element={
    <ProtectedRoute allowedRoles={['admin']}>
      <AdminDashboard />
    </ProtectedRoute>
  } />
  
  <Route path="/dashboard" element={
    <ProtectedRoute allowedRoles={['user', 'admin']}>
      <UserDashboard />
    </ProtectedRoute>
  } />
</Routes>
```

## 4.4 API Service Layer Architecture

### Service Module:
```javascript
// services/expenseService.js
const API_BASE_URL = '/api';

export const expenseService = {
  async getAll(userId) {
    const response = await fetch(`${API_BASE_URL}/expenses?userId=${userId}`);
    if (!response.ok) throw new Error('Failed to fetch expenses');
    return response.json();
  },
  
  async create(expenseData) {
    const response = await fetch(`${API_BASE_URL}/expenses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expenseData)
    });
    if (!response.ok) throw new Error('Failed to create expense');
    return response.json();
  },
  
  async update(id, updates) {
    const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    if (!response.ok) throw new Error('Failed to update expense');
    return response.json();
  },
  
  async delete(id) {
    const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete expense');
    return response.json();
  }
};
```

### Usage in Component:
```javascript
const useExpenses = (userId) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const loadExpenses = async () => {
    try {
      setLoading(true);
      const data = await expenseService.getAll(userId);
      setExpenses(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const addExpense = async (expenseData) => {
    try {
      const newExpense = await expenseService.create(expenseData);
      setExpenses(prev => [...prev, newExpense]);
    } catch (err) {
      setError(err.message);
    }
  };
  
  return { expenses, loading, error, loadExpenses, addExpense };
};
```

## 4.5 Async Engineering Challenges

### Race Condition Prevention:
```javascript
useEffect(() => {
  let isMounted = true;
  
  const fetchData = async () => {
    try {
      const data = await api.getExpenses();
      if (isMounted) {
        setExpenses(data);
      }
    } catch (error) {
      if (isMounted) {
        setError(error.message);
      }
    }
  };
  
  fetchData();
  
  return () => {
    isMounted = false; // Cleanup prevents state update on unmounted component
  };
}, []);
```

### Loading States:
```javascript
const ExpenseList = () => {
  const { expenses, loading, error } = useExpenses();
  
  if (loading) return <Spinner size="large" />;
  if (error) return <ErrorMessage message={error} />;
  if (expenses.length === 0) return <EmptyState />;
  
  return <ExpenseGrid data={expenses} />;
};
```

## 4.6 Data Caching Strategies

### LocalStorage Persistence:
```javascript
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });
  
  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };
  
  return [storedValue, setValue];
};

// Usage
const [expenses, setExpenses] = useLocalStorage('userExpenses', []);
```

### Memoization for Expensive Calculations:
```javascript
const Dashboard = ({ expenses }) => {
  const statistics = useMemo(() => {
    console.log('Calculating statistics...');
    
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const byCategory = expenses.reduce((acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
      return acc;
    }, {});
    
    const monthlyTrend = expenses.reduce((acc, exp) => {
      const month = exp.date.substring(0, 7);
      acc[month] = (acc[month] || 0) + exp.amount;
      return acc;
    }, {});
    
    return { total, byCategory, monthlyTrend };
  }, [expenses]); // Only recalculate when expenses change
  
  return <StatisticsDisplay stats={statistics} />;
};
```

## 4.7 Container/Presenter Pattern

### Container (Smart Component):
```javascript
// ExpenseContainer.jsx
const ExpenseContainer = () => {
  const { expenses, loading, error, addExpense, deleteExpense } = useExpenses();
  const [filter, setFilter] = useState('all');
  
  const filteredExpenses = useMemo(() => {
    return expenses.filter(exp => filter === 'all' || exp.category === filter);
  }, [expenses, filter]);
  
  if (loading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;
  
  return (
    <ExpensePresenter
      expenses={filteredExpenses}
      filter={filter}
      onFilterChange={setFilter}
      onAdd={addExpense}
      onDelete={deleteExpense}
    />
  );
};
```

### Presenter (Dumb Component):
```javascript
// ExpensePresenter.jsx
const ExpensePresenter = ({ 
  expenses, 
  filter, 
  onFilterChange, 
  onAdd, 
  onDelete 
}) => {
  return (
    <div>
      <FilterBar value={filter} onChange={onFilterChange} />
      <ExpenseList data={expenses} onDelete={onDelete} />
      <AddExpenseButton onClick={onAdd} />
    </div>
  );
};
```

## 4.8 Error Boundaries

### Class Component Error Boundary:
```javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={() => window.location.reload()}>Reload</button>
        </div>
      );
    }
    
    return this.props.children;
  }
}

// Usage
<ErrorBoundary>
  <Dashboard />
</ErrorBoundary>
```

---

# CO5: Routing, Forms, Accessibility & Performance Engineering

## 5.1 SPA Routing Fundamentals

### BrowserRouter Setup:
```javascript
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
```

### Navigation:
```javascript
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/admin">Admin</Link>
    </nav>
  );
};

const LoginForm = () => {
  const navigate = useNavigate();
  
  const handleLogin = async (credentials) => {
    const success = await authenticate(credentials);
    if (success) {
      navigate('/dashboard', { replace: true });
    }
  };
  
  return <form onSubmit={handleSubmit}>...</form>;
};
```

## 5.2 Nested & Protected Routes

### Route Protection:
```javascript
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  if (!allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  return children;
};

// Nested Routes
<Route path="/admin" element={
  <ProtectedRoute allowedRoles={['admin']}>
    <AdminLayout />
  </ProtectedRoute>
}>
  <Route index element={<AdminDashboard />} />
  <Route path="users" element={<UserManagement />} />
  <Route path="expenses" element={<ExpenseOverview />} />
  <Route path="reports" element={<Analytics />} />
</Route>
```

## 5.3 Form Engineering

### Controlled Form with Validation:
```javascript
const ExpenseForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    description: ''
  });
  
  const [errors, setErrors] = useState({});
  
  const validate = () => {
    const newErrors = {};
    
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }
    
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    return newErrors;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    onSubmit(formData);
    setFormData({
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
      description: ''
    });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Amount</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          step="0.01"
          min="0"
        />
        {errors.amount && <span className="error">{errors.amount}</span>}
      </div>
      
      <div className="form-group">
        <label>Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Shopping">Shopping</option>
        </select>
        {errors.category && <span className="error">{errors.category}</span>}
      </div>
      
      <button type="submit">Add Expense</button>
    </form>
  );
};
```

## 5.4 Accessibility Engineering

### ARIA Attributes:
```javascript
const ExpenseList = ({ expenses, onDelete }) => {
  return (
    <div role="region" aria-label="Expense List">
      <h2 id="expenses-heading">Your Expenses</h2>
      
      <ul aria-labelledby="expenses-heading" role="list">
        {expenses.map((expense) => (
          <li key={expense.id} role="listitem">
            <article aria-label={`Expense: ${expense.description}`}>
              <h3>{expense.description}</h3>
              <p aria-label="Amount">${expense.amount}</p>
              <p aria-label="Category">{expense.category}</p>
              <button
                onClick={() => onDelete(expense.id)}
                aria-label={`Delete expense: ${expense.description}`}
              >
                Delete
              </button>
            </article>
          </li>
        ))}
      </ul>
      
      {expenses.length === 0 && (
        <p role="status" aria-live="polite">No expenses found</p>
      )}
    </div>
  );
};
```

### Keyboard Navigation:
```javascript
const ExpenseCard = ({ expense, onFocus }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onFocus(expense.id);
    }
  };
  
  return (
    <div
      tabIndex={0}
      role="button"
      onKeyDown={handleKeyDown}
      onFocus={() => onFocus(expense.id)}
      aria-pressed={false}
    >
      <h3>{expense.description}</h3>
      <p>${expense.amount}</p>
    </div>
  );
};
```

### Focus Management:
```javascript
const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);
  
  useEffect(() => {
    if (isOpen) {
      modalRef.current?.focus();
    }
  }, [isOpen]);
  
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div
      ref={modalRef}
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <h2 id="modal-title">Modal Title</h2>
      {children}
      <button onClick={onClose}>Close</button>
    </div>
  );
};
```

## 5.5 Performance Engineering

### React.memo for Component Memoization:
```javascript
const ExpenseCard = React.memo(({ expense, onDelete }) => {
  console.log('Rendering ExpenseCard:', expense.id);
  
  return (
    <div className="expense-card">
      <h3>{expense.description}</h3>
      <p>${expense.amount}</p>
      <button onClick={() => onDelete(expense.id)}>Delete</button>
    </div>
  );
});

// Only re-renders if expense or onDelete changes
const ExpenseList = ({ expenses, onDelete }) => {
  return (
    <div>
      {expenses.map(exp => (
        <ExpenseCard key={exp.id} expense={exp} onDelete={onDelete} />
      ))}
    </div>
  );
};
```

### Code Splitting with Lazy Loading:
```javascript
import { lazy, Suspense } from 'react';

// Lazy load components
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const Analytics = lazy(() => import('./pages/Analytics'));
const UserManagement = lazy(() => import('./pages/UserManagement'));

const App = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/analytics" element={<Analytics />} />
        <Route path="/admin/users" element={<UserManagement />} />
      </Routes>
    </Suspense>
  );
};
```

### Virtualization for Large Lists:
```javascript
import { FixedSizeList } from 'react-window';

const VirtualizedExpenseList = ({ expenses }) => {
  const Row = ({ index, style }) => (
    <div style={style}>
      <ExpenseCard expense={expenses[index]} />
    </div>
  );
  
  return (
    <FixedSizeList
      height={600}
      itemCount={expenses.length}
      itemSize={100}
      width="100%"
    >
      {Row}
    </FixedSizeList>
  );
};
```

## 5.6 Rendering Optimization

### Batching State Updates:
```javascript
// Automatic batching in React 18
const handleSubmit = () => {
  setExpenses([...expenses, newExpense]); // Triggers re-render
  setLoading(false); // Batched with above
  setShowSuccess(true); // Also batched
  // Single re-render instead of three
};
```

### Avoiding Unnecessary Re-renders:
```javascript
const Dashboard = () => {
  const [count, setCount] = useState(0);
  const [expenses, setExpenses] = useState([]);
  
  // BAD: Creates new function every render
  const handleAdd = (expense) => {
    setExpenses([...expenses, expense]);
  };
  
  // GOOD: Stable function reference
  const handleAddMemo = useCallback((expense) => {
    setExpenses(prev => [...prev, expense]);
  }, []);
  
  // BAD: Creates new object every render
  const config = { theme: 'dark', lang: 'en' };
  
  // GOOD: Stable object reference
  const configMemo = useMemo(() => ({
    theme: 'dark',
    lang: 'en'
  }), []);
  
  return (
    <div>
      <ExpenseForm onAdd={handleAddMemo} config={configMemo} />
      <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
    </div>
  );
};
```

---

# CO6: Build Systems, Testing, CI/CD & Deployment Engineering

## 6.1 Why Bundlers Exist

### Problems Solved:
1. **Module Resolution:**
   - Browser doesn't support `import/export` natively (in older browsers)
   - Bundler combines all modules into browser-compatible format

2. **Asset Optimization:**
   - Minification reduces file sizes
   - Tree shaking removes unused code
   - Image optimization

3. **Dependency Management:**
   - Resolves npm package dependencies
   - Handles version conflicts

4. **Development Experience:**
   - Hot Module Replacement (HMR)
   - Fast refresh
   - Source maps for debugging

## 6.2 Vite Configuration

### vite.config.js:
```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  
  server: {
    port: 3000,
    open: true,
    hmr: true
  },
  
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom']
        }
      }
    }
  },
  
  optimizeDeps: {
    include: ['react', 'react-dom']
  }
});
```

## 6.3 Build Optimizations

### Tree Shaking:
```javascript
// BAD: Imports entire library
import _ from 'lodash';

_.debounce(() => {...}, 300);

// GOOD: Imports only what's used
import { debounce } from 'lodash';

debounce(() => {...}, 300);
```

### Code Splitting:
```javascript
// Automatic chunking via dynamic imports
const AdminPanel = lazy(() => import('./pages/AdminPanel'));
const Reports = lazy(() => import('./pages/Reports'));

// Manual chunking in vite.config.js
rollupOptions: {
  output: {
    manualChunks: {
      vendor: ['react', 'react-dom'],
      router: ['react-router-dom'],
      utils: ['lodash', 'moment']
    }
  }
}
```

### Minification:
```javascript
build: {
  minify: 'terser',
  terserOptions: {
    compress: {
      drop_console: true, // Remove console.logs in production
      pure_funcs: ['console.log']
    }
  }
}
```

## 6.4 Environment Configuration

### .env Files:
```bash
# .env.local (gitignored)
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Expense Tracker

# .env.production
VITE_API_URL=https://api.expensetracker.com
VITE_APP_NAME=Expense Tracker Pro
```

### Usage in Code:
```javascript
const API_URL = import.meta.env.VITE_API_URL;
const APP_NAME = import.meta.env.VITE_APP_NAME;

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'X-App-Name': APP_NAME
  }
});
```

## 6.5 Testing Strategy

### Unit Testing with Jest:
```javascript
// __tests__/calculations.test.js
import { calculateTotal, calculateAverage } from '../utils/calculations';

describe('Expense Calculations', () => {
  test('calculateTotal returns sum of expenses', () => {
    const expenses = [
      { amount: 100 },
      { amount: 200 },
      { amount: 300 }
    ];
    
    expect(calculateTotal(expenses)).toBe(600);
  });
  
  test('calculateAverage returns correct average', () => {
    const expenses = [
      { amount: 100 },
      { amount: 200 }
    ];
    
    expect(calculateAverage(expenses)).toBe(150);
  });
  
  test('calculateAverage handles empty array', () => {
    expect(calculateAverage([])).toBe(0);
  });
});
```

### Component Testing with React Testing Library:
```javascript
// __tests__/ExpenseForm.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import ExpenseForm from '../components/ExpenseForm';

describe('ExpenseForm', () => {
  test('renders form fields', () => {
    render(<ExpenseForm onSubmit={() => {}} />);
    
    expect(screen.getByLabelText(/amount/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
  });
  
  test('validates required fields', async () => {
    const handleSubmit = jest.fn();
    render(<ExpenseForm onSubmit={handleSubmit} />);
    
    fireEvent.click(screen.getByText('Submit'));
    
    expect(screen.getByText('Amount is required')).toBeInTheDocument();
    expect(handleSubmit).not.toHaveBeenCalled();
  });
  
  test('submits form with valid data', async () => {
    const handleSubmit = jest.fn();
    render(<ExpenseForm onSubmit={handleSubmit} />);
    
    fireEvent.change(screen.getByLabelText(/amount/i), {
      target: { value: '100' }
    });
    
    fireEvent.change(screen.getByLabelText(/category/i), {
      target: { value: 'Food' }
    });
    
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: 'Lunch' }
    });
    
    fireEvent.click(screen.getByText('Submit'));
    
    expect(handleSubmit).toHaveBeenCalledWith({
      amount: 100,
      category: 'Food',
      description: 'Lunch'
    });
  });
});
```

### Integration Testing:
```javascript
// __tests__/ExpenseFlow.test.jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import ExpenseEntry from '../pages/ExpenseEntry';
import Dashboard from '../pages/Dashboard';

test('complete expense flow: add and view', async () => {
  render(
    <BrowserRouter>
      <AuthProvider>
        <ExpenseEntry />
        <Dashboard />
      </AuthProvider>
    </BrowserRouter>
  );
  
  // Add expense
  fireEvent.change(screen.getByLabelText(/amount/i), {
    target: { value: '50' }
  });
  
  fireEvent.click(screen.getByText('Add Expense'));
  
  // Verify appears in dashboard
  await waitFor(() => {
    expect(screen.getByText('$50')).toBeInTheDocument();
  });
});
```

## 6.6 CI/CD Pipeline

### GitHub Actions Workflow:
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout Code
        uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install Dependencies
        run: npm ci
      
      - name: Run Tests
        run: npm test -- --coverage
      
      - name: Build Application
        run: npm run build
      
      - name: Upload Build Artifacts
        uses: actions/upload-artifact@v3
        with:
          name: dist
          path: dist/
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## 6.7 Cloud Deployment

### Vercel Deployment:
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Netlify Deployment:
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

### Manual Deployment Steps:
1. **Build Production Bundle:**
   ```bash
   npm run build
   ```

2. **Preview Locally:**
   ```bash
   npm run preview
   ```

3. **Deploy to Platform:**
   - Push to GitHub
   - Connect repository to Vercel/Netlify
   - Configure environment variables
   - Auto-deploy on push

## 6.8 Production Monitoring

### Error Logging:
```javascript
// Error Boundary with Logging
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    // Send to error tracking service
    logErrorToService(error, errorInfo);
  }
  
  render() {
    return this.props.children;
  }
}

// Usage
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

### Performance Tracking:
```javascript
// Report Web Vitals
import { reportWebVitals } from 'web-vitals';

reportWebVitals((metric) => {
  // Send to analytics service
  console.log(metric);
  
  // Example: Send to Google Analytics
  gtag('event', metric.name, {
    value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    event_category: metric.name === 'FID' ? 'performance' : 'web-vital',
    event_label: metric.id
  });
});
```

### Lighthouse Audits:
```bash
# Run Lighthouse audit
lighthouse http://localhost:3000 --view

# Outputs:
# - Performance score
# - Accessibility score
# - Best Practices score
# - SEO score
```

---

# Database Schema

## MongoDB Collections

### Users Collection:
```javascript
{
  _id: ObjectId,
  email: String (unique, indexed),
  password: String (hashed),
  name: String,
  role: String (enum: ['user', 'admin']),
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Expenses Collection:
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: 'Users', indexed),
  amount: Number,
  category: String,
  date: Date,
  description: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Categories Collection:
```javascript
{
  _id: ObjectId,
  name: String (unique),
  icon: String,
  color: String,
  createdBy: ObjectId (ref: 'Users'),
  isSystemDefault: Boolean
}
```

---

# API Endpoints

## Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- POST `/api/auth/logout` - Logout user
- GET `/api/auth/me` - Get current user

## Expenses
- GET `/api/expenses` - Get all expenses (filtered by user role)
- GET `/api/expenses/:id` - Get single expense
- POST `/api/expenses` - Create expense
- PUT `/api/expenses/:id` - Update expense
- DELETE `/api/expenses/:id` - Delete expense

## Admin
- GET `/api/admin/users` - Get all users
- PUT `/api/admin/users/:id` - Update user
- DELETE `/api/admin/users/:id` - Deactivate user
- GET `/api/admin/analytics` - Get system analytics

---

# Project Outcomes

## Skills Developed

### Technical Skills:
✅ React component architecture
✅ State management with Context API
✅ Async data handling
✅ RESTful API integration
✅ Form validation
✅ Routing and navigation
✅ Testing methodologies
✅ Build optimization
✅ CI/CD pipeline implementation
✅ Cloud deployment

### Engineering Skills:
✅ Problem decomposition
✅ System design
✅ Performance optimization
✅ Debugging and troubleshooting
✅ Code organization
✅ Version control
✅ Collaborative development

### Soft Skills:
✅ Technical documentation
✅ Presentation skills
✅ Time management
✅ Critical thinking
✅ User-centric design thinking

---

# Conclusion

This Enterprise Expense Tracker project comprehensively covers CO1-CO6 outcomes, providing students with:

1. **Strong theoretical foundation** in front-end engineering principles
2. **Practical hands-on experience** with modern React development
3. **Real-world problem-solving** through role-based access control and data management
4. **Production-ready skills** including testing, optimization, and deployment
5. **Professional practices** in documentation, version control, and CI/CD

The project bridges academic learning with industry requirements, preparing students for immediate contribution to software development teams.

---

**Prepared By:** [Your Name]
**Date:** [Submission Date]
**Institution:** [Your University/College]
**Course:** Front-End Development with React