import { useRouter } from 'next/router';
import React, {
  useRef, useState, useEffect, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import { useAuth } from '../../../utils/context/authContext';
import { createHero, updateHero } from '../../../utils/data/heroData';
import ArchetypeDropdown from '../../dropDowns/ArchetypeDropDown';
import { useArchetypes } from '../../../utils/context/archetypeContext';
import { formatDiceCode } from '../../../utils/d6LogicForUI';
import FancyButton from '../../FancyButton';
import names from '../../../utils/names';
import species from '../../../utils/species';
import planets from '../../../utils/planets';
import FancyCard from '../cards/FancyCard';
import FancyCardLong from '../cards/FancyCard copy';

const initialState = {
  uid: '',
  NPC: true,
  user: 0,
  image: '',
  name: '',
  archetype: null,
  species: '',
  homeworld: '',
  gender: '',
  age: 0,
  height: '',
  weight: '',
  force_sensitive: false,
  dexterity: 0.0,
  knowledge: 0.0,
  mechanical: 0.0,
  perception: 0.0,
  strength: 0.0,
  technical: 0.0,
  force_control: 0.0,
  force_sense: 0.0,
  force_alter: 0.0,
  force_points: 0,
  dark_side_points: 0,
  force_strength: 0,
  physical_description: '',
  personality: '',
  background: '',
  objectives: '',
  a_quote: '',
  credits: 0,
};

const HeroForm = ({ hero, id }) => {
  const [currentHero, setCurrentHero] = useState(initialState);
  const [selectedArchetype, setSelectedArchetype] = useState(null);
  const { archetypes } = useArchetypes();
  const router = useRouter();
  const { user } = useAuth();
  const formRef = useRef(null);

  useEffect(() => {
    if (hero) {
      const validatedHero = {
        ...hero,
        id: typeof hero.id === 'number' ? hero.id : 0,
        user: typeof hero.user === 'string' ? hero.user : '',
      };

      setCurrentHero(validatedHero);
      const archetypeObject = archetypes.find((a) => a.id === validatedHero.archetype);
      setSelectedArchetype(archetypeObject || null);
    }
  }, [hero, archetypes]);

  // trying to useMemo to avoid bugs on form page reffreshes.
  const memoizedCurrentHero = useMemo(() => currentHero, [currentHero]);
  const memoizedSelectedArchetype = useMemo(() => selectedArchetype, [selectedArchetype]);

  const handleArchetypeSelect = (newArchetype) => {
    if (!newArchetype) return;

    const confirmSelection = window.confirm(
      `Are you sure you want to select ${newArchetype.archetype_name}? This will override certain fields.`,
    );

    if (confirmSelection) {
      setSelectedArchetype(newArchetype);

      setCurrentHero((prevHero) => ({
        ...prevHero,
        archetype: newArchetype.id,
        personality: newArchetype.archetype_personality || prevHero.personality,
        background: newArchetype.archetype_background || prevHero.background,
        objectives: newArchetype.archetype_objectives || prevHero.objectives,
        a_quote: newArchetype.archetype_a_quote || prevHero.a_quote,
        credits: newArchetype.archetype_starting_credits ?? prevHero.credits,
        force_sensitive: newArchetype.archetype_force_sensitive ?? prevHero.force_sensitive,
        dexterity: newArchetype.archetype_dexterity || prevHero.dexterity,
        knowledge: newArchetype.archetype_knowledge || prevHero.knowledge,
        mechanical: newArchetype.archetype_mechanical || prevHero.mechanical,
        perception: newArchetype.archetype_perception || prevHero.perception,
        strength: newArchetype.archetype_strength || prevHero.strength,
        technical: newArchetype.archetype_technical || prevHero.technical,
        force_control: newArchetype.archetype_force_control || prevHero.force_control,
        force_sense: newArchetype.archetype_force_sense || prevHero.force_sense,
        force_alter: newArchetype.archetype_force_alter || prevHero.force_alter,
      }));
    } else {
      alert('Archetype selection canceled');
    }
  };

  const randomSpecies = () => {
    const randSpecies = Object.keys(species);
    currentHero.species = randSpecies[Math.floor(Math.random() * randSpecies.length)];
  };

  const randomHero = () => {
    currentHero.archetype = Math.floor(Math.random() * archetypes.length);
    handleArchetypeSelect(archetypes.find((archetype) => archetype.id === currentHero.archetype));
    currentHero.name = names[Math.floor(Math.random() * names.length)];

    randomSpecies();
    currentHero.physical_description = species[currentHero.species];
    const randPlanet = Object.keys(planets);
    currentHero.homeworld = randPlanet[Math.floor(Math.random() * randPlanet.length)];
    currentHero.height = Math.floor(Math.random() * (200 - 150) + 150);
    currentHero.weight = Math.floor(Math.random() * (90 - 50) + 50);
    currentHero.age = Math.floor(Math.random() * (70 - 23) + 23);
    currentHero.gender = 'if applicable';
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setCurrentHero((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFancyButtonClick = () => {
    if (formRef.current) {
      const event = new Event('submit', { cancelable: true, bubbles: true });
      formRef.current.dispatchEvent(event);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedHero = {
      ...memoizedCurrentHero,
      archetype: memoizedSelectedArchetype?.id ?? memoizedCurrentHero.archetype,
      user: user.id,
      uid: user.id + memoizedCurrentHero.name + Math.floor(1000000 + Math.random() * 9000000),
    };

    if (!id) {
      createHero(updatedHero)
        .then(() => router.push('/heros'))
        .catch((error) => {
          console.error('Error creating this hero:', error);
        });
    } else {
      updateHero(updatedHero, id)
        .then(() => router.push(`/heros/${id}`))
        .catch((error) => {
          console.error('Error updating this hero:', error);
        });
    }
  };

  const toggleForceSensitive = () => {
    setCurrentHero((prevState) => ({
      ...prevState,
      force_sensitive: !prevState.force_sensitive,
    }));
  };

  const toggleIsNPC = () => {
    setCurrentHero((prevState) => ({
      ...prevState,
      NPC: !prevState.NPC,
    }));
  };

  return (
    <>
      <Form
        ref={formRef}
        onSubmit={handleSubmit}
        style={{
          maxHeight: '80vh',
          overflowY: 'auto',
          margin: '13px',
          border: '13px',
          padding: '13px',
        }}
        className="container-fluid"
      >
        <Form.Group className="mb-3">
          <div style={{
            backgroundColor: 'rgba(30, 30, 30, 0.85)',
            padding: '13px',
            borderRadius: '15px',
            margin: '13px',
            border: '7px solid rgba(255, 215, 0, 0.85)',
          }}
          >
            <div className="row">
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{ display: 'inline', flex: 3 }}>
                  <FancyButton onClick={randomHero}>Roll 4 me</FancyButton>
                </div>
              </div>
            </div>
            <div className="row">
              <FancyCard>
                <div className="cardOfForm">
                  <div className="row">
                    <div className="col">

                      <Form.Group controlId="archetypeSelect">

                        <ArchetypeDropdown
                          selectedArchetype={selectedArchetype}
                          onSelect={handleArchetypeSelect}
                        >
                          select a character template
                        </ArchetypeDropdown>
                      </Form.Group>

                      {/* Name and Species in the same row */}
                      <div className="row" style={{ padding: '13px' }}>
                        <div className="col">
                          <Form.Label>Name</Form.Label>
                          <Form.Control
                            className="form-control-sm"
                            type="text"
                            placeholder="Name"
                            name="name"
                            required
                            value={currentHero.name}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="col">
                          <Form.Label>Species</Form.Label>
                          <Form.Control
                            className="form-control-sm"
                            type="text"
                            placeholder="Species"
                            name="species"
                            required
                            value={currentHero.species || ''}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <Form.Label>Homeworld</Form.Label>
                      <Form.Control
                        className="form-control-sm"
                        type="text"
                        placeholder="Homeworld"
                        name="homeworld"
                        required
                        value={currentHero.homeworld}
                        onChange={handleInputChange}
                      />

                      <div className="row" style={{ padding: '13px' }}>
                        <div className="col">
                          <Form.Label>Height</Form.Label>
                          <Form.Control
                            className="form-control-sm"
                            type="text"
                            placeholder="Height"
                            name="height"
                            required
                            value={currentHero.height}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="col">
                          <Form.Label>Weight</Form.Label>
                          <Form.Control
                            className="form-control-sm"
                            type="text"
                            placeholder="Weight"
                            name="weight"
                            required
                            value={currentHero.weight}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="row" style={{ padding: '13px' }}>
                        <div className="col">
                          <Form.Label>Gender</Form.Label>
                          <Form.Control
                            className="form-control-sm"
                            type="text"
                            placeholder="Gender"
                            name="gender"
                            required
                            value={currentHero.gender}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="col">
                          <Form.Label>Age</Form.Label>
                          <Form.Control
                            className="form-control-sm"
                            type="number"
                            placeholder="Age"
                            name="age"
                            required
                            value={currentHero.age}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </FancyCard>
              <FancyCard>
                <div className="cardOfForm">
                  <h4>Attributes are the things your born with and shaped by upbringing.</h4>

                  <div className="col" style={{ margin: '13px', border: '13px', padding: '13px' }}>
                    <div className="row">
                      <div className="col">
                        <Form.Label>Dexterity:<br />{formatDiceCode(currentHero.dexterity)}</Form.Label>
                        <Form.Control
                          className="form-control-sm"
                          type="text"
                          placeholder="Dexterity"
                          name="dexterity"
                          required
                          value={currentHero.dexterity}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col">
                        <Form.Label>Knowledge:<br />{formatDiceCode(currentHero.knowledge)}</Form.Label>
                        <Form.Control
                          className="form-control-sm"
                          type="text"
                          placeholder="Knowledge"
                          name="knowledge"
                          required
                          value={currentHero.knowledge}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col">
                        <Form.Label>Mechanical:<br />{formatDiceCode(currentHero.mechanical)}</Form.Label>
                        <Form.Control
                          className="form-control-sm"
                          type="text"
                          placeholder="Mechanical"
                          name="mechanical"
                          required
                          value={currentHero.mechanical}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <Form.Label>Perception:<br />{formatDiceCode(currentHero.perception)}</Form.Label>
                        <Form.Control
                          className="form-control-sm"
                          type="text"
                          placeholder="Perception"
                          name="perception"
                          required
                          value={currentHero.perception}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col">
                        <Form.Label>Strength:<br />{formatDiceCode(currentHero.strength)}</Form.Label>
                        <Form.Control
                          className="form-control-sm"
                          type="text"
                          placeholder="Strength"
                          name="strength"
                          required
                          value={currentHero.strength}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col">
                        <Form.Label>Technical:<br />{formatDiceCode(currentHero.technical)}</Form.Label>
                        <Form.Control
                          className="form-control-sm"
                          type="text"
                          placeholder="Technical"
                          name="technical"
                          required
                          value={currentHero.technical}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    {currentHero.force_sensitive && (
                    <>
                      <div className="row justify-content-center">
                        <div className="col-auto text-center">
                          <Form.Label>Force Skills</Form.Label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <Form.Label>
                            Control:<br />
                            {formatDiceCode(currentHero.force_control)}
                          </Form.Label>
                          <Form.Control
                            className="form-control-sm"
                            type="text"
                            placeholder="Force Control"
                            name="force_control"
                            required
                            value={currentHero.force_control}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="col">
                          <Form.Label>
                            Sense:<br />
                            {formatDiceCode(currentHero.force_sense)}
                          </Form.Label>
                          <Form.Control
                            className="form-control-sm"
                            type="text"
                            placeholder="Force Sense"
                            name="force_sense"
                            required
                            value={currentHero.force_sense}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="col">
                          <Form.Label>
                            Alter:<br />
                            {formatDiceCode(currentHero.force_alter)}
                          </Form.Label>
                          <Form.Control
                            className="form-control-sm"
                            type="text"
                            placeholder="Force Alter"
                            name="force_alter"
                            required
                            value={currentHero.force_alter}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </>
                    )}

                  </div>

                </div>
              </FancyCard>
            </div>

            <div className="col-auto">
              <h5 style={{ display: 'inline-block', marginRight: '15px' }}>
                {currentHero.force_sensitive ? 'Character is Force Sensitive, click the button to revert' : 'Hero ..is not Force Sensitive, click the button to revert'}
              </h5>
              <FancyButton
                type="button"
                variant={currentHero.force_sensitive ? 'info' : 'warning'}
                onClick={toggleForceSensitive}
                className="mt-3"
              >
                {currentHero.force_sensitive ? 'Is Force Sensitive' : 'Is not Force Sensitive'}
              </FancyButton>
            </div>
            <div className="row">

              <FancyCard>
                <div className="cardOfForm">
                  <Form.Label>Personality</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Personality"
                    name="personality"
                    required
                    value={currentHero.personality}
                    rows={3}
                    style={{ minWidth: '100%' }}
                    onChange={handleInputChange}
                  />
                  <Form.Label>Background</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Background"
                    name="background"
                    required
                    value={currentHero.background}
                    rows={6}
                    style={{ minWidth: '100%' }}
                    onChange={handleInputChange}
                  />
                </div>
              </FancyCard>

              <FancyCard>
                <div className="cardOfForm">
                  <div className="col">
                    <Form.Label>Physical Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      placeholder="Physical Description"
                      name="physical_description"
                      required
                      value={currentHero.physical_description}
                      rows={6}
                      style={{ minWidth: '100%' }}
                      onChange={handleInputChange}
                    />

                    <Form.Label>Objectives</Form.Label>

                    <Form.Control
                      as="textarea"
                      placeholder="Objectives"
                      name="objectives"
                      required
                      value={currentHero.objectives}
                      rows={6}
                      style={{ minWidth: '100%' }}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </FancyCard>
            </div>

            <div className="row">
              <div className="col">
                <FancyCardLong>
                  <div className="cardOfForm">
                    <Form.Label>A Quote</Form.Label>
                    <Form.Control
                      as="textarea"
                      className="form-control-sm"
                      type="text"
                      placeholder="A Quote"
                      name="a_quote"
                      required
                      value={currentHero.a_quote}
                      onChange={handleInputChange}
                    />

                  </div>
                  <div className="col">

                    <div className="col-auto">

                      <Form.Label>Credits</Form.Label>
                      <Form.Control
                        className="form-control-sm"
                        type="number"
                        placeholder="Credits"
                        name="credits"
                        required
                        value={currentHero.credits}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                </FancyCardLong>

                <FancyCardLong>
                  <div className="col">
                    <div className="col-auto">
                      <FancyButton
                        onClick={toggleIsNPC}
                        className="ml-2 mt-3"
                      >
                        {currentHero.NPC ? 'Is a NPC' : 'Is not a NPC'}
                      </FancyButton>
                      <h5 style={{ display: 'inline-block', marginLeft: '15px' }}>
                        {currentHero.NPC ? 'Character is an NPC, click the button make a Character' : 'Character is not an NPC, click the button make an NPC'}
                      </h5>
                    </div>
                    <FancyButton onClick={handleFancyButtonClick}>
                      Commit Changes
                    </FancyButton>
                  </div>
                </FancyCardLong>
              </div>
            </div>
          </div>

        </Form.Group>

      </Form>
    </>
  );
};

HeroForm.propTypes = {
  hero: PropTypes.shape({
    id: PropTypes.number,
    uid: PropTypes.string,
    NPC: PropTypes.bool,
    user: PropTypes.number,
    image: PropTypes.string,
    name: PropTypes.string,
    archetype: PropTypes.number,
    species: PropTypes.string,
    homeworld: PropTypes.string,
    gender: PropTypes.string,
    age: PropTypes.number,
    height: PropTypes.string,
    weight: PropTypes.string,
    physical_description: PropTypes.string,
    personality: PropTypes.string,
    background: PropTypes.string,
    objectives: PropTypes.string,
    a_quote: PropTypes.string,
    credits: PropTypes.number,
    force_sensitive: PropTypes.bool,
    dexterity: PropTypes.number,
    knowledge: PropTypes.number,
    mechanical: PropTypes.number,
    perception: PropTypes.number,
    strength: PropTypes.number,
    technical: PropTypes.number,
    force_control: PropTypes.number,
    force_sense: PropTypes.number,
    force_alter: PropTypes.number,
    force_points: PropTypes.number,
    dark_side_points: PropTypes.number,
    force_strength: PropTypes.number,
  }),
  id: PropTypes.number,
};

// Set default values for props
HeroForm.defaultProps = {
  hero: {
    uid: '',
    NPC: true,
    user: 0,
    image: '',
    name: '',
    archetype: 0,
    homeworld: '',
    gender: '',
    age: 0,
    height: '',
    weight: '',
    physical_description: '',
    personality: '',
    background: '',
    objectives: '',
    a_quote: '',
    credits: 0,
    force_sensitive: false,
    dexterity: 0.0,
    knowledge: 0.0,
    mechanical: 0.0,
    perception: 0.0,
    strength: 0.0,
    technical: 0.0,
    force_control: 0.0,
    force_sense: 0.0,
    force_alter: 0.0,
    force_points: 0,
    dark_side_points: 0,
    force_strength: 0,
  },
  id: 0,
};

export default HeroForm;
