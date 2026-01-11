import React from 'react';

interface SpinnerProps {
  size?: number;
  strokeWidth?: number;
  color?: string;
  speed?: string;
}

export const CircularProgressIndicator: React.FC<SpinnerProps> = ({
  size = 20,
  strokeWidth = 3,
  color = 'text-secondary',
  speed = '1s',
}) => {
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashArray = `${0.75 * circumference} ${circumference}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="status"
      style={{ animation: `spin ${speed} linear infinite` }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx={center}
        cy={center}
        r={radius}
        strokeWidth={strokeWidth}
        fill="none"
      />

      <circle
        cx={center}
        cy={center}
        r={radius}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        fill="none"
        strokeDasharray={dashArray}
        strokeDashoffset="0"
        className={`${color} transition-stroke-dashoffset duration-300`}
      />

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </svg>
  );
};
