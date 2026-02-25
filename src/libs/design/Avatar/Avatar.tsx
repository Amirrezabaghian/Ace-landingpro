import type { StaticImageData } from 'next/image';

// components/Avatar.tsx
import { NextImage } from '@design/NextImage/NextImage';
import cn from '@libs/utils/cn';
import React from 'react';

interface AvatarProps {
  src?: string | StaticImageData;
  alt?: string;
  size?: 'lg' | 'md' | 'sm';
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'sm',
  className,
}) => {
  const sizeClasses = {
    sm: 'w-[25px] h-[25px]',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center justify-center overflow-hidden rounded-full bg-gray-200 text-gray-700',
        sizeClasses[size],
        className,
      )}
    >
      {src ? (
        <NextImage
          height={size === 'sm' ? 25 : size === 'md' ? 48 : 64}
          width={size === 'sm' ? 25 : size === 'md' ? 48 : 64}
          alt={alt ?? ''}
          className="size-full object-cover"
          src={src}
        />
      ) : (
        <span className="text-sm">{alt?.charAt(0).toUpperCase()}</span>
      )}
    </div>
  );
};

export default Avatar;
