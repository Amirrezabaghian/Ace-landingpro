'use client';

/* eslint-disable jsx-a11y/media-has-caption */
import MotionDiv from '@design/MotionDiv/MotionDiv';
import { PauseIcon, PlayIcon } from '@icons';
import cn from '@libs/utils/cn';
import React, { useEffect, useRef, useState } from 'react';
import { useSwiper } from 'swiper/react';

interface Props {
  src: string;
  showControls?: boolean;

  thumbnail: string;
}

const VideoPlayer = ({ src, showControls, thumbnail }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayPause, setShowPlayPause] = useState(false);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShowPlayPause(true);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setShowPlayPause(false);
    }, 1000);
  };

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  //? handle reset video when showControls is false
  useEffect(() => {
    if (!showControls) {
      const video = videoRef.current;
      if (!video) return;
      if (!video.paused) {
        video.pause();
        // video.currentTime = 0;
        video.load();
        setIsPlaying(false);
      }
    }
  }, [showControls]);

  const swiper = useSwiper();

  useEffect(() => {
    if (isPlaying) swiper?.autoplay?.stop();
    else swiper?.autoplay?.start();
  }, [swiper, isPlaying]);

  return (
    <div
      className="relative h-[340px] w-full overflow-hidden rounded-[13px] sm:h-[389px]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        controls={false}
        onPause={() => setIsPlaying(false)}
        onPlaying={() => setIsPlaying(true)}
        poster={thumbnail}
        className={cn('size-full overflow-hidden rounded-[13px] object-cover', {
          'blur-[4px]': !showControls,
        })}
      >
        <source src={src} type="video/mp4" />
      </video>

      {showControls && (showPlayPause || !isPlaying) && (
        <MotionDiv className="absolute inset-0 flex size-full items-center justify-center">
          <button className="text-white" onClick={handlePlayPause}>
            <div
              className="flex size-[124px] items-center justify-center rounded-full backdrop-blur-[2px]"
              style={{
                boxShadow:
                  '0px 4px 4px 0px rgba(255, 255, 255, 0.10) inset, 0px 10px 16px -10px rgba(0, 0, 0, 0.40), 0px -4px 4px 0px rgba(0, 0, 0, 0.18) inset, 0.5px 0.5px 0px 0px rgba(255, 255, 255, 0.24) inset',
                border: '1px solid rgba(0, 0, 0, 0.24)',
              }}
            >
              <div
                className="flex size-[110px] items-center justify-center rounded-full bg-[rgba(37,37,37,0.62)] backdrop-blur-[2px]"
                style={{
                  boxShadow:
                    ' 0px 4px 4px 0px rgba(255, 255, 255, 0.10) inset, 0px 19px 16px -9px rgba(0, 0, 0, 0.37), 0px -4px 4px 0px rgba(0, 0, 0, 0.18) inset, 0.5px 0.5px 0px 0px rgba(255, 255, 255, 0.24) inset',
                }}
              >
                {isPlaying ? (
                  <PauseIcon className="size-[25px]" />
                ) : (
                  <PlayIcon className="size-[25px]" />
                )}
              </div>
            </div>
          </button>
        </MotionDiv>
      )}

      {/* //? custom controls */}
      {/* {showControls && (
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-black/50 p-4">
        </div>
      )} */}
    </div>
  );
};

export default VideoPlayer;
