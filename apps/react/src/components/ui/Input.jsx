import { forwardRef } from 'react';
import PropTypes from 'prop-types';

const Input = forwardRef(function Input({ className = '', ...inputProps }, ref) {
  return (
    <input
      className={`h-[58px] w-full border border-[#dedede] bg-[#f7f7f7] px-4 text-base text-[#333333] outline-none transition placeholder:text-[#b5b5b5] focus:border-[#4650ff] focus:ring-2 focus:ring-[#4650ff]/20 ${className}`.trim()}
      ref={ref}
      {...inputProps}
    />
  );
});

Input.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Input;
