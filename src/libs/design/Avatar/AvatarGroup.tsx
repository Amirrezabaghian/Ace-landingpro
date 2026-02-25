/* eslint-disable @eslint-react/no-array-index-key */
import type { StaticImageData } from 'next/image';

import cn from '@libs/utils/cn';
import React from 'react';

import Avatar from './Avatar';

interface AvatarGroupProps {
  avatars: {
    src?: string | StaticImageData;
    img?: string | StaticImageData;
    alt?: string;
  }[];
  max?: number;
  size?: 'lg' | 'md' | 'sm';
  className?: string;
}

const AvatarGroup: React.FC<AvatarGroupProps> = ({
  avatars,
  max = 5,
  size = 'sm',
  className,
}) => {
  const displayedAvatars = avatars.slice(0, max);
  const remainingCount = avatars.length - max;

  return (
    <div className={cn('flex max-sm:-space-x-2 sm:space-x-[4px]', className)}>
      {displayedAvatars.map((avatar, index) => (
        <Avatar
          size={size}
          alt={avatar.alt}
          className="border-white max-sm:border-2"
          key={index}
          src={avatar.src ?? avatar.img}
        />
      ))}
      {remainingCount > 0 && (
        <div
          className={cn(
            'inline-flex items-center justify-center border-2 border-white bg-gray-300 text-gray-700',
            {
              sm: 'w-8 h-8 text-xs',
              md: 'w-12 h-12 text-sm',
              lg: 'w-16 h-16 text-lg',
            }[size],
            'rounded-full',
          )}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;
