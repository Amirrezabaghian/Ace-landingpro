import CircleLoader from '@design/Loader/CircleLoader';
import React from 'react';

interface Props {
  title: string;
  description: string;
}

const ToolTipBox = ({ description, title }: Props) => {
  return (
    <div
      className="flex min-w-max items-center gap-3 rounded-[18px] bg-primary px-[18px] py-3.5"
      style={{
        boxShadow:
          '0px 10px 16px -10px rgba(0, 0, 0, 0.40), 0px -1px 0.5px 0px rgba(0, 0, 0, 0.11) inset, 0.5px 0.5px 0px 0px rgba(255, 255, 255, 0.24) inset',
      }}
    >
      <CircleLoader />

      <div className="flex flex-col gap-1">
        <span className="whitespace-nowrap text-[11px] text-white/40">
          {description}
        </span>
        <span className="whitespace-nowrap text-sm text-white">{title}</span>
      </div>
    </div>
  );
};

export default ToolTipBox;
