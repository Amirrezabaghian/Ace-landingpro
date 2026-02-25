import Button from '@design/Button/Button';
import Dot from '@design/Dot/Dot';
import MotionDiv from '@design/MotionDiv/MotionDiv';
import { TaskListIcon } from '@icons';
import { translate } from '@libs/utils/translate';
import { useTranslations } from 'next-intl';
import React from 'react';

import TaskItem from './TaskItem';

const tasksData = [
  {
    title: 'Hilo Agency',
    description: translate('landing.designPartner.taskList.designDevelop'),
    hasLineThrough: true,
    color: '#4A1CCE',
  },
  {
    title: 'Ace Studio',
    description: translate('landing.designPartner.taskList.fullDesignAgency'),
    isBestChoice: true,
    color: '#BF7014',
  },
  {
    title: 'Bubble Design agency',
    description: translate('landing.designPartner.taskList.designAgency'),
    hasLineThrough: true,
    color: '#189B5C',
  },
];

const TaskList = () => {
  const t = useTranslations('landing.designPartner.taskList');
  return (
    <MotionDiv
      className="mt-12 flex size-full max-w-[93%] flex-col justify-center gap-8 rounded-[18px] border border-[#f0f0f0] bg-[#FCFCFC] px-8 py-6 sm:max-w-[542px]"
      style={{
        boxShadow: '0px 8px 7.9px -4px rgba(226, 226, 226, 0.73)',
      }}
    >
      <div className="flex items-center gap-2">
        <TaskListIcon className="size-6" />
        <span className="font-medium">{t('title')}</span>
        <Button className="px-3 py-1.5 text-sm font-medium" secondary>
          8 {t('list')}
        </Button>
      </div>

      <MotionDiv className="flex flex-col gap-3">
        {tasksData.map((task, index) => (
          <TaskItem index={index} key={task.title} task={task} />
        ))}
      </MotionDiv>
      <Button
        className="flex w-fit items-center gap-[3px] self-center px-4 py-1.5 text-xs"
        secondary
      >
        <Dot size={4} color="#8759F2" />
        <Dot size={4} color="#37C390" />
        <span className="ml-[3px]">+2 {t('more')}</span>
      </Button>
    </MotionDiv>
  );
};

export default TaskList;
