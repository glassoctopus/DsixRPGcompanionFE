import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import {
  Button, Form, FormLabel, FloatingLabel,
} from 'react-bootstrap';
import {
  createArchtype, updateArchtype,
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

const ArchtypeForm = ({ archtype, id }) => {
  const [currentArchtype, setCurrentArchtype] = useState(initialState);
  const router = useRouter();

  const findAttribute = (attributes, name) => {
    const attribute = attributes.find((attr) => attr.name === name);
    return attribute ? attribute.code : '';
  };

  useEffect(() => {
    if (archtype) {
      // console.log('Fetched Archtype:', archtype); // Add console log to check fetched archtype
      const attributes = archtype.archetype_attributes.map((attr) => ({
        name: attr.attribute_name,
        code: attr.attribute_code,
      }));
      // console.log('Mapped Attributes:', attributes); // Add console log to check mapped attributes

      setCurrentArchtype({
        name: archtype.archetype_name,
        force_sensitive: archtype.archetype_force_sensitive,
        dexterity: findAttribute(attributes, 'Dexterity'),
        knowledge: findAttribute(attributes, 'Knowledge'),
        mechanical: findAttribute(attributes, 'Mechanical'),
        perception: findAttribute(attributes, 'Perception'),
        strength: findAttribute(attributes, 'Strength'),
        technical: findAttribute(attributes, 'Technical'),
        personality: archtype.archetype_personality,
        background: archtype.archetype_background,
        objectives: archtype.archetype_objectives,
        a_quote: archtype.archetype_a_quote,
      });
    }
  }, [id, archtype]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentArchtype((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedArchtype = {
      ...currentArchtype,
      archetype_attributes: archtype.archetype_attributes.map((attr) => attr.id), // Adjust as per your backend requirements
    };

    if (!id) {
      createArchtype(updatedArchtype)
        .then(() => router.push('/archtypes'))
        .catch((error) => {
          console.error('Error creating this archtype:', error);
        });
    } else {
      updateArchtype(updatedArchtype, id)
        .then(() => router.push(`/archtypes/${id}`))
        .catch((error) => {
          console.error('Error updating this archtype:', error);
        });
    }
  };

  const toggleForceSensitive = () => {
    const updatedArchtype = {
      ...currentArchtype,
      force_sensitive: !currentArchtype.force_sensitive,
    };
    setCurrentArchtype(updatedArchtype);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
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
                    value={currentArchtype.dexterity}
                    onChange={handleChange}
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
                    value={currentArchtype.knowledge}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <FormLabel>Mechanical</FormLabel>
                  <Form.Control
                    className="form-control-sm"
                    type="text"
                    placeholder="Mechanical"
                    name="mechanical"
                    required
                    value={currentArchtype.mechanical}
                    onChange={handleChange}
                  />
                </div>

                <div className="col">
                  <FormLabel>Perception</FormLabel>
                  <Form.Control
                    className="form-control-sm"
                    type="text"
                    placeholder="Perception"
                    name="perception"
                    required
                    value={currentArchtype.perception}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <FormLabel>Strength</FormLabel>
                  <Form.Control
                    className="form-control-sm"
                    type="text"
                    placeholder="Strength"
                    name="strength"
                    required
                    value={currentArchtype.strength}
                    onChange={handleChange}
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
                    value={currentArchtype.technical}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <FormLabel>Personality</FormLabel>
                  <FloatingLabel controlId="floatingTextarea" label="Personality" className="mb-3">
                    <Form.Control
                      as="textarea"
                      placeholder="Personality"
                      name="personality"
                      required
                      value={currentArchtype.personality}
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <FormLabel>Background</FormLabel>
                  <FloatingLabel controlId="floatingTextarea" label="Background" className="mb-3">
                    <Form.Control
                      as="textarea"
                      placeholder="Background"
                      name="background"
                      required
                      value={currentArchtype.background}
                      onChange={handleChange}
                    />
                  </FloatingLabel>
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
                      value={currentArchtype.objectives}
                      onChange={handleChange}
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
                    value={currentArchtype.a_quote}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <Button
            variant={currentArchtype.force_sensitive ? 'danger' : 'success'}
            onClick={toggleForceSensitive}
            className="mt-3"
          >
            {currentArchtype.force_sensitive ? 'Deactivate Force' : 'Activate Force'}
          </Button>

          <Button variant="primary" type="submit" className="mt-3">
            Submit
          </Button>
        </Form.Group>
      </Form>
    </>
  );
};

ArchtypeForm.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  archtype: PropTypes.shape({
    archetype_name: PropTypes.string,
    archetype_force_sensitive: PropTypes.bool,
    archetype_attributes: PropTypes.arrayOf(PropTypes.shape({
      attribute_name: PropTypes.string,
      attribute_code: PropTypes.string,
    })),
    archetype_personality: PropTypes.string,
    archetype_background: PropTypes.string,
    archetype_objectives: PropTypes.string,
    archetype_a_quote: PropTypes.string,
  }),
};

ArchtypeForm.defaultProps = {
  id: null,
  archtype: null,
};

export default ArchtypeForm;
