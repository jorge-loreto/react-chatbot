import React from 'react';
import './ConOxxo.css';
import { formatDateSpanish, formatFloat } from "../utils"; // Adjust the import path as necessary
import logo from '../../../../../assets/iteci-logo.jpeg'; // Adjust the path to your logo image

const SinOxxo = ({ data, totalDeposito }) => {
  return (
    <div className="oxxo-container">
      <div className="oxxo-header">
        <img src={logo} alt="iteci" className="oxxo-logo" />
        <h3 className="oxxo-title">💵 Paga en el plantel:</h3>
        <h1 className="oxxo-amount">${formatFloat(totalDeposito)}</h1>
      </div>

      <h3 className="oxxo-note">No olvides mostrar esta imagen para que te hagan el descuento respectivo.</h3>
      <h4 className="oxxo-account">
        <strong className="highlight">{data.direccion}</strong>
      </h4>
      <div className="oxxo-promotion">
        <p>Promoción válida solo para el curso de: <strong className="highlight">{data.category}</strong></p>
        <p>Promoción válida únicamente pagando en el plantel antes del: <strong className="highlight">{formatDateSpanish(data.valido)}</strong></p>
        <p>Costo normal de INSCRIPCIÓN sin promoción: <strong className="highlight">${data.inscripcion}</strong></p>
      </div>
    </div>
  );
};

export default SinOxxo;