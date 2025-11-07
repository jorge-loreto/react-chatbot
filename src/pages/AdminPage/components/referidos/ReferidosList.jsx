import React, { useEffect, useState } from "react";
import { getReferidosByStatus } from "../../api/apiReferidos";
import { updateReferido } from "../../api/apiUpdateReferido";
import "./ReferidosList.css"; // import the CSS
import Status from "../../constants/statusEnum";

const ReferidosList = ({ status }) => {
  const [referidos, setReferidos] = useState([]);
  const [editingReferido, setEditingReferido] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [notas, setNotas] = useState("");

  useEffect(() => {
    getReferidosByStatus(status).then(setReferidos);
  }, []);

  const handleEditClick = (referido) => {
    setEditingReferido(referido);
    setNewStatus(referido.status);
    setNotas(referido.notas || "");
  };

  const handleSave = () => {
    const updated = { ...editingReferido, status: newStatus, notas: notas };
    console.log("Saving changes:", updated);
    // Update local state
    setReferidos((prev) =>
      prev.map((r) => (r.id === updated.id ? updated : r))
    );
    setEditingReferido(null);
    updateReferido(updated).then(() => {
      console.log("Updated successfully on server");
    }).catch((err) => {
      console.error("Error updating referido:", err);
      alert("Failed to update referido on server");
    });
    
  };

  return (
    <div className="p-4">
      
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Plantel</th>
              <th>Categoría</th>
              <th>Celular</th>
              <th>Fecha Inicio</th>
              <th>Horario</th>
              <th>Inscripción</th>
              <th>Premio</th>
              <th>Validez</th>
              <th>Status</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
  {referidos.map((r) => (
    <React.Fragment key={r.id}>
      <tr>
        <td>{r.nombre}</td>
        <td>{r.plantel}</td>
        <td>{r.category}</td>
        <td>{r.celular}</td>
        <td>{r.fechaInicio}</td>
        <td>{r.horario}</td>
        <td>{r.inscripcion}</td>
        <td>{r.premio}</td>
        <td>{r.validez}</td>
        <td>{r.status}</td>
        <td>
          <button className="edit-btn" onClick={() => handleEditClick(r)}>
            Edit
          </button>
        </td>
      </tr>

      {/* ✅ Notas row (full width) */}
      {r.notas && (
        <tr
          key={`${r.id}-nota`}
          style={{
            backgroundColor: "#fafafa",
            fontStyle: "italic",
          }}
        >
          <td colSpan="11" style={{ textAlign: "left", padding: "8px 12px" }}>
            📝 <strong>Notas:</strong> {r.notas}
          </td>
        </tr>
      )}
    </React.Fragment>
  ))}
</tbody>

        </table>
      </div>

      {editingReferido && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Edit {editingReferido.nombre}</h3>

            <label>Status</label>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            >
              {Object.values(Status).map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <label>Notas</label>
            <textarea
              value={notas}
              onChange={(e) => setNotas(e.target.value)}
              rows="3"
            />

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button className="cancel-btn" onClick={() => setEditingReferido(null)}>
                Cancel
              </button>
              <button className="save-btn" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReferidosList;
