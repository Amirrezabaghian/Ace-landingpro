'use client';

import Amir from '@assets/members/amir-baghian.jpg';

import './BookMeetingButton.css';

import Button from '@design/Button/Button';
import { NextImage } from '@design/NextImage/NextImage';
import cn from '@libs/utils/cn';
import * as motion from 'motion/react-client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { scroller } from 'react-scroll';

const BookMeetingButton = () => {
  const [lockButton, setLockButton] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      // if (position === 'bottom') {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.body.offsetHeight;

      if (documentHeight - scrollPosition <= 100) {
        setLockButton(true);
      } else {
        setLockButton(false);
      }
      // }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <motion.div
      transition={{
        duration: 0.4,
        type: 'spring',
        stiffness: 200,
        damping: 30,
        delay: 0.5,
      }}
      viewport={{ once: true }}
      className={cn(
        'fixed bottom-[50px] right-0  z-[9999] flex items-center gap-2.5 max-xl:-right-10 2xl:bottom-[70px] 2xl:right-5',
        { '!bottom-[100px] max-sm:!bottom-[160px]': lockButton },
      )}
      initial={{
        x: 100,
        opacity: 0,
      }}
      whileInView={{
        x: -63,
        opacity: 1,
      }}
    >
      <div className="animated-button-container">
        <Button
          primary
          className="book-meeting-button bg-[#5E5E5E] text-xs "
          onClick={() => {
            router.replace('#book');
            scroller.scrollTo('contact', {
              duration: 800,
              delay: 200,
              // offset: -30,
              smooth: 'easeInOutQuart',
            });
          }}
        >
          Book meeting
        </Button>{' '}
      </div>
      <NextImage
        height={100}
        width={100}
        alt="Amir Baghian"
        className="shake-effect size-[49px] rounded-[14px]"
        src={Amir}
      />
    </motion.div>
  );
};

export default BookMeetingButton;
