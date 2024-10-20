import React from 'react';
import SpecialAbilityForm from '../../../components/character/forms/SpecialAbilityForm';
import { useAuth } from '../../../utils/context/authContext';

const NewSpecialAbility = () => {
  const { user } = useAuth();
  return (
    <div className="hero-container">
      <div className="hero-content">
        <h2>Create a new character Special Ability</h2>
        <SpecialAbilityForm user={user} />
      </div>
    </div>
  );
};

export default NewSpecialAbility;
