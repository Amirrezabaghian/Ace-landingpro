'use client';

import type { ImageProps } from 'next/image';

import Image from 'next/image';
import React from 'react';

interface Props extends ImageProps {
  fallbackSrc?: string;
}
export const NextImage = ({ fallbackSrc, src, alt, ...rest }: Props) => {
  return (
    <Image
      alt={alt}
      src={src}
      onError={e => {
        if (fallbackSrc) e.currentTarget.src = fallbackSrc;
      }}
      {...rest}
    />
  );
};
