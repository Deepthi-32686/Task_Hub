import React from 'react';
import { AuthProvider } from './context/AuthContext.jsx';
import UserProfile from './components/UserProfile.jsx';

const App = () => {
 return (
    <AuthProvider>
      <UserProfile />
    </AuthProvider>
  );
};

export default App;