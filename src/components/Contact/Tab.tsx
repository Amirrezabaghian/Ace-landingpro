import cn from '@libs/utils/cn';
import { motion } from 'motion/react';
import React from 'react';

interface TabProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  isFirst?: boolean;
  isLast?: boolean;
}

const Tab: React.FC<TabProps> = ({
  label,
  isActive,
  onClick,
  isFirst,
  isLast,
}) => {
  return (
    <button
      onClick={onClick}
      className={`relative h-[52px] w-full cursor-pointer transition-colors duration-200 ${
        isActive ? 'z-10 font-medium' : ''
      } ${isActive ? '' : ' -mb-px'}`}
    >
      {isActive ? (
        <>
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: isFirst ? -20 : 20 }}
            transition={{ duration: 0.2, delay: 0.2 }}
            className={cn(
              'absolute bottom-0 z-20 flex size-[48px] bg-[#f5f5f5]',
              {
                'right-[-48px] rounded-bl-[80%]': isFirst,
                'left-[-48px] rounded-br-[80%]': isLast,
              },
            )}
          />
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: isFirst ? -20 : 20 }}
            transition={{ duration: 0.1, delay: 0.25 }}
            className={cn('absolute bottom-0 flex size-[30px] bg-white', {
              'right-[-29px]': isFirst,
              'left-[-28px]': isLast,
            })}
          />{' '}
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0, delay: 0.25 }}
            className={cn('absolute -bottom-5 flex size-[30px] bg-white', {
              'left-[0px]': isFirst,
              'right-[0px]': isLast,
            })}
          />{' '}
        </>
      ) : null}

      <span
        className={cn(
          'absolute left-[50%] top-[50%] z-20 w-[95%] translate-x-[-50%] translate-y-[-50%] font-medium',
          {
            'text-black/50': !isActive,
          },
        )}
      >
        {label}
      </span>
    </button>
  );
};

export default Tab;
