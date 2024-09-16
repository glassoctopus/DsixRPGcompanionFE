import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import { Form, FormLabel } from 'react-bootstrap';
import {
  createArchetype, updateArchetype,
} from '../../../utils/data/archetypeData';
import { useArchetypes } from '../../../utils/context/archetypeContext';
import FancyButton from '../../FancyButton';
import FancyCard from '../cards/FancyCard';

const initialState = {
  archetype_name: '',
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
  archetype_for_NPC: true,
  archetype_force_sensitive: false,
};

const ArchetypeForm = ({ archetype, id }) => {
  const [currentArchetype, setCurrentArchetype] = useState(initialState);
  const router = useRouter();
  const { id: routeId } = router.query;
  const { getArchetypeById } = useArchetypes();
  const formRef = useRef(null);

  useEffect(() => {
    const archetypeId = id || routeId;
    if (archetype) {
      setCurrentArchetype({
        archetype_name: archetype.archetype_name || '',
        archetype_for_NPC: archetype.archetype_for_NPC ?? true,
        archetype_force_sensitive: archetype.archetype_force_sensitive ?? false,
        archetype_dexterity: archetype.archetype_dexterity || 0,
        archetype_knowledge: archetype.archetype_knowledge || 0,
        archetype_mechanical: archetype.archetype_mechanical || 0,
        archetype_perception: archetype.archetype_perception || 0,
        archetype_strength: archetype.archetype_strength || 0,
        archetype_technical: archetype.archetype_technical || 0,
        archetype_force_control: archetype.archetype_force_control || 0,
        archetype_force_sense: archetype.archetype_force_sense || 0,
        archetype_force_alter: archetype.archetype_force_alter || 0,
        archetype_starting_credits: archetype.archetype_starting_credits || 0,
        archetype_personality: archetype.archetype_personality || '',
        archetype_background: archetype.archetype_background || '',
        archetype_objectives: archetype.archetype_objectives || '',
        archetype_a_quote: archetype.archetype_a_quote || '',
        archetype_game_notes: archetype.archetype_game_notes || '',
        archetype_source: archetype.archetype_source || '',
      });
    } else if (archetypeId) {
      const contextArchetype = getArchetypeById(archetypeId);
      if (contextArchetype) {
        setCurrentArchetype({
          archetype_name: contextArchetype.archetype_name || '',
          archetype_for_NPC: contextArchetype.archetype_for_NPC ?? true,
          archetype_force_sensitive: contextArchetype.archetype_force_sensitive ?? false,
          archetype_dexterity: contextArchetype.archetype_dexterity || 0,
          archetype_knowledge: contextArchetype.archetype_knowledge || 0,
          archetype_mechanical: contextArchetype.archetype_mechanical || 0,
          archetype_perception: contextArchetype.archetype_perception || 0,
          archetype_strength: contextArchetype.archetype_strength || 0,
          archetype_technical: contextArchetype.archetype_technical || 0,
          archetype_force_control: contextArchetype.archetype_force_control || 0,
          archetype_force_sense: contextArchetype.archetype_force_sense || 0,
          archetype_force_alter: contextArchetype.archetype_force_alter || 0,
          archetype_starting_credits: contextArchetype.archetype_starting_credits || 0,
          archetype_personality: contextArchetype.archetype_personality || '',
          archetype_background: contextArchetype.archetype_background || '',
          archetype_objectives: contextArchetype.archetype_objectives || '',
          archetype_a_quote: contextArchetype.archetype_a_quote || '',
          archetype_game_notes: contextArchetype.archetype_game_notes || '',
          archetype_source: contextArchetype.archetype_source || '',
        });
      }
    }
  }, [archetype, id, routeId, getArchetypeById]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentArchetype((prevState) => ({
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

    const updatedArchetype = {
      ...currentArchetype,
    };

    if (!id) {
      createArchetype(updatedArchetype)
        .then(() => router.push('/heros/archetypes'))
        .catch((error) => {
          console.error('Error creating this archetype:', error);
        });
    } else {
      updateArchetype(updatedArchetype, id)
        .then(() => router.push(`/heros/archetypes/${id}`))
        .catch((error) => {
          console.error('Error updating this archetype:', error);
        });
    }
  };

  const toggleForceSensitive = () => {
    setCurrentArchetype((prevState) => ({
      ...prevState,
      archetype_force_sensitive: !prevState.archetype_force_sensitive,
    }));
  };

  const toggleIsNPC = () => {
    setCurrentArchetype((prevState) => ({
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
          maxHeight: '80vh', overflowY: 'auto', margin: '13px', border: '13px ', padding: '13px',
        }}
        className="container-fluid"
      >

        <Form.Group>
          <div style={{ margin: '13px', border: '13px', padding: '13px' }}>
            <div className="row">
              <div className="col">
                <div className="col">
                  <div className="row">
                    <FancyCard>
                      <div className="cardOfForm">
                        <div className="col">

                          <FormLabel>Archetype Name</FormLabel>

                          <Form.Control
                            className="form-control-sm"
                            type="text"
                            placeholder="Archetype Name"
                            name="archetype_name"
                            required
                            value={currentArchetype.archetype_name}
                            onChange={handleInputChange}
                          />

                        </div>
                        <div style={{ margin: '15px', padding: '13px' }}>
                          <FancyButton onClick={toggleIsNPC}>
                            {currentArchetype.NPC ? 'for a PC' : 'Is... a NPC'}
                          </FancyButton>
                          <h5 style={{ display: 'inline-block', margin: '15px', padding: '13px' }}>
                            {currentArchetype.NPC ? "for Player's Characters" : 'Archetype is an NPC' }
                          </h5>
                        </div>
                        <FancyButton onClick={toggleForceSensitive}>
                          {currentArchetype.archetype_force_sensitive ? 'not Force Sensitive' : 'Is... Force Sensitive'}
                        </FancyButton>
                        <h5 style={{ display: 'inline-block', marginLeft: '15px' }}>
                          {currentArchetype.archetype_force_sensitive ? 'Archetype not Force Sensitive' : 'Archetype is... Force Sensitive'}
                        </h5>
                        <div style={{ margin: '15px', padding: '13px' }} />
                      </div>
                    </FancyCard>

                    <FancyCard>
                      <div className="row" />

                      <div className="col-auto">

                        <div className="cardOfForm">

                          <div className="col">
                            <div style={{ margin: '13px', border: '13px', padding: '13px' }}>
                              <FormLabel>Personality</FormLabel>
                              <Form.Control
                                as="textarea"
                                placeholder="Personality"
                                name="archetype_personality"
                                required
                                value={currentArchetype.archetype_personality}
                                onChange={handleInputChange}
                              />
                            </div>

                            <div style={{ margin: '13px', border: '13px', padding: '13px' }}>
                              <FormLabel>Background</FormLabel>
                              <Form.Control
                                as="textarea"
                                placeholder="Background"
                                name="archetype_background"
                                required
                                value={currentArchetype.archetype_background}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </FancyCard>
                  </div>

                </div>

                <div className="row">
                  <FancyCard>
                    <div className="cardOfForm">
                      <div className="col">
                        <div className="row">
                          <div className="col">
                            <FormLabel>Dexterity</FormLabel>
                            <Form.Control
                              className="form-control-sm"
                              type="text"
                              placeholder="Dexterity"
                              name="archetype_dexterity"
                              required
                              value={currentArchetype.archetype_dexterity}
                              onChange={handleInputChange}
                            />
                          </div>

                          <div className="col">
                            <FormLabel>Knowledge</FormLabel>
                            <Form.Control
                              className="form-control-sm"
                              type="text"
                              placeholder="Knowledge"
                              name="archetype_knowledge"
                              required
                              value={currentArchetype.archetype_knowledge}
                              onChange={handleInputChange}
                            />
                          </div>

                          <div className="col">
                            <FormLabel>Mechanical</FormLabel>
                            <Form.Control
                              className="form-control-sm"
                              type="text"
                              placeholder="Mechanical"
                              name="archetype_mechanical"
                              required
                              value={currentArchetype.archetype_mechanical}
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
                              name="archetype_perception"
                              required
                              value={currentArchetype.archetype_perception}
                              onChange={handleInputChange}
                            />
                          </div>

                          <div className="col">
                            <FormLabel>Strength</FormLabel>
                            <Form.Control
                              className="form-control-sm"
                              type="text"
                              placeholder="Strength"
                              name="archetype_strength"
                              required
                              value={currentArchetype.archetype_strength}
                              onChange={handleInputChange}
                            />
                          </div>

                          <div className="col">
                            <FormLabel>Technical</FormLabel>
                            <Form.Control
                              className="form-control-sm"
                              type="text"
                              placeholder="Technical"
                              name="archetype_technical"
                              required
                              value={currentArchetype.archetype_technical}
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
                              name="archetype_force_control"
                              required
                              value={currentArchetype.archetype_force_control}
                              onChange={handleInputChange}
                            />
                          </div>

                          <div className="col">
                            <FormLabel>Force Sense</FormLabel>
                            <Form.Control
                              className="form-control-sm"
                              type="text"
                              placeholder="Sense"
                              name="archetype_force_sense"
                              required
                              value={currentArchetype.archetype_force_sense}
                              onChange={handleInputChange}
                            />
                          </div>

                          <div className="col">
                            <FormLabel>Force Alter</FormLabel>
                            <Form.Control
                              className="form-control-sm"
                              type="text"
                              placeholder="Alter"
                              name="archetype_force_alter"
                              required
                              value={currentArchetype.archetype_force_alter}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </FancyCard>
                  <FancyCard>
                    <div className="col">
                      <div className="cardOfForm">
                        <FormLabel>Objectives</FormLabel>
                        <Form.Control
                          as="textarea"
                          placeholder="Objectives"
                          name="archetype_objectives"
                          required
                          value={currentArchetype.archetype_objectives}
                          onChange={handleInputChange}
                        />

                      </div>

                      <div className="row">
                        <div className="col">
                          <FormLabel>A Quote</FormLabel>
                          <Form.Control
                            className="form-control-sm"
                            type="text"
                            placeholder="A Quote"
                            name="archetype_a_quote"
                            required
                            value={currentArchetype.archetype_a_quote}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <FormLabel>Starting Credits</FormLabel>
                      <Form.Control
                        className="form-control form-control-sm"
                        type="text"
                        placeholder="Starting Credits"
                        name="archetype_starting_credits"
                        required
                        value={currentArchetype.archetype_starting_credits}
                        onChange={handleInputChange}
                      />
                    </div>
                  </FancyCard>
                </div>{/* to this row on line 232ish (TODO get that line correct if not) */}
                <FancyCard>
                  <div className="row">
                    <div className="cardOfForm">

                      <div className="col">
                        <FormLabel>Additional Game Notes</FormLabel>
                        <Form.Control
                          as="textarea"
                          placeholder="Game Notes"
                          name="archetype_game_notes"
                          required
                          value={currentArchetype.archetype_game_notes}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="col">
                        <FormLabel>Source</FormLabel>
                        <Form.Control
                          className="form-control-sm"
                          type="text"
                          placeholder="Source"
                          name="archetype_source"
                          required
                          value={currentArchetype.archetype_source}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                </FancyCard>

              </div>

            </div>
            <div>
              <FancyButton onClick={handleFancyButtonClick}>
                Submit
              </FancyButton>
            </div>
          </div>
        </Form.Group>

      </Form>
    </>
  );
};

ArchetypeForm.propTypes = {
  archetype: PropTypes.shape({
    archetype_name: PropTypes.string,
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
  id: PropTypes.number,
};

ArchetypeForm.defaultProps = {
  archetype: null,
  id: null,
};

export default ArchetypeForm;
