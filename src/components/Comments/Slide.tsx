'use client';

import CursorBoxContent from '@design/CursorBoxContent/CursorBoxContent';
import { NextImage } from '@design/NextImage/NextImage';
import ToolTipBox from '@design/ToolTipBox/ToolTipBox';
import React from 'react';

import type { SlideData } from './CommentsSlider';

interface Props {
  data: SlideData;
  index: number;
}

const Slide = ({ data }: Props) => {
  return (
    <CursorBoxContent
      content={<ToolTipBox title={data.name} description={data.role} />}
      followCursor="x"
      offsetY={10}
      positioning="fixed"
    >
      <button className="flex cursor-pointer items-center justify-center rounded-full border border-[#E9E9E9] bg-[#f5f5f5] p-[5px] ">
        <div className="flex size-[70px] select-none items-center justify-center rounded-full">
          <NextImage
            height={70}
            width={70}
            alt="avatar"
            className="size-[70px] rounded-full object-cover"
            src={data.avatar}
            loading="eager"
          />
        </div>
      </button>
    </CursorBoxContent>
  );
};

export default Slide;
