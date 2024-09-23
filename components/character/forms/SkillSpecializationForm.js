import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SkillFormPopup = ({ skillData, onClose }) => {
  const [formData, setFormData] = useState(skillData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.warn('Submitting:', formData);
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Edit Skill</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="skill_name">Skill Name:</label>
            <input
              type="text"
              id="skill_name"
              name="skill_name"
              value={formData.skill_name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="skill_code">Skill Code:</label>
            <input
              type="number"
              id="skill_code"
              name="skill_code"
              value={formData.skill_code}
              onChange={handleChange}
              required
              step="0.1"
              min="0"
            />
          </div>
          <div>
            <label htmlFor="attribute">Attribute:</label>
            <input
              type="text"
              id="attribute"
              name="attribute"
              value={formData.attribute}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <h4>Specializations:</h4>
            {formData.specializations.map((specialization, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={index}>
                <label htmlFor={`specialization_name_${index}`}>Specialization Name:</label>
                <input
                  type="text"
                  id={`specialization_name_${index}`}
                  name={`specialization_name_${index}`}
                  value={specialization.specialization_name}
                  onChange={(e) => {
                    const updatedSpecializations = [...formData.specializations];
                    updatedSpecializations[index].specialization_name = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      specializations: updatedSpecializations,
                    }));
                  }}
                />
                <label htmlFor={`specialization_code_${index}`}>Specialization Code:</label>
                <input
                  type="number"
                  id={`specialization_code_${index}`}
                  name={`specialization_code_${index}`}
                  value={specialization.specialization_code}
                  onChange={(e) => {
                    const updatedSpecializations = [...formData.specializations];
                    updatedSpecializations[index].specialization_code = parseFloat(e.target.value);
                    setFormData((prev) => ({
                      ...prev,
                      specializations: updatedSpecializations,
                    }));
                  }}
                  step="0.1"
                  min="0"
                />
              </div>
            ))}
          </div>
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

SkillFormPopup.propTypes = {
  skillData: PropTypes.shape({
    character: PropTypes.number.isRequired,
    skill_name: PropTypes.string.isRequired,
    skill_code: PropTypes.number.isRequired,
    attribute: PropTypes.string.isRequired,
    specializations: PropTypes.arrayOf(
      PropTypes.shape({
        specialization_name: PropTypes.string.isRequired,
        specialization_code: PropTypes.number.isRequired,
      }),
    ).isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SkillFormPopup;
