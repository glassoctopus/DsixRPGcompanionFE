import React from 'react';
import HeroForm from '../../components/character/forms/HeroForm';

const NewHero = () => (
  <div className="hero-container">
    <div className="hero-content">
      <h2>Create a new Hero</h2>
      <HeroForm />
    </div>
  </div>
);

export default NewHero;
