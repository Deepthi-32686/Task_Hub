import React from 'react';

const ProfileCard = ({ userData }) => {
  // Define status colors
  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'active': return '#4CAF50';
      case 'away': return '#FFC107';
      case 'do not disturb': return '#F44336';
      case 'offline': return '#9E9E9E';
      default: return '#4CAF50';
    }
  };

  return (
    <div className="profile-card">
      <div className="profile-header">
        <div className="avatar">{userData.avatar}</div>
        <div className="profile-info">
          <h3 className="name">{userData.name}</h3>
          <p className="role">{userData.role}</p>
          <div 
            className="status-badge"
            style={{ background: getStatusColor(userData.status) }}
          >
            {userData.status}
          </div>
        </div>
      </div>
      
      <div className="profile-body">
        <div className="profile-stats">
          <div className="stat">
            <span className="stat-number">24</span>
            <span className="stat-label">Projects</span>
          </div>
          <div className="stat">
            <span className="stat-number">18</span>
            <span className="stat-label">Completed</span>
          </div>
          <div className="stat">
            <span className="stat-number">95%</span>
            <span className="stat-label">Success</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;