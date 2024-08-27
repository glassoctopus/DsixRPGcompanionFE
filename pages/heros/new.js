import React from 'react';
import HeroForm from '../../components/character/forms/HeroForm';
import { useAuth } from '../../utils/context/authContext';

const NewHero = () => {
  const { user } = useAuth();
  return (
    <div className="hero-container">
      <div className="hero-content">
        <h2>Create a new Hero</h2>
        <HeroForm user={user} />
      </div>
    </div>
  );
};

export default NewHero;
