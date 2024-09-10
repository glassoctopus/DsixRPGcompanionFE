import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  getSingleCharacterGroup, addCharacterToGroup, removeCharacterFromGroup,
} from '../../../utils/data/groupData';
import { getHeros } from '../../../utils/data/heroData';
import HeroOverviewCard from '../../../components/character/cards/HeroOverviewCard';
import HeroCarousel from '../../../components/carousels/HeroCarousel';

const GroupIdView = () => {
  const router = useRouter();
  const { id } = router.query;
  const [group, setGroup] = useState(null);
  const [allCharacters, setAllCharacters] = useState([]);
  const [selectedAddCharacterId, setSelectedAddCharacterId] = useState(null);
  const [selectedRemoveCharacterId, setSelectedRemoveCharacterId] = useState(null);

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

    const fetchAllCharacters = async () => {
      try {
        const fetchedCharacters = await getHeros(); // This fetches all characters
        setAllCharacters(fetchedCharacters);
      } catch (error) {
        console.error('Failed to fetch all characters:', error);
      }
    };

    fetchGroup();
    fetchAllCharacters();
  }, [id]);

  const handleAddCharacter = async () => {
    if (selectedAddCharacterId) {
      try {
        const updatedGroup = await addCharacterToGroup(id, selectedAddCharacterId);
        setGroup(updatedGroup);
        setSelectedAddCharacterId(null);
      } catch (error) {
        console.error('Failed to add character:', error);
      }
    }
  };

  const handleRemoveCharacter = async () => {
    if (selectedRemoveCharacterId) {
      try {
        const updatedGroup = await removeCharacterFromGroup(id, selectedRemoveCharacterId);
        setGroup(updatedGroup);
        setSelectedRemoveCharacterId(null);
      } catch (error) {
        console.error('Failed to remove character:', error);
      }
    }
  };

  const backToGroups = () => {
    router.push('/groups');
  };

  const availableCharacters = Array.isArray(allCharacters) ? allCharacters : [];

  if (!group || !availableCharacters.length) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ maxHeight: '80vh', overflow: 'auto' }}>
      <div
        style={{
          border: '1px solid #ddd',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          padding: '1rem',
          color: '#4F7942',
          maxWidth: '33rem',
          margin: '1rem auto',
          backgroundColor: 'transparent',
        }}
      >
        <h2>{group.group_name || 'Unnamed Group'}</h2><button type="button" onClick={backToGroups}>Back To Groups</button>
        <p><strong>Group Owner:</strong> {group.user_handle || 'Unknown User'}</p>
        <p><strong>Game Master:</strong> {group.game_master_handle || 'No GM Assigned'}</p>

        {/* Add Character Dropdown */}
        <div style={{ marginBottom: '16px' }}>
          <select
            value={selectedAddCharacterId || ''}
            onChange={(e) => setSelectedAddCharacterId(parseInt(e.target.value, 10))}
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              marginRight: '8px',
            }}
          >
            <option value="" disabled>Select character to add</option>
            {availableCharacters.map((character) => (
              <option key={character.id} value={character.id}>
                {character.name} ({character.archetype_name})
              </option>
            ))}
          </select>
          <button type="button" onClick={handleAddCharacter}>Add Character</button>
        </div>

        {/* Remove Character Dropdown */}
        <div style={{ marginBottom: '16px' }}>
          <select
            value={selectedRemoveCharacterId || ''}
            onChange={(e) => setSelectedRemoveCharacterId(parseInt(e.target.value, 10))}
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              marginRight: '8px',
            }}
          >
            <option value="" disabled>Select character to remove</option>
            {group.characters.map((character) => (
              <option key={character.id} value={character.id}>
                {character.name} ({character.archetype_name})
              </option>
            ))}
          </select>
          <button type="button" onClick={handleRemoveCharacter}>Remove Character</button>
        </div>

        {/* Display Heroes in the Group */}
        <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
          {group?.characters?.length > 0 ? (
            <div>
              <h3>Characters in Group</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {group.characters.map((hero) => (
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
                ))}
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
        <HeroCarousel />
      </div>
    </div>
  );
};

export default GroupIdView;
