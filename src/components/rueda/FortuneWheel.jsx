import React, { useState } from 'react';
import { premioTranslation, formatDate } from "../utils/utils"; // Adjust the import path as necessary
import { askRefer } from "../api/apiReferidos"; // Import API function

const premios = [
  { texto: 'Sorpresa 1', color: '#F87171' },
  { texto: 'Sorpresa 2', color: '#34D399' },
  { texto: 'Sorpresa 3', color: '#F472B6' },
  { texto: 'Sorpresa 4', color: '#ec4899' },
  { texto: 'Sorpresa 5', color: '#facc15' }
];

const RADIUS = 150;
const CENTER = 200;
const SEGMENT_ANGLE = 360 / premios.length;

function describeArc(startAngle, endAngle) {
  const start = polarToCartesian(CENTER, CENTER, RADIUS, endAngle);
  const end = polarToCartesian(CENTER, CENTER, RADIUS, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  return [
    `M ${CENTER} ${CENTER}`,
    `L ${start.x} ${start.y}`,
    `A ${RADIUS} ${RADIUS} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
    'Z',
  ].join(' ');
}

function polarToCartesian(cx, cy, r, angleInDegrees) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: cx + r * Math.cos(angleInRadians),
    y: cy + r * Math.sin(angleInRadians),
  };
}




export default function FortuneWheel({ place, curso, setSelectedOption, premioRef}) {
  const course = place?.categories[curso];
 
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleBack = () => {
    setSelectedOption(444); // or whatever value triggers the previous menu
    askRefer(premioRef.current).then((response) => {
      console.log('API response:', response);
    }).catch((error) => {
      console.error('API error:', error);
    });
  };

  const spin = () => {
    if (spinning) return;
    const winnerIndex = Math.floor(Math.random() * premios.length);
    console.log('winnerIndex:', winnerIndex);
    // Calculate the final rotation angle based on the winner's index
    const finalRotation = 360 * 5 + (360 - winnerIndex * SEGMENT_ANGLE - SEGMENT_ANGLE / 2);
    setSpinning(true);
    setRotation(finalRotation);
    setTimeout(() => {
      setWinner(premios[winnerIndex].texto);
      //setSpinning(false);
      // 🎉 Trigger confetti via the global script
      if (window.confetti) {
        window.confetti({
          particleCount: 150,
          spread: 90,
          origin: { y: 0.6 },
        });
      }
     
    }, 4000);
    setTimeout(() => {
      // 🎁 Show modal after win
      setShowModal(true);
    }, 6500);
  };
  if (!course) {
    return <div>Error: Curso no encontrado</div>;
  }

  return (
    <div>
    {showModal === false? (
    <div style={{ textAlign: 'center', marginTop: '30px' }}>
      <div style={{ position: 'relative', width: 400, height: 400, margin: '0 auto' }}>
        <svg
          viewBox="0 0 400 400"
          style={{
            width: '100%',
            height: '100%',
            transform: `rotate(${rotation}deg)`,
            transition: 'transform 4s ease-out',
          }}
        >
          <defs>
            {premios.map((_, i) => {
              const mid = i * SEGMENT_ANGLE + SEGMENT_ANGLE / 2;
              return (
                <path
                  key={`arcPath${i}`}
                  id={`textPath${i}`}
                  d={describeArc(mid - SEGMENT_ANGLE / 2.5, mid + SEGMENT_ANGLE / 2.5)}
                  fill="none"
                />
              );
            })}
          </defs>

          {premios.map((premio, i) => {
            const startAngle = i * SEGMENT_ANGLE;
            const endAngle = (i + 1) * SEGMENT_ANGLE;
            return (
              <path
                key={`slice${i}`}
                d={describeArc(startAngle, endAngle)}
                fill={premio.color}
              />
            );
          })}

            {premios.map((premio, i) => {
              const angle = i * SEGMENT_ANGLE + SEGMENT_ANGLE / 2;
              const radians = (angle - 90) * (Math.PI / 180);
              const x = CENTER + (RADIUS / 2.2) * Math.cos(radians);
              const y = CENTER + (RADIUS / 2.2) * Math.sin(radians);

              const words = premio.texto.split(' ');
              const firstLine = words.slice(0, Math.ceil(words.length / 2)).join(' ');
              const secondLine = words.slice(Math.ceil(words.length / 2)).join(' ');

              return (
                <text
                  key={`text${i}`}
                  x={x}
                  y={y}
                  fill="white"
                  fontSize="13"
                  fontWeight="bold"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  transform={`rotate(${angle}, ${x}, ${y})`}
                >
                  <tspan x={x} dy="-0.6em">{firstLine}</tspan>
                  <tspan x={x} dy="1.2em">{secondLine}</tspan>
                </text>
              );
            })}

        </svg>

        {/* Pointer */}
        <div
          style={{
            position: 'absolute',
            top: '-10px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '2rem',
          }}
        >
          🔻
        </div>
      </div>

      <button
        onClick={spin}
        visible={!spinning}
        style={{
          marginTop: '20px',
          padding: '15px 30px',
          fontSize: '1.2rem',
          background: 'linear-gradient(to right, #ec4899, #facc15)',
          color: 'white',
          border: 'none',
          borderRadius: '9999px',
          cursor: spinning ? 'not-allowed' : 'pointer',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        }}
      >
        🎯 ¡Girar la rueda!
      </button>

      {winner && !spinning && (
        <div
          style={{
            marginTop: '20px',
            fontSize: '1.5rem',
            color: 'green',
            fontWeight: 'bold',
          }}
        >
          🎁 Ganaste: {premioTranslation(winner)}
        </div>
      )}
    </div>):
     (
      <div style={styles.overlay}>
        <div style={styles.modal}>
          <h2>Bienvenido a Grupo iTECi🎉 ¡Felicidades!🎉 </h2>
          <p>🎉 Ganaste: <span style={{ fontWeight: 'bold', fontSize: '1.2em', color: 'blue' }}>{premioTranslation(winner)}</span></p>
          <p>Para el curso de : <span style={{ fontWeight: 'bold', fontSize: '1em', color: 'red' }}>{course.name.toUpperCase()}</span></p>
          
          
          <p>Con fecha de inicio : <span style={{ fontWeight: 'bold', fontSize: '1em', color: 'blue' }}>
            
            {formatDate(course.categoryDetails.startDate)}
          </span></p>

          <p>Plantel : <span style={{ fontWeight: 'bold', fontSize: '1em', color: 'red' }}>{place.name}</span></p>
          
          <p>Horario : <span style={{ fontWeight: 'bold', fontSize: '.8em', color: 'blue' }}>{course.categoryDetails.horario}</span></p>
              
          <form onSubmit={(e) => {
            e.preventDefault();
          
            setShowModal(false);
        
            premioRef.current.premio = winner;
            premioRef.current.fecha = new Date().toLocaleDateString('es-MX');
            const hoy = new Date();
            const manana = new Date(hoy);
            manana.setDate(hoy.getDate() + 2);
            premioRef.current.valido = manana.toLocaleDateString('es-MX');
            premioRef.current.category = course.name;
            premioRef.current.plantel = place.name;
            premioRef.current.id = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
            premioRef.current.fechaInicio = course.categoryDetails.startDate;
            premioRef.current.horario = course.categoryDetails.horario;
            premioRef.current.inscripcion = course.categoryDetails.costoInscripcion;
           
            
            handleBack();
          }}>
             
            <button type="submit" style={styles.button}>Descargar premio</button>
            
           
            <button type="button" onClick={() => setShowModal(false)} style={styles.button}>Cancelar</button>
          </form>
        </div>
      </div>
    )}
    </div>
  );
    
}

const styles = {
  overlay: {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    background: 'white',
    padding: '2rem',
    borderRadius: '1rem',
    textAlign: 'center',
    maxWidth: '400px',
    width: '90%',
    boxShadow: '0 0 20px rgba(0,0,0,0.3)',
  },
  input: {
    margin: '0.5rem 0',
    padding: '0.5rem',
    width: '100%',
    borderRadius: '0.5rem',
    border: '1px solid #ccc',
  },
  button: {
    marginTop: '1rem',
    padding: '0.5rem 1rem',
    border: 'none',
    backgroundColor: '#00b894',
    color: 'white',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    margin: '0.5rem',
    fontSize: '1rem',
    fontWeight: 'bold',
  }
};

