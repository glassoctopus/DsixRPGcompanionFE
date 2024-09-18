import React from 'react';
import PropTypes from 'prop-types';

const Tooltip = ({ text, tooltip }) => (
  <div className="tooltip-container">
    {text}
    <span className="tooltip-text">{tooltip}</span>
  </div>
);

Tooltip.propTypes = {
  text: PropTypes.string,
  tooltip: PropTypes.string,
};

Tooltip.defaultProps = {
  text: '.',
  tooltip: '.',
};

export default Tooltip;
