import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import HeroOverviewCard from './HeroOverviewCard';
import { deleteCharacterGroup } from '../../../utils/data/groupData';
import FancyCardLong from './FancyCardLong';
import FancyButton from '../../FancyButton';

const GroupCard = ({
  group, onCreateGroup, onTogglePrivate, onToggleAdventureParty, onGroupDeleted,
}) => {
  const router = useRouter();

  const handleUpdateGroup = () => {
    router.push(`/groups/update/${group.id}`);
  };

  const handleDeleteGroup = () => {
    const confirmed = window.confirm(`Are you sure you want to delete the group with ID: ${group.id}?`);
    if (confirmed) {
      deleteCharacterGroup(group.id).then(() => {
        // Call the callback function to notify parent component
        onGroupDeleted();
        router.push('/groups');
      });
    }
  };

  return (
    <FancyCardLong>
      <div
        style={{
          border: '1px solid #ccc',
          padding: '16px',
          margin: '16px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start', // Ensures content starts at the top
        }}
      >
        {group ? (
          <>
            <h2>{group.group_name || 'Unnamed Group'}</h2>
            <p><strong>User:</strong> {group.user || 'Unknown User'}</p>
            <p><strong>Game Master:</strong> {group.game_master_handle || 'No GM Assigned'}</p>
            <div><p><strong>Heroes in {group.group_name}</strong></p></div>

            <div style={{ overflowX: 'auto', padding: '16px 0' }}>
              <div style={{
                display: 'flex',
                gap: '16px',
                paddingBottom: '16px',
                alignItems: 'center',
                whiteSpace: 'nowrap',
              }}
              >
                {group?.characters?.length > 0 ? (
                  group.characters.map((hero) => (
                    <HeroOverviewCard
                      key={hero.id}
                      id={hero.id}
                      userHandle={hero.user_handle}
                      name={hero.name}
                      archetypeName={hero.archetype_name}
                      groupName={group.group_name}
                    />
                  ))
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      border: '1px dashed #ccc',
                      margin: '16px 0',
                      height: '100px', // Adjust height as needed
                    }}
                  >
                    <p>No heroes in this group.</p>
                  </div>
                )}
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <FancyButton onClick={() => onTogglePrivate(group.id)} style={{ padding: '13px', margin: '13px' }}>
                {group.private ? 'Private Group' : 'Public Group'}
              </FancyButton>
              <FancyButton onClick={() => onToggleAdventureParty(group.id)} style={{ padding: '13px', margin: '13px' }}>
                {group.is_adventure_party ? 'Adventure Party' : 'Regular Group'}
              </FancyButton>
              <FancyButton onClick={handleUpdateGroup} style={{ padding: '13px', margin: '13px' }}>
                Update Group
              </FancyButton>
              <FancyButton onClick={handleDeleteGroup} style={{ padding: '13px', margin: '13px' }}>
                Delete Group
              </FancyButton>
              <FancyButton onClick={() => router.push(`/groups/${group.id}`)} style={{ padding: '13px', margin: '13px' }}>
                View Group
              </FancyButton>
            </div>
          </>
        ) : (
          <>
            <h2>No Groups Available</h2>
            <button type="button" onClick={onCreateGroup}>Create a Group</button>
          </>
        )}
      </div>
    </FancyCardLong>
  );
};

GroupCard.propTypes = {
  group: PropTypes.shape({
    id: PropTypes.number.isRequired,
    group_name: PropTypes.string,
    user: PropTypes.number,
    game_master: PropTypes.number,
    game_master_handle: PropTypes.string,
    private: PropTypes.bool,
    is_adventure_party: PropTypes.bool,
    characters: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      user_handle: PropTypes.string,
      name: PropTypes.string,
      archetype_name: PropTypes.string,
    })),
  }),
  onCreateGroup: PropTypes.func,
  onTogglePrivate: PropTypes.func,
  onToggleAdventureParty: PropTypes.func,
  onGroupDeleted: PropTypes.func, // Add prop type for the callback
};

GroupCard.defaultProps = {
  group: null,
  onCreateGroup: () => {},
  onTogglePrivate: () => {},
  onToggleAdventureParty: () => {},
  onGroupDeleted: () => {}, // Default to no-op function
};

export default GroupCard;
