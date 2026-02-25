import React, { useEffect, useState } from 'react';
import '@/styles/loader.css';

interface Props {
  duration?: number;
  activeSlide: number;
}

const CircleLoadingTimer: React.FC<Props> = ({ duration = 3, activeSlide }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration);
    const timer = setInterval(() => {
      setTimeLeft(prev => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [activeSlide, duration]);

  return (
    <div className="relative ">
      <div className="spinner-loader w-[27px]" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs text-[#252525]">
        {timeLeft}
      </div>
    </div>
  );
};

export default CircleLoadingTimer;
