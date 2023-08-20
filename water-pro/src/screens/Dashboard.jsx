import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../context/AuthContext";

const Dashboard = () => {
  const { logout, getUser } = useAuthValue();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setUser(JSON.parse(getUser()));
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      {user && <p>{user.username}</p>}
    </div>
  );
};

export default Dashboard;
