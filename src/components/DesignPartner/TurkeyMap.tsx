import TurkeyMapImg from '@assets/designPartner/turkey-map.png';
import { PP_MORI } from '@assets/fonts';
import MemberItems from '@components/Members/MemberItems';
import MotionDiv from '@design/MotionDiv/MotionDiv';
import cn from '@libs/utils/cn';
import { useTranslations } from 'next-intl';
import React from 'react';

const TurkeyMap = () => {
  const t = useTranslations('landing.designPartner.TurkeyMap');
  return (
    <MotionDiv
      className="mt-[53px] flex flex-col items-center gap-8 "
      id="our-team"
    >
      <div
        className="flex w-full max-w-[407px] flex-col items-center bg-contain bg-no-repeat pt-[87px]"
        style={{
          backgroundImage: `url(${TurkeyMapImg.src})`,
        }}
      >
        <MemberItems />

        <MotionDiv className="mb-3 mt-6 flex flex-col items-center text-center text-[20px] font-medium">
          <h3 className="whitespace-pre-wrap">{t('title')}</h3>
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
    </MotionDiv>
  );
};

export default TurkeyMap;
