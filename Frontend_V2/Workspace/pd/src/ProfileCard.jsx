import React from 'react';

function ProfileCard({ name, role }) {
  return (
    <div className="profile-card">
      <h2>{name}</h2>
      <p>Role: {role}</p>
    </div>
  );
}

export default ProfileCard;