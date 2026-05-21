import React, { useState } from "react";
import ProfileCard from "./ProfileCard";
import StatusPanel from "./StatusPanel";
import "./index.css";

function App() {
  //State for user data
  const [user, setUser] = useState({
    name:"divya",
    role:"Developer",
    status:"Active"
  });

  //Function to update user status
  const updateStatus = (newStatus) => {
    setUser({...user, status: newStatus });
    };

  return (
    <div className="app-container">
      <h1>Profile Dashboard</h1>
        {/*Component based UI */}
    
      <ProfileCard name={user.name} role={user.role} />
      <StatusPanel status={user.status} onUpdate={updateStatus} />
    </div>
  );
}

export default App;