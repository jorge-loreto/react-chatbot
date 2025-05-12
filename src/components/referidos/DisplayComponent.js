import React from 'react';

const DisplayComponent = ({ formData }) => {
  if (!formData) return <p className="info">No data submitted yet.</p>;

  return (
    <div className="display-box">
      <h2>Submitted Data:</h2>
      <p><strong>Nombre:</strong> {formData.nombre}</p>
      <p><strong>Cellular:</strong> {formData.cellular}</p>
      <p><strong>Address:</strong> {formData.address}</p>
    </div>
  );
};

export default DisplayComponent;
