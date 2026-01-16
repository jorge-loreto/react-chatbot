import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../../context/AdminContext";
import { getBusiness } from "./api/apiBusiness";

import BusinessTable from "./components/BusinessTable";
import BusinessForm from "./components/BusinessForm";
import BusinessLocationManager from "./components/BusinessLocationManager";

const AdminBusinessPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAdmin();

  // 📦 data
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🎛 UI state
  const [mode, setMode] = useState("list");
  // modes: list | create | edit

  const [selectedBusiness, setSelectedBusiness] = useState(null);

  // 🔄 load businesses
  const loadBusinesses = async () => {
    try {
      setLoading(true);
      const data = await getBusiness();
      setBusinesses(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load business data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBusinesses();
  }, []);

  // 🔒 auth guard
  if (!isAuthenticated) {
    navigate("/admin");
    return null;
  }

  // 🧾 loading & error
  if (loading) {
    return <h1 style={{ textAlign: "center" }}>Loading businesses...</h1>;
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", color: "red" }}>
        <p>{error}</p>
        <button onClick={loadBusinesses}>Retry</button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Administración de Clientes Empresariales</h2>
      <p>🚀 Gestiona clientes y sus ubicaciones</p>

      {/* ➕ CREATE */}
      {mode === "list" && (
        <button
          onClick={() => {
            setSelectedBusiness(null);
            setMode("create");
          }}
          style={{ marginBottom: "20px" }}
        >
          + Crear Nuevo Cliente
        </button>
      )}

      {/* 🧾 BUSINESS FORM */}
      {(mode === "create" || mode === "edit") && (
        <BusinessForm
          initialData={selectedBusiness}
          onCancel={() => {
            setSelectedBusiness(null);
            setMode("list");
          }}
          onSaved={() => {
            loadBusinesses();
            setMode("list");
          }}
        />
      )}

      {/* 📍 LOCATION MANAGEMENT (ONLY WHEN EDITING) */}
      {mode === "edit" && selectedBusiness && (
        <BusinessLocationManager
          businessId={selectedBusiness.id}
          onChange={loadBusinesses}
          onBackEdit={() => {
            setSelectedBusiness(selectedBusiness);
            setMode("edit");
          }}
        />
      )}

      {/* 📊 TABLE */}
      {mode === "list" && (
        <BusinessTable
          businesses={businesses}
          onEdit={(business) => {
            console.log("Editing business:", business);
            setSelectedBusiness(business);
            setMode("edit");
          }}
        />
      )}

      {/* 🔚 FOOTER */}
      <div style={{ marginTop: "30px", display: "flex", gap: "10px", justifyContent: "center" }}>
        <button onClick={() => navigate("/admin")}>
          ← Volver
        </button>
        <button onClick={logout} style={{ backgroundColor: "#dc3545", color: "white" }}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminBusinessPage;
