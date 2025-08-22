import React from 'react';
import './ConOxxo.css';
import logoOxxo from '../../../../../assets/Oxxo_Logo.svg.webp'; // Adjust the path to your logo image
import { formatDateSpanish, formatFloat } from "../utils"; // Adjust the import path as necessary

const ConOxxo = ({ data, totalDeposito }) => {
  return (
    <div className="oxxo-container">
      <div className="oxxo-header">
        <img src={logoOxxo} alt="OXXO Logo" className="oxxo-logo" />
        <h3 className="oxxo-title">💵 Deposita en un OXXO:</h3>
        <h1 className="oxxo-amount">${formatFloat(totalDeposito)}</h1>
      </div>

      <h4 className="oxxo-account">
        a la cuenta: <strong className="highlight">{data.tarjetaBancomer}</strong> BBVA Bancomer
      </h4>

      <div className="oxxo-reference">
        <h3>🔖 Folio de referencia:</h3>
        <h3 className="oxxo-folio"><strong>{data.id}</strong></h3>
      </div>

      <h3 className="oxxo-note">No olvides mostrar esta imagen para que te hagan el descuento respectivo.</h3>

      <div className="oxxo-promotion">
        <p>Promoción válida solo para el curso de: <strong className="highlight">{data.category}</strong></p>
        <p>Promoción válida únicamente depositando en OXXO hasta el: <strong className="highlight">{formatDateSpanish(data.valido)}</strong></p>
        <p>Costo normal de INSCRIPCIÓN sin promoción: <strong className="highlight">${data.inscripcion}</strong></p>
        <p className="warning">No válido en pagos en el plantel</p>
      </div>

      <h3 className="oxxo-contact">
        Si ya depositaste en OXXO, tómale una foto al TICKET y envíala al WhatsApp <strong className="highlight">{data.telefonoEscuela}</strong>
      </h3>
    </div>
  );
};

export default ConOxxo;