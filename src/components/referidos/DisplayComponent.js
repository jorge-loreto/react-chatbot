import React from 'react';

import './DisplayComponent.css'; // Import the CSS file for styling
const DisplayComponent = ({ formData }) => {
  if (!formData) return <p className="info">Estas cerca de acceder a grandes descuentos</p>;

  return (
    <div className="display-box">
      <h2>Informacion enviada:</h2>
      <p><strong>Nombre:</strong> {formData.nombre}</p>
      <p><strong>Cellular:</strong> {formData.cellular}</p>
      <p><strong>Address:</strong> {formData.address}</p>
    </div>
  );
};

export default DisplayComponent;
