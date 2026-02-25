'use client';

import React from 'react';

import MembersBox from './MembersBox';
import WeBuilding from './WeBuilding';

const Members = () => {
  console.log({
    u: process.env.NEXT_PUBLIC_CAL_USERNAME,
    NODE_ENV: process.env.NODE_ENV,
    e: process.env.NEXT_PUBLIC_CAL_CURRENT_EVENT,
  });
  console.log('process', process.env);

  return (
    <section
      className="flex flex-col items-center justify-center gap-10 pt-[203px] md:pt-[236px]"
      id="home"
    >
      <MembersBox />
      <WeBuilding />
    </section>
  );
};

export default Members;
