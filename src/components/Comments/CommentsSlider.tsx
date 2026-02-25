/* eslint-disable @eslint-react/no-array-index-key */
'use client';

import 'swiper/css';
import { PP_MORI } from '@assets/fonts';
import MotionDiv from '@design/MotionDiv/MotionDiv';
import cn from '@libs/utils/cn';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import CommentCard from './CommentCard';
import Slide from './Slide';

export interface SlideData {
  avatar: string;
  name: string;
  comment: string;
  role: string;
  rate: number;
}

const slides = [
  {
    avatar: '/comments/john.jpg',
    name: 'John T McNeill',
    role: 'Art Director of Hygen Ai',
    comment:
      'We needed a sleek and intuitive user interface for our SaaS product, and Ace Studio delivered. They combined modern design with user-centric functionality, and our users couldn’t be happier.',
    rate: 5,
  },
  {
    avatar: '/comments/gary-duntun.jpg',
    name: 'Gary Dunton',
    role: 'CTO of Pumple Studio',
    comment:
      'Ace Studio turned our concept into a polished animation that perfectly communicated our brand story. The transitions and art style were impeccable. We’ve received countless compliments!',
    rate: 4.8,
  },
  {
    avatar: '/comments/marie.jpg',
    name: 'Marie Cronan',
    role: 'Product Designer at LuxAi',
    comment:
      'Ace Studio brought so much energy to our motion graphics project. The visuals were dynamic, and the flow was captivating. It made our marketing campaign stand out in the best way!',
    rate: 4.6,
  },
  {
    avatar: '/comments/rebecca.jpg',
    name: 'Rebecca Swims',
    role: '3D Designer at NovaTech',
    comment:
      'Ace Studio created stunning 3D visuals for our product launch, and the attention to detail was remarkable. Our clients were truly impressed by the realistic renderings. Thank you for bringing our vision to life!',
    rate: 5,
  },
  {
    avatar: '/comments/paul-ferris.jpg',
    name: 'Paul Ferris',
    role: 'CEO of Lunaris Beauty Co.',
    comment:
      'Their development team was excellent! Ace Studio built a fully functional and responsive website for our business. They were professional, timely, and attentive to all the small details.',
    rate: 5,
  },
  {
    avatar: '/comments/ray-poynter.jpg',
    name: 'Ray Poynter',
    role: 'Product designer at Orion Blockchain',
    comment:
      'Ace Studio designed custom icons for our website, and they fit perfectly with our brand identity. Their ability to turn abstract ideas into meaningful designs was incredible. Loved the creativity!',
    rate: 4.7,
  },
  {
    avatar: '/comments/glen-dobbs.jpg',
    name: 'Glen Dobbs',
    role: 'CEO of PixelCraft Studio',
    comment:
      'We partnered with Ace Studio for a promotional animation, and they delivered beyond our expectations. The storytelling, visuals, and transitions were seamless. It helped us engage our audience in a whole new way.',
    rate: 4.5,
  },
  {
    avatar: '/comments/hugh.jpg',
    name: 'Hugh Asher',
    role: 'Marketing manager at StellarCode',
    comment:
      'Working with Ace Studio for our app redesign was an absolute pleasure. Their UI design team not only understood our requirements but also elevated the user experience to a whole new level. Highly recommended!',
    rate: 5,
  },
  {
    avatar: '/comments/emma.jpg',
    name: 'Erma Barber',
    role: 'Marketing at Helios AI Technologies',
    comment:
      'Ace Studio created a 3D walkthrough for our architectural project, and it was incredible. The lighting, textures, and realism were spot on. Their team is truly talented and dedicated!',
    rate: 4.7,
  },
];

export const CommentsSlider = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const t = useTranslations('landing.comments');

  return (
    <MotionDiv
      className="mt-[93px] flex flex-col items-center md:mt-[145px]"
      id="testimonials"
    >
      <div className="flex flex-col items-center gap-[18px]">
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
      </div>
      <div className="mt-12 flex w-full max-w-[900px] flex-col items-center gap-10">
        <div className="h-[90px] w-full">
          <Swiper
            centeredSlides
            className="comments-slider"
            initialSlide={4}
            slidesPerView={'auto'}
            spaceBetween={24}
            autoplay={{
              delay: 6000,
            }}
            modules={[Autoplay]}
            onActiveIndexChange={({ realIndex }) => {
              setActiveSlide(realIndex);
            }}
            slideToClickedSlide
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={`Comment_${index}`}>
                <Slide data={slide} index={index} />
              </SwiperSlide>
            ))}
          </Swiper>{' '}
        </div>

        <CommentCard
          activeSlide={activeSlide}
          data={slides[activeSlide]}
          key={activeSlide}
        />
      </div>
    </MotionDiv>
  );
};
