import React, { useState } from 'react';
import './FortuneWheel.css';


const premios = [
  { texto: '10% OFF', color: '#F87171' },
  { texto: '15% OFF', color: '#FBBF24' },
  { texto: '2x1', color: '#34D399' },
  { texto: '5% OFF', color: '#60A5FA' },
  { texto: '20% OFF', color: '#A78BFA' },
  { texto: '¡Gracias por participar!', color: '#F472B6' },
];

const RADIUS = 150;
const CENTER = 200;
const SEGMENT_ANGLE = 360 / premios.length;

function describeArc(startAngle, endAngle) {
  const x1 = CENTER + RADIUS * Math.cos((Math.PI / 180) * startAngle);
  const y1 = CENTER + RADIUS * Math.sin((Math.PI / 180) * startAngle);
  const x2 = CENTER + RADIUS * Math.cos((Math.PI / 180) * endAngle);
  const y2 = CENTER + RADIUS * Math.sin((Math.PI / 180) * endAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  return `M${CENTER},${CENTER} L${x1},${y1} A${RADIUS},${RADIUS} 0 ${largeArcFlag},1 ${x2},${y2} Z`;
}

export default function RuedaPersonalizada() {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState('');

  const spin = () => {
    if (spinning) return;

    const winnerIndex = Math.floor(Math.random() * premios.length);
    const rotationAmount = 360 * 6 + winnerIndex * SEGMENT_ANGLE;

    setSpinning(true);
    setRotation(rotationAmount);

    setTimeout(() => {
      setWinner(premios[winnerIndex].texto);
      setSpinning(false);
    }, 4000);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '40px' }}>
      <div style={{ position: 'relative', width: '400px', height: '400px', margin: '0 auto' }}>
        <svg
          viewBox="0 0 400 400"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: 'transform 4s ease-out',
          }}
        >
          <defs>
            {premios.map((premio, i) => {
              const startAngle = i * SEGMENT_ANGLE;
              const endAngle = (i + 1) * SEGMENT_ANGLE;

              const midAngle = startAngle + SEGMENT_ANGLE / 2;
              const arcId = `arc${i}`;

              const arcTextPath = describeArc(
                midAngle - SEGMENT_ANGLE / 2.5,
                midAngle + SEGMENT_ANGLE / 2.5
              );

              return (
                <React.Fragment key={i}>
                  <path d={describeArc(startAngle, endAngle)} fill={premio.color} />
                  <path id={arcId} d={arcTextPath} fill="none" />
                </React.Fragment>
              );
            })}
          </defs>

          {premios.map((premio, i) => (
            <text key={i} fill="#fff" fontSize="14" fontWeight="bold">
              <textPath href={`#arc${i}`} startOffset="50%" textAnchor="middle">
                {premio.texto}
              </textPath>
            </text>
          ))}
        </svg>

        <div
          style={{
            position: 'absolute',
            top: '0px',
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
        disabled={spinning}
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
        {spinning ? 'Girando...' : '🎯 ¡Girar la rueda!'}
      </button>

      {winner && !spinning && (
        <div style={{ marginTop: '20px', fontSize: '1.5rem', color: 'green', fontWeight: 'bold' }}>
          🎁 Ganaste: {winner}
        </div>
      )}
    </div>
  );
}
