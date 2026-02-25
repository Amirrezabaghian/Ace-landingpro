import { PP_MORI } from '@assets/fonts';
import Dot from '@design/Dot/Dot';
import MotionDiv from '@design/MotionDiv/MotionDiv';
import cn from '@libs/utils/cn';
import { useTranslations } from 'next-intl';
import React, { Suspense } from 'react';

import ContactForm from './ContactForm';

const Contact = () => {
  const t = useTranslations('landing.contact');
  return (
    <div
      className="mt-[94px] flex flex-col items-center gap-[18px]"
      id="contact"
    >
      <div className="flex items-center gap-2 rounded-full bg-[#C9C9C926] px-[18px] py-2 text-sm text-primary">
        <Dot size={8} color="#F90" />
        {t('freeSpot')}
      </div>
      <MotionDiv className="mt-1.5 flex flex-col items-center text-center text-[29px] font-medium !leading-[38px] sm:text-[33px]">
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
      <Suspense>
        <ContactForm />
      </Suspense>
    </div>
  );
};

export default Contact;
