/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getCharacterGroups } from '../../utils/data/groupData'; // Adjust this import as needed
import HeroOverviewCard from '../../components/character/cards/HeroOverviewCard';
import HeroCarousel from '../../components/carousels/HeroCarousel';
import GroupForm from '../../components/character/forms/GroupForm';
import { getUsers } from '../../utils/data/user';
import FancyButton from '../../components/FancyButton';
import FancyCard from '../../components/character/cards/FancyCard';

const GroupCreationView = () => {
  const router = useRouter();
  const [group, setGroup] = useState({
    group_name: '',
    user_handle: '',
    game_master_handle: '',
    characters: [],
  });
  const [allCharacters, setAllCharacters] = useState([]);
  const [characterGroups, setCharacterGroups] = useState([]);
  const [gameMasters, setGameMasters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const allUsers = await getUsers();
      setGameMasters(allUsers.filter((thisUser) => thisUser.game_master === true));

      const groups = await getCharacterGroups();
      setCharacterGroups(groups || []);
    };
    fetchData();
  }, []);

  const handleCreateGroup = async (newGroup) => {
    try {
      // Implement the actual group creation logic here (you can pass this as a prop to GroupForm)
      router.push('/groups');
    } catch (error) {
      console.error('Failed to create group:', error);
    }
  };

  const availableCharacters = Array.isArray(allCharacters) ? allCharacters : [];

  return (

    <div style={{ maxHeight: '80vh', overflow: 'auto' }}>
      <FancyCard>
        <div
          style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            padding: '1rem',
            maxWidth: '33rem',
            margin: '1rem auto',
            backgroundColor: 'transparent',
          }}
        >
          <h2>Create New Group</h2>
          <FancyButton onClick={() => router.push('/groups')}>Back To Groups</FancyButton>
          <FancyCard>
            <GroupForm
              group={group}
              onCreateGroup={handleCreateGroup}
              gameMasters={gameMasters}
              allCharacters={allCharacters}
            />
          </FancyCard>
          {/* Display Characters in the Group */}
          <div className="cardOfForm" style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {group.characters.length > 0 ? (
              <div>
                <h3>Characters in Group</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  {group.characters.map((characterId) => {
                    const hero = allCharacters.find((char) => char.id === characterId);
                    return (
                      hero && (
                        <div key={hero.id} style={{ margin: '0 16px', flex: '1 0 45%' }}>
                          <HeroOverviewCard
                            id={hero.id}
                            userHandle={hero.user_handle}
                            name={hero.name}
                            archetypeName={hero.archetype_name}
                            groupName={group.group_name}
                            background={hero.background}
                          />
                        </div>
                      )
                    );
                  })}
                </div>
              </div>
            ) : (
              <p>No heroes in this group.</p>
            )}
          </div>
        </div>

        {/* HeroCarousel Section */}
        <div style={{ marginTop: '32px' }}>
          <h3>All Available Heroes</h3>
          <HeroCarousel characters={availableCharacters} />
        </div>
      </FancyCard>
    </div>

  );
};

export default GroupCreationView;
