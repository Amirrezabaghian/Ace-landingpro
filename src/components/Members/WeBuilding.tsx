'use client';
import type { Variants } from 'motion/react';

import { PP_MORI } from '@assets/fonts';
import BottomLeftLineVector from '@assets/members/bottom-left-line.svg';
import BottomRightLineVector from '@assets/members/bottom-right-line.svg';
import AnimationBox from '@design/AnimationBox/AnimationBox';
import Button from '@design/Button/Button';
import SpeedoMeter from '@design/SpeedoMeter/SpeedoMeter';
import { ArrowRightIcon } from '@icons';
import cn from '@libs/utils/cn';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React from 'react';
import { scroller } from 'react-scroll';

const buildingTextVariants: Variants = {
  animate: {
    y: 0,
    opacity: 1,
  },
  initial: {
    y: 25,
    opacity: 0,
  },
};

const WeBuilding = () => {
  const t = useTranslations('landing.members');
  const router = useRouter();

  return (
    <div className="flex flex-col items-center">
      <motion.div
        className="flex flex-col items-center text-center text-[29px] font-medium !leading-[38px] sm:text-[33px]"
        initial="initial"
        variants={buildingTextVariants}
        whileInView="animate"
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-3.5">
          <motion.h3
            initial="initial"
            variants={buildingTextVariants}
            whileInView="animate"
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {t('weBuilding')}
          </motion.h3>
          <AnimationBox />
        </div>
        <h3>{t('withWordClass')}</h3>
      </motion.div>
      <motion.p
        initial="initial"
        variants={buildingTextVariants}
        whileInView="animate"
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className={cn(
          'mt-3.5 max-w-[90%] text-center text-[15px] !leading-[24px] text-black/40  sm:max-w-[494px]',
          PP_MORI.className,
        )}
      >
        {t('description')}
      </motion.p>
      <motion.div
        className="relative"
        initial="initial"
        variants={buildingTextVariants}
        whileInView="animate"
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <BottomLeftLineVector className="absolute -bottom-10 -left-11 h-[60px] w-[328px] -translate-x-full max-lg:-left-3.5" />

        <Button
          primary
          className="divide-x-2 divide-[#00000080] text-sm"
          containerClass="mt-5"
          onClick={() => {
            router.replace('#request');
            scroller.scrollTo('contact', {
              duration: 800,
              delay: 200,
              // offset: -30,
              smooth: 'easeInOutQuart',
            });
          }}
        >
          <span className="flex w-[52px] items-center pr-2">
            $
            <SpeedoMeter
              values={[
                1050, 500, 654, 449, 1100, 900, 1800, 2300, 2200, 3000, 3650,
                4400, 4100, 5900,
              ]}
            />
          </span>
          <span className="pl-2"> {t('getProject')}</span>
        </Button>
      </motion.div>
      <motion.div
        className="relative"
        initial="initial"
        variants={buildingTextVariants}
        whileInView="animate"
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <BottomRightLineVector className="absolute -right-24 bottom-4 h-[87px] w-[445px] translate-x-full max-lg:-right-3.5" />

        <Button
          className=" flex items-center gap-2 px-[18px] text-sm text-black"
          containerClass="mt-[17px]"
          secondary
        >
          <span>{t('weDesigned')}</span>
          {/* <ArrowRightIcon /> */}
        </Button>
      </motion.div>
    </div>
  );
};

export default WeBuilding;
