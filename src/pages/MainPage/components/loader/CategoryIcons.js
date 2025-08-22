import React from 'react';
import barberIcon from '../../../../assets/icon-barbershop.jpg';
import estilismoIcon from '../../../../assets/icon-estilismo.jpg';
import nurseIcon from '../../../../assets/icon-nurse.jpg';
import prepaIcon from '../../../../assets/icon-prepa.jpg';

const CategoryIcons = () => {
  const icons = [
    { src: barberIcon, alt: 'Barbería' },
    { src: estilismoIcon, alt: 'Estilismo' },
    { src: nurseIcon, alt: 'Enfermería' },
    { src: prepaIcon, alt: 'Preparatoria' }
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '20px', padding: '20px' }}>
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
  );
};

export default CategoryIcons;