import Button from '@design/Button/Button';
import CircleLoadingTimer from '@design/Loader/CircleLoadingTimer';
import MotionDiv from '@design/MotionDiv/MotionDiv';
import { NextImage } from '@design/NextImage/NextImage';
import { StarIcon } from '@icons';
import React from 'react';

import type { SlideData } from './CommentsSlider';

import AnimatedLine from './AnimatedLine';

interface Props {
  data: SlideData;
  activeSlide: number;
}

const CommentCard = ({ data, activeSlide }: Props) => {
  return (
    <div className="relative h-[235px] p-[8px] sm:max-w-[518px]">
      <AnimatedLine />
      <div className="absolute left-[-13px] top-0 flex h-full -translate-x-full items-center justify-center">
        <CircleLoadingTimer activeSlide={activeSlide} duration={6} />
      </div>
      <div className="relative flex h-[235px] items-center justify-center rounded-3xl border border-[rgba(0,0,0,0.07)] bg-[#f5f5f5] p-[8px] sm:max-w-[518px]">
        <div className="card flex size-full flex-col items-center justify-center rounded-[18px] border border-[#f0f0f0] bg-[#FCFCFC] p-5">
          <MotionDiv
            className=" flex size-full flex-col items-center justify-center"
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <div className="flex w-full items-center justify-between">
              <MotionDiv className="flex items-center gap-2.5">
                <NextImage
                  height={42}
                  width={42}
                  alt="avatar"
                  className="size-[42px] rounded-full object-cover"
                  src={data.avatar}
                />
                <div className="flex flex-col font-medium">
                  <span className="text-sm">{data.name}</span>
                  <span className="text-xs text-black/40">{data.role}</span>
                </div>
              </MotionDiv>

              <Button
                className="flex cursor-auto items-center gap-1.5"
                containerClass="w-[62px] box-border py-1.5 px-1"
                secondary
              >
                <StarIcon className="size-[16px]" />
                <span className="text-xs text-black">{data.rate}</span>{' '}
              </Button>
            </div>
            <MotionDiv className="mt-8 flex justify-center">
              <p className={'px-2 text-sm !leading-[20px] text-black/40'}>
                {data.comment}
              </p>{' '}
            </MotionDiv>{' '}
          </MotionDiv>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
