import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { formatDiceCode, addOrSubtractPips } from '../../../utils/d6LogicForUI';
import { useSkills } from '../../../utils/context/skillContext';
import { getSingleHero, updateHeroSkills } from '../../../utils/data/heroData';
import FancyCardLong from '../cards/FancyCard copy';
import FancyButton from '../../FancyButton';

const HeroSkillForm = ({ id }) => {
  const { skills } = useSkills();
  const [hero, setHero] = useState(null);
  const [attributeValues, setAttributeValues] = useState({});
  const [skillValues, setSkillValues] = useState({});
  const [skillSpecializations, setSkillSpecializations] = useState({});
  const router = useRouter();
  const formRef = useRef(null);

  useEffect(() => {
    if (id) {
      const fetchHero = async () => {
        try {
          const data = await getSingleHero(id);
          setHero(data);

          setAttributeValues({
            dexterity: data.dexterity,
            knowledge: data.knowledge,
            mechanical: data.mechanical,
            perception: data.perception,
            strength: data.strength,
            technical: data.technical,
          });

          const initialSkillValues = {};
          const specializations = {};
          data.character_skills.forEach((skill) => {
            initialSkillValues[skill.skill_name] = skill.skill_code;
            specializations[skill.skill_name] = skill.specializations || []; // Ensure it's an array to handle cases with Empty/no skills
          });
          setSkillValues(initialSkillValues);
          setSkillSpecializations(specializations);
        } catch (error) {
          console.error('Error fetching hero data:', error);
        }
      };

      fetchHero();
    }
  }, [id]);

  const handleFancyButtonClick = () => {
    if (formRef.current) {
      const event = new Event('submit', { cancelable: true, bubbles: true });
      formRef.current.dispatchEvent(event);
    }
  };

  const handleSkillChange = (e, skillName) => {
    setSkillValues((prevSkillValues) => ({
      ...prevSkillValues,
      [skillName]: e.target.value,
    }));
  };

  const handleSpecializationChange = (e, skillName, specializationIndex) => {
    const newSpecializations = [...(skillSpecializations[skillName] || [])];
    newSpecializations[specializationIndex] = {
      ...newSpecializations[specializationIndex],
      specialization_code: e.target.value,
    };
    setSkillSpecializations((prev) => ({
      ...prev,
      [skillName]: newSpecializations,
    }));
  };

  const handleAttributeChange = (attribute, operator) => {
    setAttributeValues((prevAttributeValues) => {
      const currentValue = prevAttributeValues[attribute] || '0.0';
      const newValue = addOrSubtractPips(currentValue, operator);
      return {
        ...prevAttributeValues,
        [attribute]: newValue,
      };
    });
  };

  // need to implement this for all codes, even input fields??? can i even...
  // const handlePipChange = (skillName, operator) => {
  //   setSkillValues((prevSkillValues) => {
  //     const currentValue = prevSkillValues[skillName] || '0.0';
  //     const newValue = addOrSubtractPips(currentValue, operator);
  //     return {
  //       ...prevSkillValues,
  //       [skillName]: newValue,
  //     };
  //   });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = Object.entries(skillValues).map(([skillName, skillCode]) => ({
      character: id,
      skill_name: skillName,
      skill_code: parseFloat(skillCode),
      specializations: skillSpecializations[skillName]?.map((specialization) => ({
        specialization_name: specialization.specialization_name,
        specialization_code: parseFloat(specialization.specialization_code),
      })) || [],
    }));

    updateHeroSkills(payload)
      .then(() => router.push(`/heros/${id}`))
      .catch((error) => {
        console.error('Error updatng skills of this hero:', error);
      });
  };

  if (!hero) return <div>Loading...</div>;

  const attributes = [...new Set(skills.map((skill) => skill.attribute.toLowerCase()))];

  return (
    <form
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <div className="cardOfForm">
        <div style={{ borderColor: 'rgba(64, 116, 173, 0.35)', backgroundColor: ' rgba(35, 82, 128, 0.35)', borderRadius: '13px' }}>
          <div style={{ padding: '20px', maxWidth: '100%', boxSizing: 'border-box' }}>
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="userName" style={{ fontWeight: 'bold' }}>User:</label>
              <div id="userName">{hero.user ? `User ID: ${hero.user}` : 'Unknown'}</div>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="characterName" style={{ fontWeight: 'bold' }}>Character Name:</label>
              <div id="characterName">{hero.name}</div>
            </div>
            <div>
              {attributes.map((attribute) => (
                <FancyCardLong style={{ display: 'flex' }}>
                  <div key={attribute} style={{ marginBottom: '30px' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '10px',
                      borderBottom: '1px solid #ccc',
                      paddingBottom: '5px',
                    }}
                    >
                      <input
                        type="number"
                        value={attributeValues[attribute] || 0}
                        onChange={(e) => handleAttributeChange(e, attribute)}
                        step="0.1"
                        min="0"
                        max="99.9"
                        style={{ width: '65px', marginRight: '10px' }}
                      />
                      <h3 style={{ margin: 0 }}>{attribute.charAt(0).toUpperCase() + attribute.slice(1)}: {attributeValues[attribute]}</h3>
                    </div>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(16rem, 1fr))',
                      gap: '3px',
                      overflowX: 'auto',
                    }}
                    >
                      {skills.filter((skill) => skill.attribute.toLowerCase() === attribute).map((skill) => (
                        <div
                          key={skill.id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '5px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                          }}
                        >
                          <input
                            type="number"
                            id={`skill-${skill.id}`}
                            name={`skill-${skill.id}`}
                            value={skillValues[skill.skill_name] || ''}
                            onChange={(e) => handleSkillChange(e, skill.skill_name)}
                            step="0.1"
                            min="0"
                            max="99.9"
                            style={{ width: '65px' }}
                          />
                          <label htmlFor={`skill-${skill.id}`} style={{ flex: '1', padding: '5px' }}>{skill.skill_name}:</label>
                          <div style={{ flex: '1', textAlign: 'right', paddingRight: '13px' }}>
                            {formatDiceCode(skillValues[skill.skill_name] || 0)}
                          </div>
                          <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(16rem, 1fr))',
                            gap: '3px',
                            overflowX: 'auto',
                          }}
                          >
                            {/* Specializations */}
                            {(skillSpecializations[skill.skill_name] || []).length > 0 && (
                            <div style={{ marginTop: '10px', paddingLeft: '20px' }}>
                              {skillSpecializations[skill.skill_name].map((specialization, index) => (
                                <div
                                  key={specialization.specialization_name || index}
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '5px',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px',
                                    marginBottom: '5px',
                                  }}
                                >
                                  <input
                                    type="number"
                                    value={specialization.specialization_code || '0.0'}
                                    onChange={(e) => handleSpecializationChange(e, skill.skill_name, index)}
                                    step="0.1"
                                    min="0"
                                    max="99.9"
                                    style={{ width: '65px' }}
                                  />
                                  <span style={{ paddingLeft: '5px' }}>{specialization.specialization_name || `Specialization ${index + 1}`}</span>
                                  <div style={{ flex: '1', textAlign: 'right', paddingRight: '13px' }}>
                                    {formatDiceCode(skillValues[specialization.specialization_code] || 0)}
                                  </div>
                                </div>
                              ))}
                            </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </FancyCardLong>

              ))}

            </div>
            <FancyButton onClick={handleFancyButtonClick}>
              Save
            </FancyButton>
          </div>
        </div>
      </div>
    </form>
  );
};

HeroSkillForm.propTypes = {
  id: PropTypes.number.isRequired,
};

export default HeroSkillForm;
