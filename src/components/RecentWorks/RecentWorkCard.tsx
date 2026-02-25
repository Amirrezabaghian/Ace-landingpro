/* eslint-disable @eslint-react/no-array-index-key */
import type { Member } from '@libs/data/members';
import type { ImageProps, StaticImageData } from 'next/image';
import type { CSSProperties, HTMLAttributes } from 'react';

import AvatarGroup from '@design/Avatar/AvatarGroup';
import CursorBoxContent from '@design/CursorBoxContent/CursorBoxContent';
import MotionDiv from '@design/MotionDiv/MotionDiv';
import { NextImage } from '@design/NextImage/NextImage';
import ToolTipBox from '@design/ToolTipBox/ToolTipBox';
import cn from '@libs/utils/cn';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import React from 'react';

export interface RecentWorkCardProps extends HTMLAttributes<HTMLDivElement> {
  multiple?: boolean;
  bg?: CSSProperties['backgroundColor'];
  imgClassName?: ImageProps['className'];

  data: {
    title: string;
    date: string;
    client: string;
    images: StaticImageData[] | string[];
    tools: string[];
    designers: Member[];
  };
}
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  multiple?: boolean;
  bg?: CSSProperties['backgroundColor'];
  images: string | StaticImageData | StaticImageData[] | string[];
  imgClassName?: ImageProps['className'];
}

const Card = ({
  className,
  multiple,
  images,
  title,
  bg,
  imgClassName,
  ...rest
}: CardProps) => {
  return (
    <div
      style={{ backgroundColor: bg }}
      className={cn(
        'w-full overflow-hidden rounded-3xl border border-black/10 ',
        {
          'pb-0 md:pb-0 pt-[25px] md:pt-[63px]': multiple,
          'py-[25px] md:py-[63px]': !multiple,
        },
        className,
      )}
      {...rest}
    >
      <motion.div
        className="flex w-full items-center justify-center"
        initial={{ opacity: 0, y: 70 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <div className="flex max-w-[90%] items-center justify-center gap-5">
          {Array.isArray(images) ? (
            images.map((img, index) => (
              <NextImage
                alt={title ?? ''}
                className={cn('max-md:max-w-[40%]', imgClassName)}
                key={`Recent_Card_IMG_${title}_${index}`}
                src={img}
              />
            ))
          ) : (
            <NextImage
              alt={title ?? ''}
              className={cn('max-md:max-w-[90%]', imgClassName)}
              src={images}
            />
          )}{' '}
        </div>
      </motion.div>
    </div>
  );
};

const RecentWorkCard = ({
  className,
  multiple,
  data,
  ...rest
}: RecentWorkCardProps) => {
  const t = useTranslations('recentWorks');

  return (
    <div className="flex w-full flex-col gap-5">
      <CursorBoxContent
        content={
          <ToolTipBox title={data.title} description={data.tools.join(' ')} />
        }
        followCursor="xy"
        offsetY={26}
      >
        {multiple ? (
          <div className="flex w-full flex-col gap-3 md:flex-row md:gap-5">
            {data.images.map((img, index) => (
              <Card
                className={className}
                images={img}
                key={`Recent_Card_${data.title}_${index}`}
                multiple={multiple}
                {...rest}
              />
            ))}
          </div>
        ) : (
          <Card
            className={className}
            images={data.images.length > 1 ? data.images : data.images[0]}
            multiple={multiple}
            {...rest}
          />
        )}
      </CursorBoxContent>
      <MotionDiv className="flex w-full flex-col items-center justify-between px-3 max-sm:gap-5 sm:flex-row sm:px-6 md:px-10">
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col gap-1 text-xs">
            <span className="text-black/40">{data.title}</span>
            <span className="text-black/40">{data.date}</span>
          </div>
          <div className="flex flex-col gap-1 text-xs">
            <span className="text-black/40">{t('card.client')}</span>
            <span className="font-medium text-black/90">{data.client}</span>
          </div>
          <div className="flex flex-col gap-1 text-xs">
            <span className="text-black/40">{t('card.tools')}</span>
            <div className="flex  flex-wrap gap-1">
              {data.tools.map((tool, index) => (
                <span
                  className="font-medium text-black/90"
                  key={`Recent_Card_Tool_${data.title}_${index}`}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 max-sm:hidden max-sm:w-full">
            <p className="text-xs text-black/40">{t('card.designers')}</p>
            <AvatarGroup avatars={data.designers} />
          </div>
        </div>

        <div className="flex items-center gap-2 max-sm:w-full max-sm:justify-between sm:hidden">
          <p className="text-xs text-black/40">{t('card.designers')}</p>
          <AvatarGroup avatars={data.designers} />
        </div>
      </MotionDiv>
    </div>
  );
};

export default RecentWorkCard;
