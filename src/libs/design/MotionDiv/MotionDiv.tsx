'use client';

import type { MotionProps } from 'motion/react';
import type { HTMLAttributes } from 'react';

import { motion } from 'motion/react';
import React from 'react';

type CombinedProps = HTMLAttributes<HTMLDivElement> & MotionProps;
interface Props extends CombinedProps {
  children: React.ReactNode;
}
const MotionDiv = ({ children, ...rest }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      viewport={{ once: true }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default MotionDiv;
