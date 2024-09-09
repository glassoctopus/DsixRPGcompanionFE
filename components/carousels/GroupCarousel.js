import React, { useState, useEffect } from 'react';
import GroupCard from '../character/cards/GroupCard'; // Adjust the path based on your directory structure
import { getCharacterGroups } from '../../utils/data/groupData'; // Adjust the path based on your directory structure

const GroupCarousel = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      const fetchedGroups = await getCharacterGroups();
      setGroups(fetchedGroups || []);
    };

    fetchGroups();
  }, []);

  const handleTogglePrivate = (groupId) => {
    console.error('implement this for group:', groupId);
    // Implement toggle private logic or callback
  };

  const handleToggleAdventureParty = (groupId) => {
    console.error('implement this for group:', groupId);
    // Implement toggle adventure party logic or callback
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: '16px',
        overflowX: 'auto',
        maxWidth: '100%',
        whiteSpace: 'nowrap',
        scrollSnapType: 'x mandatory',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {groups.length > 0 ? (
        groups.map((group, index) => (
          <div
            key={group.id}
            style={{
              flex: '0 0 auto',
              scrollSnapAlign: 'start',
              marginRight: '16px',
              minWidth: '400px', // Adjust based on card size
              maxWidth: '666px', // Adjust based on card size
              transition: 'transform 0.3s ease-in-out',
              cursor: 'pointer',
              paddingLeft: index === 0 ? '16px' : '0',
              paddingRight: index === groups.length - 1 ? '16px' : '0',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <GroupCard
              group={group}
              onTogglePrivate={handleTogglePrivate}
              onToggleAdventureParty={handleToggleAdventureParty}
            />
          </div>
        ))
      ) : (
        <p>No groups available.</p>
      )}
    </div>
  );
};

export default GroupCarousel;
