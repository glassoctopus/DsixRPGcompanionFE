import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { formatDiceCode, addOrSubtractPips } from '../../../utils/d6LogicForUI';
import { useAuth } from '../../../utils/context/authContext';
import { useSkills } from '../../../utils/context/skillContext';
import { getSingleHero, updateHeroSkills, createHeroSkills } from '../../../utils/data/heroData';
import SkillSpecializationForm from './SkillSpecializationForm';
import FancyCardLong from '../cards/FancyCardLong';
import FancyButton from '../../FancyButton';

const HeroSkillForm = ({ id }) => {
  const { user } = useAuth();
  const { skills } = useSkills();
  const [hero, setHero] = useState(null);
  const [heroSkills, setHeroSkills] = useState({});
  const [attributeValues, setAttributeValues] = useState({});
  const [skillFormValues, setSkillFormValues] = useState({});
  const [skillSpecializations, setSkillSpecializations] = useState({});
  const [skillToForm, setSkillToForm] = useState({});
  const [showSpecializationForm, setShowSpecializationForm] = useState(false);
  const router = useRouter();
  const formRef = useRef(null);

  useEffect(() => {
    if (id && !hero) {
      const fetchHero = async () => {
        try {
          const data = await getSingleHero(id);
          if (!hero || (hero.id !== data.id)) {
            setHero(data);
          }

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
            const { attribute } = skill;
            const attributeLowerCase = attribute.toLowerCase();
            initialSkillValues[skill.skill_name] = skill.skill_code < data[attributeLowerCase] ? data[attributeLowerCase] : skill.skill_code;
            specializations[skill.skill_name] = skill.specializations || [];
          });

          setHeroSkills(initialSkillValues);
          setSkillFormValues(initialSkillValues);
          setSkillSpecializations(specializations);
        } catch (error) {
          console.error('Error fetching hero data:', error);
        }
      };
      fetchHero();
    }
  }, [id, hero]);

  const handleFancyButtonClick = () => {
    if (formRef.current) {
      const event = new Event('submit', { cancelable: true, bubbles: true });
      formRef.current.dispatchEvent(event);
    }
  };

  const handleSkillChange = (e, skillName, attribute) => {
    let operator = '';
    const attributeLowerCase = attribute.toLowerCase();
    setSkillFormValues((prevSkillFormValues) => {
      if (e.target.value < hero[attributeLowerCase]) {
        return {
          ...prevSkillFormValues,
          [skillName]: hero[attributeLowerCase],
        };
      }
      const currentValue = prevSkillFormValues[skillName] || '0.0';
      if (currentValue > e.target.value) { operator = '-'; } else { operator = '+'; }
      const newValue = addOrSubtractPips(currentValue, operator);
      return {
        ...prevSkillFormValues,
        [skillName]: newValue,
      };
    });
  };

  const handleSpecializationChange = (e, skillName, specializationIndex) => {
    let operator = '';
    const newSpecializations = [...(skillSpecializations[skillName] || [])];
    newSpecializations[specializationIndex] = {
      ...newSpecializations[specializationIndex],
      specialization_code: e.target.value,
    };
    setSkillSpecializations((prev) => {
      const updatedSpecializations = [...prev[skillName]];
      const currentValue = prev[skillName][specializationIndex].specialization_code;
      if (currentValue > e.target.value) { operator = '-'; } else { operator = '+'; }
      const newValue = addOrSubtractPips(currentValue, operator);
      updatedSpecializations[specializationIndex] = {
        ...prev[skillName][specializationIndex],
        specialization_code: newValue,
      };
      return {
        ...prev,
        [skillName]: updatedSpecializations,
      };
    });
  };

  const handleAttributeChange = (e, attribute) => {
    let operator = '';
    setAttributeValues((prevAttributeValues) => {
      const currentValue = prevAttributeValues[attribute] || '0.0';
      if (currentValue > e.target.value) { operator = '-'; } else { operator = '+'; }

      const newValue = addOrSubtractPips(currentValue, operator);
      return {
        ...prevAttributeValues,
        [attribute]: newValue,
      };
    });
  };

  const openSpecializationForm = (skill) => {
    const skillAttribute = skill.attribute.toLowerCase();
    const getCode = skillFormValues[skill.skill_name] ? skillFormValues[skill.skill_name] : hero[skillAttribute];
    const dieCode = getCode < hero[skillAttribute] ? hero[skillAttribute] : getCode;
    setSkillToForm({
      character: id,
      skill_name: skill.skill_name,
      skill_code: dieCode,
      attribute: skill.attribute,
      specializations: skillSpecializations[skill.skill_name],
      heroAttributeOfSkillCode: hero[skillAttribute],
    });
    setShowSpecializationForm(true);
  };

  const addSkillSpecialization = () => {
    setShowSpecializationForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingSkills = [];
    const newSkills = [];

    Object.keys(skillFormValues).forEach((skill) => {
      if (Object.hasOwn(heroSkills, skill)) {
        existingSkills[skill] = skillFormValues[skill];
      } else {
        newSkills[skill] = skillFormValues[skill];
      }
    });

    const payloadUpdate = Object.entries(existingSkills).map(([skillName, skillCode]) => ({
      character: id,
      skill_name: skillName,
      skill_code: parseFloat(skillCode),
      specializations: skillSpecializations[skillName]?.map((specialization) => ({
        specialization_name: specialization.specialization_name,
        specialization_code: parseFloat(specialization.specialization_code),
      })) || [],
    }));

    if (payloadUpdate.length > 0) {
      updateHeroSkills(payloadUpdate)
        .then(() => router.push(`/heros/${id}`))
        .catch((error) => {
          console.error('Error updatng skills of this hero:', error);
        });
    }

    const payloadNew = Object.entries(newSkills).map(([skillName, skillCode]) => ({
      character: id,
      skill_name: skillName,
      skill_code: parseFloat(skillCode),
      specializations: skillSpecializations[skillName]?.map((specialization) => ({
        specialization_name: specialization.specialization_name,
        specialization_code: parseFloat(specialization.specialization_code),
      })) || [],
    }));

    if (payloadNew.length > 0) {
      createHeroSkills(payloadNew)
        .then(() => router.push(`/heros/${id}`))
        .catch((error) => {
          console.error('Error updatng skills of this hero:', error);
        });
    }
  };

  if (!hero) return <div>Loading...</div>;

  const attributes = [...new Set(skills.map((skill) => skill.attribute.toLowerCase()))];

  return (
    <div>
      {showSpecializationForm ? <SkillSpecializationForm skillData={skillToForm} onClose={() => addSkillSpecialization()} /> : <p>Click the button to open the form.</p>}
      <form
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <div className="cardOfForm">
          <div style={{ borderColor: 'rgba(64, 116, 173, 0.35)', backgroundColor: ' rgba(35, 82, 128, 0.35)', borderRadius: '13px' }}>
            <div style={{ padding: '20px', maxWidth: '100%', boxSizing: 'border-box' }}>
              <div style={{ marginBottom: '15px' }}>
                <h2 htmlFor="characterName" style={{ fontWeight: 'bold' }}>Character Name: {hero.name}</h2>
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label htmlFor="userName" style={{ fontWeight: 'bold' }}>User {hero.user ? ` ID: ${hero.user}` : 'Unknown'}</label>
              </div>
              <div>
                {attributes.map((attribute) => (
                  <FancyCardLong key={attribute} style={{ display: 'flex' }}>
                    <div style={{ marginBottom: '30px' }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '10px',
                        borderBottom: '1px solid #ccc',
                        paddingBottom: '5px',
                      }}
                      >
                        {user && (user.admin || user.game_master) ? (
                          <input
                            type="number"
                            value={attributeValues[attribute] || 0}
                            onChange={(e) => handleAttributeChange(e, attribute)}
                            step="0.1"
                            min="0"
                            max="99.9"
                            style={{ width: '65px', marginRight: '10px' }}
                          />
                        ) : ('')}
                        <h3 style={{ margin: 0 }}>{attribute.charAt(0).toUpperCase() + attribute.slice(1)}: {formatDiceCode(attributeValues[attribute])}</h3>
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
                              flexDirection: 'column', // Stack skill and specializations
                              padding: '5px',
                              border: '1px solid #ddd',
                              borderRadius: '4px',
                            }}
                          >
                            {/* Main Skill Input */}
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              paddingBottom: '5px',
                            }}
                            >
                              <button type="button" className="siteButton" onClick={() => openSpecializationForm(skill)}>.</button>
                              <input
                                type="number"
                                id={`skill-${skill.id}`}
                                name={`skill-${skill.id}`}
                                value={skillFormValues[skill.skill_name] || ''}
                                onChange={(e) => handleSkillChange(e, skill.skill_name, skill.attribute)}
                                step="0.1"
                                min="0"
                                max="99.9"
                                style={{ width: '65px', marginRight: '13px' }}
                              />
                              <label htmlFor={`skill-${skill.id}`} style={{ flex: '1', padding: '5px' }}>{skill.skill_name}:</label>
                              <div style={{ flex: '1', textAlign: 'right', paddingRight: '13px' }}>
                                {formatDiceCode(skillFormValues[skill.skill_name] || 0)}
                              </div>
                            </div>

                            {/* Specializations */}
                            {skillSpecializations[skill.skill_name]?.length > 0 && (
                            <div style={{ paddingLeft: '15px', marginTop: '5px' }}>
                              {skillSpecializations[skill.skill_name].map((specialization, index) => (
                                <div
                                  key={specialization.specialization_name || index}
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '5px',
                                    border: '1px solid rgb(255, 215, 0)', // Gold border for specializations
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
                                    style={{ width: '65px', marginRight: '10px' }}
                                  />
                                  <span style={{ paddingLeft: '5px' }}>{specialization.specialization_name || `Specialization ${index + 1}`}</span>
                                  <div style={{ flex: '1', textAlign: 'right', paddingRight: '13px' }}>
                                    {formatDiceCode(specialization.specialization_code || 0)}
                                  </div>
                                </div>
                              ))}
                            </div>
                            )}
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
    </div>
  );
};

HeroSkillForm.propTypes = {
  id: PropTypes.number.isRequired,
};

export default HeroSkillForm;
