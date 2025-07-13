import React, { useEffect, useRef } from 'react';
import TicketDetails from '../TICKET/CourseDetails';
import { formatDateSpanish, premioTranslation } from "../utils/utils"; // Adjust the import path as necessary
import { askRefer } from "../api/apiReferidos"; // Import API function
import ConOxxo from './oxxo/ConOxxo';
import SinOxxo from './oxxo/SinOxxo';
import logo from '../../assets/iteci-logo.jpeg'; // Adjust the path to your logo image

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
      return 0.2;
    }
    if(option==='Sorpresa 5'){
      return 0.1;
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
  {data.oxxo === 'si' ? <ConOxxo data={data} totalDeposito={totalDeposito} /> 
                    : <SinOxxo data={data} totalDeposito={totalDeposito}/>}

  
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