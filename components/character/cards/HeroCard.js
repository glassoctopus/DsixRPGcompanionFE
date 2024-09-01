import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { formatDiceCode } from '../../../utils/d6LogicForUI';
import { useArchetypes } from '../../../utils/context/archetypeContext';

const HeroCard = ({
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
}) => {
  const { archetypes } = useArchetypes();
  const profession = archetypes.find((job) => job.id === archetype);
  const jobName = profession ? profession.archetype_name : 'Ummmmmm...';
  const router = useRouter();

  const editHero = () => {
    router.push(`/heros/update/${id}`);
  };

  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      padding: '1rem',
      maxWidth: '33rem',
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
        maxWidth: '33rem',
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
          {dexterity !== null && <div><strong>Dexterity:</strong> {formatDiceCode(dexterity)}</div>}
          {knowledge !== null && <div><strong>Knowledge:</strong> {formatDiceCode(knowledge)}</div>}
          {mechanical !== null && <div><strong>Mechanical:</strong> {formatDiceCode(mechanical)}</div>}
          {perception !== null && <div><strong>Perception:</strong> {formatDiceCode(perception)}</div>}
          {strength !== null && <div><strong>Strength:</strong> {formatDiceCode(strength)}</div>}
          {technical !== null && <div><strong>Technical:</strong> {formatDiceCode(technical)}</div>}
          {forceControl !== null && <div><strong>Force Control:</strong> {formatDiceCode(forceControl)}</div>}
          {forceSense !== null && <div><strong>Force Sense:</strong> {formatDiceCode(forceSense)}</div>}
          {forceAlter !== null && <div><strong>Force Alter:</strong> {formatDiceCode(forceAlter)}</div>}
        </div>
        {forcePoints !== null && (
        <p><strong>Force Points:</strong> {forcePoints}</p>
        )}
        {darkSidePoints !== null && (
        <p><strong>Dark Side Points:</strong> {darkSidePoints}</p>
        )}
        {physicalDescription && <p><strong>Physical Description:</strong> {physicalDescription}</p>}
        {personality && <p><strong>Personality:</strong> {personality}</p>}
        {background && <p><strong>Background:</strong> {background}</p>}
        {objectives && <p><strong>Objectives:</strong> {objectives}</p>}
        {aQuote && <p><strong>Quote:</strong> &quot;{aQuote}&quot;</p>}
        {credits !== null && <p><strong>Credits:</strong> {credits}</p>}
        {forceStrength !== null && <p><strong>Force Strength:</strong> {forceStrength}</p>}
      </div>
      <div>
        <button
          onClick={editHero}
          type="button"
          style={{
            display: 'inline-block',
            backgroundColor: '#F5F5DC',
            color: '#003366',
            padding: '10px 20px',
            borderRadius: '5px',
            border: 'none',
            fontSize: '16px',
            textAlign: 'center',
            cursor: 'pointer',
          }}
        >
          EDIT {id}
        </button>
      </div>
    </div>
  );
};

HeroCard.propTypes = {
  id: PropTypes.number,
  image: PropTypes.string,
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
};

HeroCard.defaultProps = {
  id: 0,
  image: '',
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
  dexterity: null,
  knowledge: null,
  mechanical: null,
  perception: null,
  strength: null,
  technical: null,
  forceControl: null,
  forceSense: null,
  forceAlter: null,
  forcePoints: null,
  darkSidePoints: null,
  physicalDescription: '',
  personality: '',
  background: '',
  objectives: '',
  aQuote: '',
  credits: null,
  forceStrength: null,
};

export default HeroCard;
