import type { ReactNode } from 'react';

import CursorBoxContent from '@design/CursorBoxContent/CursorBoxContent';
import ToolTipBox from '@design/ToolTipBox/ToolTipBox';
import cn from '@libs/utils/cn';
import Link from 'next/link';
import React from 'react';

interface Props {
  logo: React.JSX.Element | ReactNode;
  name: string;
  position: string;
  link: string;
  hoverLogo?: React.JSX.Element | ReactNode;
}

const OurFriendItem = ({ logo, name, position, link, hoverLogo }: Props) => {
  return (
    <CursorBoxContent
      content={<ToolTipBox title={name} description={position} />}
      offsetY={8}
    >
      <Link
        className="flex cursor-pointer items-center justify-center rounded-[20px] border border-[rgba(0,0,0,0.05)] p-2"
        href={link}
        target="_blank"
      >
        <div
          className={cn(
            'group flex size-[70px] items-center justify-center rounded-[13px] bg-white hover:bg-[#8759F2]',
            { '[&_path]:hover:fill-white': !hoverLogo },
          )}
        >
          <span className={cn({ 'group-hover:hidden': !!hoverLogo })}>
            {logo}
          </span>
          <span className={cn('hidden', { 'group-hover:block': !!hoverLogo })}>
            {hoverLogo}
          </span>
        </div>
      </Link>
    </CursorBoxContent>
  );
};

export default OurFriendItem;
