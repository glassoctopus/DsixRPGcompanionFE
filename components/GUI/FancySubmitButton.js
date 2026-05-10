import React from 'react';
import PropTypes from 'prop-types';

const FancySubmitButton = ({
  children,
  disabled = false,
  className = '',
}) => (
  <button
    type="submit"
    className={`fancy-button ${className}`.trim()}
    disabled={disabled}
  >
    {children}
  </button>
);

FancySubmitButton.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

FancySubmitButton.defaultProps = {
  disabled: false,
  className: '',
};

export default FancySubmitButton;
