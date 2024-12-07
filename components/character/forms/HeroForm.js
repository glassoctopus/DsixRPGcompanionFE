import { useRouter } from 'next/router';
import React, {
  useRef, useState, useEffect, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import { useAuth } from '../../../utils/context/authContext';
import { createHero, updateHero } from '../../../utils/data/heroData';
import ArchetypeDropdown from '../../dropDowns/ArchetypeDropDown';
import SpeciesDropDown from '../../dropDowns/SpeciesDropDown';
import { getArchetypes } from '../../../utils/data/archetypeData';
import { getSpecies } from '../../../utils/data/speciesData';
import { formatDiceCode, addOrSubtractPips, assignPointsForDieCode } from '../../../utils/d6LogicForUI';
import FancyButton from '../../FancyButton';
import randomName from '../../../utils/names';
import randomPlanet from '../../../utils/planets';
import FancyCard from '../cards/FancyCard';
import FancyCardLong from '../cards/FancyCardLong';
import Tooltip from '../../Tooltip';

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
  const [archetypes, setArchetypes] = useState([]);
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [species, setSpecies] = useState([]);
  const [planetDetails, setPlanetDetails] = useState("The Character's Homeworld");
  const router = useRouter();
  const { user } = useAuth();
  const formRef = useRef(null);
  const [diePointsOfAttributes, setDiePointsOfAttributes] = useState(0);

  const archetypesFetched = useRef(false);
  const speciesFetched = useRef(false);

  const setArchetypePool = async () => {
    if (!archetypesFetched.current) {
      archetypesFetched.current = true;
      const fetchedArchetypes = await getArchetypes();
      setArchetypes(fetchedArchetypes);
    }
  };

  const setSpeciesPool = async () => {
    if (!speciesFetched.current) {
      speciesFetched.current = true;
      const fetchedSpecies = await getSpecies();
      setSpecies(fetchedSpecies);
    }
  };

  useEffect(() => {
    console.log('Archetypes updated:', archetypes);
    console.log('Species updated:', species);
  }, [archetypes, species]);

  useEffect(() => {
    setArchetypePool();
    setSpeciesPool();
  }, []);

  useEffect(() => {
    if (hero) {
      const validatedHero = {
        ...hero,
        id: typeof hero.id === 'number' ? hero.id : 0,
        user: typeof hero.user === 'string' ? hero.user : '',
      };
      setCurrentHero(validatedHero);

      if (archetypes.length > 0) {
        const archetypeObject = archetypes.find((a) => a.id === validatedHero.archetype);
        setSelectedArchetype(archetypeObject || null);
      }

      if (species.length > 0) {
        const speciesObject = species.find((s) => s.id === validatedHero.species);
        setSelectedSpecies(speciesObject || null);
      }
    }
  }, [hero, archetypes.length, species.length]);

  // trying to useMemo to avoid bugs on form page reffreshes.
  const memoizedCurrentHero = useMemo(() => currentHero, [currentHero]);
  const memoizedSelectedArchetype = useMemo(() => selectedArchetype, [selectedArchetype]);
  const memoizedSelectedSpecies = useMemo(() => selectedSpecies, [selectedSpecies]);

  const diePointAttributeTotal = () => {
    const dex = assignPointsForDieCode(currentHero.dexterity);
    const kno = assignPointsForDieCode(currentHero.knowledge);
    const mec = assignPointsForDieCode(currentHero.mechanical);
    const per = assignPointsForDieCode(currentHero.perception);
    const str = assignPointsForDieCode(currentHero.strength);
    const tec = assignPointsForDieCode(currentHero.technical);
    return dex + kno + mec + per + str + tec;
  };

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

  const randomArchetype = () => {
    const archetypeRoll = Math.floor(Math.random() * archetypes.length);
    handleArchetypeSelect(archetypes.find((archetype) => archetype.id === currentHero.archetype));
    setCurrentHero((prevFormState) => ({
      ...prevFormState,
      archetype: archetypeRoll,
    }));
  };

  const handleSpeciesSelect = (newSpecies) => {
    if (!newSpecies) return;

    const confirmSelection = window.confirm(
      `Are you sure you want to select ${newSpecies.Species_name}? This will override certain fields.`,
    );

    if (confirmSelection) {
      setSelectedSpecies(newSpecies);

      setCurrentHero((prevSpecies) => ({
        ...prevSpecies,
        species: newSpecies.id,
        playable: newSpecies.playable || prevSpecies.playable,
        image: newSpecies.image || prevSpecies.image,
        species_name: newSpecies.species_name || prevSpecies.species_name,
        homeworld: newSpecies.species_homeworld || prevSpecies.species_homeworld,
        // species_average_height: newSpecies.species_average_height || prevSpecies.species_average_height,
        // species_average_weight: newSpecies.species_average_weight || prevSpecies.species_average_weight,
        force_sensitive: newSpecies.species_force_sensitive ?? prevSpecies.force_sensitive,
        species_dexterity: newSpecies.species_dexterity || prevSpecies.species_dexterity,
        species_knowledge: newSpecies.species_knowledge || prevSpecies.species_knowledge,
        species_mechanical: newSpecies.species_mechanical || prevSpecies.species_mechanical,
        species_perception: newSpecies.species_perception || prevSpecies.species_perception,
        species_strength: newSpecies.species_strength || prevSpecies.species_strength,
        species_technical: newSpecies.species_technical || prevSpecies.species_technical,
        species_force_control: newSpecies.species_force_control || prevSpecies.species_force_control,
        species_force_sense: newSpecies.species_force_sense || prevSpecies.species_force_sense,
        species_force_alter: newSpecies.species_force_alter || prevSpecies.species_force_alter,
        species_force_points: newSpecies.species_force_points || prevSpecies.species_force_points,
        species_dark_side_points: newSpecies.species_dark_side_points || prevSpecies.species_dark_side_points,
        physical_description: newSpecies.species_physical_description || prevSpecies.species_physical_description,
        personality: newSpecies.species_personality || prevSpecies.species_personality,
        species_force_strength: newSpecies.species_force_strength || prevSpecies.species_force_strength,
      }));
    } else {
      alert('Species selection canceled');
    }
  };

  const randomSpecies = () => {
    const SpeciesRoll = Math.floor(Math.random() * species.length);
    const currentSelectedSpecies = species[SpeciesRoll];
    handleSpeciesSelect(species.find((aSpecies) => aSpecies.id === currentHero.Species));
    setCurrentHero((prevFormState) => ({
      ...prevFormState,
      species: currentSelectedSpecies.id,
    }));
  };

  const randomNameForForm = () => {
    const nameRoll = randomName();
    setCurrentHero((prevFormState) => ({
      ...prevFormState,
      name: nameRoll,
    }));
  };

  const randomHomeworld = () => {
    const [planetRoll, planetDescription] = randomPlanet();
    setPlanetDetails(planetDescription);
    setCurrentHero((prevFormState) => ({
      ...prevFormState,
      homeworld: planetRoll,
    }));
  };

  const randomHeight = () => {
    const heightRoll = Math.floor(Math.random() * 50 + 150);
    setCurrentHero((prevFormState) => ({
      ...prevFormState,
      height: heightRoll,
    }));
  };

  const randomWeight = () => {
    const weightRoll = Math.floor(Math.random() * 39 + 51);
    setCurrentHero((prevFormState) => ({
      ...prevFormState,
      weight: weightRoll,
    }));
  };

  const randomAge = () => {
    const ageRoll = Math.floor(Math.random() * 69 + 19);
    setCurrentHero((prevFormState) => ({
      ...prevFormState,
      age: ageRoll,
    }));
  };

  const randomHero = () => {
    randomArchetype();
    randomNameForForm();
    randomSpecies();
    randomHomeworld();
    randomHeight();
    randomWeight();
    randomAge();
    currentHero.gender = 'if applicable';
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'dexterity' || name === 'knowledge' || name === 'mechanical' || name === 'perception' || name === 'strength' || name === 'technical' || name === 'force_control' || name === 'force_sense' || name === 'force_alter') {
      setDiePointsOfAttributes(diePointAttributeTotal());
      let operator = '';
      setCurrentHero((prevState) => {
        const currentValue = prevState[name];
        if (currentValue > event.target.value) { operator = '-'; } else { operator = '+'; }

        const formatValue = addOrSubtractPips(currentValue, operator);
        return {
          ...prevState,
          [name]: formatValue,
        };
      });
    } else {
      setCurrentHero((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
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
      species: memoizedSelectedSpecies?.id ?? memoizedCurrentHero.species,
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

                      {/* Name and Species in the same row */}
                      <div className="row" style={{ padding: '13px' }}>
                        <div className="col">
                          <Form.Label>Name</Form.Label><button type="button" className="siteButton" onClick={randomNameForForm}>roll a name</button>
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
                          <Form.Group controlId="speciesSelect">
                            <SpeciesDropDown
                              selectedSpecies={selectedSpecies}
                              onSelect={handleSpeciesSelect}
                              random={randomSpecies}
                            >
                              select Species
                            </SpeciesDropDown>
                          </Form.Group>

                        </div>
                      </div>

                      <Form.Label>Homeworld</Form.Label><button type="button" className="siteButton" onClick={randomHomeworld}>roll a homeworld</button><Tooltip style={{ display: 'flex', justifyContent: 'flex-end' }} text="^" tooltip={planetDetails} />
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
                          <Form.Label>Height in cm</Form.Label><button type="button" className="siteButton" onClick={randomHeight}>roll cm</button>
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
                          <Form.Label>Weight in kilograms</Form.Label><button className="siteButton" type="button" onClick={randomWeight}>roll kgs </button>
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
                          <Form.Label>Gender</Form.Label><button type="button" className="siteButton">enter yours</button>
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
                          <Form.Label>Age</Form.Label><button type="button" className="siteButton" onClick={randomAge}>roll an age</button>
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

                    </div>
                  </div>

                </div>
              </FancyCard>
              <FancyCard>
                <div className="cardOfForm">

                  <Form.Group controlId="archetypeSelect">
                    <ArchetypeDropdown
                      selectedArchetype={selectedArchetype}
                      onSelect={handleArchetypeSelect}
                      random={randomArchetype}
                    >
                      select a character template
                    </ArchetypeDropdown>
                  </Form.Group>
                  <div style={{ margin: '13px', border: '13px', padding: '13px' }} />

                  <h4>Attributes are the things you&apos;re born with and shaped by upbringing. {diePointsOfAttributes} of 54</h4>

                  <div className="col" style={{ margin: '13px', border: '13px', padding: '13px' }}>
                    <div className="row">
                      <div className="col">
                        <Form.Label>Dexterity:<br />{formatDiceCode(currentHero.dexterity)}</Form.Label>
                        <Form.Control
                          className="form-control-sm"
                          type="number"
                          placeholder="Dexterity"
                          name="dexterity"
                          required
                          value={currentHero.dexterity}
                          onChange={handleInputChange}
                          step="0.1"
                          min="0"
                          max="20.9"
                          style={{ width: '65px', marginRight: '13px' }}
                        />
                      </div>
                      <div className="col">
                        <Form.Label>Knowledge:<br />{formatDiceCode(currentHero.knowledge)}</Form.Label>
                        <Form.Control
                          className="form-control-sm"
                          type="number"
                          placeholder="Knowledge"
                          name="knowledge"
                          required
                          value={currentHero.knowledge}
                          onChange={handleInputChange}
                          step="0.1"
                          min="0"
                          max="20.9"
                          style={{ width: '65px', marginRight: '13px' }}
                        />
                      </div>
                      <div className="col">
                        <Form.Label>Mechanical:<br />{formatDiceCode(currentHero.mechanical)}</Form.Label>
                        <Form.Control
                          className="form-control-sm"
                          type="number"
                          placeholder="Mechanical"
                          name="mechanical"
                          required
                          value={currentHero.mechanical}
                          onChange={handleInputChange}
                          step="0.1"
                          min="0"
                          max="20.9"
                          style={{ width: '65px', marginRight: '13px' }}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <Form.Label>Perception:<br />{formatDiceCode(currentHero.perception)}</Form.Label>
                        <Form.Control
                          className="form-control-sm"
                          type="number"
                          placeholder="Perception"
                          name="perception"
                          required
                          value={currentHero.perception}
                          onChange={handleInputChange}
                          step="0.1"
                          min="0"
                          max="20.9"
                          style={{ width: '65px', marginRight: '13px' }}
                        />
                      </div>
                      <div className="col">
                        <Form.Label>Strength:<br />{formatDiceCode(currentHero.strength)}</Form.Label>
                        <Form.Control
                          className="form-control-sm"
                          type="number"
                          placeholder="Strength"
                          name="strength"
                          required
                          value={currentHero.strength}
                          onChange={handleInputChange}
                          step="0.1"
                          min="0"
                          max="20.9"
                          style={{ width: '65px', marginRight: '13px' }}
                        />
                      </div>
                      <div className="col">
                        <Form.Label>Technical:<br />{formatDiceCode(currentHero.technical)}</Form.Label>
                        <Form.Control
                          className="form-control-sm"
                          type="number"
                          placeholder="Technical"
                          name="technical"
                          required
                          value={currentHero.technical}
                          onChange={handleInputChange}
                          step="0.1"
                          min="0"
                          max="20.9"
                          style={{ width: '65px', marginRight: '13px' }}
                        />
                      </div>
                    </div>

                    {currentHero.force_sensitive && (
                    // <div style={{ color: 'rgb(216, 223, 233)', textShadow: '2px 2px 3px black' }}>
                    <div>
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
                            type="number"
                            placeholder="Force Control"
                            name="force_control"
                            required
                            value={currentHero.force_control}
                            onChange={handleInputChange}
                            step="0.1"
                            min="0"
                            max="20.9"
                            style={{ width: '65px', marginRight: '13px' }}
                          />
                        </div>
                        <div className="col">
                          <Form.Label>
                            Sense:<br />
                            {formatDiceCode(currentHero.force_sense)}
                          </Form.Label>
                          <Form.Control
                            className="form-control-sm"
                            type="number"
                            placeholder="Force Sense"
                            name="force_sense"
                            required
                            value={currentHero.force_sense}
                            onChange={handleInputChange}
                            step="0.1"
                            min="0"
                            max="20.9"
                            style={{ width: '65px', marginRight: '13px' }}
                          />
                        </div>
                        <div className="col">
                          <Form.Label>
                            Alter:<br />
                            {formatDiceCode(currentHero.force_alter)}
                          </Form.Label>
                          <Form.Control
                            className="form-control-sm"
                            type="number"
                            placeholder="Force Alter"
                            name="force_alter"
                            required
                            value={currentHero.force_alter}
                            onChange={handleInputChange}
                            step="0.1"
                            min="0"
                            max="20.9"
                            style={{ width: '65px', marginRight: '13px' }}
                          />
                        </div>
                      </div>
                    </div>
                    )}

                  </div>
                  <div style={{ margin: '13px', border: '13px', padding: '13px' }}>
                    {selectedSpecies && (
                    <div>
                      <div className="row justify-content-center">
                        <div className="col-auto text-center">
                          <Form.Label>Species-Specific Attributes</Form.Label>
                        </div>
                      </div>
                      <div style={{ margin: '13px', border: '13px', padding: '13px' }} />
                      <div className="row">
                        {/* Species Dexterity */}
                        {selectedSpecies.species_dexterity != null && selectedSpecies.species_dexterity !== 0 && (
                        <div className="col">
                          <Form.Label>
                            Dexterity:<br />
                            {formatDiceCode(selectedSpecies.species_dexterity)}
                          </Form.Label>
                          <Form.Control
                            className="form-control-sm"
                            type="number"
                            placeholder="Dexterity"
                            name="species_dexterity"
                            required
                            value={selectedSpecies.species_dexterity}
                            onChange={handleInputChange}
                            step="0.1"
                            min="0"
                            max="20.9"
                            style={{ width: '65px', marginRight: '13px' }}
                          />
                        </div>
                        )}
                        {/* Species Knowledge */}
                        {selectedSpecies.species_knowledge != null && selectedSpecies.species_knowledge !== 0 && (
                        <div className="col">
                          <Form.Label>
                            Knowledge:<br />
                            {formatDiceCode(selectedSpecies.species_knowledge)}
                          </Form.Label>
                          <Form.Control
                            className="form-control-sm"
                            type="number"
                            placeholder="Knowledge"
                            name="species_knowledge"
                            required
                            value={selectedSpecies.species_knowledge}
                            onChange={handleInputChange}
                            step="0.1"
                            min="0"
                            max="20.9"
                            style={{ width: '65px', marginRight: '13px' }}
                          />
                        </div>
                        )}
                        {/* Species Mechanical */}
                        {selectedSpecies.species_mechanical != null && selectedSpecies.species_mechanical !== 0 && (
                        <div className="col">
                          <Form.Label>
                            Mechanical:<br />
                            {formatDiceCode(selectedSpecies.species_mechanical)}
                          </Form.Label>
                          <Form.Control
                            className="form-control-sm"
                            type="number"
                            placeholder="Mechanical"
                            name="species_mechanical"
                            required
                            value={selectedSpecies.species_mechanical}
                            onChange={handleInputChange}
                            step="0.1"
                            min="0"
                            max="20.9"
                            style={{ width: '65px', marginRight: '13px' }}
                          />
                        </div>
                        )}
                      </div>

                      <div className="row">
                        {/* Species Perception */}
                        {selectedSpecies.species_perception != null && selectedSpecies.species_perception !== 0 && (
                        <div className="col">
                          <Form.Label>
                            Perception:<br />
                            {formatDiceCode(selectedSpecies.species_perception)}
                          </Form.Label>
                          <Form.Control
                            className="form-control-sm"
                            type="number"
                            placeholder="Perception"
                            name="species_perception"
                            required
                            value={selectedSpecies.species_perception}
                            onChange={handleInputChange}
                            step="0.1"
                            min="0"
                            max="20.9"
                            style={{ width: '65px', marginRight: '13px' }}
                          />
                        </div>
                        )}
                        {/* Species Strength */}
                        {selectedSpecies.species_strength != null && selectedSpecies.species_strength !== 0 && (
                        <div className="col">
                          <Form.Label>
                            Strength:<br />
                            {formatDiceCode(selectedSpecies.species_strength)}
                          </Form.Label>
                          <Form.Control
                            className="form-control-sm"
                            type="number"
                            placeholder="Strength"
                            name="species_strength"
                            required
                            value={selectedSpecies.species_strength}
                            onChange={handleInputChange}
                            step="0.1"
                            min="0"
                            max="20.9"
                            style={{ width: '65px', marginRight: '13px' }}
                          />
                        </div>
                        )}
                        {/* Species Technical */}
                        {selectedSpecies.species_technical != null && selectedSpecies.species_technical !== 0 && (
                        <div className="col">
                          <Form.Label>
                            Technical:<br />
                            {formatDiceCode(selectedSpecies.species_technical)}
                          </Form.Label>
                          <Form.Control
                            className="form-control-sm"
                            type="number"
                            placeholder="Technical"
                            name="species_technical"
                            required
                            value={selectedSpecies.species_technical}
                            onChange={handleInputChange}
                            step="0.1"
                            min="0"
                            max="20.9"
                            style={{ width: '65px', marginRight: '13px' }}
                          />
                        </div>
                        )}
                      </div>

                      {selectedSpecies.species_force_sensitive && (
                      <div className="row">
                        {/* Force Control */}
                        {selectedSpecies.species_force_control != null && selectedSpecies.species_force_control !== 0 && (
                        <div className="col">
                          <Form.Label>
                            Force Control:<br />
                            {formatDiceCode(selectedSpecies.species_force_control)}
                          </Form.Label>
                          <Form.Control
                            className="form-control-sm"
                            type="number"
                            placeholder="Force Control"
                            name="species_force_control"
                            required
                            value={selectedSpecies.species_force_control}
                            onChange={handleInputChange}
                            step="0.1"
                            min="0"
                            max="20.9"
                            style={{ width: '65px', marginRight: '13px' }}
                          />
                        </div>
                        )}
                        {/* Force Sense */}
                        {selectedSpecies.species_force_sense != null && selectedSpecies.species_force_sense !== 0 && (
                        <div className="col">
                          <Form.Label>
                            Force Sense:<br />
                            {formatDiceCode(selectedSpecies.species_force_sense)}
                          </Form.Label>
                          <Form.Control
                            className="form-control-sm"
                            type="number"
                            placeholder="Force Sense"
                            name="species_force_sense"
                            required
                            value={selectedSpecies.species_force_sense}
                            onChange={handleInputChange}
                            step="0.1"
                            min="0"
                            max="20.9"
                            style={{ width: '65px', marginRight: '13px' }}
                          />
                        </div>
                        )}
                        {/* Force Alter */}
                        {selectedSpecies.species_force_alter != null && selectedSpecies.species_force_alter !== 0 && (
                        <div className="col">
                          <Form.Label>
                            Force Alter:<br />
                            {formatDiceCode(selectedSpecies.species_force_alter)}
                          </Form.Label>
                          <Form.Control
                            className="form-control-sm"
                            type="number"
                            placeholder="Force Alter"
                            name="species_force_alter"
                            required
                            value={selectedSpecies.species_force_alter}
                            onChange={handleInputChange}
                            step="0.1"
                            min="0"
                            max="20.9"
                            style={{ width: '65px', marginRight: '13px' }}
                          />
                        </div>
                        )}
                      </div>
                      )}
                    </div>
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

                <FancyButton onClick={toggleIsNPC} className="ml-2 mt-3">
                  {currentHero.NPC ? 'Is a NPC' : 'Is a PC'}
                </FancyButton>
                <div className="cardOfForm">
                  <div className="col">

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
                  </div>

                </FancyCardLong>

                <FancyCardLong>
                  <div className="col">
                    <div className="col-auto">

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
