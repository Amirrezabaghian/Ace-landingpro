'use client';

import { PP_MORI } from '@assets/fonts';
import Dot from '@design/Dot/Dot';
import MotionDiv from '@design/MotionDiv/MotionDiv';
import cn from '@libs/utils/cn';
import { useTranslations } from 'next-intl';
import React from 'react';

import TaskList from './TaskList';
import TurkeyMap from './TurkeyMap';

const DesignPartner = () => {
  const t = useTranslations('landing.customProducts');
  return (
    <div className="mt-[125px] flex flex-col items-center gap-[18px]">
      <Dot size={12} className="-mb-1" color="#F90" />
      <MotionDiv className="flex flex-col items-center text-center text-[29px] font-medium !leading-[38px] sm:text-[33px]">
        <h3 className="whitespace-pre-wrap">{t('title')}</h3>
      </MotionDiv>
      <MotionDiv
        className={cn(
          'max-w-[90%] text-center text-[15px] !leading-[24px] text-black/40  sm:max-w-[494px]',
          PP_MORI.className,
        )}
      >
        {t('description')}
      </MotionDiv>
      <TaskList />
      <TurkeyMap />
    </div>
  );
};

export default DesignPartner;
