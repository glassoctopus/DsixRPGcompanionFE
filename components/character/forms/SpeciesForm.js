import { useRouter } from 'next/router';
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import FancyButton from '../../FancyButton';
import FancyCard from '../cards/FancyCard';
import FancyCardLong from '../cards/FancyCardLong';
import { createSpecies, updateSpecies, getSingleSpecies } from '../../../utils/data/speciesData';

const SpeciesForm = ({ species, id }) => {
  const initialSpeciesState = {
    id: 0,
    uid: '',
    playable: false,
    image: '',
    name: '',
    species_name: '',
    species_homeworld: '',
    species_average_height: '',
    species_average_weight: '',
    species_force_sensitive: false,
    species_dexterity: '',
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
  };

  const [currentSpecies, setCurrentSpecies] = useState(initialSpeciesState);
  const router = useRouter();
  const { id: routeId } = router.query;
  const formRef = useRef(null);

  useEffect(() => {
    const speciesId = id || routeId;
    if (species) {
      setCurrentSpecies({
        id: species.id || '',
        uid: species.uid || '',
        playable: species.playable ?? false,
        image: species.image || '',
        species_name: species.species_name || '',
        species_homeworld: species.species_homeworld || '',
        species_average_height: species.species_average_height || '',
        species_average_weight: species.species_average_weight || '',
        species_force_sensitive: species.species_force_sensitive ?? false,
        species_dexterity: species.species_dexterity || 0,
        species_knowledge: species.species_knowledge || 0,
        species_mechanical: species.species_mechanical || 0,
        species_perception: species.species_perception || 0,
        species_strength: species.species_strength || 0,
        species_technical: species.species_technical || 0,
        species_force_control: species.species_force_control || 0,
        species_force_sense: species.species_force_sense || 0,
        species_force_alter: species.species_force_alter || 0,
        species_force_points: species.species_force_points || 0,
        species_dark_side_points: species.species_dark_side_points || 0,
        species_physical_description: species.species_physical_description || '',
        species_personality: species.species_personality || '',
        species_background: species.species_background || '',
        species_force_strength: species.species_force_strength || 0,
        species_appeared_in: species.species_appeared_in || '',
      });
    } else if (speciesId) {
      const retrievedSpecies = getSingleSpecies(speciesId);
      if (retrievedSpecies) {
        setCurrentSpecies({
          id: retrievedSpecies.id || '',
          uid: retrievedSpecies.uid || '',
          playable: retrievedSpecies.playable ?? false,
          image: retrievedSpecies.image || '',
          species_name: retrievedSpecies.species_name || '',
          species_homeworld: retrievedSpecies.species_homeworld || '',
          species_average_height: retrievedSpecies.species_average_height || '',
          species_average_weight: retrievedSpecies.species_average_weight || '',
          species_force_sensitive: retrievedSpecies.species_force_sensitive ?? false,
          species_dexterity: retrievedSpecies.species_dexterity || 0,
          species_knowledge: retrievedSpecies.species_knowledge || 0,
          species_mechanical: retrievedSpecies.species_mechanical || 0,
          species_perception: retrievedSpecies.species_perception || 0,
          species_strength: retrievedSpecies.species_strength || 0,
          species_technical: retrievedSpecies.species_technical || 0,
          species_force_control: retrievedSpecies.species_force_control || 0,
          species_force_sense: retrievedSpecies.species_force_sense || 0,
          species_force_alter: retrievedSpecies.species_force_alter || 0,
          species_force_points: retrievedSpecies.species_force_points || 0,
          species_dark_side_points: retrievedSpecies.species_dark_side_points || 0,
          species_physical_description: retrievedSpecies.species_physical_description || '',
          species_personality: retrievedSpecies.species_personality || '',
          species_background: retrievedSpecies.species_background || '',
          species_force_strength: retrievedSpecies.species_force_strength || 0,
          species_appeared_in: species.species_appeared_in || '',
        });
      }
    }
  }, [species, id, routeId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentSpecies((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedSpecies = {
      ...currentSpecies,
    };

    if (!id) {
      createSpecies(updatedSpecies)
        .then(() => router.push('/heros/species'))
        .catch((error) => {
          console.error('Error creating this archetype:', error);
        });
    } else {
      updateSpecies(updatedSpecies, id)
        .then(() => router.push(`/heros/species/${id}`))
        .catch((error) => {
          console.error('Error updating this archetype:', error);
        });
    }
  };

  return (

    <form
      ref={formRef}
      onSubmit={handleSubmit}
    >
      <FancyCardLong>

        <div className="cardOfForm">
          <div className="row">
            <div className="col">
              <FancyCardLong>
                <div className="col">
                  <div>
                    <label htmlFor="id">ID:</label>
                    <input
                      type="text"
                      id="id"
                      name="id"
                      value={currentSpecies.id}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="uid">UID:</label>
                    <input
                      type="text"
                      id="uid"
                      name="uid"
                      value={currentSpecies.uid}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="playable">Playable:</label>
                    <input
                      type="checkbox"
                      id="playable"
                      name="playable"
                      checked={currentSpecies.playable}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="image">Image URL:</label>
                    <input
                      type="text"
                      id="image"
                      name="image"
                      value={currentSpecies.image}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="species_name">Species Name:</label>
                    <input
                      type="text"
                      id="species_name"
                      name="species_name"
                      value={currentSpecies.species_name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="species_homeworld">Homeworld:</label>
                    <input
                      type="text"
                      id="species_homeworld"
                      name="species_homeworld"
                      value={currentSpecies.species_homeworld}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <FancyCardLong>
                  <div className="row">

                    <div className="col">
                      <label htmlFor="species_average_height">Average Height in meters:</label>
                      <input
                        type="number"
                        id="species_average_height"
                        name="species_average_height"
                        value={currentSpecies.species_average_height}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="species_average_weight">Average Weight in kilos:</label>
                      <input
                        type="number"
                        id="species_average_weight"
                        name="species_average_weight"
                        value={currentSpecies.species_average_weight}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </FancyCardLong>

              </FancyCardLong>
            </div>
            <div className="col">

              <FancyCardLong>
                <div>
                  <label htmlFor="species_physical_description">Physical Description:</label>
                  <textarea
                    id="species_physical_description"
                    name="species_physical_description"
                    value={currentSpecies.species_physical_description}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="species_personality">Personality:</label>
                  <textarea
                    id="species_personality"
                    name="species_personality"
                    value={currentSpecies.species_personality}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="species_background">Background:</label>
                  <textarea
                    id="species_background"
                    name="species_background"
                    value={currentSpecies.species_background}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="species_force_strength">Force Strength:</label>
                  <input
                    type="number"
                    id="species_force_strength"
                    name="species_force_strength"
                    value={currentSpecies.species_force_strength}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="species_appeared_in">First appeared in:</label>
                  <textarea
                    id="species_appeared_in"
                    name="species_appeared_in"
                    value={currentSpecies.species_appeared_in}
                    onChange={handleInputChange}
                  />
                </div>
              </FancyCardLong>
            </div>

          </div>

          <div>Text testS</div>

          <FancyCardLong>
            <h3>Attribute Modifiers must Balance</h3>
            <div className="row">
              <div className="col">

                <label htmlFor="species_dexterity">Dexterity:</label>
                <input
                  type="number"
                  id="species_dexterity"
                  name="species_dexterity"
                  value={currentSpecies.species_dexterity}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col">
                <label htmlFor="species_knowledge">Knowledge:</label>
                <input
                  type="number"
                  id="species_knowledge"
                  name="species_knowledge"
                  value={currentSpecies.species_knowledge}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col">
                <label htmlFor="species_mechanical">Mechanical:</label>
                <input
                  type="number"
                  id="species_mechanical"
                  name="species_mechanical"
                  value={currentSpecies.species_mechanical}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="row">
              <div className="col">
                <label htmlFor="species_perception">Perception:</label>
                <input
                  type="number"
                  id="species_perception"
                  name="species_perception"
                  value={currentSpecies.species_perception}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col">
                <label htmlFor="species_strength">Strength:</label>
                <input
                  type="number"
                  id="species_strength"
                  name="species_strength"
                  value={currentSpecies.species_strength}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col">
                <label htmlFor="species_technical">Technical:</label>
                <input
                  type="number"
                  id="species_technical"
                  name="species_technical"
                  value={currentSpecies.species_technical}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </FancyCardLong>
          <FancyCardLong>
            <div className="row">
              <div className="col">
                <label htmlFor="species_force_sensitive">Force Sensitive:</label>
                <input
                  type="checkbox"
                  id="species_force_sensitive"
                  name="species_force_sensitive"
                  checked={currentSpecies.species_force_sensitive}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col">
                <label htmlFor="species_force_control">Force Control:</label>
                <input
                  type="number"
                  id="species_force_control"
                  name="species_force_control"
                  value={currentSpecies.species_force_control}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col">
                <label htmlFor="species_force_sense">Force Sense:</label>
                <input
                  type="number"
                  id="species_force_sense"
                  name="species_force_sense"
                  value={currentSpecies.species_force_sense}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col">
                <label htmlFor="species_force_alter">Force Alter:</label>
                <input
                  type="number"
                  id="species_force_alter"
                  name="species_force_alter"
                  value={currentSpecies.species_force_alter}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="row">
              <FancyCard>
                <div className="row">
                  <div className="col">
                    <label htmlFor="species_force_points">Force Points:</label>
                    <input
                      type="number"
                      id="species_force_points"
                      name="species_force_points"
                      value={currentSpecies.species_force_points}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="species_dark_side_points">Dark Side Points:</label>
                    <input
                      type="number"
                      id="species_dark_side_points"
                      name="species_dark_side_points"
                      value={currentSpecies.species_dark_side_points}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </FancyCard>
            </div>
          </FancyCardLong>

          <FancyButton type="submit">Submit</FancyButton>
        </div>
      </FancyCardLong>
    </form>
  );
};

SpeciesForm.propTypes = {
  species: PropTypes.shape({
    id: PropTypes.number,
    uid: PropTypes.string,
    playable: PropTypes.bool,
    image: PropTypes.string,
    species_name: PropTypes.string,
    species_homeworld: PropTypes.string,
    species_average_height: PropTypes.string,
    species_average_weight: PropTypes.string,
    species_force_sensitive: PropTypes.bool,
    species_dexterity: PropTypes.number,
    species_knowledge: PropTypes.number,
    species_mechanical: PropTypes.number,
    species_perception: PropTypes.number,
    species_strength: PropTypes.number,
    species_technical: PropTypes.number,
    species_force_control: PropTypes.number,
    species_force_sense: PropTypes.number,
    species_force_alter: PropTypes.number,
    species_force_points: PropTypes.number,
    species_dark_side_points: PropTypes.number,
    species_physical_description: PropTypes.string,
    species_personality: PropTypes.string,
    species_background: PropTypes.string,
    species_force_strength: PropTypes.number,
    species_appeared_in: PropTypes.string,
  }),
  id: PropTypes.number,
};

SpeciesForm.defaultProps = {
  species: null,
  id: null,
};

export default SpeciesForm;
