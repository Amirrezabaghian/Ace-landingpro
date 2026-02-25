'use client';

import type { Designer } from '@/types';
import type { StaticImageData } from 'next/image';

import Avatar from '@design/Avatar/Avatar';
import Button from '@design/Button/Button';
import { useTranslations } from 'next-intl';
import React from 'react';

interface Props {
  title: string;
  designer: {
    name: string;
    image: string | StaticImageData;
  };
}

const ProjectToolTip = ({ designer, title }: Props) => {
  const t = useTranslations('landing.designedProjects');

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Avatar size="sm" alt={designer.name} src={designer.image} />
        <span className="text-xs text-black/40">{title}</span>
      </div>
      <Button primary className="text-xs text-white">
        {t('viewProject')}
      </Button>
    </div>
  );
};

export default ProjectToolTip;
