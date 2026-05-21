import React, { useState } from 'react';
import ProfileCard from './ProfileCard';
import StatusPanel from './StatusPanel';

const ProfileDashboard = () => {
  // Initial user data
  const [userData, setUserData] = useState({
    name: 'deepthi',
    role: 'Software Engineer',
    status: 'Active',
    avatar: '👨‍💼',
    joinDate: 'Jan 2024',
    lastActive: 'Today'
  });

  // Function to update user status
  const updateUserStatus = (newStatus) => {
    setUserData(prev => ({
      ...prev,
      status: newStatus,
      lastActive: new Date().toLocaleTimeString()
    }));
  };

  return (
    <div className="profile-dashboard">
      <h2>User Profile Dashboard</h2>
      
      {/* Pass user data as props to child components */}
      <ProfileCard userData={userData} />
      <StatusPanel 
        currentStatus={userData.status} 
        onUpdateStatus={updateUserStatus}
      />
      
      {/* Additional profile information */}
      <div className="profile-details">
        <h3>Additional Information</h3>
        <div className="info-grid">
          <div className="info-item">
            <label>Join Date:</label>
            <span>{userData.joinDate}</span>
          </div>
          <div className="info-item">
            <label>Last Active:</label>
            <span>{userData.lastActive}</span>
          </div>
          <div className="info-item">
            <label>Account Type:</label>
            <span>Standard</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;