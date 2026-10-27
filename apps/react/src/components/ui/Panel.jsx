import PropTypes from 'prop-types';

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

Panel.propTypes = {
  'aria-labelledby': PropTypes.string,
  'aria-modal': PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onMouseDown: PropTypes.func,
  role: PropTypes.string,
};

export default Panel;
