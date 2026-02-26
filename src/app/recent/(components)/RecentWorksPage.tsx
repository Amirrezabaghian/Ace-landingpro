/* eslint-disable @eslint-react/no-array-index-key */
'use client';

import type { RecentWorkCardProps } from '@components/RecentWorks/RecentWorkCard';
import { PP_MORI } from '@assets/fonts';
import RecentWorkCard from '@components/RecentWorks/RecentWorkCard';
import Logo from '@design/Logo/Logo';
import MotionDiv from '@design/MotionDiv/MotionDiv';
import cn from '@libs/utils/cn';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import { supabase } from '@/supabaseClient';

const RecentWorksPage = () => {
  const t = useTranslations('recentWorks');
  const [projects, setProjects] = useState<RecentWorkCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        // ۱. واکشی پروژه‌ها
        const { data: projectsData, error: projectsError } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        // ۲. واکشی تمام دیزاینرها از جدول جدید
        const { data: designersData, error: designersError } = await supabase
          .from('designers')
          .select('*');

        if (projectsError) throw projectsError;

        if (projectsData) {
          const formattedData: RecentWorkCardProps[] = projectsData.map((item) => {
            
            // پیدا کردن دیزاینرهای مرتبط و تبدیل avatar_url به image برای نمایش در کامپوننت
            const assignedDesigners = (designersData || [])
              .filter((d) => item.dynamic_designer_ids?.includes(d.id))
              .map((d) => ({
                ...d,
                image: d.avatar_url, // حیاتی برای نمایش عکس
              }));

            return {
              multiple: item.is_double,
              bg: item.bg_color || '#F0F0F0', // استفاده از رنگ ذخیره شده یا رنگ پیش‌فرض
              data: {
                title: item.title_1,
                client: item.client_1,
                date: item.year,
                tools: item.tools || [],
                images: item.is_double 
                  ? [item.image_url_1, item.image_url_2].filter(Boolean) 
                  : [item.image_url_1].filter(Boolean),
                designers: assignedDesigners,
              },
            };
          });
          
          setProjects(formattedData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  return (
    <div className="mt-[180px] flex flex-col items-center gap-[18px] pb-[95px] md:mt-[218px]">
      <Logo />
      <MotionDiv className="flex flex-col items-center text-center text-[29px] font-medium !leading-[38px] sm:text-[33px]">
        <h3>{t('title')}</h3>
      </MotionDiv>
      <MotionDiv
        className={cn(
          'max-w-[90%] text-center text-[15px] !leading-[24px] text-black/40  sm:max-w-[494px]',
          PP_MORI.className,
        )}
      >
        {t('description')}
      </MotionDiv>

      <div className="flex w-full max-w-[95%] flex-col gap-4 md:gap-[45px] lg:max-w-[947px]">
        {loading ? (
          <div className="py-20 text-center opacity-50">Loading Projects...</div>
        ) : (
          projects.map((data, index) => (
            <RecentWorkCard key={`Recent_Works_Card${index}`} {...data} />
          ))
        )}
      </div>
    </div>
  );
};

export default RecentWorksPage;