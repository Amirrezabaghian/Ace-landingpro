'use client';

import type { HTMLAttributes, SVGProps } from 'react';

import { LogoVector } from '@icons';
import cn from '@libs/utils/cn';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

interface Props extends SVGProps<SVGSVGElement> {
  variant?: 'black' | 'white';
  textClassname?: HTMLAttributes<HTMLDivElement>['className'];
}

const Logo = ({ className, textClassname, ...rest }: Props) => {
  const t = useTranslations('header');
  return (
    <Link className="flex items-center gap-3" href={'/'}>
      <LogoVector className={cn('h-[38px] w-[36px]', className)} {...rest} />
      <span
        className={cn('text-xs font-semibold text-[#272B30]', textClassname)}
      >
        {t('title')}
      </span>
    </Link>
  );
};

export default Logo;
