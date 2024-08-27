import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form, FormLabel } from 'react-bootstrap';
import {
  createHero, getSingleHero, updateHero, isForceSensitive, isNotForceSensitive,
} from '../../../utils/data/heroData';

const initialState = {
  name: '',
  archtype: '',
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
  a_guote: '',
};

const HeroForm = ({ hero, id }) => {
  const [currentHero, setCurrentHero] = useState(initialState);
  const router = useRouter();
  // const { Hero, HeroLoading } = useAuth();

  useEffect(() => {
    if (hero) {
      getSingleHero(id).then((data) => {
        setCurrentHero({
          name: data.name,
          archtype: data.archtype,
          species: data.species,
          homeworld: data.homeworld,
          gender: data.gender,
          age: data.age,
          height: data.height,
          weight: data.weight,
          physical_description: data.physical_description,
          personality: data.personality,
          background: data.background,
          objectives: data.objectives,
          a_quote: data.a_quote,
        });
      });
    }
  }, [id, hero]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentHero((prevState) => ({
      ...prevState,
      [name]: value || '',
    }));
  };

  const noForceAbility = () => {
    if (hero) {
      if (window.confirm(`no force ability in ${currentHero.name} ${id}`)) {
        isNotForceSensitive(id);
        window.location.reload();
        router.push('/Heros');
      }
    }
  };

  const forceAbility = () => {
    if (hero) {
      if (window.confirm(`the force is strong with ${currentHero.name} ${id}`)) {
        isForceSensitive(id);
        window.location.reload();
        router.push('/Heros');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const aHero = {
      name: currentHero.name,
      archtype: currentHero.archtype,
      species: currentHero.species,
      homeworld: currentHero.homeworld,
      gender: currentHero.gender,
      age: currentHero.age,
      height: currentHero.height,
      weight: currentHero.weight,
      physical_description: currentHero.physical_description,
      personality: currentHero.personality,
      background: currentHero.background,
      objectives: currentHero.objectives,
      a_quote: currentHero.a_guote,
    };

    if (!id) {
      createHero(aHero)
        .then(() => router.push('/heros'))
        .catch((error) => {
          console.error('Error creating this Hero: ', error);
        });
    } else {
      updateHero(aHero, id)
        .then(() => router.push(`/heros/${id}`))
        .catch((error) => {
          console.error('Error updating this event: ', error);
        });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <div className="row">
            <div className="col">
              <div className="row">
                <div className="col">
                  <FormLabel>What&apos;s your name?</FormLabel>
                  <Form.Control
                    className="form-control-sm"
                    type="text"
                    placeholder="First Name"
                    name="name"
                    required
                    value={currentHero.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="col">
                  <FormLabel>Class / Type / &quot;Template&quot;</FormLabel>
                  <Form.Control
                    className="form-control-sm"
                    type="text"
                    placeholder="Archetype / Occupation / Paradigm"
                    name="archtype"
                    required
                    value={currentHero.archtype}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <FormLabel>You&apos;re the genetic or mechanical progeny of:</FormLabel>
                  <Form.Control
                    className="form-control-sm"
                    type="text"
                    placeholder="species"
                    name="species"
                    required
                    value={currentHero.species}
                    onChange={handleChange}
                  />
                </div>

                <div className="col">
                  <FormLabel>Do you have a planet you call your homeworld?</FormLabel>
                  <Form.Control
                    className="form-control-sm"
                    type="text"
                    placeholder="homeworld"
                    name="homeworld"
                    required
                    value={currentHero.homeworld}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <FormLabel>If your species has &apos;em</FormLabel>
                  <Form.Control
                    className="form-control-sm"
                    type="text"
                    placeholder="gender"
                    name="gender"
                    required
                    value={currentHero.gender}
                    onChange={handleChange}
                  />
                </div>

                <div className="col">
                  <FormLabel>Age in Republic years?</FormLabel>
                  <Form.Control
                    className="form-control-sm"
                    type="text"
                    placeholder="age"
                    name="age"
                    required
                    value={currentHero.age}
                    onChange={handleChange}
                  />
                </div>

                <div className="col">
                  <FormLabel>Height in meters?</FormLabel>
                  <Form.Control
                    className="form-control-sm"
                    type="text"
                    placeholder="height"
                    name="height"
                    required
                    value={currentHero.height}
                    onChange={handleChange}
                  />
                </div>

                <div className="col">
                  <FormLabel>Weight in kilos</FormLabel>
                  <Form.Control
                    className="form-control-sm"
                    type="text"
                    placeholder="weight"
                    name="weight"
                    required
                    value={currentHero.weight}
                    onChange={handleChange}
                  />
                </div>

                <div className="row">
                  <div className="col">
                    <FormLabel>Physical Description</FormLabel>
                    <FloatingLabel controlId="floatingTextarea" label="what you look like" className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder="physical_description"
                        name="physical_description"
                        required
                        value={currentHero.physical_description}
                        onChange={handleChange}
                        style={{ height: '69px' }}
                      />
                    </FloatingLabel>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <FormLabel>Personality</FormLabel>
                    <FloatingLabel controlId="floatingTextarea" label="You're a..." className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder="personality"
                        name="personality"
                        required
                        value={currentHero.personality}
                        onChange={handleChange}
                        style={{ height: '69px' }}
                      />
                    </FloatingLabel>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <FormLabel>Background</FormLabel>
                    <FloatingLabel controlId="floatingTextarea" label="You're from a..." className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder="background"
                        name="background"
                        required
                        value={currentHero.background}
                        onChange={handleChange}
                        style={{ height: '69px' }}
                      />
                    </FloatingLabel>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <FormLabel>Objectives</FormLabel>
                    <FloatingLabel controlId="floatingTextarea" label="You're gonna do a..." className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder="objectives"
                        name="objectives"
                        required
                        value={currentHero.objectives}
                        onChange={handleChange}
                        style={{ height: '69px' }}
                      />
                    </FloatingLabel>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <FormLabel>A quote</FormLabel>
                    <FloatingLabel controlId="floatingTextarea" label="You're always saying ..." className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder="a_quote"
                        name="a_quote"
                        required
                        value={currentHero.a_quote || ''}
                        onChange={handleChange}
                        style={{ height: '33px' }}
                      />
                    </FloatingLabel>
                  </div>
                </div>

              </div>
            </div>

            <div style={{ height: '666px', width: '450px', backgroundColor: '#f0f0f0' }}>
              {/* Additional content or components can go here */}
            </div>
          </div>

          <Button
            variant={currentHero.weight === 1 ? 'danger' : 'success'}
            onClick={currentHero.weight === 1 ? noForceAbility : forceAbility}
          >
            {currentHero.weight === 1 ? 'not Force Sensitive' : 'Force Sensitive'}
          </Button>

        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
  //
};

HeroForm.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  hero: PropTypes.shape({
    name: PropTypes.string,
    archtype: PropTypes.string,
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
  }),
};

HeroForm.defaultProps = {
  id: null,
  hero: null,
};

export default HeroForm;
