import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSingleCharacterGroup } from '../../utils/data/groupData';
import HeroOverviewCard from '../../components/character/cards/HeroOverviewCard';

const GroupIdView = () => {
  const router = useRouter();
  const { id } = router.query; // Get group ID from the URL
  const [group, setGroup] = useState(null);

  useEffect(() => {
    const fetchGroup = async () => {
      if (id) {
        try {
          const fetchedGroup = await getSingleCharacterGroup(id);
          setGroup(fetchedGroup);
        } catch (error) {
          console.error('Failed to fetch group:', error);
        }
      }
    };

    fetchGroup();
  }, [id]);

  if (!group) {
    return <p>Loading...</p>;
  }

  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '16px',
        margin: '16px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}
    >
      <h2>{group.group_name || 'Unnamed Group'}</h2>
      <p><strong>User:</strong> {group.user || 'Unknown User'}</p>
      <p><strong>Game Master:</strong> {group.game_master || 'No GM Assigned'}</p>

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
    </div>
  );
};

export default GroupIdView;
