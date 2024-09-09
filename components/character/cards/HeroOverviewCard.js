import React from 'react';
import PropTypes from 'prop-types';

const HeroOverviewCard = ({
  id, userHandle, name, archetypeName, groupName,
}) => (
  <div style={{
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    padding: '1rem',
    // minWidth: '333px',
    margin: '1rem',
    backgroundColor: '#fff',
  }}
  >
    <h2>{name}</h2>
    <p><strong>User Handle:</strong> {userHandle}</p>
    <p><strong>Archetype:</strong> {archetypeName}</p>
    <p><strong>Group:</strong> {groupName}</p>
    <p>{id}</p>
  </div>
);

HeroOverviewCard.propTypes = {
  id: PropTypes.number.isRequired,
  userHandle: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  archetypeName: PropTypes.string.isRequired,
  groupName: PropTypes.string,
};

HeroOverviewCard.defaultProps = {
  groupName: 'groupless',
};

export default HeroOverviewCard;
