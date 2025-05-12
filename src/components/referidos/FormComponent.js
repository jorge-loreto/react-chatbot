import React, { useState } from 'react';
import DisplayComponent from './DisplayComponent';
import './FormComponent.css';

const FormComponent = ({setSelectedOption, premioRef}) => {
  const [formData, setFormData] = useState({ nombre: '', cellular: '', address: '' });
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangeNumber = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
  
    if (value.length > 10) {
      value = value.slice(0, 10); // Limit to 10 digits
    }
  
    // Auto-format with hyphens
    if (value.length > 6) {
      value = `${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(6, 10)}`;
    } else if (value.length > 3) {
      value = `${value.slice(0, 3)}-${value.slice(3)}`;
    }
  
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    if (!e.target.checkValidity()) {
      e.preventDefault();
      return; // Prevent submission if the form isn't valid
    }
  
    e.preventDefault();
    //setSubmittedData(formData);
    console.log('Form submitted:', formData);
    console.log('NOMBRE submitted:', formData.address);
    console.log('DIRECCION submitted:', formData.cellular);
    console.log('CELL submitted:', formData.nombre);
    premioRef.current.nombre = formData.nombre;
    premioRef.current.direccion = formData.address;
    premioRef.current.celular = formData.cellular;
    setFormData({ nombre: '', cellular: '', address: '' });
    setSelectedOption(555);

  };

  return (
    <div className="form-wrapper">
      <h2 className="form-title">Antes de GIRAR la ruleta de la suerte por favor brindanos la siguiente información:</h2> {/* <-- Add this line */}
      <form onSubmit={handleSubmit}>
        <table className="form-table">
          <tbody>
            <tr>
              <td><label htmlFor="nombre">Nombre:</label></td>
              <td><input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required /></td>
            </tr>
            <tr>
              <td><label htmlFor="cellular">Numero Celular:</label></td>
              <td><input type="tel" id="cellular" name="cellular" pattern="\d{3}-\d{3}-\d{4}" placeholder="123-456-7890" 
              title="Por favor ingresa un número de celular de 10 digitos" value={formData.cellular} onChange={handleChangeNumber} required /></td>
            </tr>
            <tr>
              <td><label htmlFor="address">Dirección:</label></td>
              <td><input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required /></td>
            </tr>
            <tr>
              <td colSpan="2" style={{ textAlign: 'center' }}>
                <button type="submit">Continuar a RULETA</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>

      <DisplayComponent formData={submittedData} />
    </div>
  );
};

export default FormComponent;
