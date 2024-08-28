import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import {
  Button, Form, FloatingLabel,
} from 'react-bootstrap';
import {
  createHero, getSingleHero, updateHero, isForceSensitive, isNotForceSensitive,
} from '../../../utils/data/heroData';

const initialState = {
  uid: '',
  NPC: true,
  user: '',
  image: '',
  name: '',
  archetype: '',
  species: '',
  homeworld: '',
  gender: '',
  age: '',
  height: '',
  weight: '',
  physical_description: '',
  personality: '',
  background: '',
  objectives: '',
  a_quote: '',
  credits: '',
  force_sensitive: false,
  dexterity: '',
  knowledge: '',
  mechanical: '',
  perception: '',
  strength: '',
  technical: '',
  force_control: '',
  force_sense: '',
  force_alter: '',
  force_points: '',
  dark_side_points: '',
  force_strength: '',
  skills: '',
};

const HeroForm = ({ hero, id }) => {
  const [currentHero, setCurrentHero] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    if (hero) {
      setCurrentHero({
        uid: hero.uid,
        NPC: hero.NPC,
        user: hero.user,
        image: hero.image,
        name: hero.name,
        archetype: hero.archetype,
        species: hero.species,
        homeworld: hero.homeworld,
        gender: hero.gender,
        age: hero.age,
        height: hero.height,
        weight: hero.weight,
        physical_description: hero.physical_description,
        personality: hero.personality,
        background: hero.background,
        objectives: hero.objectives,
        a_quote: hero.a_quote,
        credits: hero.credits,
        force_sensitive: hero.force_sensitive,
        dexterity: hero.dexterity,
        knowledge: hero.knowledge,
        mechanical: hero.mechanical,
        perception: hero.perception,
        strength: hero.strength,
        technical: hero.technical,
        force_control: hero.force_control,
        force_sense: hero.force_sense,
        force_alter: hero.force_alter,
        force_points: hero.force_points,
        dark_side_points: hero.dark_side_points,
        force_strength: hero.force_strength,
      });
    }
  }, [id, hero]);

  const handleInputChange = ({
    target: {
      name, value, type, checked,
    },
  }) => {
    setCurrentHero((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedHero = {
      ...currentHero,
    };

    if (!id) {
      createHero(updatedHero)
        .then(() => router.push('/heroes'))
        .catch((error) => {
          console.error('Error creating this hero:', error);
        });
    } else {
      updateHero(updatedHero, id)
        .then(() => router.push(`/heroes/${id}`))
        .catch((error) => {
          console.error('Error updating this hero:', error);
        });
    }
  };

  const toggleIsNPC = () => {
    const updatedHero = {
      ...currentHero,
      NPC: !currentHero.NPC,
    };
    setCurrentHero(updatedHero);
  };

  const toggleForceSensitive = () => {
    const updatedHero = {
      ...currentHero,
      force_sensitive: !currentHero.force_sensitive,
    };
    setCurrentHero(updatedHero);
  };

  return (
    <>
      <Form
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
          <div style={{ margin: '13px', border: '13px', padding: '13px' }}>

            <div className="row">
              <div className="col">

                <Form.Label>Name</Form.Label>
                <Form.Control
                  className="form-control-sm"
                  type="text"
                  placeholder="Name"
                  name="name"
                  required
                  value={hero.name}
                  onChange={handleInputChange}
                />
                <Form.Label>Species</Form.Label>
                <Form.Control
                  className="form-control-sm"
                  type="text"
                  placeholder="Species"
                  name="species"
                  required
                  value={hero.species}
                  onChange={handleInputChange}
                />
                <div className="row">
                  <div className="col">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control
                      className="form-control-sm"
                      type="text"
                      placeholder="Gender"
                      name="gender"
                      required
                      value={hero.gender}
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
                      value={hero.age}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="col" style={{ margin: '13px', border: '13px', padding: '13px' }}>
                <div className="row">
                  <div className="col">
                    <Form.Label>Dexterity</Form.Label>
                    <Form.Control
                      className="form-control-sm"
                      type="text"
                      placeholder="Dexterity"
                      name="dexterity"
                      required
                      value={hero.dexterity}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col">
                    <Form.Label>Knowledge</Form.Label>
                    <Form.Control
                      className="form-control-sm"
                      type="text"
                      placeholder="Knowledge"
                      name="knowledge"
                      required
                      value={hero.knowledge}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col">
                    <Form.Label>Mechanical</Form.Label>
                    <Form.Control
                      className="form-control-sm"
                      type="text"
                      placeholder="Mechanical"
                      name="mechanical"
                      required
                      value={hero.mechanical}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <Form.Label>Perception</Form.Label>
                    <Form.Control
                      className="form-control-sm"
                      type="text"
                      placeholder="Perception"
                      name="perception"
                      required
                      value={hero.perception}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col">
                    <Form.Label>Strength</Form.Label>
                    <Form.Control
                      className="form-control-sm"
                      type="text"
                      placeholder="Strength"
                      name="strength"
                      required
                      value={hero.strength}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col">
                    <Form.Label>Technical</Form.Label>
                    <Form.Control
                      className="form-control-sm"
                      type="text"
                      placeholder="Technical"
                      name="technical"
                      required
                      value={hero.technical}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <Form.Label>Force Control</Form.Label>
                    <Form.Control
                      className="form-control-sm"
                      type="text"
                      placeholder="Force Control"
                      name="force_control"
                      required
                      value={hero.force_control}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col">
                    <Form.Label>Force Sense</Form.Label>
                    <Form.Control
                      className="form-control-sm"
                      type="text"
                      placeholder="Force Sense"
                      name="force_sense"
                      required
                      value={hero.force_sense}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col">
                    <Form.Label>Force Alter</Form.Label>
                    <Form.Control
                      className="form-control-sm"
                      type="text"
                      placeholder="Force Alter"
                      name="force_alter"
                      required
                      value={hero.force_alter}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="col">
                <Form.Label>Archetype</Form.Label>
                <Form.Control
                  className="form-control-sm"
                  type="text"
                  placeholder="Archetype"
                  name="archetype"
                  required
                  value={hero.archetype}
                  onChange={handleInputChange}
                />
                <Form.Label>Homeworld</Form.Label>
                <Form.Control
                  className="form-control-sm"
                  type="text"
                  placeholder="Homeworld"
                  name="homeworld"
                  required
                  value={hero.homeworld}
                  onChange={handleInputChange}
                />
                <div className="row">

                  <div className="col">
                    <Form.Label>Height</Form.Label>
                    <Form.Control
                      className="form-control-sm"
                      type="text"
                      placeholder="Height"
                      name="height"
                      required
                      value={hero.height}
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
                      value={hero.weight}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <Form.Label>Personality</Form.Label>
                <FloatingLabel controlId="personality" label="Personality" className="mb-3">
                  <Form.Control
                    as="textarea"
                    placeholder="Personality"
                    name="personality"
                    required
                    value={hero.personality}
                    onChange={handleInputChange}
                  />
                </FloatingLabel>
              </div>
              <div className="col">
                <Form.Label>Background</Form.Label>
                <FloatingLabel controlId="background" label="Background" className="mb-3">
                  <Form.Control
                    as="textarea"
                    placeholder="Background"
                    name="background"
                    required
                    value={hero.background}
                    onChange={handleInputChange}
                  />
                </FloatingLabel>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <Form.Label>Physical Description</Form.Label>
                <FloatingLabel controlId="physical_description" label="Physical Description" className="mb-3">
                  <Form.Control
                    as="textarea"
                    placeholder="Physical Description"
                    name="physical_description"
                    required
                    value={hero.physical_description}
                    onChange={handleInputChange}
                  />
                </FloatingLabel>
              </div>

              <div className="col">
                <Form.Label>Objectives</Form.Label>
                <FloatingLabel controlId="objectives" label="Objectives" className="mb-3">
                  <Form.Control
                    as="textarea"
                    placeholder="Objectives"
                    name="objectives"
                    required
                    value={hero.objectives}
                    onChange={handleInputChange}
                  />
                </FloatingLabel>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <Form.Label>A Quote</Form.Label>
                <Form.Control
                  className="form-control-sm"
                  type="text"
                  placeholder="A Quote"
                  name="a_quote"
                  required
                  value={hero.a_quote}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="row">
                <div className="col-auto">

                  <Form.Label>Credits</Form.Label>
                  <Form.Control
                    className="form-control-sm"
                    type="number"
                    placeholder="Credits"
                    name="credits"
                    required
                    value={hero.credits}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-auto">
                  <Button
                    variant={currentHero.NPC ? 'info' : 'success'}
                    onClick={toggleIsNPC}
                    className="ml-2 mt-3"
                  >
                    {currentHero.NPC ? 'Is not a NPC' : 'Is a NPC'}
                  </Button>
                </div>
                <div className="col-auto">
                  <Button
                    variant={currentHero.force_sensitive ? 'info' : 'success'}
                    onClick={toggleForceSensitive}
                    className="ml-2 mt-3"
                  >
                    {currentHero.force_sensitive ? 'Is not Force Sensitive' : 'Is Force Sensitive'}
                  </Button>
                </div>
              </div>
            </div>
          </div>

        </Form.Group>
        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </>
  );
};

HeroForm.propTypes = {
  hero: PropTypes.shape({
    uid: PropTypes.string,
    NPC: PropTypes.bool,
    user: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    archetype: PropTypes.string,
    species: PropTypes.string,
    homeworld: PropTypes.string,
    gender: PropTypes.string,
    age: PropTypes.string,
    height: PropTypes.string,
    weight: PropTypes.string,
    physical_description: PropTypes.string,
    personality: PropTypes.string,
    background: PropTypes.string,
    objectives: PropTypes.string,
    a_quote: PropTypes.string,
    credits: PropTypes.string,
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
  id: PropTypes.string,
};

// Set default values for props
HeroForm.defaultProps = {
  hero: {
    uid: '',
    NPC: true,
    user: '',
    image: '',
    name: '',
    archetype: '',
    species: '',
    homeworld: '',
    gender: '',
    age: '',
    height: '',
    weight: '',
    physical_description: '',
    personality: '',
    background: '',
    objectives: '',
    a_quote: '',
    credits: '',
    force_sensitive: false,
    dexterity: '',
    knowledge: '',
    mechanical: '',
    perception: '',
    strength: '',
    technical: '',
    force_control: '',
    force_sense: '',
    force_alter: '',
    force_points: '',
    dark_side_points: '',
    force_strength: '',
  },
  id: '',
};

export default HeroForm;
