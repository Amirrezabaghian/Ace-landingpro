import Members from '@/components/Members/Members';
import { CommentsSlider } from '@components/Comments/CommentsSlider';
import Contact from '@components/Contact/Contact';
import CustomProduct from '@components/CustomProduct/CustomProduct';
import DesignedProjects from '@components/DesignedProjects/DesignedProjects';
import DesignPartner from '@components/DesignPartner/DesignPartner';
import OurFriends from '@components/OurFriends/OurFriends';
import Quality from '@components/Quality/Quality';
import LandingRecentWorks from '@components/RecentWorks/LandingRecentWorks';
import Works from '@components/Works/Works';
import WorksSlider from '@components/Works/WorksSlider';
import React from 'react';

const Landing = () => {
  return (
    <div className="landing-container z-10 flex min-h-screen w-full flex-col pb-40">
      <Members />
      <DesignedProjects />
      <Works />
      <WorksSlider />
      <OurFriends />
      <Quality />
      <LandingRecentWorks />
      <CommentsSlider />
      <CustomProduct />
      <DesignPartner />
      <Contact />
      <OurFriends className="mt-[94px]" />
    </div>
  );
};

export default Landing;
