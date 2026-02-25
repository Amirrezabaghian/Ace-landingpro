import type { SelectHTMLAttributes } from 'react';

import { ArrowDownIcon } from '@icons';
import cn from '@libs/utils/cn';

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  data: { value: string; label: string }[];
  placeholder: string;
  error?: string;
}

const SelectInput = ({
  className,
  label,
  data,
  placeholder,
  error,
  ...rest
}: Props) => {
  return (
    <div className="flex flex-col gap-3">
      {label && (
        <label className="pl-1 text-sm font-medium !leading-[24px] text-[#0A0A11]">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          {...rest}
          className={cn(
            'h-10 w-full appearance-none rounded-full border-gray-400 bg-[#5E5E5E0D] px-4 py-2 text-sm text-black focus:border focus:outline-none',
            { 'border-red-500 text-red-500 border': error },
          )}
          style={{
            WebkitAppearance: 'none',
            MozAppearance: 'none',
          }}
        >
          <option disabled hidden selected value="">
            {placeholder}
          </option>

          {data.map(item => (
            <option
              className="text-primary"
              key={item.value}
              value={item.value}
            >
              {item.label}
            </option>
          ))}
        </select>{' '}
        <div className="absolute right-4 top-0 z-20 flex h-full items-center justify-center">
          <ArrowDownIcon className="size-4" />
        </div>{' '}
      </div>
      {error ? (
        <span className="pl-1 text-[13px] text-red-500">{error}</span>
      ) : null}
    </div>
  );
};

export default SelectInput;
