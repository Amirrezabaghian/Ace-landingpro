'use client';

import { PP_MORI } from '@assets/fonts';
import QualityImg from '@assets/quality/quality-img.png';
import Button from '@design/Button/Button';
import MotionDiv from '@design/MotionDiv/MotionDiv';
import { NextImage } from '@design/NextImage/NextImage';
import cn from '@libs/utils/cn';
import { useTranslations } from 'next-intl';
import React from 'react';

import WorkHardText from './WorkHardText';

const Quality = () => {
  const t = useTranslations('landing.quality');

  return (
    <div className="quality-bg mt-[50px] flex max-w-[950px] flex-col items-center gap-[18px] self-center justify-self-center pt-[150px]">
      <Button className="px-[18px] text-sm" secondary>
        {t('title')}
      </Button>
      <WorkHardText />
      <MotionDiv
        className={cn(
          'max-w-[90%] text-center text-[15px] !leading-[24px] text-black/40  sm:max-w-[494px]',
          PP_MORI.className,
        )}
      >
        {t('description')}
      </MotionDiv>
      <MotionDiv className="relative flex w-full justify-center">
        <NextImage
          alt="quality"
          className="mt-2 w-[95%] max-w-[940px]"
          src={QualityImg}
        />
      </MotionDiv>
    </div>
  );
};

export default Quality;
