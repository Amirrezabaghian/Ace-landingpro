'use client';

import { useRouterHash } from '@libs/hooks/useHashRouter';
import cn from '@libs/utils/cn';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import BookCall from './BookCall';
import FormContainer from './FormContainer';
import Tab from './Tab';

const ContactForm = () => {
  const [activeTab, setActiveTab] = useState<'book' | 'request'>('request');

  const hash = useRouterHash();
  const router = useRouter();

  const handleTabClick = (tabName: 'book' | 'request') => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    if (hash) {
      handleTabClick(hash as 'book' | 'request');
      router.replace('/');
    }
  }, [hash, router]);

  return (
    <div className="relative mt-5 w-full max-w-[95%] sm:max-w-[577px]">
      <div className="relative flex">
        <div
          className={cn(
            'absolute -bottom-0.5 left-0 z-0 h-[60px] w-1/2 rounded-t-[24px] transition-all duration-300 sm:h-[52px]',
            {
              'bg-white': true,
              'translate-x-full': activeTab !== 'request',
            },
          )}
        ></div>
        <Tab
          isFirst
          isActive={activeTab === 'request'}
          label="Request a Quote"
          onClick={() => handleTabClick('request')}
        />
        <Tab
          isLast
          isActive={activeTab === 'book'}
          label="Book a Call"
          onClick={() => handleTabClick('book')}
        />
      </div>

      {activeTab === 'request' ? <FormContainer /> : <BookCall />}
    </div>
  );
};

export default ContactForm;
