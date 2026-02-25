import type { HTMLAttributes, ReactNode } from 'react';

import cn from '@libs/utils/cn';

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: HTMLDivElement['className'];
}

const ContainerLayout = ({ children, className, ...rest }: Props) => {
  return (
    <div className="flex w-full justify-center">
      <div
        className={cn('w-full px-3 lg:px-10 2xl:max-w-[1440px]', className)}
        {...rest}
      >
        {children}
      </div>
    </div>
  );
};

export default ContainerLayout;
