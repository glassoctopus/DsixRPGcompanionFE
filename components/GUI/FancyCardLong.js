import React from 'react';
import propTypes from 'prop-types';

const FancyCardLong = ({ children }) => (
  <div className="fancy-card-long">
    {children}
  </div>
);

FancyCardLong.propTypes = {
  children: propTypes.node.isRequired,
};

export default FancyCardLong;
