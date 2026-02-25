import type { CSSProperties } from 'react';

import cn from '@libs/utils/cn';
import '@/styles/loader.css';
import React from 'react';

interface Props {
  size?: CSSProperties['width'];
  color?: 'black' | 'white';
}

const CircleLoader = ({ size = 13, color = 'white' }: Props) => {
  return (
    <div
      className={cn({
        'spinner-loader-white': color === 'white',
        'spinner-loader': color === 'black',
      })}
      style={{
        width: size,
        height: size,
      }}
    />
  );
};

export default CircleLoader;
