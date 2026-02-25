/* eslint-disable @eslint-react/no-array-index-key */
'use client';

import type { RecentWorkCardProps } from '@components/RecentWorks/RecentWorkCard';

import { PP_MORI } from '@assets/fonts';
import RWorkImg0_0 from '@assets/recentWorks/recent-0-0.png';
import RWorkImg0_1 from '@assets/recentWorks/recent-0-1.png';
import RWorkImg1_0 from '@assets/recentWorks/recent-1-0.png';
import RWorkImg1_1 from '@assets/recentWorks/recent-1-1.png';
import RWorkImg2 from '@assets/recentWorks/recent-2.png';
import RWorkImg3_0 from '@assets/recentWorks/recent-3-0.png';
import RWorkImg3_1 from '@assets/recentWorks/recent-3-1.png';
import RWorkImg4 from '@assets/recentWorks/recent-4.png';
import RWorkImg5 from '@assets/recentWorks/recent-5.png';
import RWorkImg6_0 from '@assets/recentWorks/recent-6-0.png';
import RWorkImg6_1 from '@assets/recentWorks/recent-6-1.png';
import RWorkImg7 from '@assets/recentWorks/recent-7.png';
import RWorkImg8_0 from '@assets/recentWorks/recent-8-0.png';
import RWorkImg8_1 from '@assets/recentWorks/recent-8-1.png';
import RecentWorkCard from '@components/RecentWorks/RecentWorkCard';
import Logo from '@design/Logo/Logo';
import MotionDiv from '@design/MotionDiv/MotionDiv';
import { getMembersByIds, membersData } from '@libs/data/members';
import cn from '@libs/utils/cn';
import { useTranslations } from 'next-intl';
import React from 'react';

const recentWorkData: RecentWorkCardProps[] = [
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
    bg: '#F0F0F0',
    data: {
      client: 'Tapsi',
      date: '2022-2023',
      tools: ['Figma'],
      images: [RWorkImg2],
      title: 'Orbofi Animation',
      designers: membersData.slice(0, 4),
    },
  },
  {
    multiple: true,
    bg: '#F0F0F0',
    data: {
      client: 'Tapsi',
      date: '2022-2023',
      tools: ['Figma'],
      images: [RWorkImg3_0, RWorkImg3_1],
      title: 'Orbofi Animation',
      designers: membersData.slice(0, 4),
    },
  },
  {
    bg: '#EFF1F0',
    data: {
      client: 'Tapsi',
      date: '2022-2023',
      tools: ['Figma'],
      images: [RWorkImg4],
      title: 'Orbofi Animation',
      designers: membersData.slice(0, 4),
    },
  },
  {
    bg: '#EFF1F0',
    data: {
      client: 'Tapsi',
      date: '2022-2023',
      tools: ['Figma'],
      images: [RWorkImg5],
      title: 'Orbofi Animation',
      designers: membersData.slice(0, 4),
    },
  },
  {
    multiple: true,
    bg: '#EFF1F0',
    data: {
      client: 'Tapsi',
      date: '2022-2023',
      tools: ['Figma'],
      images: [RWorkImg6_0, RWorkImg6_1],
      title: 'Orbofi Animation',
      designers: membersData.slice(0, 4),
    },
  },
  {
    bg: '#EFF1F0',
    data: {
      client: 'Maham',
      date: '2022-2023',
      tools: ['Figma'],
      images: [RWorkImg7],
      title: 'Maham Product Project',
      designers: getMembersByIds(['amir', 'jahan', 'rez', 'ali']),
    },
  },
  {
    multiple: true,
    bg: '#EFF1F0',

    data: {
      client: 'Tapsi',
      date: '2022-2023',
      tools: ['Figma'],
      images: [RWorkImg8_0, RWorkImg8_1],
      title: 'Orbofi Animation',
      designers: membersData.slice(0, 4),
    },
  },
];

const RecentWorksPage = () => {
  const t = useTranslations('recentWorks');
  return (
    <div className="mt-[180px] flex flex-col items-center gap-[18px] pb-[95px] md:mt-[218px]">
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

      <div className="flex w-full max-w-[95%] flex-col gap-4 md:gap-[45px] lg:max-w-[947px]">
        {recentWorkData.map((data, index) => (
          <RecentWorkCard key={`Recent_Works_Card${index}`} {...data} />
        ))}
      </div>
    </div>
  );
};

export default RecentWorksPage;
