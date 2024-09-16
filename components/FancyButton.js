import React from 'react';
import PropTypes from 'prop-types';

const FancyButton = ({
  onClick, children, style, disabled = false,
}) => (
  <button
    type="button"
    className="fancy-button"
    onClick={onClick}
    style={{ ...style }}
    disabled={disabled}
  >
    {children}
  </button>
);

FancyButton.propTypes = {
  onClick: PropTypes.func.isRequired, // onClick should be a function and is required
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
  children: PropTypes.node.isRequired, // children should be any node (text, elements, etc.) and is required
  disabled: PropTypes.bool, // disabled should be a boolean
};

FancyButton.defaultProps = {
  style: {},
  disabled: false, // default disabled state
};

export default FancyButton;
