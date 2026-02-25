'use client';

import type { Variants } from 'motion/react';

import _3DMotionGif from '@assets/animationBox/3D-motion.webp';
import IllustrationsGif from '@assets/animationBox/illustrations.webp';
import LogoGif from '@assets/animationBox/logo-motion.webp';
import ProductGif from '@assets/animationBox/product.webp';
import { Project0, Project2, Project3, Project5 } from '@assets/index';
import ProjectUI1 from '@assets/recentWorks/recent-4.png';
import ProjectUI0 from '@assets/recentWorks/recent-7.png';
import { NextImage } from '@design/NextImage/NextImage';
import { AnimatePresence, motion } from 'motion/react';
import React, { useEffect, useRef, useState } from 'react';

interface Project {
  src: any;
  type: string;
}

const projects: Project[] = [
  { src: _3DMotionGif, type: '3D Motion' },
  { src: IllustrationsGif, type: 'Illustrations' },
  { src: LogoGif, type: 'Logo Motion' },
  { src: ProductGif, type: 'Product' },
];

const boxImgVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -20,
  },
};

const badgeVariants: Variants = {
  initial: { opacity: 0, y: 6, x: '100%' },
  animate: { opacity: 1, y: 0, x: '100%' },
  exit: { opacity: 0, y: -6, x: '100%' },
};

const AnimationBox = () => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [queue, setQueue] = useState<Project[]>(projects.slice(0, 2));
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const updateQueue = () => {
      const nextIndex = (currentProjectIndex + 1) % projects.length;
      setCurrentProjectIndex(nextIndex);
      setQueue([
        projects[nextIndex],
        projects[(nextIndex + 1) % projects.length],
      ]);
    };

    intervalRef.current = setInterval(updateQueue, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentProjectIndex]);

  const currentProject = queue[0];

  return (
    <div className="relative">
      <div
        className=" h-[49px] w-[65px] overflow-hidden rounded-[14px]"
        style={{
          boxShadow:
            '0px 2.778px 1.875px 0px rgba(255, 255, 255, 0.25) inset, 0px 0.695px 0px 0px #BAB0AA',
        }}
      >
        <AnimatePresence mode="popLayout">
          <motion.div
            animate="animate"
            className="size-full"
            // className="absolute inset-0" // Absolute positioning for overlapping
            exit="exit"
            initial="initial"
            key={currentProjectIndex}
            variants={boxImgVariants}
            transition={{ duration: 0.3 }}
          >
            <NextImage
              height={49}
              width={65}
              alt="we-building"
              className="size-full rounded-[14px] object-cover"
              src={currentProject.src}
              unoptimized
            />
          </motion.div>
        </AnimatePresence>
      </div>
      <motion.div
        animate="animate"
        className="absolute -top-4 right-6 flex items-center justify-center rounded-[22px] bg-[#5E5E5E] px-4 py-1.5 text-xs !leading-normal text-white"
        exit="exit"
        initial="initial"
        key={`badge-${currentProjectIndex}`}
        variants={badgeVariants}
        transition={{ duration: 0.2, delay: 0.3 }}
        style={{
          boxShadow:
            '0px 10px 16px -10px rgba(0, 0, 0, 0.40), 0px -1px 0.5px 0px rgba(0, 0, 0, 0.11) inset, 0.5px 0.5px 0px 0px rgba(255, 255, 255, 0.24) inset',
        }}
      >
        <p className="flex whitespace-nowrap">{currentProject.type}</p>
      </motion.div>
    </div>
  );
};

export default AnimationBox;
