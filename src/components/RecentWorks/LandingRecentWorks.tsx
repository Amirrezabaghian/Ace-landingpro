/* eslint-disable @eslint-react/no-array-index-key */
'use client';

import { PP_MORI } from '@assets/fonts';
import RWorkImg0_0 from '@assets/recentWorks/recent-0-0.png';
import RWorkImg0_1 from '@assets/recentWorks/recent-0-1.png';
import RWorkImg1_0 from '@assets/recentWorks/recent-1-0.png';
import RWorkImg1_1 from '@assets/recentWorks/recent-1-1.png';
import RWorkImg7 from '@assets/recentWorks/recent-7.png';
import Button from '@design/Button/Button';
import Dot from '@design/Dot/Dot';
import Logo from '@design/Logo/Logo';
import MotionDiv from '@design/MotionDiv/MotionDiv';
import { getMembersByIds } from '@libs/data/members';
import cn from '@libs/utils/cn';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next-nprogress-bar';
import React from 'react';

import type { RecentWorkCardProps } from './RecentWorkCard';

import RecentWorkCard from './RecentWorkCard';

const landingRecentWorkData: RecentWorkCardProps[] = [
  {
    data: {
      client: 'FTX Exchange',
      date: '2022-2022',
      tools: ['Figma', 'C4d', 'Maya'],
      images: [RWorkImg0_0, RWorkImg0_1],
      title: 'JET Product Project',
      designers: getMembersByIds(['amir', 'behi', 'rez', 'ali', 'sia7ash']),
    },
  },
  {
    multiple: true,
    bg: '#F0F0F0',
    data: {
      client: 'Perr',
      date: '2023-2024',
      tools: ['Figma'],
      images: [RWorkImg1_0, RWorkImg1_1],
      title: 'Perr UI Project',
      designers: getMembersByIds(['amir', 'rez', 'ali']),
    },
  },
  {
    data: {
      client: 'Maham',
      date: '2022-2023',
      tools: ['Figma'],
      images: [RWorkImg7],
      title: 'Maham Product Project',
      designers: getMembersByIds(['amir', 'jahan', 'rez', 'ali']),
    },
  },
];

const LandingRecentWorks = () => {
  const t = useTranslations('recentWorks');
  const router = useRouter();
  return (
    <div
      className="mt-[93px] flex flex-col items-center gap-[18px] md:mt-[145px] "
      id="recent-works"
    >
      <Logo />
      <MotionDiv className="flex flex-col items-center text-center text-[29px] font-medium !leading-[38px] sm:text-[33px]">
        <h3>{t('title')}</h3>
      </MotionDiv>
      <MotionDiv
        className={cn(
          'max-w-[90%] text-center text-[15px] !leading-[24px] text-black/40  sm:max-w-[494px]',
          PP_MORI.className,
        )}
      >
        {t('description')}
      </MotionDiv>

      <div className="mt-9 flex w-full max-w-[95%] flex-col gap-4 md:gap-[45px] lg:max-w-[947px]">
        {landingRecentWorkData.map((data, index) => (
          <RecentWorkCard key={`Recent_Card_Landing${index}`} {...data} />
        ))}
      </div>
      <Button
        primary
        className="flex items-center text-sm"
        containerClass="mt-5 sm:mt-10"
        // href={'/recent'}
        onClick={() => router.push('/recent')}
      >
        <Dot size={3} color="#41E9D4" />
        <span className="pl-2"> {t('seeMoreWorks')}</span>
      </Button>
    </div>
  );
};

export default LandingRecentWorks;
