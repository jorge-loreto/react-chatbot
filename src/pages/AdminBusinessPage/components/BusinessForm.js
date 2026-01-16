import React, { useEffect, useState } from "react";
import { saveBusiness, updateBusiness } from "../api/businessApi";

const EMPTY_FORM = {
  nombre: "",
  celular: "",
  notas: "",
};

const BusinessForm = ({ initialData, onSaved, onCancel }) => {
  console.log("BusinessForm initialData:", initialData);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const isEdit = Boolean(initialData?.id);
  console.log("isEdit:", isEdit);
  // 🧠 load data when editing
  useEffect(() => {
    if (initialData) {
      setForm({
        nombre: initialData.nombre || "",
        celular: initialData.celular || "",
        notas: initialData.notas || "",
      });
    } else {
      setForm(EMPTY_FORM);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      if (isEdit) {
        await updateBusiness(initialData.id, form);
        alert("✅ Business updated successfully");
      } else {
        await saveBusiness(form);
        alert("✅ Business created successfully");
      }

      onSaved?.();
      setForm(EMPTY_FORM);
    } catch (err) {
      console.error(err);
      alert("❌ Error saving business");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
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
      <h3 style={{ textAlign: "center" }}>
        {isEdit ? "Editar Cliente Empresarial" : "Nuevo Cliente Empresarial"}
      </h3>

      <label>Nombre *</label>
      <input
        type="text"
        name="nombre"
        value={form.nombre}
        onChange={handleChange}
        required
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <label>Celular</label>
      <input
        type="text"
        name="celular"
        value={form.celular}
        onChange={handleChange}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <label>Notas</label>
      <textarea
        name="notas"
        value={form.notas}
        onChange={handleChange}
        rows={3}
        style={{ width: "100%", marginBottom: "15px" }}
      />

      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        <button
          type="submit"
          disabled={saving}
          style={{
            backgroundColor: "#28a745",
            color: "white",
            padding: "8px 16px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          {saving ? "Guardando..." : isEdit ? "Actualizar" : "Guardar"}
        </button>

        <button type="button" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default BusinessForm;
