import type { HtmlHTMLAttributes } from 'react';

import '@/styles/fixedBlur.css';
import cn from '@libs/utils/cn';
import React, { useEffect, useState } from 'react';

const BlurBox = ({
  position = 'bottom',
  className,
}: {
  position?: 'bottom' | 'top';
  className?: HtmlHTMLAttributes<HTMLDivElement>['className'];
}) => {
  const [showBlurBox, setShowBlurBox] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (position === 'bottom') {
        const scrollPosition = window.scrollY + window.innerHeight;
        const documentHeight = document.body.offsetHeight;

        if (documentHeight - scrollPosition <= 100) {
          setShowBlurBox(false);
        } else {
          setShowBlurBox(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [position]);

  return (
    <div
      className={cn(
        'blur-box-container',
        {
          'bottom-0 rotate-180': position === 'bottom',
          'top-0': position === 'top',
          'hidden': !showBlurBox,
        },
        className,
      )}
    >
      <div className="item-blur-4"></div>
      <div className="item-blur-3"></div>
      <div className="item-blur-2"></div>
      <div className="item-blur-1"></div>
    </div>
  );
};

export default BlurBox;
