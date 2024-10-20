import React from 'react';
import PropTypes from 'prop-types';
// import FancyButton from '../../FancyButton';

const SpecialAbilityCard = ({
  attribute,
  abilityName,
  timeTaken,
  isAReaction,
  forceSkill,
  speciesSpecific,
  specialAbilityNotes,
  modifiers,
  skillUseNotes,
  skillGameNotes,
  skillCode,
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
    <h2>{abilityName}</h2>
    {attribute && <p><strong>Attribute:</strong> {attribute}</p>}
    {timeTaken && <p><strong>Time Taken:</strong> {timeTaken}</p>}
    {isAReaction && <p><strong>Reaction Skill:</strong> Yes</p>}
    {forceSkill && <p><strong>Force Skill:</strong> Yes</p>}
    {speciesSpecific && <p><strong>Species Specific:</strong> {speciesSpecific.name}</p>}
    {skillCode && <p><strong>Skill Code:</strong> {skillCode}</p>}
    {specialAbilityNotes && <p><strong>Special Ability Notes:</strong> {specialAbilityNotes}</p>}
    {modifiers && <p><strong>Modifiers:</strong> {modifiers}</p>}
    {skillUseNotes && <p><strong>Use Notes:</strong> {skillUseNotes}</p>}
    {skillGameNotes && <p><strong>Game Notes:</strong> {skillGameNotes}</p>}
  </div>
);

SpecialAbilityCard.propTypes = {
  attribute: PropTypes.string.isRequired,
  abilityName: PropTypes.string.isRequired,
  timeTaken: PropTypes.string,
  isAReaction: PropTypes.bool,
  forceSkill: PropTypes.bool,
  speciesSpecific: PropTypes.bool,
  specialAbilityNotes: PropTypes.string,
  modifiers: PropTypes.string,
  skillUseNotes: PropTypes.string,
  skillGameNotes: PropTypes.string,
  skillCode: PropTypes.number.isRequired,
};

SpecialAbilityCard.defaultProps = {
  timeTaken: '',
  isAReaction: false,
  forceSkill: false,
  speciesSpecific: null,
  specialAbilityNotes: '',
  modifiers: '',
  skillUseNotes: '',
  skillGameNotes: '',
};

export default SpecialAbilityCard;
