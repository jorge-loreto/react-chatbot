import React from "react";

import { useAdmin } from "../../context/AdminContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBusiness } from "./api/apiBusiness";
import BusinessTable from "./components/BusinessTable";

const AdminBusinessPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAdmin();
  // 🧠 State
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  
  // 🧩 Fetch data once on component mount
  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const data = await getBusiness();
        setBusinesses(data);
      } catch (err) {
        console.error("Error loading business list:", err);
        setError("Failed to load business data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBusiness();
  }, []);

  // 🧾 Render content
  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h3>Loading business data...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "20px", color: "red" }}>
        <h3>{error}</h3>
        <button
          onClick={() => window.location.reload()}
          style={{
            marginTop: "10px",
            backgroundColor: "#007bff",
            color: "white",
            padding: "8px 16px",
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!isAuthenticated) {
    navigate("/admin");
    return null;
  }
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Administración de Clientes Empresariales</h2>
      <p>🚀 Aquí puedes gestionar tus clientes empresariales.</p>

      {/* 🧩 Table with all business records */}
      <div style={{ marginTop: "20px" }}>
        <BusinessTable businesses={businesses} />
      </div>

      {/* Footer buttons */}
      <div
        style={{
          marginTop: "30px",
          display: "flex",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <button
          onClick={() => navigate("/admin")}
          style={{
            backgroundColor: "#007bff",
            color: "white",
            padding: "8px 16px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          ← Volver a Referidos Admin
        </button>

        <button
          onClick={logout}
          style={{
            backgroundColor: "#dc3545",
            color: "white",
            padding: "8px 16px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminBusinessPage;
