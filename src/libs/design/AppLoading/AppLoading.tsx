'use client';

import type { ReactNode } from 'react';

import { ProgressRingContainer } from '@design/ProgressRing/ProgressRing';
import { LogoVector } from '@icons';
import cn from '@libs/utils/cn';
import dynamic from 'next/dynamic';
import React, { useEffect, useRef, useState } from 'react';

interface LoaderProps {
  isExiting: boolean;
  children?: ReactNode;
  time: number;
}

// const Lottie = dynamic(() => import('lottie-react'), {
//   ssr: false,
// });

const maxTime = 3.5;

const Loader = ({ isExiting, time }: LoaderProps) => {
  return (
    <div
      className={cn(
        ' fixed left-0 top-0 z-[99999] flex h-screen w-full items-center justify-center bg-white transition-all duration-500',
        {
          '-translate-y-full': isExiting,
        },
      )}
    >
      <ProgressRingContainer
        maxTime={maxTime - 0.5}
        time={Math.min(time, maxTime - 0.5)}
      >
        <div className="flex size-[80px] items-center justify-center">
          <LogoVector className="size-full" />
        </div>
      </ProgressRingContainer>
    </div>
  );
};

const AppLoading: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const [timer, setTimer] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimer(prev => {
        if (prev >= maxTime) {
          clearInterval(intervalRef.current!);
          return maxTime;
        }
        return prev + 1;
      });
    }, 1000);

    const handleLoad = () => {
      setIsLoaded(true);
    };
    if (typeof window === 'undefined' || typeof document === 'undefined')
      return;

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
      clearInterval(intervalRef.current!);
    };
  }, []);

  useEffect(() => {
    if (isLoaded && timer >= maxTime) {
      timeoutRef.current = setTimeout(() => {
        setIsLoading(false);
      }, 550);
      setIsExiting(true);
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isLoaded, timer]);

  return <>{isLoading && <Loader isExiting={isExiting} time={timer} />}</>;
};

export default AppLoading;
