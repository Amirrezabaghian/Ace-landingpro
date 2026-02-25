import MotionDiv from '@design/MotionDiv/MotionDiv';
import React from 'react';

interface Props {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const CustomProductCard = ({ description, icon, title }: Props) => {
  return (
    <MotionDiv className="card flex size-full max-w-[392px] flex-col justify-center rounded-[18px] border border-[#f0f0f0] bg-[#FCFCFC] px-8 py-6">
      {icon}

      <span className="mb-2 mt-5 font-medium">{title}</span>

      <MotionDiv className=" flex justify-center">
        <p className={'text-sm !leading-[20px] text-black/40'}>{description}</p>
      </MotionDiv>
    </MotionDiv>
  );
};

export default CustomProductCard;
