// src/components/business/BusinessTable.jsx
import React from "react";

const BusinessTable = ({ businesses }) => {
  if (!businesses.length) return <p>No businesses found.</p>;

  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th style={th}>ID</th>
          <th style={th}>Nombre</th>
          <th style={th}>Teléfono</th>
          <th style={th}>Correo</th>
          <th style={th}>Dirección</th>
        </tr>
      </thead>
      <tbody>
        {businesses.map((biz) => (
          <tr key={biz.id}>
            <td style={td}>{biz.id}</td>
            <td style={td}>{biz.name}</td>
            <td style={td}>{biz.phone}</td>
            <td style={td}>{biz.email}</td>
            <td style={td}>{biz.address}</td>
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
