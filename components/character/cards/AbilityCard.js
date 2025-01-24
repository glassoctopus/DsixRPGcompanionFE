import React from 'react';
import PropTypes from 'prop-types';
// import FancyButton from '../../FancyButton';

const AbilityCard = ({
  attribute,
  abilityName,
  timeTaken,
  isAReaction,
  forceAbility,
  speciesSpecific,
  AbilityNotes,
  modifiers,
  abilityUseNotes,
  abilityGameNotes,
  abilityCode,
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
    {isAReaction && <p><strong>Reaction ability:</strong> Yes</p>}
    {forceAbility && <p><strong>Force ability:</strong> Yes</p>}
    {speciesSpecific && <p><strong>Species Specific:</strong> {speciesSpecific.name}</p>}
    {abilityCode && <p><strong>ability Code:</strong> {abilityCode}</p>}
    {AbilityNotes && <p><strong> Ability Notes:</strong> {AbilityNotes}</p>}
    {modifiers && <p><strong>Modifiers:</strong> {modifiers}</p>}
    {abilityUseNotes && <p><strong>Use Notes:</strong> {abilityUseNotes}</p>}
    {abilityGameNotes && <p><strong>Game Notes:</strong> {abilityGameNotes}</p>}
  </div>
);

AbilityCard.propTypes = {
  attribute: PropTypes.string.isRequired,
  abilityName: PropTypes.string.isRequired,
  timeTaken: PropTypes.string,
  isAReaction: PropTypes.bool,
  forceAbility: PropTypes.bool,
  speciesSpecific: PropTypes.bool,
  AbilityNotes: PropTypes.string,
  modifiers: PropTypes.string,
  abilityUseNotes: PropTypes.string,
  abilityGameNotes: PropTypes.string,
  abilityCode: PropTypes.number.isRequired,
};

AbilityCard.defaultProps = {
  timeTaken: '',
  isAReaction: false,
  forceAbility: false,
  speciesSpecific: null,
  AbilityNotes: '',
  modifiers: '',
  abilityUseNotes: '',
  abilityGameNotes: '',
};

export default AbilityCard;
