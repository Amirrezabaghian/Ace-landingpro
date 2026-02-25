/* eslint-disable @eslint-react/no-array-index-key */
'use client';

import type { StaticImageData } from 'next/image';

import { NextImage } from '@design/NextImage/NextImage';
import cn from '@libs/utils/cn';
import { AnimatePresence, motion } from 'motion/react';
import React from 'react';

interface Props {
  text: string;
  images: {
    x: number;
    y: number;
    rotate: number;
    src: string | StaticImageData;
  }[];
}

const InteractiveText = ({ text, images }: Props) => {
  const [isHovering, setIsHovering] = React.useState(false);

  return (
    <motion.span className=" relative">
      <span
        className={cn('cursor-pointer text-[#8C8C8C] hover:text-primary')}
        onMouseEnter={() => {
          setIsHovering(true);
        }}
        onMouseLeave={() => {
          setIsHovering(false);
        }}
        onMouseMove={() => {
          setIsHovering(true);
        }}
      >
        {text}{' '}
      </span>

      <AnimatePresence>
        {isHovering
          ? images.map((img, index) => (
              <motion.span
                className="pointer-events-none absolute left-0 top-0 z-20 h-[65px] w-[88px] overflow-hidden rounded-[18px]"
                key={`interactive-text-${index}`}
                custom={img}
                transition={{
                  duration: 0.3,
                  type: 'spring',
                  stiffness: 260,
                  damping: 20,
                }}
                animate={{
                  x: img.x,
                  y: img.y,
                  rotate: img.rotate,
                  opacity: 1,
                }}
                exit={{
                  x: 0,
                  y: 0,
                  rotate: 0,
                  opacity: 0,
                }}
                initial={{
                  x: 0,
                  y: 0,
                  rotate: 0,
                  opacity: 0,
                }}
                style={{
                  boxShadow:
                    '0px 3.705px 2.501px 0px rgba(255, 255, 255, 0.25) inset, 0px 0.926px 0px 0px #C1CABA',
                }}
              >
                <NextImage
                  height={240}
                  width={350}
                  alt={text}
                  className="size-full object-cover"
                  src={img.src}
                  priority
                />
              </motion.span>
            ))
          : null}
      </AnimatePresence>
    </motion.span>
  );
};

export default InteractiveText;
