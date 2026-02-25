/* eslint-disable complexity */
import { AnimatePresence, motion } from 'motion/react';
import React, { useState } from 'react';

// Define the custom type for the index prop
export type TooltipIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode; // Content can now be any React node
  index: TooltipIndex; // Index of the grid item (0 to 8)
}

// Define positions for each index using an object
const TOOLTIP_POSITIONS = {
  0: { horizontal: 'left', vertical: 'top' }, // Top-left corner
  1: { horizontal: 'center', vertical: 'top' }, // Top-center
  2: { horizontal: 'right', vertical: 'top' }, // Top-right corner
  3: { horizontal: 'left', vertical: 'middle' }, // Middle-left
  4: { horizontal: 'center', vertical: 'middle' }, // Center
  5: { horizontal: 'right', vertical: 'middle' }, // Middle-right
  6: { horizontal: 'left', vertical: 'bottom' }, // Bottom-left corner
  7: { horizontal: 'center', vertical: 'bottom' }, // Bottom-center
  8: { horizontal: 'right', vertical: 'bottom' }, // Bottom-right corner
};

const Tooltip: React.FC<TooltipProps> = ({ children, content, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const boundaryThreshold = 0.66; // Threshold for stopping the tooltip (e.g., 0.5 for midpoint)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    const relativeY = e.clientY - rect.top;
    setMousePosition({ x: relativeX, y: relativeY });
  };

  const getTooltipStyle = () => {
    const gridItemWidth = 170; // Width of each grid item
    const gridItemHeight = 120; // Height of each grid item

    const offsetRight = 40;

    const boundaryX = gridItemWidth * boundaryThreshold;
    const boundaryY = gridItemHeight * 0.33;

    let x = mousePosition.x;
    let y = mousePosition.y;

    const { horizontal, vertical } = TOOLTIP_POSITIONS[index];

    if (horizontal === 'left') {
      if (
        (vertical === 'top' && mousePosition.y < boundaryY) ||
        (vertical === 'bottom' && mousePosition.y > boundaryY)
      ) {
        x = x - 80;
      } else {
        x = Math.min(x - 140, -100);
      }
    } else if (horizontal === 'right') {
      if (
        (vertical === 'top' && mousePosition.y < boundaryY) ||
        (vertical === 'bottom' && mousePosition.y > boundaryY)
      ) {
        x = x - 25;
      } else {
        x = Math.max(x + offsetRight, 140);
      }
    } else if (horizontal === 'center') {
      x = x - 50;
    }

    if (vertical === 'top') {
      if (horizontal === 'center') {
        y = Math.min(y - 90, -25);
      } else {
        y = Math.min(y - 80, boundaryY);
      }
    } else if (vertical === 'bottom') {
      if (horizontal === 'center') {
        y = Math.max(y + 50, 120);
      } else y = Math.max(y + 50, -80);
    } else if (vertical === 'middle') {
      y = Math.min(y - 40, boundaryY);
    }

    return { top: y, left: x };
  };

  return (
    <div className="relative">
      <div
        className="cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
      >
        {children}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              animate={{ opacity: 1, scale: 1, ...getTooltipStyle() }}
              exit={{ opacity: 0, scale: 0.9 }}
              initial={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.1 }}
              style={{
                position: 'absolute',
                pointerEvents: 'none',
                zIndex: 1000,
                minWidth: 'max-content',
              }}
            >
              {content}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Tooltip;
