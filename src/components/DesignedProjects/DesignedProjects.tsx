/* eslint-disable @eslint-react/no-array-index-key */
'use client';
import BottomLeftLineVector from '@assets/designedProjects/bottom-left-line.svg';
import {
  Project0,
  Project1,
  Project2,
  Project3,
  Project4,
  Project5,
  Project6,
  Project7,
  Project8,
} from '@assets/index';
import AhmadMusaviImg from '@assets/members/ahmad-musavi.jpg';
import AliMalekKhatabi from '@assets/members/ali-malek-khatabi.jpg';
import AmirBaghianImg from '@assets/members/amir-baghian.jpg';
import MimSaremImg from '@assets/members/mim-sarem.jpg';
import RezaBehi from '@assets/members/reza-behi.jpg';
import MotionDiv from '@design/MotionDiv/MotionDiv';
import { useTranslations } from 'next-intl';
import React, { useEffect, useRef } from 'react';

import DesignedProjectItem from './DesignedProjectItem';

const projectsData = [
  {
    name: 'Aztec 3D Animation',
    src: Project0,
    link: 'https://dribbble.com/shots/21785648-Aztec-marketing-Video-Animation',
    designer: {
      name: 'Designer 1',
      image: AhmadMusaviImg,
    },
  },
  {
    name: 'Pepsi 3D Animation',
    src: Project1,
    link: 'https://dribbble.com/shots/22934740-Pepsi-3D-Animaitopn',
    designer: {
      name: 'Ali',
      image: AliMalekKhatabi,
    },
  },
  {
    name: 'Basegod Animation',
    src: Project2,
    link: 'https://dribbble.com/shots/24498251-Basedgod-Animation-Design',
    designer: {
      name: 'Designer 3',
      image: RezaBehi,
    },
  },
  {
    name: 'Basegod Animation',
    src: Project3,
    link: 'https://dribbble.com/shots/24498251-Basedgod-Animation-Design',
    designer: {
      name: 'Designer 4',
      image: AmirBaghianImg,
    },
  },
  {
    name: 'Azuki Animation',
    src: Project4,
    link: 'https://dribbble.com/shots/24320858-Azuki-Animation-Frame-by-Frame',
    designer: {
      name: 'Designer 5',
      image: MimSaremImg,
    },
  },
  {
    name: 'Panda Nft Collection',
    src: Project5,
    link: 'https://dribbble.com/shots/20929283-The-Bear-NFT-Collection-10k-NFT',
    designer: {
      name: 'Designer 6',
      image: AmirBaghianImg,
    },
  },
  {
    name: 'Vada 3D Animation',
    src: Project6,
    link: 'https://dribbble.com/shots/22870973-Vada-3d-Animation-Ace-Design',
    designer: {
      name: 'Designer 7',
      image: RezaBehi,
    },
  },
  {
    name: 'Azuki Animation',
    src: Project7,
    link: 'https://dribbble.com/shots/24320858-Azuki-Animation-Frame-by-Frame',
    designer: {
      name: 'Designer 8',
      image: AliMalekKhatabi,
    },
  },
  {
    name: 'Pepsi 3D Animation',
    src: Project8,
    link: 'https://dribbble.com/shots/22934740-Pepsi-3D-Animaitopn',
    designer: {
      name: 'Designer 9',
      image: AhmadMusaviImg,
    },
  },
];

const DesignedProjects = () => {
  const t = useTranslations('landing.designedProjects');

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scrollToCenter = () => {
      const scrollContainer = scrollContainerRef.current;
      if (scrollContainer) {
        const scrollWidth = scrollContainer.scrollWidth;
        const clientWidth = scrollContainer.clientWidth;
        const scrollLeft = (scrollWidth - clientWidth) / 2;
        scrollContainer.scrollLeft = scrollLeft;
      }
    };

    scrollToCenter();

    window.addEventListener('resize', scrollToCenter);
    return () => {
      window.removeEventListener('resize', scrollToCenter);
    };
  }, []);

  return (
    <MotionDiv
      className="relative mt-32 flex w-full flex-col items-center gap-10"
      id="projects"
    >
      {/* <BookMeetingButton /> */}
      <h2 className="text-xs opacity-40">{t('title')}</h2>
      <div
        className="flex max-w-full px-3 max-sm:overflow-x-auto max-sm:overflow-y-hidden"
        ref={scrollContainerRef}
      >
        <div className="relative grid w-fit grid-cols-3 gap-4 pb-3 max-sm:min-w-max">
          <BottomLeftLineVector className="absolute -left-6 bottom-[70px] h-[79px] w-[434px] -translate-x-full max-md:hidden" />
          {projectsData.map((project, index) => (
            <DesignedProjectItem
              {...project}
              index={index}
              key={`project_${index}`}
            />
          ))}
        </div>
      </div>
    </MotionDiv>
  );
};

export default DesignedProjects;
