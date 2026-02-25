'use client';

import TopLeftLineVector from '@assets/members/top-left-line.svg';
import MotionDiv from '@design/MotionDiv/MotionDiv';
import { useTranslations } from 'next-intl';
import React from 'react';

import MemberItems from './MemberItems';

const MembersBox = () => {
  const t = useTranslations('landing.members');
  return (
    <div className=" flex flex-col items-center gap-[18px]">
      <TopLeftLineVector className="absolute -left-11 -top-8 -translate-x-full max-lg:hidden" />

      <MotionDiv>
        <h2 className="text-xs opacity-40">{t('title')}</h2>
      </MotionDiv>
      <MemberItems />
    </div>
  );
};

export default MembersBox;
