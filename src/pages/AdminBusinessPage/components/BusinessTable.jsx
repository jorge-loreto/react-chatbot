// src/components/business/BusinessTable.jsx
import React from "react";

const BusinessTable = ({ businesses, onEdit }) => {
  if (!businesses.length) return <p>No businesses found.</p>;

  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th style={th}>ID</th>
          <th style={th}>Nombre</th>
          <th style={th}>Teléfono</th>
          <th style={th}>Creacion</th>
          <th style={th}>Categorias</th>
          <th style={th}>Notas</th>
          <th style={th}>Editar</th>
        </tr>
      </thead>
      <tbody>
        {businesses.map((biz) => (
          <tr key={biz.id}>
            <td style={td}>{biz.id}</td>
            <td style={td}>{biz.nombre}</td>
            <td style={td}>{biz.celular}</td>
            <td style={td}>{biz.creationDate}</td>
            <td style={td}>
              {biz.locationIds && biz.locationIds.length > 0
                ? biz.locationIds.join(", ")
                : <em style={{ color: "gray" }}>No locations</em>}
            </td>
            <td style={td}>{biz.notas}</td>
            <td style={td}>
              <button
                onClick={() => onEdit && onEdit(biz.id, biz)}
                style={{ padding: "6px 12px", cursor: "pointer", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px" }}
              >
                Editar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const th = {
  borderBottom: "2px solid #ccc",
  padding: "8px",
  background: "#f4f4f4",
  textAlign: "left",
};

const td = {
  borderBottom: "1px solid #ddd",
  padding: "8px",
};

export default BusinessTable;
