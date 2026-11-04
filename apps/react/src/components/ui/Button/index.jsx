// @ts-check

const variantClasses = {
  primary:
    'h-[60px] min-w-[160px] rounded-full bg-[#324BFF] px-8 text-[16px] font-medium text-white hover:bg-[#263EE8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#324BFF]',
  secondary:
    'h-[60px] min-w-[160px] rounded-full border-2 border-[#324BFF] px-7 text-[16px] font-medium text-[#324BFF] hover:bg-[#f1f3ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#324BFF] disabled:opacity-45',
  icon:
    'flex h-[60px] w-[100px] items-center justify-center rounded-full border-2 border-[#324BFF] text-[#324BFF] hover:bg-[#f1f3ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#324BFF] disabled:opacity-60',
  listOption:
    'block min-h-[40px] w-full px-3 text-left text-[16px] font-medium focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#324BFF]',
};

/**
 * @typedef {import('react').ButtonHTMLAttributes<HTMLButtonElement> & {
 *   variant?: keyof typeof variantClasses
 * }} ButtonProps
 */

/** @param {ButtonProps} props */
function Button({
  children,
  className = '',
  type = 'button',
  variant = 'primary',
  ...buttonProps
}) {
  return (
    <button
      className={`transition disabled:cursor-not-allowed ${variantClasses[variant]} ${className}`.trim()}
      type={type}
      {...buttonProps}
    >
      {children}
    </button>
  );
}

export default Button;
