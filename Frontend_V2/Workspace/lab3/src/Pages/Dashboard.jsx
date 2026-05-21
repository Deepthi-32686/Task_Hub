import { useState } from "react";
import ProfileCard from "../Components/profileCard";
import StatusPanel from "../Components/StatusPanel";

function Dashboard() {
  const [status, setStatus] = useState("Active");

  const toggleStatus = () => {
    setStatus(prev => (prev === "Active" ? "Inactive" : "Active"));
  };

  return (
    <div>
      <ProfileCard
        name="Dishi"
        role="Frontend Developer"
        status={status}
        onStatusChange={toggleStatus}
      />
      <StatusPanel status={status} onStatusChange={toggleStatus} />
    </div>
  );
}

export default Dashboard;