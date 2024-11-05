import React from 'react';
import SpeciesForm from '../../../components/character/forms/SpeciesForm';
import { useAuth } from '../../../utils/context/authContext';

const NewSpecies = () => {
  const { user } = useAuth();
  return (
    <div className="hero-container">
      <div className="hero-content">
        <div style={{
          margin: '13px',
          border: '13px',
          padding: '13px',
          maxHeight: '666px',
          overflowY: 'auto',
        }}
        >
          <h2>Create a new character Species As an admin or GM only</h2>
          <SpeciesForm user={user} />
        </div>
      </div>
    </div>
  );
};

export default NewSpecies;
