'use client';

import { PP_MORI } from '@assets/fonts';
import Button from '@design/Button/Button';
import MotionDiv from '@design/MotionDiv/MotionDiv';
import {
  AceQualityIcon,
  CompetitiveIcon,
  EasyWorkIcon,
  SupportIcon,
  UnlimitedEditsIcon,
  WeRocketIcon,
} from '@icons';
import cn from '@libs/utils/cn';
import { translate } from '@libs/utils/translate';
import { useTranslations } from 'next-intl';
import React from 'react';

import CustomProductCard from './CustomProductCard';

const cardsData = [
  {
    title: translate('landing.customProducts.cards.weRocket.title'),
    description: translate('landing.customProducts.cards.weRocket.description'),
    icon: <WeRocketIcon className="size-[30px]" />,
  },
  {
    title: translate('landing.customProducts.cards.easyWork.title'),
    description: translate('landing.customProducts.cards.easyWork.description'),
    icon: <EasyWorkIcon className="size-[30px]" />,
  },
  {
    title: translate('landing.customProducts.cards.unlimitedEdits.title'),
    description: translate(
      'landing.customProducts.cards.unlimitedEdits.description',
    ),
    icon: <UnlimitedEditsIcon className="size-[30px]" />,
  },
  {
    title: translate('landing.customProducts.cards.aceQuality.title'),
    description: translate(
      'landing.customProducts.cards.aceQuality.description',
    ),
    icon: <AceQualityIcon className="size-[30px]" />,
  },
  {
    title: translate('landing.customProducts.cards.competitive.title'),
    description: translate(
      'landing.customProducts.cards.competitive.description',
    ),
    icon: <CompetitiveIcon className="size-[30px]" />,
  },
  {
    title: translate('landing.customProducts.cards.support.title'),
    description: translate('landing.customProducts.cards.support.description'),
    icon: <SupportIcon className="size-[30px]" />,
  },
];

const CustomProduct = () => {
  const t = useTranslations('landing.customProducts');
  return (
    <div
      className="mt-[117px] flex flex-col items-center gap-[18px]"
      id="services"
    >
      <Button className="z-10 !bg-[#eee] px-[18px] text-sm" secondary>
        {t('tired')}
      </Button>
      <MotionDiv className="flex flex-col items-center text-center text-[29px] font-medium !leading-[38px] sm:text-[33px]">
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
      <MotionDiv className="mt-6 grid max-w-[796px] grid-cols-1 gap-3 px-4 sm:mt-[50px] md:grid-cols-2">
        {cardsData.map(card => (
          <CustomProductCard key={card.title} {...card} />
        ))}
      </MotionDiv>
    </div>
  );
};

export default CustomProduct;
