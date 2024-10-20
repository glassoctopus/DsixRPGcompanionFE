import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { createSpecies } from '../../../utils/data/speciesData';
import FancyButton from '../../FancyButton';
import FancyCardLong from '../cards/FancyCardLong';

const SpeciesForm = () => {
  const router = useRouter();
  const [newSpecies, setNewSpecies] = useState({
    uid: '',
    playable: false,
    image: '',
    name: '',
    species_name: '',
    species_homeworld: '',
    species_average_height: '',
    species_average_weight: '',
    species_force_sensitive: false,
    species_dexterity_modifer: '',
    species_knowledge: '',
    species_mechanical: '',
    species_perception: '',
    species_strength: '',
    species_technical: '',
    species_force_control: '',
    species_force_sense: '',
    species_force_alter: '',
    species_force_points: '',
    species_dark_side_points: '',
    species_physical_description: '',
    species_personality: '',
    species_background: '',
    species_force_strength: '',
    species_specific: false,
  });

  const handleInputChange = (e) => {
    const {
      name, value, type, checked,
    } = e.target;
    setNewSpecies((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    createSpecies(newSpecies)
      .then((response) => {
        if (response && response.id) {
          router.push(`/species/${response.id}`);
        } else {
          console.error('Error: ID not found in response');
        }
      })
      .catch((error) => {
        console.error('Error creating species:', error);
      });
  };

  const onCancel = () => {
    router.push('/species');
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <FancyCardLong>
        <div className="cardOfForm">
          <label>
            UID:
            <input
              type="text"
              name="uid"
              value={newSpecies.uid}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            <input
              type="checkbox"
              name="playable"
              checked={newSpecies.playable}
              onChange={handleInputChange}
            />
            Playable
          </label>
          <label>
            Image URL:
            <input
              type="text"
              name="image"
              value={newSpecies.image}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={newSpecies.name}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Species Name:
            <input
              type="text"
              name="species_name"
              value={newSpecies.species_name}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Species Homeworld:
            <input
              type="text"
              name="species_homeworld"
              value={newSpecies.species_homeworld}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Species Average Height:
            <input
              type="text"
              name="species_average_height"
              value={newSpecies.species_average_height}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Species Average Weight:
            <input
              type="text"
              name="species_average_weight"
              value={newSpecies.species_average_weight}
              onChange={handleInputChange}
            />
          </label>
          <label>
            <input
              type="checkbox"
              name="species_force_sensitive"
              checked={newSpecies.species_force_sensitive}
              onChange={handleInputChange}
            />
            Force Sensitive
          </label>
          <label>
            Dexterity Modifier:
            <input
              type="number"
              name="species_dexterity_modifer"
              value={newSpecies.species_dexterity_modifer}
              onChange={handleInputChange}
              step="0.1"
            />
          </label>
          {/* Add similar input fields for the other attributes */}
          <div>
            <FancyButton onClick={handleFormSubmit}>
              Create Species
            </FancyButton>
            <FancyButton onClick={onCancel}>
              Cancel
            </FancyButton>
          </div>
        </div>
      </FancyCardLong>
    </form>
  );
};

export default SpeciesForm;
