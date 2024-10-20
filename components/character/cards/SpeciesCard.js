import React from 'react';
import PropTypes from 'prop-types';
// import FancyButton from '../../FancyButton';

const SpeciesCard = ({
  id,
  //   image,
  name,
  speciesName,
  speciesHomeworld,
  speciesAverageHeight,
  speciesAverageWeight,
  speciesForceSensitive,
  speciesDexterityModifier,
  speciesKnowledge,
  speciesMechanical,
  speciesPerception,
  speciesStrength,
  speciesTechnical,
  speciesForceControl,
  speciesForceSense,
  speciesForceAlter,
  speciesForcePoints,
  speciesDarkSidePoints,
  speciesPhysicalDescription,
  speciesPersonality,
  speciesBackground,
  speciesForceStrength,
  playable,
}) => (
  <div style={{
    border: '1px solid #ddd',
    borderRadius: '13px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    padding: '1rem',
    maxWidth: '33rem',
    margin: '1rem',
    overflow: 'auto',
    backgroundColor: 'rgb(214, 223, 232)',
  }}
  >
    {/* {image && <img src={image} alt={`${name} image`} />} */}
    <h2>{speciesName || name}</h2>
    {id}
    {playable && <p><strong>Playable:</strong> Yes</p>}
    {speciesHomeworld && <p><strong>Homeworld:</strong> {speciesHomeworld}</p>}
    {speciesAverageHeight && <p><strong>Average Height:</strong> {speciesAverageHeight}</p>}
    {speciesAverageWeight && <p><strong>Average Weight:</strong> {speciesAverageWeight}</p>}
    {speciesForceSensitive && <p><strong>Force Sensitive:</strong> Yes</p>}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
      {speciesDexterityModifier && <p><strong>Dexterity Modifier:</strong> {speciesDexterityModifier}</p>}
      {speciesKnowledge && <p><strong>Knowledge:</strong> {speciesKnowledge}</p>}
      {speciesMechanical && <p><strong>Mechanical:</strong> {speciesMechanical}</p>}
      {speciesPerception && <p><strong>Perception:</strong> {speciesPerception}</p>}
      {speciesStrength && <p><strong>Strength:</strong> {speciesStrength}</p>}
      {speciesTechnical && <p><strong>Technical:</strong> {speciesTechnical}</p>}
    </div>
    {speciesPhysicalDescription && <p><strong>Physical Description:</strong> {speciesPhysicalDescription}</p>}
    {speciesPersonality && <p><strong>Personality:</strong> {speciesPersonality}</p>}
    {speciesBackground && <p><strong>Background:</strong> {speciesBackground}</p>}
    {speciesForceControl && <p><strong>Force Control:</strong> {speciesForceControl}</p>}
    {speciesForceSense && <p><strong>Force Sense:</strong> {speciesForceSense}</p>}
    {speciesForceAlter && <p><strong>Force Alter:</strong> {speciesForceAlter}</p>}
    {speciesForcePoints && <p><strong>Force Points:</strong> {speciesForcePoints}</p>}
    {speciesDarkSidePoints && <p><strong>Dark Side Points:</strong> {speciesDarkSidePoints}</p>}
    {speciesForceStrength && <p><strong>Force Strength:</strong> {speciesForceStrength}</p>}
  </div>
);

SpeciesCard.propTypes = {
  id: PropTypes.number.isRequired,
  //   image: PropTypes.string,
  name: PropTypes.string,
  speciesName: PropTypes.string,
  speciesHomeworld: PropTypes.string,
  speciesAverageHeight: PropTypes.string,
  speciesAverageWeight: PropTypes.string,
  speciesForceSensitive: PropTypes.bool,
  speciesDexterityModifier: PropTypes.number,
  speciesKnowledge: PropTypes.number,
  speciesMechanical: PropTypes.number,
  speciesPerception: PropTypes.number,
  speciesStrength: PropTypes.number,
  speciesTechnical: PropTypes.number,
  speciesForceControl: PropTypes.number,
  speciesForceSense: PropTypes.number,
  speciesForceAlter: PropTypes.number,
  speciesForcePoints: PropTypes.number,
  speciesDarkSidePoints: PropTypes.number,
  speciesPhysicalDescription: PropTypes.string,
  speciesPersonality: PropTypes.string,
  speciesBackground: PropTypes.string,
  speciesForceStrength: PropTypes.number,
  playable: PropTypes.bool,
};

SpeciesCard.defaultProps = {
//   image: '',
  name: '',
  speciesName: '',
  speciesHomeworld: '',
  speciesAverageHeight: '',
  speciesAverageWeight: '',
  speciesForceSensitive: false,
  speciesDexterityModifier: null,
  speciesKnowledge: null,
  speciesMechanical: null,
  speciesPerception: null,
  speciesStrength: null,
  speciesTechnical: null,
  speciesForceControl: null,
  speciesForceSense: null,
  speciesForceAlter: null,
  speciesForcePoints: null,
  speciesDarkSidePoints: null,
  speciesPhysicalDescription: '',
  speciesPersonality: '',
  speciesBackground: '',
  speciesForceStrength: null,
  playable: false,
};

export default SpeciesCard;
