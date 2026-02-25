'use client';

import type { LinkProps } from 'react-scroll';

import cn from '@libs/utils/cn';
import { usePathname } from 'next/navigation';
import { Link } from 'react-scroll';

interface Props {
  to: string;
  children: React.ReactNode;
  className?: LinkProps['className'];
  onClick?: LinkProps['onClick'];
}

const HeaderLink = ({ to, children, className, onClick }: Props) => {
  return (
    <Link
      spy
      activeClass="!opacity-100"
      // hashSpy={to !== '/'}
      duration={500}
      offset={to === '/' ? undefined : -120}
      onClick={onClick}
      smooth
      to={to === '' ? 'home' : to.replace('#', '')}
      // to={to.replace('#', '')}
      className={cn(
        'min-w-fit cursor-pointer text-xs font-light opacity-60 hover:opacity-100',
        className,
        {
          // 'opacity-100': pathname === to,
        },
      )}
    >
      {children}
    </Link>
  );
};

export default HeaderLink;
