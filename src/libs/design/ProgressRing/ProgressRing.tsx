'use client';

import type { ReactNode } from 'react';

import React from 'react';

interface ProgressRingProps {
  radius: number;
  stroke: number;
  progress: number;
}

const ProgressRing: React.FC<ProgressRingProps> = ({
  radius,
  stroke,
  progress,
}) => {
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg height={radius * 2} width={radius * 2} className="progress-ring">
      <circle
        cx={radius}
        cy={radius}
        fill="transparent"
        r={normalizedRadius}
        style={{ strokeDashoffset }}
        stroke="#252525"
        strokeDasharray={`${circumference} ${circumference}`}
        strokeWidth={stroke}
      />
    </svg>
  );
};

interface ProgressRingContainerProps {
  maxTime: number;
  children?: ReactNode;
  time: number;
}

export const ProgressRingContainer = ({
  maxTime = 5,
  children,
  time = 0,
}: ProgressRingContainerProps) => {
  const progress = (time / maxTime) * 100;

  return (
    <div className="relative">
      <div className="absolute left-0 top-0 flex size-full items-center justify-center">
        {children}
      </div>
      <ProgressRing radius={65} progress={progress} stroke={2.5} />
    </div>
  );
};
