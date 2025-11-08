import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../../context/AdminContext";
import { getBusiness } from "./api/apiBusiness";
import { saveBusiness } from "./api/businessApi"; // 🆕 added
import BusinessTable from "./components/BusinessTable";

const AdminBusinessPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAdmin();

  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false); // 🆕 control create form
  const [newBusiness, setNewBusiness] = useState({
    nombre: "",
    celular: "",
    notas: "",
    locationIds: [],
  });

  // 🧩 Fetch businesses on load
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

  useEffect(() => {
    fetchBusiness();
  }, []);

  // 🆕 Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBusiness((prev) => ({
      ...prev,
      [name]: name === "locationIds" ? value.split(",").map((id) => id.trim()) : value,
    }));
  };

  // 🆕 Save new business
  const handleSaveBusiness = async (e) => {
    e.preventDefault();
    try {
      await saveBusiness(newBusiness);
      alert("✅ Business saved successfully!");
      setShowForm(false);
      setNewBusiness({ nombre: "", celular: "", notas: "", locationIds: [] });
      fetchBusiness(); // refresh table
    } catch (error) {
      console.error("Error saving business:", error);
      alert("❌ Error saving business");
    }
  };

  // 🔒 redirect if not authenticated
  if (!isAuthenticated) {
    navigate("/admin");
    return null;
  }

  // 🧾 Loading & Error states
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

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Administración de Clientes Empresariales</h2>
      <p>🚀 Aquí puedes gestionar tus clientes empresariales.</p>

      {/* 🆕 Create new business button */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          style={{
            backgroundColor: "#28a745",
            color: "white",
            padding: "8px 16px",
            borderRadius: "6px",
            marginBottom: "20px",
            cursor: "pointer",
          }}
        >
          + Crear Nuevo Cliente Empresarial
        </button>
      )}

      {/* 🧾 New Business Form */}
      {showForm && (
        <form
          onSubmit={handleSaveBusiness}
          style={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "20px",
            width: "400px",
            margin: "0 auto 20px auto",
            backgroundColor: "#f9f9f9",
            textAlign: "left",
          }}
        >
          <h3 style={{ textAlign: "center" }}>Nuevo Cliente Empresarial</h3>

          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={newBusiness.nombre}
            onChange={handleInputChange}
            required
            style={{ width: "100%", marginBottom: "10px" }}
          />

          <label>Celular:</label>
          <input
            type="text"
            name="celular"
            value={newBusiness.celular}
            onChange={handleInputChange}
            style={{ width: "100%", marginBottom: "10px" }}
          />

          <label>Notas:</label>
          <textarea
            name="notas"
            value={newBusiness.notas}
            onChange={handleInputChange}
            rows={3}
            style={{ width: "100%", marginBottom: "10px" }}
          />

          <label>Location IDs (separados por coma):</label>
          <input
            type="text"
            name="locationIds"
            value={newBusiness.locationIds.join(",")}
            onChange={handleInputChange}
            style={{ width: "100%", marginBottom: "15px" }}
          />

          <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            <button
              type="submit"
              style={{
                backgroundColor: "#28a745",
                color: "white",
                padding: "8px 16px",
                borderRadius: "6px",
              }}
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              style={{
                backgroundColor: "#6c757d",
                color: "white",
                padding: "8px 16px",
                borderRadius: "6px",
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

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
