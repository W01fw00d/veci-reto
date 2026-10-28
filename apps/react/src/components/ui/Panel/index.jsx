// @ts-check

/** @typedef {import('react').ComponentPropsWithoutRef<'section'>} PanelProps */

/** @param {PanelProps} props */
function Panel({ children, className = '', ...sectionProps }) {
  return (
    <section
      className={`w-full rounded-[20px] bg-white ${className}`.trim()}
      {...sectionProps}
    >
      {children}
    </section>
  );
}

export default Panel;
