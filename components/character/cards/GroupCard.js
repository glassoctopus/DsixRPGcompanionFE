import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import HeroOverviewCard from './HeroOverviewCard';

const GroupCard = ({
  group, onCreateGroup, onTogglePrivate, onToggleAdventureParty, onAddHero,
}) => {
  const router = useRouter();

  const handleUpdateGroup = () => {
    router.push(`/groups/update/${group.id}`);
  };

  const handleDeleteGroup = () => {
    // Implement delete logic or call from parent
  };

  return (
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
          <p><strong>Game Master:</strong> {group.game_master || 'No GM Assigned'}</p>

          <div style={{ marginBottom: '16px' }}>
            <button type="button" onClick={() => onTogglePrivate(group.id)}>
              {group.private ? 'Private Group' : 'Public Group'}
            </button>
            <button type="button" onClick={() => onToggleAdventureParty(group.id)}>
              {group.is_adventure_party ? 'Adventure Party' : 'Regular Group'}
            </button>
            <button
              type="button"
              onClick={handleUpdateGroup}
            >
              Update Group
            </button>
            <button
              type="button"
              onClick={handleDeleteGroup}
            >
              Delete Group
            </button>
            <button
              type="button"
              onClick={() => router.push(`/groups/${group.id}`)}
            >
              View Group
            </button>
            <button
              type="button"
              onClick={() => onAddHero(group.id)}
            >
              Add Hero
            </button>
          </div>

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
                  <button type="button" onClick={() => onAddHero(group.id)}>Add Hero</button>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <h2>No Groups Available</h2>
          <button type="button" onClick={onCreateGroup}>Create a Group</button>
        </>
      )}
    </div>
  );
};

GroupCard.propTypes = {
  group: PropTypes.shape({
    id: PropTypes.number.isRequired,
    group_name: PropTypes.string,
    user: PropTypes.number,
    game_master: PropTypes.number,
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
  onAddHero: PropTypes.func,
};

GroupCard.defaultProps = {
  group: null,
  onCreateGroup: () => {},
  onTogglePrivate: () => {},
  onToggleAdventureParty: () => {},
  onAddHero: () => {},
};

export default GroupCard;
