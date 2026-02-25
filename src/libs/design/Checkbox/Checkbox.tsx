import type { InputHTMLAttributes } from 'react';

import { Tick2Icon } from '@icons';
import React from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Checkbox = ({ label, ...rest }: Props) => {
  return (
    <label className="flex items-center gap-2">
      <input
        className="peer hidden appearance-none"
        type="checkbox"
        style={{
          WebkitAppearance: 'none',
          MozAppearance: 'none',
        }}
        {...rest}
      />
      <div
        className={` flex size-5 items-center justify-center rounded-[8px] bg-[#F4F4F4]  peer-checked:bg-primary/70`}
      >
        <Tick2Icon className="size-4" />
      </div>
      <span className="text-sm !leading-[22px] text-black/40">{label}</span>
    </label>
  );
};

export default Checkbox;
