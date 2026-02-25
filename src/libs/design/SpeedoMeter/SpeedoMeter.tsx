import React, { useEffect, useRef, useState } from 'react';

interface SpeedoMeterProps {
  values: number[];
  duration?: number;
  size?: string;
  color?: string;
  fontFamily?: string;
}

const SpeedoMeter: React.FC<SpeedoMeterProps> = ({
  values,
  duration = 300,
  size = '14px',
  color = 'white',
}) => {
  const [currentValue, setCurrentValue] = useState(values[0] || 0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalId = useRef<any>(null);

  useEffect(() => {
    intervalId.current = setInterval(() => {
      setCurrentIndex(prevIndex => {
        return (prevIndex + 1) % values.length;
      });
    }, 1500);
    return () => clearInterval(intervalId.current);
  }, []);

  useEffect(() => {
    setCurrentValue(values[currentIndex] || 0);
  }, [currentIndex, values]);

  const valueString = currentValue.toString();

  const speedoWrapStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    overflow: 'hidden',
    height: size,
    fontSize: size,
    lineHeight: size,
  };

  return (
    <div style={speedoWrapStyle}>
      {valueString.split('').map((val, idx) => {
        return (
          <div
            key={`number_item_${idx}`}
            style={{
              color,
              marginTop: `calc( -${parseInt(val, 10)}em )`,
              transition: `${duration}ms all cubic-bezier(0, 0.99, 1, 1.01)`,
              transitionDelay: `${(valueString.length - idx - 1) * 20}ms`,
            }}
          >
            {Array.from({ length: 10 }, (_, i) => (
              <div data-val={i} key={i}>
                {i}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default SpeedoMeter;
