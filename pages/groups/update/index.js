import React, { useState, useEffect } from 'react';
import HeroCarousel from '../../../components/carousels/HeroCarousel';
import GroupForm from '../../../components/character/forms/GroupForm';
import GroupCarousel from '../../../components/carousels/GroupCarousel';
import { getUsers } from '../../../utils/data/user';
import { getCharacterGroups } from '../../../utils/data/groupData';

const Index = () => {
  const [characterGroups, setCharacterGroups] = useState([]);
  const [gameMasters, setGameMasters] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const allUsers = await getUsers();
      setGameMasters(allUsers.filter((thisUser) => thisUser.game_master === true));

      const groups = await getCharacterGroups();
      setCharacterGroups(groups || []);
    };
    fetchData();
  }, []);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '13px',
    }}
    >
      {/* Top: HeroCarousel */}
      <div style={{ width: '100%', marginBottom: '16px' }}>
        <HeroCarousel />
      </div>

      {/* Middle: GroupForm */}
      <div style={{ width: '100%', maxWidth: '800px', marginBottom: '16px' }}>
        {showForm ? (
          <GroupForm
            gameMasters={gameMasters}
            onCancel={() => setShowForm(false)}
          />
        ) : (
          <button
            type="button"
            onClick={() => setShowForm(true)}
            style={{
              padding: '10px 16px',
              backgroundColor: '#00b300',
              color: '#ffffcc',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Create New Group
          </button>
        )}
      </div>

      {/* Bottom: GroupCarousel */}
      <div style={{ width: '100%', maxWidth: '800px' }}>
        <GroupCarousel groups={characterGroups} />
      </div>
    </div>
  );
};

export default Index;
