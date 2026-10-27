function Panel({ children, className = '', ...sectionProps }) {
  return (
    <section
      className={`w-full rounded-2xl bg-white px-6 py-8 sm:py-11 ${className}`.trim()}
      {...sectionProps}
    >
      {children}
    </section>
  );
}

export default Panel;
