import type { CSSProperties, HTMLAttributes } from 'react';

import cn from '@libs/utils/cn';

interface DotProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  size?: CSSProperties['width'];
  color?: CSSProperties['color'];
  secondColor?: CSSProperties['color'];
  animated?: boolean;
}

const Dot = ({
  className,
  size = '1px',
  color = '#D9D9D9',
  secondColor,
  animated,
  style,
  ...rest
}: DotProps) => {
  if (animated) {
    return (
      <span
        className="relative flex"
        style={{
          width: size,
          height: size,
          ...style,
        }}
        {...rest}
      >
        <span
          className="absolute inline-flex size-full animate-ping rounded-full"
          style={{
            backgroundColor: secondColor ?? color,
            opacity: secondColor ? 1 : 0.5,
          }}
        ></span>
        <span
          className="relative inline-flex rounded-full"
          style={{
            width: size,
            height: size,
            background: color,
          }}
        ></span>
      </span>
    );
  }

  return (
    <div
      className={cn('rounded-full', className)}
      style={{ width: size, height: size, backgroundColor: color, ...style }}
      {...rest}
    />
  );
};

export default Dot;
