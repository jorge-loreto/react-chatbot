import React from 'react';
import barberIcon from '../../../../assets/icon-barbershop.jpg';
import estilismoIcon from '../../../../assets/icon-estilismo.jpg';
import nurseIcon from '../../../../assets/icon-nurse.jpg';
import prepaIcon from '../../../../assets/icon-prepa.jpg';
import cargandoIcon from '../../../../assets/loading.jpg';
import cargandoIcon2 from '../../../../assets/loading2.jpg';
import iteciIcon from '../../../../assets/iconIteci.png';
import './CategoryIcons.css'; // Import the CSS file for styling
const CategoryIcons = () => {
  const icons = [
    { src: barberIcon, alt: 'Barbería' },
    { src: estilismoIcon, alt: 'Estilismo' },
    { src: nurseIcon, alt: 'Enfermería' },
    { src: prepaIcon, alt: 'Preparatoria' }
  ];

  return (
    <div>
      {/* Loading icon with CSS animation */}
      <div
        id="loading-icon"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '40px 20px',
          position: 'relative',
          width: 'auto',
          height: 'auto'
        }}
      >
        <img
          src={cargandoIcon}
          alt="Cargando..."
          className="blink-img img1"
          style={{ position: 'absolute' }}
        />
        <img
          src={cargandoIcon2}
          alt="Cargando..."
          className="blink-img img2"
          style={{ position: 'absolute' }}
        />
       
      </div>

      {/* Category icons */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          gap: '20px',
          padding: '20px'
        }}
      >
        {icons.map((icon, index) => (
          <img
            key={index}
            src={icon.src}
            alt={icon.alt}
            style={{
              width: '100px',
              height: '80px',
              objectFit: 'cover',
              borderRadius: '8px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
            }}
          />
        ))}

      </div>
      <p className="loading-text">CARGANDO...</p>
      <h2 className="loading-text">Programas disponibles</h2>
      <div
        id="loading-icon"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '60px 20px',
          position: 'relative',
          width: 'auto',
          height: 'auto'
        }}
      >
        <img
          src={iteciIcon}
          alt="iteci"
          style={{ position: 'absolute' }}
        />
       
      </div>
    </div>
  );
};

export default CategoryIcons;
