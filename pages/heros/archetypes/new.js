import React from 'react';
import ArchtypeForm from '../../../components/character/forms/ArchtypeForm';
import { useAuth } from '../../../utils/context/authContext';

const NewCharacterType = () => {
  const { user } = useAuth();
  return (
    <div className="hero-container">
      <div className="hero-content">
        <h2>Create a new character Archtype</h2>
        <ArchtypeForm user={user} />
      </div>
    </div>
  );
};

export default NewCharacterType;
