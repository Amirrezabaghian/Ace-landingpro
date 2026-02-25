'use client';

import type { Variants } from 'motion/react';
import type { CSSProperties } from 'react';

import { TickIcon } from '@icons';
import cn from '@libs/utils/cn';
import { AnimatePresence, motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import React from 'react';

interface Props {
  task: {
    title: string;
    description: string;
    hasLineThrough?: boolean;
    color: CSSProperties['color'];
    isBestChoice?: boolean;
  };
  index: number;
}

const taskVariants: Variants = {
  hidden: {
    opacity: 0,
    x: '80%',
  },
  visible: {
    opacity: 1,
    x: 0,
  },
};

const AnimatedLineThrough = ({
  color,
  className,
}: {
  color: CSSProperties['color'];
  className?: string;
}) => (
  <motion.span
    className={cn('absolute left-0 top-[9px] h-[1px]', className)}
    initial={{ width: 0 }}
    style={{ backgroundColor: color }}
    whileInView={{ width: '100%' }}
    transition={{ duration: 0.7, delay: 1.1 }}
    viewport={{ once: true }}
  />
);

const TaskItem = ({ index, task }: Props) => {
  const t = useTranslations('landing.designPartner.taskList');
  const { color, description, hasLineThrough, isBestChoice, title } = task;

  return (
    <motion.div
      animate="visible"
      className="flex items-center gap-2.5"
      initial="hidden"
      variants={taskVariants}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div
        className="h-[38px] w-[3px] rounded-[9px]"
        style={{ backgroundColor: color }}
      />

      <div
        className="flex w-full items-center justify-between gap-4 rounded-[14px] px-3 py-2.5"
        style={{
          backgroundColor: `${color}1A`,
        }}
      >
        <div className=" flex flex-col gap-1.5">
          <span
            className={cn('relative w-fit text-sm font-medium !leading-[17px]')}
            style={{ color }}
          >
            {hasLineThrough ? <AnimatedLineThrough color={color} /> : null}
            {title}
          </span>
          <span
            className={cn('relative w-fit text-xs !leading-[15px] opacity-40')}
            style={{ color }}
          >
            {hasLineThrough ? (
              <AnimatedLineThrough className="top-[7px]" color={color} />
            ) : null}

            {description}
          </span>
          {/* //? best choice badge */}
        </div>
        <AnimatePresence>
          {isBestChoice ? (
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.7 }}
              viewport={{ once: true }}
              className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-medium
          "
            >
              <TickIcon className="h-[5.5px] w-[7.62px]" />
              {t('bestChoice')}
            </motion.span>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default TaskItem;
