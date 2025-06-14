import { useState, useEffect } from 'react';


export function Spinner({ value }) {
 const radius = 80;
  const stroke = 30;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative flex justify-center items-center">
<svg    
        
        width={radius * 2}
        height={radius * 2}
        className="block animate-spin "
        style={{ display: 'block' }}
      >
        <defs>
          <linearGradient id="progressGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2196f3" />
            <stop offset="100%" stopColor="#90caf9" />
          </linearGradient>
        </defs>
        {/* Фон круга */}
        <circle
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={stroke}
        />
        {/* Прогресс */}
        <circle
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
        />
      </svg>
      <span className="absolute text-2xl font-bold text-orange-600" style={{
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
      }}>
        {/* {value} */}
        ?%
      </span>
    </div>
  );
}