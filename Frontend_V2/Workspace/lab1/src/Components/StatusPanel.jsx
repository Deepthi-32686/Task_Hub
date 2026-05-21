import React from 'react';

const StatusPanel = ({ currentStatus, onUpdateStatus }) => {
  const statusOptions = [
    { value: 'Active', label: '🟢 Active', color: '#4CAF50' },
    { value: 'Away', label: '🟡 Away', color: '#FFC107' },
    { value: 'Do Not Disturb', label: '🔴 Do Not Disturb', color: '#F44336' },
    { value: 'Offline', label: '⚪ Offline', color: '#9E9E9E' }
  ];

  return (
    <div className="status-panel">
      <h3>Update Status</h3>
      <div className="status-options">
        {statusOptions.map((option) => (
          <button
            key={option.value}
            className={`status-option ${
              currentStatus === option.value ? 'active' : ''
            }`}
            onClick={() => onUpdateStatus(option.value)}
            style={{
              backgroundColor: currentStatus === option.value ? option.color : '#f5f5f5',
              color: currentStatus === option.value ? 'white' : '#333'
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
      
      <div className="current-status-display">
        <p>Current Status: <strong>{currentStatus}</strong></p>
        <p>Last updated: {new Date().toLocaleString()}</p>
      </div>
    </div>
  );
};

export default StatusPanel;