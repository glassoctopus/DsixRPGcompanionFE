import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import FancyCardLong from '../cards/FancyCardLong';
import FancyButton from '../../FancyButton';
import { formatDiceCode, addOrSubtractPips } from '../../../utils/d6LogicForUI';
import { updateHeroSkills } from '../../../utils/data/heroData';

const SkillFormPopup = ({ skillData, onClose }) => {
  // eslint-disable-next-line no-unused-vars
  const [formData, setFormData] = useState({
    skill_name: skillData.skill_name || '',
    skill_code: skillData.skill_code || 0.0,
    attribute: skillData.attribute || '',
    heroAttributeOfSkillCode: skillData.heroAttributeOfSkillCode || 0.0,
    specializations: skillData.specializations || [],
  });
  const [newSpecialization, setNewSpecialization] = useState({
    specialization_name: '',
    specialization_code: skillData.skill_code,
  });
  const formRef = useRef(null);

  const handleSpecializationNameChange = (e) => {
    const { name, value } = e.target;
    setNewSpecialization((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSpecializationcodeChange = (e) => {
    let operator = '';
    const { name, value } = e.target;
    setNewSpecialization((prev) => {
      if (value < skillData.skill_code) {
        return {
          ...prev,
          [name]: skillData.skill_code,
        };
      }
      const currentValue = prev[name];
      if (currentValue > e.target.value) { operator = '-'; } else { operator = '+'; }
      const newValue = addOrSubtractPips(currentValue, operator);
      return {
        ...prev,
        [name]: newValue,
      };
    });
  };

  // Handler for submitting the form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (newSpecialization.specialization_name.trim() !== '') {
      // Add new specialization to the list
      const payload = {
        character: 1,
        skill_name: skillData.skill_name,
        skill_code: skillData.skill_code,
        attribute: skillData.attribute,
        specializations: [
          {
            specialization_name: newSpecialization.specialization_name,
            specialization_code: parseFloat(newSpecialization.specialization_code),
          },
        ],
      };
      updateHeroSkills(payload);
    }
  };

  const handleFancyButtonClick = () => {
    if (formRef.current) {
      const event = new Event('submit', { cancelable: true, bubbles: true });
      formRef.current.dispatchEvent(event);
    }
  };

  return (
    <FancyCardLong>
      <div className="cardOfForm">
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Add Skill Specialization</h3>
            <form
              onSubmit={handleSubmit}
              ref={formRef}
            >
              <div>
                <h4>Skill Name: {formData.skill_name}</h4>
              </div>
              <div>
                <h4>Skill Code: {formatDiceCode(formData.skill_code)}</h4>
              </div>
              <div>
                <h4>Attribute: {skillData.attribute} {formatDiceCode(skillData.heroAttributeOfSkillCode)}</h4>
              </div>

              {/* Inputs for adding new specialization */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '13px',
                  margin: '13px',
                }}
              >
                <label htmlFor="specialization_name">New Specialization Name:</label>
                <input
                  type="text"
                  id="specialization_name"
                  name="specialization_name"
                  value={newSpecialization.specialization_name}
                  onChange={handleSpecializationNameChange}
                  required
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '13px',
                  margin: '13px',
                }}
              >
                <label htmlFor="specialization_code">New Specialization Code:</label>
                <input
                  type="number"
                  id="specialization_code"
                  name="specialization_code"
                  value={newSpecialization.specialization_code}
                  onChange={handleSpecializationcodeChange}
                  step="0.1"
                  min="0"
                  style={{ width: '69px', marginRight: '13px' }}
                  required
                />
              </div>

              <FancyButton onClick={handleFancyButtonClick} style={{ marginRight: '13px' }}>
                Add Specialization
              </FancyButton>
              <FancyButton onClick={onClose} style={{ marginRight: '13px' }}>Cancel</FancyButton>
            </form>

            {/* Display existing specializations if any */}
            <div>
              <h4>Existing Specializations:</h4>
              {formData.specializations.length > 0 ? (
                formData.specializations.map((specialization) => (
                  <div key={`${specialization.specialization_name}--${formData.attribute}`}>
                    <p>
                      {specialization.specialization_name} (Code: {specialization.specialization_code})
                    </p>
                  </div>
                ))
              ) : (
                <p>No specializations available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </FancyCardLong>
  );
};

SkillFormPopup.propTypes = {
  skillData: PropTypes.shape({
    character: PropTypes.number.isRequired,
    skill_name: PropTypes.string.isRequired,
    skill_code: PropTypes.number.isRequired,
    attribute: PropTypes.string.isRequired,
    heroAttributeOfSkillCode: PropTypes.number.isRequired,
    specializations: PropTypes.arrayOf(
      PropTypes.shape({
        specialization_name: PropTypes.string,
        specialization_code: PropTypes.number,
      }),
    ),
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SkillFormPopup;
