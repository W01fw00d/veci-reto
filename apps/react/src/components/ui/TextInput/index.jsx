// @ts-check

import { forwardRef } from 'react';

/** @typedef {import('react').InputHTMLAttributes<HTMLInputElement>} InputProps */

const TextInput = forwardRef(
  /**
   * @param {InputProps} props
   * @param {import('react').ForwardedRef<HTMLInputElement>} ref
   */
  function TextInput({ className = '', ...inputProps }, ref) {
    return (
      <input
        className={`h-[60px] w-full border border-[#CCCCCC] bg-[#F7F7F7] px-4 text-[18px] leading-[26px] text-[#333333] outline-none transition placeholder:text-[#999999] focus:border-[#324BFF] focus:ring-2 focus:ring-[#324BFF]/20 ${className}`.trim()}
        ref={ref}
        {...inputProps}
      />
    );
  },
);

export default TextInput;
