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
        className={`h-[58px] w-full border border-[#dedede] bg-[#f7f7f7] px-4 text-base text-[#333333] outline-none transition placeholder:text-[#b5b5b5] focus:border-[#4650ff] focus:ring-2 focus:ring-[#4650ff]/20 ${className}`.trim()}
        ref={ref}
        {...inputProps}
      />
    );
  },
);

export default TextInput;
