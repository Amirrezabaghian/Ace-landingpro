'use client';
import type { Variants } from 'motion/react';
import type { StaticImageData } from 'next/image';

import CursorBoxContent from '@design/CursorBoxContent/CursorBoxContent';
import { NextImage } from '@design/NextImage/NextImage';
import cn from '@libs/utils/cn';
import { motion } from 'motion/react';
import React from 'react';

interface Props {
  member: {
    name: string;
    img: string | StaticImageData;
  };
  index: number;
  setHoveredImage?: (index: number | null) => void;
  hoveredImage: number | null;
}

const boxVariants: Variants = {
  animate: {
    y: 0,
    opacity: 1,
  },
  initial: {
    y: 25,
    opacity: 0,
  },
};

const MemberItem = ({
  member,
  index,
  setHoveredImage,
  hoveredImage,
}: Props) => {
  return (
    <motion.div
      initial="initial"
      key={member.name}
      variants={boxVariants}
      whileInView="animate"
      onHoverEnd={() => setHoveredImage?.(null)}
      onHoverStart={() => setHoveredImage?.(index)}
      transition={{
        delay: index * 0.2,
        duration: 0.6,
      }}
      viewport={{ once: true }}
      className={cn(
        'flex cursor-pointer flex-col items-center rounded-[14px]',
        {
          'blur-[1px]': hoveredImage !== null && hoveredImage !== index,
        },
      )}
    >
      <CursorBoxContent content={member.name} followCursor="x" offsetY={-6}>
        <NextImage
          height={160}
          width={160}
          alt={member.name}
          className="size-[50px] rounded-[14px] object-cover"
          quality={100}
          src={member.img}
        />{' '}
      </CursorBoxContent>
    </motion.div>
  );
};

export default MemberItem;
