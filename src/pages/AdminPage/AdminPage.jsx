import { useState } from "react";
import apiCliente from "../AdminPage/api/apiCliente";
import ReferidosNuevos from "./components/referidos/ReferidosNuevos";
import ReferidosContactados from "./components/referidos/ReferidosContactados";
import ReferidosAlumnos from "./components/referidos/ReferidosAlumnos";
import ReferidosEliminados from "./components/referidos/ReferidosEliminados";
import Status from "./constants/statusEnum";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../../context/AdminContext";


const AdminPage = () => {
  const [selectedStatus, setSelectedStatus] = useState(Status.NEW);
  const navigate = useNavigate();
  const { user, pass, setUser, setPass, isAuthenticated, setIsAuthenticated, logout } = useAdmin();


  const handleLogin = () => {
    if (user.trim() === "" || pass.trim() === "") {
      alert("Please enter both username and password");
      return;
    }else{
       apiCliente.post(`/users/login`,userObj ).then((response) => {
          console.log(response);
          setIsAuthenticated(true);
        }).catch (error => {
          console.error("Error fetching referidos by status:", error);
          console.error("Error:", error.response?.data || error.message);
          alert("Login failed");
        });
    }
  };

  const userObj = {
      name: user,
      passwdString: pass
    };

       
       
  
    

  // 🔐 Login screen
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

  // 🧭 Menu options
  const menuOptions = ["NUEVOS", "CONTACTED", "STUDENT", "DELETED"];

  // 📋 Helper to render the selected component
  const renderContent = () => {
    switch (selectedStatus) {
      case Status.NEW:
        return <ReferidosNuevos />;
      case Status.CONTACTED:
        return <ReferidosContactados />;
      case Status.STUDENT:
        return <ReferidosAlumnos />;
      case Status.DELETED:
        return <ReferidosEliminados />;
      default:
        return <ReferidosNuevos />;
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Bienvenido, {user}!</h2>

      {/* 🧭 Menu */}
      <div style={{ margin: "20px 0" }}>
        {menuOptions.map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            style={{
              margin: "5px",
              padding: "8px 16px",
              borderRadius: "8px",
              border:
                selectedStatus === status
                  ? "2px solid #007bff"
                  : "1px solid #ccc",
              backgroundColor:
                selectedStatus === status ? "#007bff" : "white",
              color: selectedStatus === status ? "white" : "black",
              cursor: "pointer",
            }}
          >
            {status}
          </button>
        ))}
      </div>

      {/* 🧩 Render selected section */}
      {renderContent()}

      {/* Footer buttons */}
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <button
          onClick={() => navigate("/business-admin")}
          style={{ backgroundColor: "#28a745", color: "white", padding: "8px 16px" }}
        >
          Admin Business Clients
        </button>

        <button
          onClick={logout}
          style={{ backgroundColor: "#dc3545", color: "white", padding: "8px 16px" }}
        >
          Logout
        </button>
        <button
          onClick={() =>{ logout(); navigate("/");
          } }
          style={{ marginTop: "20px", backgroundColor: "#007bff", color: "white", padding: "8px 16px" }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminPage;
