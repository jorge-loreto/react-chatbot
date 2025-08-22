import { useState } from "react";

const AdminPage = () => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    if (user === "admin" && pass === "1234") {
      setIsAuthenticated(true);
    } else {
      alert("Invalid credentials");
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h2>Admin Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <br />
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Welcome, Admin!</h2>
      <button onClick={() => setIsAuthenticated(false)}>Logout</button>
      {/* Place your admin panel components here */}
    </div>
  );
};

export default AdminPage;
