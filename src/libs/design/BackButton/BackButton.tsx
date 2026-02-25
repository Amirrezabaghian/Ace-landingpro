'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';

const BackButton = () => {
  const t = useTranslations('common');

  return (
    <Link
      className="z-10 ml-9 hidden items-center gap-2.5 rounded-full bg-[#5E5E5E] px-6 py-4 text-xs text-white transition-all duration-200 hover:scale-[1.02] hover:bg-[#3b3b3b] md:flex lg:gap-3.5 lg:px-12"
      href="/"
      style={{
        boxShadow:
          '0px -1px 0px 0px #535353, 0px 1px 0px 0px #535353, 0px 17px 27.5px -8px rgba(0, 0, 0, 0.27)',
        border: '0.7px solid rgba(255, 255, 255, 0.15)',
      }}
    >
      {t('back')}
    </Link>
  );
};

export default BackButton;
