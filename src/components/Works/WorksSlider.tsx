'use client';

import 'swiper/css';
import 'swiper/css/pagination';

import type { Member } from '@libs/data/members';

import MotionDiv from '@design/MotionDiv/MotionDiv';
import { getMembersByIds } from '@libs/data/members';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import Slide from './Slide';

export interface SlideData {
  video: string;
  title: string;
  date: string;
  thumbnail: string;
  designers: Member[];
}

const slides = [
  {
    video: 'https://aceframe.storage.c2.liara.space/Kai.mp4',
    title: 'Kai Animation',
    date: '2024',
    thumbnail: '/works/thumbnails/kai.jpg',
    designers: getMembersByIds(['amir', 'mim']),
  },
  {
    video: 'https://aceframe.storage.c2.liara.space/Orbofi.mp4',
    title: 'Orbofi Animation',
    date: '2022',
    thumbnail: '/works/thumbnails/orbofi.jpg',
    designers: getMembersByIds(['amir', 'mim', 'rez', 'behi', 'ali']),
  },
  {
    video: 'https://aceframe.storage.c2.liara.space/Azuki.mp4',
    title: 'Azuki Animation',
    date: '2024',
    thumbnail: '/works/thumbnails/azuki.jpg',
    designers: getMembersByIds(['amir', 'rez', 'behi', 'ali']),
  },
  {
    video: 'https://aceframe.storage.c2.liara.space/tbc%20nft.mp4',
    title: 'TBC Nft Collection',
    date: '2022',
    thumbnail: '/works/thumbnails/tbc-nft.jpg',
    designers: getMembersByIds(['amir', 'sia7ash', 'rez', 'ali']),
  },
  {
    video: 'https://aceframe.storage.c2.liara.space/pepsi.MP4',
    title: 'Pepsi 3D Animation',
    date: '2024',
    thumbnail: '/works/thumbnails/pepsi.jpg',
    designers: getMembersByIds(['amir', 'sia7ash']),
  },
  {
    video:
      'https://aceframe.storage.c2.liara.space/Final%20Big%20Fomo%20animation_v5.mp4',
    title: 'Fomo Big Animation Design',
    date: '2024',
    thumbnail: '/works/thumbnails/fomo.jpg',
    designers: getMembersByIds(['amir', 'mim', 'rez', 'ali']),
  },
  {
    video:
      'https://aceframe.storage.c2.liara.space/Aztec%20-%203d%20character.mp4',
    title: 'Aztec 3D Animation',
    date: '2023',
    thumbnail: '/works/thumbnails/aztec.jpg',
    designers: getMembersByIds(['amir', 'sia7ash', 'rez']),
  },
  {
    video: 'https://aceframe.storage.c2.liara.space/Aztec%20-%20Airplane.mp4',
    title: 'Aztec 3D Animation',
    date: '2023',
    thumbnail: '/works/thumbnails/aztec-2.jpg',
    designers: getMembersByIds(['amir', 'sia7ash', 'rez']),
  },
  {
    video: 'https://aceframe.storage.c2.liara.space/basegod.mp4',
    title: 'Basegod Animation',
    date: '2024',
    thumbnail: '/works/thumbnails/base-god.jpg',
    designers: getMembersByIds(['amir', 'mim', 'behi', 'rez', 'ali']),
  },
  {
    video: 'https://aceframe.storage.c2.liara.space/vada.mp4',
    title: 'Vada 3D Animation',
    date: '2023',
    thumbnail: '/works/thumbnails/vada.jpg',
    designers: getMembersByIds(['amir', 'sia7ash', 'rez', 'ali']),
  },
];

const WorksSlider = () => {
  return (
    <MotionDiv className="mt-14">
      <div className="h-[450px] w-full">
        <Swiper
          centeredSlides
          className="works-slider"
          slidesPerView={'auto'}
          spaceBetween={10}
          autoplay={{
            delay: 5000,
            disableOnInteraction: true,
            pauseOnMouseEnter: true,
            waitForTransition: true,
          }}
          breakpoints={{
            0: {
              spaceBetween: 10,
            },
            430: {
              spaceBetween: 10,
            },
            640: {
              spaceBetween: 15,
            },
          }}
          loop
          modules={[Autoplay]}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={slide.title}>
              {({ isActive }) => (
                <Slide data={slide} index={index} isActive={isActive} />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </MotionDiv>
  );
};

export default WorksSlider;
