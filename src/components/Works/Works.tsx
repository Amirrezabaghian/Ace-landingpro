'use client';

import { PP_MORI } from '@assets/fonts';
import BottomRightLineVector from '@assets/members/bottom-right-line.svg';
import Button from '@design/Button/Button';
import Dot from '@design/Dot/Dot';
import MotionDiv from '@design/MotionDiv/MotionDiv';
import cn from '@libs/utils/cn';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React from 'react';
import { scroller } from 'react-scroll';

const Works = () => {
  const t = useTranslations('landing.works');
  const router = useRouter();

  return (
    <div className="flex w-full justify-center">
      <MotionDiv className="relative mt-[100px] flex w-fit flex-col items-center">
        <BottomRightLineVector className="absolute -top-12 right-0 h-[87px] w-[466px] translate-x-full max-lg:-right-3.5" />

        <Button
          className="flex items-center gap-2 px-[18px] text-sm text-black"
          secondary
        >
          {t('howCanWeBring')}
        </Button>
        <MotionDiv className="mt-[17px] flex flex-col items-center text-center text-[29px] font-medium !leading-[38px] sm:text-[33px]">
          <h3 className="whitespace-pre-wrap">{t('wereCreative')}</h3>
        </MotionDiv>

        <MotionDiv className="flex justify-center">
          <p
            className={cn(
              'mt-3.5 max-w-[90%] text-center text-[15px] !leading-[24px] text-black/40  sm:max-w-[494px]',
              PP_MORI.className,
            )}
          >
            {t('description')}
          </p>{' '}
        </MotionDiv>

        <Button
          primary
          className="flex items-center text-sm"
          containerClass="mt-5"
          onClick={() => {
            router.replace('#request');
            scroller.scrollTo('contact', {
              duration: 800,
              delay: 200,
              // offset: -30,
              smooth: 'easeInOutQuart',
            });
          }}
        >
          <Dot size={3} color="#41E9D4" />
          <span className="pl-2"> {t('letsWork')}</span>
        </Button>
      </MotionDiv>
    </div>
  );
};

export default Works;
