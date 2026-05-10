import React from 'react';
import PropTypes from 'prop-types';

const FancyButton = ({
  onClick,
  children,
  disabled = false,
  className = '',
}) => (
  <button
    type="button"
    className={`fancy-button ${className}`.trim()}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

FancyButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

FancyButton.defaultProps = {
  disabled: false,
  className: '',
};

export default FancyButton;
