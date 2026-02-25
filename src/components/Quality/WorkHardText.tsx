/* eslint-disable @eslint-react/no-array-index-key */
'use client';

import InteractiveText from '@design/InteractiveText/InteractiveText';
import MotionDiv from '@design/MotionDiv/MotionDiv';
import { translate } from '@libs/utils/translate';
import { useTranslations } from 'next-intl';
import React from 'react';
// -250 -82 -180 -160 -71 -173
// 125 -10 70 -103 -25 -120
// -90 -215 28 -218 145 -223
const interactiveTexts = [
  {
    text: `${translate('landing.quality.creative')}, `,
    images: [
      { x: -250, y: -82, rotate: 15, src: '/quality/0.jpg' },
      { x: -180, y: -160, rotate: -15, src: '/quality/1.jpg' },
      { x: -71, y: -173, rotate: -30, src: '/quality/2.jpg' },
    ],
  },
  {
    text: `${translate('landing.quality.smart')}, `,
    images: [
      { x: -25, y: -120, rotate: 75, src: '/quality/3.jpg' },
      { x: 70, y: -103, rotate: 45, src: '/quality/4.jpg' },
      { x: 125, y: -10, rotate: 30, src: '/quality/5.jpg' },
    ],
  },
  {
    text: `${translate('landing.quality.brilliant')}!`,
    images: [
      { x: -90, y: -215, rotate: -15, src: '/quality/6.jpg' },
      { x: 28, y: -218, rotate: 15, src: '/quality/7.jpg' },
      { x: 145, y: -223, rotate: -30, src: '/quality/8.jpg' },
    ],
  },
];
const WorkHardText = () => {
  const t = useTranslations('landing.quality');

  return (
    <MotionDiv className="flex max-w-[437px] flex-col items-center text-center text-[29px] font-medium !leading-[38px] sm:text-[33px]">
      <p>
        <span>{t('weWorkHard')}</span>{' '}
        {interactiveTexts.map(({ text, images }, index) => (
          <InteractiveText
            images={images}
            key={`inter-active-text${index}`}
            text={text}
          />
        ))}
      </p>
    </MotionDiv>
  );
};

export default WorkHardText;
