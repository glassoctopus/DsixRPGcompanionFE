import React from 'react';
import AbilityForm from '../../../components/character/forms/AbilityForm';
import { useAuth } from '../../../context/AuthContext';

const NewSpecialAbility = () => {
  const { user } = useAuth();
  return (
    <div className="hero-container">
      <div className="hero-content">
        <h2>Create a new character Special Ability</h2>
        <AbilityForm user={user} />
      </div>
    </div>
  );
};

export default NewSpecialAbility;
