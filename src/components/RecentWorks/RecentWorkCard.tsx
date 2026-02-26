/* eslint-disable @eslint-react/no-array-index-key */
'use client';

import type { RecentWorkCardProps } from '@components/RecentWorks/RecentWorkCard';
import CursorBoxContent from '@design/CursorBoxContent/CursorBoxContent';
import MotionDiv from '@design/MotionDiv/MotionDiv';
import ToolTipBox from '@design/ToolTipBox/ToolTipBox';
import cn from '@libs/utils/cn';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

interface CardProps {
  multiple?: boolean;
  bg?: string;
  images: any;
  imgClassName?: string;
  title: string;
}

const Card = ({ multiple, images, title, bg, imgClassName }: CardProps) => {
  const getImgSrc = (img: any) => {
    if (typeof img === 'string') return img;
    return img?.src || img;
  };

  return (
    <div
      style={{ backgroundColor: bg }}
      className={cn(
        'w-full overflow-hidden rounded-3xl border border-black/10 ',
        {
          'pb-0 md:pb-0 pt-[25px] md:pt-[63px]': multiple,
          'py-[25px] md:py-[63px]': !multiple,
        }
      )}
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
              <div key={index} className="relative flex items-center justify-center overflow-hidden rounded-[16px]">
                <Image
                  alt={title ?? ''}
                  src={getImgSrc(img)}
                  width={1000}
                  height={800}
                  unoptimized={true}
                  className={cn('h-auto w-full object-contain max-md:max-w-[100%]', imgClassName)}
                />
              </div>
            ))
          ) : (
            <div className="relative flex items-center justify-center overflow-hidden rounded-[16px]">
              <Image
                alt={title ?? ''}
                src={getImgSrc(images)}
                width={1000}
                height={800}
                unoptimized={true}
                className={cn('h-auto w-full object-contain max-md:max-w-[100%]', imgClassName)}
              />
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const RecentWorkCard = ({ className, multiple, data, ...rest }: RecentWorkCardProps) => {
  const t = useTranslations('recentWorks');

  // آماده‌سازی دیتای دیزاینرها برای رندر دستی
  const designers = data.designers?.map(d => ({
    name: d.name,
    // اولویت با avatar_url دیتابیس، سپس image قدیمی، و در نهایت آیکون ستاره
    url: (d as any).avatar_url || (d as any).image || "https://img.icons8.com/fluency/48/star--v1.png"
  }));

  return (
    <div className="flex w-full flex-col gap-5">
      <CursorBoxContent
        content={<ToolTipBox title={data.title} description={data.tools?.join(' ')} />}
        followCursor="xy"
        offsetY={26}
      >
        {multiple ? (
          <div className="flex w-full flex-col gap-3 md:flex-row md:gap-5">
            {data.images.map((img, index) => (
              <Card
                title={data.title}
                images={img}
                key={`Recent_Card_${data.title}_${index}`}
                multiple={multiple}
                bg={(rest as any).bg || '#F0F0F0'}
              />
            ))}
          </div>
        ) : (
          <Card
            title={data.title}
            images={data.images.length > 1 ? data.images : data.images[0]}
            multiple={multiple}
            bg={(rest as any).bg || '#F0F0F0'}
          />
        )}
      </CursorBoxContent>

      <MotionDiv className="flex w-full flex-col items-center justify-between px-3 max-sm:gap-5 sm:flex-row sm:px-6 md:px-10">
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col gap-1 text-xs">
            <span className="text-black/40 uppercase font-bold">{data.title}</span>
            <span className="text-black/40">{data.date}</span>
          </div>
          <div className="flex flex-col gap-1 text-xs">
            <span className="text-black/40 uppercase font-bold">{t('card.client')}</span>
            <span className="font-medium text-black/90">{data.client}</span>
          </div>
          <div className="flex flex-col gap-1 text-xs">
            <span className="text-black/40 uppercase font-bold">{t('card.tools')}</span>
            <div className="flex flex-wrap gap-1">
              {data.tools?.map((tool, index) => (
                <span className="font-medium text-black/90" key={index}>
                  {tool}{index < data.tools.length - 1 ? ', ' : ''}
                </span>
              ))}
            </div>
          </div>
          
          {/* بخش جایگزین AvatarGroup برای نمایش صحیح عکس‌های دیتابیس */}
          <div className="flex items-center gap-2 max-sm:hidden">
            <p className="text-xs text-black/40 uppercase font-bold">{t('card.designers')}</p>
            <div className="flex items-center -space-x-2">
              {designers?.map((designer, i) => (
                <div 
                  key={i} 
                  className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-white bg-gray-100 shadow-sm"
                  title={designer.name}
                >
                  <Image
                    src={typeof designer.url === 'string' ? designer.url : (designer.url as any).src}
                    alt={designer.name || "Designer"}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* نمایش در موبایل */}
        <div className="flex items-center gap-2 max-sm:w-full max-sm:justify-between sm:hidden">
          <p className="text-xs text-black/40 uppercase font-bold">{t('card.designers')}</p>
          <div className="flex items-center -space-x-2">
              {designers?.map((designer, i) => (
                <div key={i} className="relative h-7 w-7 overflow-hidden rounded-full border-2 border-white bg-gray-100 shadow-sm">
                  <Image
                    src={typeof designer.url === 'string' ? designer.url : (designer.url as any).src}
                    alt={designer.name}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
              ))}
          </div>
        </div>
      </MotionDiv>
    </div>
  );
};

export default RecentWorkCard;