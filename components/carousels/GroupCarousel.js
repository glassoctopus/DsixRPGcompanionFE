import React, { useState, useEffect } from 'react';
import GroupCard from '../character/cards/GroupCard';
import { getCharacterGroups } from '../../utils/data/groupData';

const GroupCarousel = () => {
  const [groups, setGroups] = useState([]);

  const makeGroupCards = (groupsGrabbed) => {
    setGroups(groupsGrabbed || []);
  };

  useEffect(() => {
    const fetchGroups = async () => {
      const fetchedGroups = await getCharacterGroups();
      makeGroupCards(fetchedGroups);
    };

    fetchGroups();
  }, []);

  const handleGroupDeleted = () => {
    // Reload groups or refresh the parent component, react is a lot...
    const fetchGroups = async () => {
      const fetchedGroups = await getCharacterGroups();
      setGroups(fetchedGroups || []);
    };

    fetchGroups();
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '16px',
        maxHeight: '1000px',
        overflowY: 'hidden',
        overflowX: 'auto',
        // Ensure overflow is visible
        scrollbarWidth: 'auto', // For Firefox
        msOverflowStyle: 'auto', // For Internet Explorer and Edge
        position: 'relative', // Ensure relative positioning for inner scroll area
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          overflowX: 'auto',
          width: 'calc(100% - 72px)', // Adjust width to account for left and right padding
          scrollSnapType: 'x mandatory',
          paddingLeft: '36px',
          paddingRight: '36px',
          boxSizing: 'border-box',
          WebkitOverflowScrolling: 'touch', // For smooth scrolling on iOS... might be moot
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
                minWidth: '500px', // Adjust based on card size
                maxWidth: '666px', // Adjust based on card size
                transition: 'transform 0.3s ease-in-out',
                cursor: 'pointer',
                paddingLeft: index === 0 ? '0' : '0',
                paddingRight: index === groups.length - 1 ? '0' : '0',
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
                onGroupDeleted={handleGroupDeleted}
              />
            </div>
          ))
        ) : (
          <p>No groups available.</p>
        )}
      </div>
    </div>
  );
};

export default GroupCarousel;
