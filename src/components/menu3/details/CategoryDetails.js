import React from 'react';
import './CategoryDetails.css';
import { formatDate } from '../../utils/utils';
const CategoryDetails = ({ categoryDetails }) => {

  return (
    <div className="category-details-card">
      <p><strong>Fecha de Inicio:</strong> </p><p>{formatDate(categoryDetails.startDate)}</p>
      <p><strong>Horario:</strong> {categoryDetails.horario}</p>
      <p><strong>Costo Inscripción:</strong> ${categoryDetails.costoInscripcion.toFixed(0)}</p>
      <p><strong>Costo Colegiatura:</strong> ${categoryDetails.costoColegiatura.toFixed(0)}</p>
    </div>
  );
};

export default CategoryDetails;