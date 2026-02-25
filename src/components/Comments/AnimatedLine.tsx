/* eslint-disable @eslint-react/no-array-index-key */
import { CircleShape, PolygonShape, SquareShape } from '@icons';
import { motion } from 'motion/react';
import React from 'react';

type ShapeType = 'circle' | 'polygon' | 'square';

const shapeComponents: Record<ShapeType, JSX.Element> = {
  circle: <CircleShape className="circle-shape size-[5px]" />,
  polygon: (
    <PolygonShape className="polygon-shape size-[7px] origin-center scale-110 " />
  ),
  square: <SquareShape className="square-shape size-[7px]" />,
};

const shapes: ShapeType[] = [
  'circle',
  'polygon',
  'square',
  'circle',
  'polygon',
  'square',
];

const AnimatedLine = () => {
  return (
    <div className="absolute -top-14 left-1.5 flex h-[423px] w-full justify-center">
      <div className="h-full w-[3px] border-l-2 border-[#E4E4E4]" />
      <div className="relative flex h-full w-[10px] translate-x-[-7px] flex-col items-center">
        {shapes.map((shape, index) => (
          <motion.div
            animate={{ y: 395 }}
            initial={{ y: -70 }}
            key={index}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'linear',
              delay: index * 1,
            }}
          >
            {shapeComponents[shape]}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedLine;
