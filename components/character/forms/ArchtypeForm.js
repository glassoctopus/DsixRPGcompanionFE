import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import {
  Button, Form, FormLabel, FloatingLabel,
} from 'react-bootstrap';
import {
  createArchetype, updateArchetype,
} from '../../../utils/data/archetypeData';

const initialState = {
  name: '',
  NPC: true,
  force_sensitive: false,
  dexterity: '',
  knowledge: '',
  mechanical: '',
  perception: '',
  strength: '',
  technical: '',
  control: '',
  sense: '',
  alter: '',
  startingCredits: '',
  personality: '',
  background: '',
  objectives: '',
  a_quote: '',
  gameNotes: '',
  source: '',
};

const ArchetypeForm = ({ archetype, id }) => {
  const [currentArchetype, setCurrentArchetype] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    if (archetype) {
      // console.log('Fetched Archetype:', archetype); // Add console log to check fetched archetype

      setCurrentArchetype({
        name: archetype.archetype_name,
        archetype_for_NPC: archetype.archetype_for_NPC,
        force_sensitive: archetype.archetype_force_sensitive,
        dexterity: archetype.archetype_dexterity,
        knowledge: archetype.archetype_knowledge,
        mechanical: archetype.archetype_mechanical,
        perception: archetype.archetype_perception,
        strength: archetype.archetype_strength,
        technical: archetype.archetype_technical,
        control: archetype.archetype_force_control,
        sense: archetype.archetype_force_sense,
        alter: archetype.archetype_force_alter,
        credits: archetype.archetype_starting_credits,
        personality: archetype.archetype_personality,
        background: archetype.archetype_background,
        objectives: archetype.archetype_objectives,
        a_quote: archetype.archetype_a_quote,
        gameNotes: archetype.archetype_game_notes,
        source: archetype.archetype_source,
      });
    }
  }, [id, archetype]);

  const handleInputChange = ({
    target: {
      name, value, type, checked,
    },
  }) => {
    setCurrentArchetype((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedArchetype = {
      ...currentArchetype,
    };

    if (!id) {
      createArchetype(updatedArchetype)
        .then(() => router.push('/archetypes'))
        .catch((error) => {
          console.error('Error creating this archetype:', error);
        });
    } else {
      updateArchetype(updatedArchetype, id)
        .then(() => router.push(`/archetypes/${id}`))
        .catch((error) => {
          console.error('Error updating this archetype:', error);
        });
    }
  };

  const toggleIsNPC = () => {
    const updatedArchetype = {
      ...currentArchetype,
      NPC: !currentArchetype.NPC,
    };
    setCurrentArchetype(updatedArchetype);
  };

  const toggleForceSensitive = () => {
    const updatedArchetype = {
      ...currentArchetype,
      force_sensitive: !currentArchetype.force_sensitive,
    };
    setCurrentArchetype(updatedArchetype);
  };

  return (
    <>
      <Form
        onSubmit={handleSubmit}
        style={{
          maxHeight: '80vh', overflowY: 'auto', margin: '13px', border: '13px ', padding: '13px',
        }}
        className="container-fluid"
      >
        <Form.Group className="mb-3">
          <div style={{ margin: '13px', border: '13px', padding: '13px' }}>
            <div className="row">
              <div className="col">
                <div className="col">
                  <div className="row">
                    <div className="col">
                      <FormLabel>Archetype Name</FormLabel>
                      <FloatingLabel controlId="floatingTextarea" label="Archetype Name" className="mb-3">
                        <Form.Control
                          as="textarea"
                          placeholder="Archetype Name"
                          name="name"
                          required
                          value={currentArchetype.name}
                          onChange={handleInputChange}
                        />
                      </FloatingLabel>
                    </div>
                    <div className="col">
                      <div className="row align-items-center">
                        <div className="col-auto">
                          <FormLabel>Starting Credits</FormLabel>
                          <Form.Control
                            className="form-control form-control-sm"
                            type="text"
                            placeholder="Starting Credits"
                            name="startingCredits"
                            required
                            value={currentArchetype.credits}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="col-auto">
                          <Button
                            variant={currentArchetype.NPC ? 'info' : 'success'}
                            onClick={toggleIsNPC}
                            className="ml-2 mt-3"
                          >
                            {currentArchetype.NPC ? 'Is not a NPC Archetype' : 'Is a NPC Archetype'}
                          </Button>
                        </div>
                        <div className="col-auto">
                          <Button
                            variant={currentArchetype.force_sensitive ? 'info' : 'success'}
                            onClick={toggleForceSensitive}
                            className="ml-2 mt-3"
                          >
                            {currentArchetype.force_sensitive ? 'Is not Force Sensitive' : 'Is Force Sensitive'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="row">
                      <div className="col">
                        <FormLabel>Dexterity</FormLabel>
                        <Form.Control
                          className="form-control-sm"
                          type="text"
                          placeholder="Dexterity"
                          name="dexterity"
                          required
                          value={currentArchetype.dexterity}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="col">
                        <FormLabel>Knowledge</FormLabel>
                        <Form.Control
                          className="form-control-sm"
                          type="text"
                          placeholder="Knowledge"
                          name="knowledge"
                          required
                          value={currentArchetype.knowledge}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="col">
                        <FormLabel>Mechanical</FormLabel>
                        <Form.Control
                          className="form-control-sm"
                          type="text"
                          placeholder="Mechanical"
                          name="mechanical"
                          required
                          value={currentArchetype.mechanical}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col">
                        <FormLabel>Perception</FormLabel>
                        <Form.Control
                          className="form-control-sm"
                          type="text"
                          placeholder="Perception"
                          name="perception"
                          required
                          value={currentArchetype.perception}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="col">
                        <FormLabel>Strength</FormLabel>
                        <Form.Control
                          className="form-control-sm"
                          type="text"
                          placeholder="Strength"
                          name="strength"
                          required
                          value={currentArchetype.strength}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="col">
                        <FormLabel>Technical</FormLabel>
                        <Form.Control
                          className="form-control-sm"
                          type="text"
                          placeholder="Technical"
                          name="technical"
                          required
                          value={currentArchetype.technical}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col">
                        <FormLabel>Force Control</FormLabel>
                        <Form.Control
                          className="form-control-sm"
                          type="text"
                          placeholder="Control"
                          name="control"
                          required
                          value={currentArchetype.control}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="col">
                        <FormLabel>Force Sense</FormLabel>
                        <Form.Control
                          className="form-control-sm"
                          type="text"
                          placeholder="Sense"
                          name="sense"
                          required
                          value={currentArchetype.sense}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="col">
                        <FormLabel>Force Alter</FormLabel>
                        <Form.Control
                          className="form-control-sm"
                          type="text"
                          placeholder="Alter"
                          name="alter"
                          required
                          value={currentArchetype.alter}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col">
                    <div style={{ margin: '13px', border: '13px', padding: '13px' }}>
                      <FormLabel>Personality</FormLabel>
                      <FloatingLabel controlId="floatingTextarea" label="Personality" className="mb-3">
                        <Form.Control
                          as="textarea"
                          placeholder="Personality"
                          name="personality"
                          required
                          value={currentArchetype.personality}
                          onChange={handleInputChange}
                        />
                      </FloatingLabel>
                    </div>

                    <div style={{ margin: '13px', border: '13px', padding: '13px' }}>
                      <FormLabel>Background</FormLabel>
                      <FloatingLabel controlId="floatingTextarea" label="Background" className="mb-3">
                        <Form.Control
                          as="textarea"
                          placeholder="Background"
                          name="background"
                          required
                          value={currentArchetype.background}
                          onChange={handleInputChange}
                        />
                      </FloatingLabel>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <FormLabel>Objectives</FormLabel>
                    <FloatingLabel controlId="floatingTextarea" label="Objectives" className="mb-3">
                      <Form.Control
                        as="textarea"
                        placeholder="Objectives"
                        name="objectives"
                        required
                        value={currentArchetype.objectives}
                        onChange={handleInputChange}
                      />
                    </FloatingLabel>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <FormLabel>A Quote</FormLabel>
                    <Form.Control
                      className="form-control-sm"
                      type="text"
                      placeholder="A Quote"
                      name="a_quote"
                      required
                      value={currentArchetype.a_quote}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <FormLabel>Source</FormLabel>
                    <Form.Control
                      className="form-control-sm"
                      type="text"
                      placeholder="Source"
                      name="source"
                      required
                      value={currentArchetype.source}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Button variant="primary" type="submit" className="mt-3">
                Submit
              </Button>
            </div>
          </div>
        </Form.Group>
      </Form>
    </>
  );
};

ArchetypeForm.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  archetype: PropTypes.shape({
    archetype_name: PropTypes.string.isRequired,
    archetype_for_NPC: PropTypes.bool,
    archetype_force_sensitive: PropTypes.bool,
    archetype_dexterity: PropTypes.number,
    archetype_knowledge: PropTypes.number,
    archetype_mechanical: PropTypes.number,
    archetype_perception: PropTypes.number,
    archetype_strength: PropTypes.number,
    archetype_technical: PropTypes.number,
    archetype_force_control: PropTypes.number,
    archetype_force_sense: PropTypes.number,
    archetype_force_alter: PropTypes.number,
    archetype_starting_credits: PropTypes.number,
    archetype_personality: PropTypes.string,
    archetype_background: PropTypes.string,
    archetype_objectives: PropTypes.string,
    archetype_a_quote: PropTypes.string,
    archetype_game_notes: PropTypes.string,
    archetype_source: PropTypes.string,
  }),
};

ArchetypeForm.defaultProps = {
  id: null,
  archetype: {
    archetype_name: '',
    archetype_for_NPC: false,
    archetype_force_sensitive: false,
    archetype_dexterity: 0,
    archetype_knowledge: 0,
    archetype_mechanical: 0,
    archetype_perception: 0,
    archetype_strength: 0,
    archetype_technical: 0,
    archetype_force_control: 0,
    archetype_force_sense: 0,
    archetype_force_alter: 0,
    archetype_starting_credits: 0,
    archetype_personality: '',
    archetype_background: '',
    archetype_objectives: '',
    archetype_a_quote: '',
    archetype_game_notes: '',
    archetype_source: '',
  },
};

export default ArchetypeForm;
