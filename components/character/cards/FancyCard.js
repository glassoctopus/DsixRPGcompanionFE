import React from 'react';
import propTypes from 'prop-types';

const FancyCard = ({ children }) => (
  <div className="fancy-card">
    {children}
  </div>
);

FancyCard.propTypes = {
  children: propTypes.node.isRequired,
};

export default FancyCard;
