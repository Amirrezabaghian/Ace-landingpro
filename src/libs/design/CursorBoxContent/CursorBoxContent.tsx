'use client';

import type { Variants } from 'motion/react';
import type { MouseEventHandler, ReactNode } from 'react';

import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface CursorBoxContentProps {
  content: string | ReactNode;
  children: ReactNode;
  offsetY?: number;
  followCursor?: 'none' | 'x' | 'xy' | 'y';
  positioning?: 'fixed' | 'relative';
}

const CursorBoxContent: React.FC<CursorBoxContentProps> = ({
  content,
  children,
  offsetY = 0,
  followCursor = 'x',
  positioning = 'relative',
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = useCallback(
    event => {
      if (isHovering && tooltipRef.current && triggerRef.current) {
        const triggerRect = triggerRef.current.getBoundingClientRect();
        const tooltipRect = tooltipRef.current.getBoundingClientRect();
        let newX = 0;
        let newY = 0;

        if (followCursor === 'x' || followCursor === 'xy') {
          if (positioning === 'fixed') {
            newX = event.clientX - tooltipRect.width / 2;
            newY = triggerRect.top + 90;
          } else {
            newX = event.clientX - triggerRect.left - tooltipRect.width / 2;
            newY = offsetY;
          }
        }

        if (followCursor === 'y' || followCursor === 'xy') {
          newY =
            positioning === 'fixed'
              ? event.clientY + offsetY
              : event.clientY - triggerRect.bottom + offsetY;
        }

        setPosition({ x: newX, y: newY });
      }
    },
    [isHovering, followCursor, offsetY, positioning],
  );

  const variants: Variants = {
    visible: ({ x, y }: { x: number; y: number }) => ({
      opacity: 1,
      scale: 1,
      x,
      y,
      transition: { duration: 0, type: 'tween' },
    }),
    delayedVisible: {
      opacity: 1,
      transition: {
        delay: 0.05,
        duration: 0.05,
      },
    },
    hidden: ({ x, y }: { x: number; y: number }) => ({
      opacity: 0,
      scale: 1,
      x,
      y,
      transition: { duration: 0, type: 'tween' },
    }),
  };

  const tooltipContent = (
    <AnimatePresence>
      {isHovering && (
        <motion.div
          animate={['visible', 'delayedVisible']}
          exit="hidden"
          initial="hidden"
          ref={tooltipRef}
          style={positioning === 'fixed' ? { left: 0, top: 0 } : {}}
          variants={variants}
          custom={position}
          className={`pointer-events-none ${
            positioning === 'fixed' ? 'fixed' : 'absolute'
          } z-10`}
        >
          {typeof content === 'string' ? (
            <div
              className="whitespace-nowrap rounded-[22px] bg-primary px-4 py-1.5 text-xs text-white"
              style={{
                boxShadow:
                  '0px 10px 16px -10px rgba(0, 0, 0, 0.40), 0px -1px 0.5px 0px rgba(0, 0, 0, 0.11) inset, 0.5px 0.5px 0px 0px rgba(255, 255, 255, 0.24) inset',
              }}
            >
              {content}
            </div>
          ) : (
            content
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div
      className={positioning === 'relative' ? 'relative' : ''}
      ref={triggerRef}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
    >
      {children}
      {typeof window !== 'undefined' && positioning === 'fixed'
        ? createPortal(tooltipContent, document.body)
        : tooltipContent}
    </div>
  );
};

export default CursorBoxContent;
