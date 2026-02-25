'use client';

import type { TooltipIndex } from '@design/ToolTip/ToolTip';
import type { StaticImageData } from 'next/image';

import Dot from '@design/Dot/Dot';
import { NextImage } from '@design/NextImage/NextImage';
import Tooltip from '@design/ToolTip/ToolTip';
import { motion } from 'motion/react';
import React from 'react';

import ProjectToolTip from './ProjectToolTip';

interface Props {
  name: string;
  designer: {
    name: string;
    image: string | StaticImageData;
  };
  src: any;
  link: string;
  index: number;
}

const imageVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const DesignedProjectItem = ({ designer, src, name, index, link }: Props) => {
  const dotsIndex = [0, 1, 3, 4];
  return (
    <Tooltip
      index={index as TooltipIndex}
      content={<ProjectToolTip designer={designer} title={name} />}
    >
      <a
        className="relative min-w-max"
        href={link}
        rel="noreferrer"
        target="_blank"
      >
        <motion.div
          className="h-[122px] min-h-[122px] w-[170px] min-w-[170px] rounded-[13px]"
          initial={'hidden'}
          variants={imageVariants}
          whileInView={'visible'}
          transition={{ duration: 0.5, delay: 0.05 * index }}
          viewport={{ once: true }}
        >
          <NextImage
            height={200}
            width={140}
            alt={name}
            className="size-full rounded-[13px] object-cover"
            src={src}
            unoptimized
          />
        </motion.div>
        {/* //? show dot on 0,1,3,4 index */}
        {dotsIndex.includes(index) && (
          <Dot
            size={4}
            className="absolute -bottom-2.5 -right-2.5"
            color="#D9D9D9"
          />
        )}
      </a>
    </Tooltip>
  );
};

export default DesignedProjectItem;
