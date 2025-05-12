import React, { useEffect, useRef } from 'react';
import logo from '../../assets/iteci-logo.jpeg'; // Adjust the path to your logo image
import logoOxxo from '../../assets/Oxxo_Logo.svg.webp'; // Adjust the path to your logo image
import TicketDetails from '../TICKET/CourseDetails';
import { formatDateSpanish, premioTranslation } from "../utils/utils"; // Adjust the import path as necessary
import { askRefer } from "../api/apiReferidos"; // Import API function

const GenerateCode = ({data}) => {

  const definirPorcentaje = (option) => {
  
    console.log('Option selected random code: {} ...', option);
    if(option==='Sorpresa 1'){
      return 0.3;
    }
    if(option==='Sorpresa 2'){
      return 0.4;
    }
    if(option==='Sorpresa 3'){
      return 0.5;
    }
    if(option==='Sorpresa 4'){
      return 0.6;
    }
    if(option==='Sorpresa 5'){
      return 0.7;
    }
    
    return 0.5;
  };

  console.log('GenerateCode: received data {}', data); // "0.3"
  // const firstTwoChars = "0."+data.premio.substring(0, 2);
  const firstTwoChars = definirPorcentaje(data.premio);
  console.log('firstTwoChars: {}', firstTwoChars); // "0.3"

  const totalDeposito = parseFloat(data.inscripcion*(1-(parseFloat(firstTwoChars))));
  const hasRun = useRef(false);


  useEffect(() => {
    if (!hasRun.current) {
      generateRandomCode2();
      hasRun.current = true; // Prevents re-execution
    }
  }, []);
  

  
  function formatFloat(num) {
    return parseFloat(num.toFixed(2)); 
  }
  

  const generateRandomCode = () => {
  
    console.log('Generating random code...');
    const el = document.getElementById("capture-area");
    el.style.display = "block"; // show temporarily
  
    window.html2canvas(el).then((canvas) => {
      const link = document.createElement("a");
      link.download = `premio-iteci-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
  
      el.style.display = "none"; // hide again
      
      const el2 = document.getElementById("main-container");
      el2.style.display = "none"; // hide again
    });
  
  };

  const generateRandomCode2 = () => {
  
    console.log('Generating random code...');
    const el = document.getElementById("capture-area");
    el.style.display = "block"; // show temporarily
  
    window.html2canvas(el).then((canvas) => {
      const link = document.createElement("a");
      link.download = `premio-iteci-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    });

    askRefer(data).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
        alert('Error al enviar el premio, por favor intenta de nuevo.');
      });
  
  };

  

  return (
  <div id="main-container">
    
  
    <div id="capture-area"
  style={{
    maxWidth: '600px',
    margin: '40px auto',
    padding: '30px',
    backgroundColor: '#fefefe',
    borderRadius: '20px',
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
  }}
>
  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
    <img
      src={logo}
      alt="Logo"
      style={{ width: '100px', height: '100px', marginBottom: '20px' }}
    />
    <h1 style={{ fontSize: '28px', color: '#2e7d32' }}>
      Bienvenido a Grupo iTECi
    </h1>
  </div>
  <h2 style={{ fontSize: '28px', marginBottom: '1px', color: '#4169E1' }}>{data.nombre}</h2>

  <h3 style={{ margin: '5px 0' }}>🎉 Por promoción tienes un descuento de:</h3>
  <h3 style={{ margin: '5px 0',fontSize: '40px', fontWeight: 'bold', color: '#d32f2f' }}>
    {premioTranslation(data.premio)}
  </h3>
  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
    <h4 style={{ marginBottom: '0px' }}>VALIDO HASTA:</h4>
    <h3 style={{ margin: '5px 0',fontSize: '30px', fontWeight: 'bold', color: '#d32f2f' }}>
      <strong>{formatDateSpanish(data.valido)}</strong>
    </h3>
  </div>

  <TicketDetails data={data} />

  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
    <img
      src={logoOxxo}
      alt="OXXO Logo"
      style={{ width: '50px', height: '26px', margin: '5px 0' }}
    />  <h3 style={{ margin: '5px 0' }}>💵 Deposita en un OXXO:</h3>  <h1 style={{ margin: '5px 0', fontStyle: 'italic', color: '#4169E1' }}>
      ${formatFloat(totalDeposito)} </h1>
  </div>
  <h4>a la cuenta: <strong style={{  color: '#4169E1' }}>4152-3144-0002-3704</strong>  BBVA Bancomer o en tu plantel  </h4>
  
  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
    <h3 style={{ marginBottom: '0px' }}>🔖 Folio de referencia:</h3>
    <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#d32f2f' }}>
      <strong>{data.id}</strong>
    </h3>
  </div>

  

  <h3 style={{ marginTop: '1px' }}>
    No olvides mostrar esta imagen para que te hagan el descuento respectivo.
  </h3>
  <h3 style={{ marginTop: '1px' }}>
    Si depositas en OXXO tomale una foto al TICKET y enviala al WhatsApp 496-127-6199
  </h3>

  
</div>
<button
    onClick={generateRandomCode}
    style={{
      marginTop: '30px',
      padding: '12px 24px',
      fontSize: '16px',
      fontWeight: 'bold',
      backgroundColor: '#2e7d32',
      color: 'white',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
    }}
  >
    📥 📸 Descargar tu premio
  </button>
</div>

  );
};

export default GenerateCode;