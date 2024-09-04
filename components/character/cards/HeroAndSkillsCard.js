import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { formatDiceCode } from '../../../utils/d6LogicForUI';
import { useArchetypes } from '../../../utils/context/archetypeContext';

const HeroAndSkillsCard = ({
  id,
  image,
  uid,
  NPC,
  userHandle,
  name,
  archetype,
  species,
  homeworld,
  gender,
  age,
  height,
  weight,
  forceSensitive,
  dexterity,
  knowledge,
  mechanical,
  perception,
  strength,
  technical,
  forceControl,
  forceSense,
  forceAlter,
  forcePoints,
  darkSidePoints,
  physicalDescription,
  personality,
  background,
  objectives,
  aQuote,
  credits,
  forceStrength,
  characterSkills,
}) => {
  const { archetypes } = useArchetypes();
  const profession = archetypes.find((job) => job.id === archetype);
  const jobName = profession ? profession.archetype_name : 'Ummmmmm...';
  const router = useRouter();

  const editHero = () => {
    router.push(`/heros/update/${id}`);
  };

  const viewHero = () => {
    router.push(`/heros/${id}`);
  };

  // Group skills by attribute
  const groupedSkills = characterSkills.reduce((acc, skill) => {
    if (!acc[skill.attribute]) acc[skill.attribute] = [];
    acc[skill.attribute].push(skill);
    return acc;
  }, {});

  const renderSkills = (attribute) => groupedSkills[attribute]?.map((skill, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <div key={`${attribute}-${index}-${skill.skill_name}`}>
      <strong>{skill.skill_name}:</strong> {formatDiceCode(skill.skill_code)}
      {skill.specializations.length > 0 && (
      <ul>
        {skill.specializations.map((spec, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={`${spec.specialization_name}-${idx}`}>
            {spec.specialization_name} ({formatDiceCode(spec.specialization_code)})
          </li>
        ))}
      </ul>
      )}
    </div>
  ));

  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      padding: '1rem',
      color: '#4F7942',
      maxWidth: '69rem',
      margin: '1rem',
      overflow: 'auto',
      backgroundColor: '#fff',
    }}
    >
      <div style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        padding: '1rem',
        maxWidth: '69rem',
        margin: '1rem',
        overflow: 'auto',
        backgroundColor: '#fff',
      }}
      >
        {image}
        <h2>{name}</h2>
        {archetype && <p><strong>Archetype:</strong> {jobName}</p>}
        {uid !== null && <div><strong>uid:</strong> {uid}</div>}

        <div style={{ display: 'flex', gap: '10px' }}>
          {species && <p><strong>Species:</strong> {species}</p>}
          {homeworld && <p><strong>Homeworld:</strong> {homeworld}</p>}
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          {age && <p><strong>Age:</strong> {age}</p>}
          {height && <p><strong>Height:</strong> {height}</p>}
          {weight && <p><strong>Weight:</strong> {weight}</p>}
          {gender && <p><strong>Gender:</strong> {gender}</p>}
        </div>
        {forceSensitive && <p><strong>Force Sensitive:</strong> Yes</p>}
        {NPC && <p><strong>is a NPC</strong></p>}
        {userHandle && <p><strong>User Handle:</strong> {userHandle}</p>}

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginTop: '7px',
        }}
        >
          {dexterity !== null && (
            <div>
              <h4><strong>Dexterity:</strong> {formatDiceCode(dexterity)}</h4>
              {renderSkills('Dexterity')}
            </div>
          )}
          {knowledge !== null && (
            <div>
              <h4><strong>Knowledge:</strong> {formatDiceCode(knowledge)}</h4>
              {renderSkills('Knowledge')}
            </div>
          )}
          {mechanical !== null && (
            <div>
              <h4><strong>Mechanical:</strong> {formatDiceCode(mechanical)}</h4>
              {renderSkills('Mechanical')}
            </div>
          )}
          {perception !== null && (
            <div>
              <h4><strong>Perception:</strong> {formatDiceCode(perception)}</h4>
              {renderSkills('Perception')}
            </div>
          )}
          {strength !== null && (
            <div>
              <h4><strong>Strength:</strong> {formatDiceCode(strength)}</h4>
              {renderSkills('Strength')}
            </div>
          )}
          {technical !== null && (
            <div>
              <h4><strong>Technical:</strong> {formatDiceCode(technical)}</h4>
              {renderSkills('Technical')}
            </div>
          )}
          {forceControl !== null && <div><strong>Force Control:</strong> {formatDiceCode(forceControl)}</div>}
          {forceSense !== null && <div><strong>Force Sense:</strong> {formatDiceCode(forceSense)}</div>}
          {forceAlter !== null && <div><strong>Force Alter:</strong> {formatDiceCode(forceAlter)}</div>}
        </div>

        {forcePoints !== null && <p><strong>Force Points:</strong> {forcePoints}</p>}
        {darkSidePoints !== null && <p><strong>Dark Side Points:</strong> {darkSidePoints}</p>}
        {physicalDescription && <p><strong>Physical Description:</strong> {physicalDescription}</p>}
        {personality && <p><strong>Personality:</strong> {personality}</p>}
        {background && <p><strong>Background:</strong> {background}</p>}
        {objectives && <p><strong>Objectives:</strong> {objectives}</p>}
        {aQuote && <p><strong>A Quote:</strong> {aQuote}</p>}
        {credits !== null && <p><strong>Credits:</strong> {credits}</p>}
        {forceStrength !== null && <p><strong>Force Strength:</strong> {forceStrength}</p>}
        <button type="button" onClick={viewHero}>View {id}</button>
        <button type="button" onClick={editHero}>Edit {id}</button>
      </div>
    </div>
  );
};

HeroAndSkillsCard.propTypes = {
  id: PropTypes.number,
  image: PropTypes.node,
  uid: PropTypes.string,
  NPC: PropTypes.bool,
  userHandle: PropTypes.string,
  name: PropTypes.string,
  archetype: PropTypes.number,
  species: PropTypes.string,
  homeworld: PropTypes.string,
  gender: PropTypes.string,
  age: PropTypes.number,
  height: PropTypes.string,
  weight: PropTypes.string,
  forceSensitive: PropTypes.bool,
  dexterity: PropTypes.number,
  knowledge: PropTypes.number,
  mechanical: PropTypes.number,
  perception: PropTypes.number,
  strength: PropTypes.number,
  technical: PropTypes.number,
  forceControl: PropTypes.number,
  forceSense: PropTypes.number,
  forceAlter: PropTypes.number,
  forcePoints: PropTypes.number,
  darkSidePoints: PropTypes.number,
  physicalDescription: PropTypes.string,
  personality: PropTypes.string,
  background: PropTypes.string,
  objectives: PropTypes.string,
  aQuote: PropTypes.string,
  credits: PropTypes.number,
  forceStrength: PropTypes.number,
  characterSkills: PropTypes.arrayOf(PropTypes.shape({
    attribute: PropTypes.string.isRequired,
    skill_name: PropTypes.string.isRequired,
    skill_code: PropTypes.number.isRequired,
    specializations: PropTypes.arrayOf(PropTypes.shape({
      specialization_name: PropTypes.string.isRequired,
      specialization_code: PropTypes.number.isRequired,
    })),
  })),
};

HeroAndSkillsCard.defaultProps = {
  id: 0,
  image: null,
  uid: '',
  NPC: false,
  userHandle: '',
  name: '',
  archetype: 0,
  species: '',
  homeworld: '',
  gender: '',
  age: null,
  height: '',
  weight: '',
  forceSensitive: false,
  dexterity: 0,
  knowledge: 0,
  mechanical: 0,
  perception: 0,
  strength: 0,
  technical: 0,
  forceControl: 0,
  forceSense: 0,
  forceAlter: 0,
  forcePoints: 0,
  darkSidePoints: 0,
  physicalDescription: '',
  personality: '',
  background: '',
  objectives: '',
  aQuote: '',
  credits: 0,
  forceStrength: 0,
  characterSkills: [],
};

export default HeroAndSkillsCard;