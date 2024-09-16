import React from 'react';
import PropTypes from 'prop-types';
import FancyCardLong from './character/cards/FancyCard copy';

const UserCard = ({
  handle, bio, admin, gameMaster,
}) => (
  <FancyCardLong>
    <div
      className="user-card"
      style={{
        border: '1px solid #ddd', padding: '15px', borderRadius: '8px', marginBottom: '20px',
      }}
    >
      <h3>{handle || 'Unknown User'}</h3>
      {bio && <p><strong>Bio:</strong> {bio}</p>}
      <p><strong>Admin:</strong> {admin ? 'Yes' : 'No'}</p>
      <p><strong>Game Master:</strong> {gameMaster ? 'Yes' : 'No'}</p>
    </div>
  </FancyCardLong>
);

UserCard.propTypes = {
  handle: PropTypes.string,
  bio: PropTypes.string,
  admin: PropTypes.bool.isRequired,
  gameMaster: PropTypes.bool.isRequired,
};

UserCard.defaultProps = {
  handle: 'Anonymous',
  bio: '',
};

export default UserCard;
