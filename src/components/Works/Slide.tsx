'use client';

import AvatarGroup from '@design/Avatar/AvatarGroup';
import MotionDiv from '@design/MotionDiv/MotionDiv';
import { useTranslations } from 'next-intl';
import React from 'react';

import type { SlideData } from './WorksSlider';

import VideoPlayer from './VideoPlayer';

interface Props {
  data: SlideData;
  index: number;
  isActive?: boolean;
}

const Slide = ({ data, index, isActive }: Props) => {
  const t = useTranslations('landing.works');

  return (
    <div className="flex flex-col items-center gap-[13px]">
      <MotionDiv className="flex w-full select-none items-center justify-between px-3 sm:px-[22px]">
        <div className="flex flex-col items-start gap-1 text-xs text-black opacity-40">
          <span>{data.title}</span>
          <span>{data.date}</span>
        </div>

        <div className="flex items-center gap-2">
          <p className="text-xs text-black/40 max-sm:hidden">
            {t('designers')}
          </p>
          <AvatarGroup
            avatars={data.designers.map(d => ({
              ...d,
              src: d.img,
            }))}
          />
        </div>
      </MotionDiv>
      <VideoPlayer
        src={data.video}
        thumbnail={data.thumbnail}
        showControls={isActive}
      />
    </div>
  );
};

export default Slide;
