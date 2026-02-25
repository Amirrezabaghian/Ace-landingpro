import type { MotionProps, Variants } from 'motion/react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

import CircleLoader from '@design/Loader/CircleLoader';
import cn from '@libs/utils/cn';
import { motion } from 'motion/react';

type CombinedProps = ButtonHTMLAttributes<HTMLButtonElement> & MotionProps;

interface Props extends CombinedProps {
  children: JSX.Element | ReactNode;
  primary?: boolean;
  secondary?: boolean;
  animated?: boolean;
  containerClass?: CombinedProps['className'];
  secondChild?: JSX.Element | ReactNode;
  loading?: boolean;
}

const backgroundVariant: Variants = {
  initial: {
    y: 20,
    opacity: 0,
  },
  hover: {
    transition: {
      delay: 0.1,
      duration: 0.2,
      ease: [0.19, 1, 0.22, 1],
    },
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.1,
      duration: 0.5,
      ease: [0.19, 1, 0.22, 1],
    },
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.3,
    },
  },
};

const firstTextVariant: Variants = {
  initial: {
    y: 0,
  },
  hover: {
    y: -30,
    transition: {
      duration: 0.7,
      ease: [0.19, 1, 0.22, 1],
    },
  },
  animate: {
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.19, 1, 0.22, 1],
    },
  },
};

const secondTextVariant: Variants = {
  initial: {
    y: 30,
  },
  hover: {
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.19, 1, 0.22, 1],
    },
  },
  animate: {
    y: 30,
    transition: {
      duration: 0.7,
      ease: [0.19, 1, 0.22, 1],
    },
  },
};

const Button = ({
  children,
  className,
  type = 'button',
  primary,
  secondary,
  animated = true,
  containerClass,
  secondChild,
  loading,
  ...rest
}: Props) => {
  return (
    <motion.button
      type={type}
      {...(animated
        ? {
            variants: backgroundVariant,
            initial: 'initial',
            whileInView: 'animate',
            viewport: { once: true },
            whileHover: 'hover',
            whileTap: 'tap',
          }
        : {})}
      className={cn(
        'flex min-w-fit items-center justify-center overflow-hidden disabled:cursor-not-allowed disabled:!opacity-60',
        {
          'primary-button-shadow bg-primary text-white rounded-full py-2 px-6':
            primary,
          ' bg-[#C9C9C926] text-primary rounded-full py-2 px-6': secondary,
        },
        className,
        containerClass,
      )}
      {...rest}
    >
      <div className="relative">
        <motion.span
          className={cn(className, 'flex items-center')}
          variants={firstTextVariant}
        >
          {loading ? <CircleLoader /> : null} {children}
        </motion.span>
        <motion.span
          aria-hidden
          variants={secondTextVariant}
          className={cn(
            className,
            'absolute left-0 top-0 flex w-full items-center',
          )}
        >
          {loading ? <CircleLoader /> : null} {children}
        </motion.span>
      </div>
    </motion.button>
  );
};

export default Button;
