import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { createSpecialAbility } from '../../../utils/data/specialAbilityData';
import { getSpecies } from '../../../utils/data/speciesData';
import FancyButton from '../../FancyButton';
import FancyCardLong from '../cards/FancyCardLong';

const SpecialAbilityForm = () => {
  const router = useRouter();
  const [newAbility, setNewAbility] = useState({
    attribute: '',
    ability_name: '',
    time_taken: '',
    is_a_reaction: false,
    force_skill: false,
    species_specific: '',
    special_ability_notes: '',
    modifiers: '',
    skill_use_notes: '',
    skill_game_notes: '',
    skill_code: 0.0,
  });
  const [speciesList, setSpeciesList] = useState([]);

  // Fetch species on component mount
  useEffect(() => {
    const fetchSpecies = async () => {
      try {
        const allSpecies = await getSpecies();
        setSpeciesList(allSpecies);
      } catch (error) {
        console.error('Error fetching species:', error);
      }
    };

    fetchSpecies();
  }, []);

  const handleInputChange = (e) => {
    const {
      name, value, type, checked,
    } = e.target;
    setNewAbility((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await createSpecialAbility(newAbility);
      router.push('/special-abilities');
    } catch (error) {
      console.error('Error creating special ability:', error);
    }
  };

  const onCancel = () => {
    router.push('/special-abilities');
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <FancyCardLong>
        <div className="cardOfForm">
          <div className="row">
            <div className="col">
              <label>
                Ability Name:
                <input
                  type="text"
                  name="ability_name"
                  value={newAbility.ability_name}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>
            <div className="col">
              <label>
                Attribute:
                <input
                  type="text"
                  name="attribute"
                  value={newAbility.attribute}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label>
                Time Taken:
                <input
                  type="text"
                  name="time_taken"
                  value={newAbility.time_taken}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="col">
              <label>
                Skill Code:
                <input
                  type="number"
                  name="skill_code"
                  value={newAbility.skill_code}
                  onChange={handleInputChange}
                  step="0.1"
                  required
                />
              </label>
            </div>
          </div>

          <label>
            <input
              type="checkbox"
              name="is_a_reaction"
              checked={newAbility.is_a_reaction}
              onChange={handleInputChange}
            />
            Is a Reaction
          </label>

          <label>
            <input
              type="checkbox"
              name="force_skill"
              checked={newAbility.force_skill}
              onChange={handleInputChange}
            />
            Force Skill
          </label>

          <label>
            Special Ability Notes:
            <textarea
              name="special_ability_notes"
              value={newAbility.special_ability_notes}
              onChange={handleInputChange}
              rows="4"
            />
          </label>

          <label>
            Modifiers:
            <textarea
              name="modifiers"
              value={newAbility.modifiers}
              onChange={handleInputChange}
              rows="4"
            />
          </label>

          <label>
            Skill Use Notes:
            <textarea
              name="skill_use_notes"
              value={newAbility.skill_use_notes}
              onChange={handleInputChange}
              rows="4"
            />
          </label>

          <label>
            Skill Game Notes:
            <textarea
              name="skill_game_notes"
              value={newAbility.skill_game_notes}
              onChange={handleInputChange}
              rows="4"
            />
          </label>

          <label>
            Species Specific:
            <select
              value={newAbility.species_specific}
              onChange={(e) => setNewAbility((prev) => ({ ...prev, species_specific: e.target.value }))}
            >
              <option value="">---Select Species---</option>
              {speciesList.map((species) => (
                <option key={species.id} value={species.id}>
                  {species.name}
                </option>
              ))}
            </select>
          </label>

          <div>
            <FancyButton onClick={handleFormSubmit} style={{ marginRight: '13px' }}>
              Create Special Ability
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

export default SpecialAbilityForm;
