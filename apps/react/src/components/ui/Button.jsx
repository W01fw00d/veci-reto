const variantClasses = {
  primary:
    'h-12 min-w-[132px] rounded-full bg-[#394cff] px-8 text-sm font-medium text-white hover:bg-[#293ce8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4650ff]',
  secondary:
    'h-12 min-w-[120px] rounded-full border-2 border-[#a8b2ff] px-7 text-sm font-medium text-[#7184ff] hover:bg-[#f1f3ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4650ff] disabled:opacity-45',
  icon:
    'flex h-12 w-[78px] items-center justify-center rounded-full border-2 border-[#a8b2ff] text-[#7b8cff] hover:bg-[#f1f3ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4650ff] disabled:opacity-60',
  listOption:
    'block min-h-[39px] w-full px-3 text-left text-[16px] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#4650ff]',
};

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
