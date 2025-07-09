import React, { useState } from 'react';

const CampusSelector = ({ menuOptions, loading, setSelectedOption, setPlantelSelected }) => {
 
  const styles = {
    container: {
      textAlign: 'center',
      padding: '40px',
      background: 'linear-gradient(to right, #f0f4f8, #d9eefe)',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Poppins, sans-serif',
      maxWidth: '900px',
      margin: '40px auto',
    },
    heading: {
      fontSize: '28px',
      marginBottom: '30px',
      color: '#003366',
    },
    imageContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',
      marginBottom: '35px',
    },
    image: {
      width: '100px',
      height: '90px',
      objectFit: 'cover',
      borderRadius: '10px',
      border: '2px solid #ddd',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
    menu: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '15px',
    },
    button: {
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '6px',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
    image1: {
      width: '200px',
      height: '82px',
      objectFit: 'cover',
      borderRadius: '10px',
      border: '2px solid #ddd',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
    image2: {
      width: '125px',
      height: '80px',
      borderRadius: '10px',
      border: '2px solid #ddd',
      objectFit: 'cover',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.imageContainer}>
        <img src="/images/sep.jpeg" alt="SEP" style={styles.image1} />
        <img src="/images/canabe.jpeg" alt="CANABE" style={styles.image} />
         <img src="/images/stps.jpeg" alt="STPS" style={styles.image2} />
      </div>
      <h2 style={styles.heading}>Elige tu plantel más cercano</h2>

      

      <div style={styles.menu}>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          menuOptions.map((option, index) => (
            <button
              key={index}
              style={styles.button}
              onClick={() => {
                setSelectedOption(888);
                setPlantelSelected(index);
              }}
              onMouseEnter={e => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
              onMouseLeave={e => (e.target.style.backgroundColor = styles.button.backgroundColor)}
            >
              {option.name}
            </button>
          ))
        )}
        
      </div>
       <div style={styles.imageContainer}>
            
           
        </div>
    </div>
  );
};

export default CampusSelector;
