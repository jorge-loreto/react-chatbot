import React from "react";

import { formatDate } from "../utils/utils"; // Adjust the import path as necessary
const CourseDetails = ({ data }) => {
    
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
      <table style={{ borderCollapse: "collapse", width: "100%", textAlign: "left", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
        <thead>
          <tr style={{ backgroundColor: "#f5f5f5" }}>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>CURSO</th>
            <th style={{ padding: "10px", border: "1px solid #ddd",  fontSize: '20px', fontWeight: 'bold', color: '#d32f2f' }}>{data.category}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>💡 Fecha de inicio</td>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>{formatDate(data.fechaInicio)}</td>
          </tr>
          <tr>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>🏫 Plantel</td>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>{data.plantel}</td>
          </tr>
          <tr>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>📧 Email</td>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>{data.email}</td>
          </tr>
          <tr>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>📱 Celular</td>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>{data.celular}</td>
          </tr>
          <tr>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>📄 Horario</td>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>{data.horario}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CourseDetails;