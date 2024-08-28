import React, { useState } from 'react';
import HeroForm from '../../components/character/forms/HeroForm';
import { useAuth } from '../../utils/context/authContext';
import ArchetypeDropdown from '../../components/ArchetypeDropDown';

const NewHero = () => {
  const { user } = useAuth();
  const [selectedArchetype, setSelectedArchetype] = useState(null);

  const handleArchetypeSelect = (archetype) => {
    setSelectedArchetype(archetype);
  };

  return (
    <div className="hero-container">
      <div className="hero-content">
        <h2>Create a new Hero</h2>
        <ArchetypeDropdown onSelect={handleArchetypeSelect}>select a character template</ArchetypeDropdown>
        <HeroForm user={user} archetype={selectedArchetype} />
      </div>
    </div>
  );
};

export default NewHero;
