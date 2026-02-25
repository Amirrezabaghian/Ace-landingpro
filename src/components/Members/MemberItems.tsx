'use client';

import { membersData } from '@libs/data/members';
import React, { useState } from 'react';

import MemberItem from './MemberItem';

const hiddenMembers = ['ali', 'marina', 'sarami', 'rez', 'boka'];
// const hiddenMembers = ['sia7ash', 'jahan', 'behi', 'ali'];
const MemberItems = () => {
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);

  return (
    <div className="flex justify-center gap-2">
      {membersData
        .filter(m => !hiddenMembers.includes(m.id))
        .map((member, index) => (
          <MemberItem
            index={index}
            key={member.name}
            member={member}
            hoveredImage={hoveredImage}
            setHoveredImage={setHoveredImage}
          />
        ))}
    </div>
  );
};

export default MemberItems;
