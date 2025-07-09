import React from 'react';
import './CategoryDetails.css';
import { formatDate } from '../../utils/utils';
const CategoryDetails = ({ categoryDetails }) => {

  return (
    <div className="category-details-card">
      
        <p><strong>Fecha de Inicio:</strong> </p>
        <h3 style={{ display: categoryDetails.admision ? 'none' : 'flex' }}>
          
          {formatDate(categoryDetails.startDate)}
        </h3>

      
      <p><strong>Horario:</strong> {categoryDetails.horario}</p>
      <p><strong>Costo Inscripción:</strong> ${categoryDetails.costoInscripcion.toFixed(0)}</p>
      <p><strong>Costo Colegiatura:</strong> ${categoryDetails.costoColegiatura.toFixed(0)}</p>
    </div>
  );
};

const styles = {
    card: {
        border: "1px solid #ddd",
        padding: "10px",
        margin: "1px",
        borderRadius: "8px",
        boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
        width: "300px",
        backgroundColor: "#fff",
    },
    buttonContainer: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        marginTop: "10px",
    },
    button: {
        padding: "10px 20px",
        fontSize: "16px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "backgroundColor 0.3s ease",
    },
    buttonHover: {
        backgroundColor: "#0056b3",
    },
    h2: {
        marginTop: "20px",
        marginBottom: "15px",
        marginLeft: "5px",
        marginRight: "5px",
        padding: "10px 20px",
    },
};
export default CategoryDetails;