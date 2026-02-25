import cn from '@libs/utils/cn';
import React from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const TextInput = ({ className, label, error, ...rest }: Props) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm">{label}</label>}
      <input
        {...rest}
        className={cn(
          'h-10 w-full appearance-none rounded-full border-gray-400 bg-[#5E5E5E0D] px-4 py-2 text-sm focus:border focus:outline-none',
          { 'border-red-500 text-red-500 border': error },
        )}
      />
      <span className="pl-1 text-[13px] text-red-500">{error}</span>
    </div>
  );
};

export default TextInput;
