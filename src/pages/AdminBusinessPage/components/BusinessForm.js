import { useState } from "react";
import { saveBusiness } from "../../api/businessApi";

const BusinessForm = ({ onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    celular: "",
    notas: "",
    locationIds: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveBusiness(formData);
      alert("✅ Business saved successfully!");
      onSuccess?.(); // refresh table or close modal
    } catch (err) {
      alert("❌ Error saving business");
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "20px",
        width: "400px",
        margin: "0 auto",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h3>Create New Business</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Celular:</label>
          <input
            type="text"
            name="celular"
            value={formData.celular}
            onChange={handleChange}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Notas:</label>
          <textarea
            name="notas"
            value={formData.notas}
            onChange={handleChange}
            rows={3}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Location IDs (comma-separated):</label>
          <input
            type="text"
            name="locationIds"
            value={formData.locationIds.join(",")}
            onChange={(e) =>
              setFormData({
                ...formData,
                locationIds: e.target.value.split(",").map((id) => id.trim()),
              })
            }
          />
        </div>

        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          <button type="submit" style={{ backgroundColor: "#28a745", color: "white" }}>
            Save
          </button>
          <button
            type="button"
            onClick={onCancel}
            style={{ backgroundColor: "#6c757d", color: "white" }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default BusinessForm;