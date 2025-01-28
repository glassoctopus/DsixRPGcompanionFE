import PropTypes from 'prop-types';
import React from 'react';
import { Card } from 'react-bootstrap';

const SkillCard = ({
  id,
  attribute,
  skillName,
  timeTaken,
  isAReaction,
  forceSkill,
  speciesSpecific,
  speciesName,
  specializations,
  modifiers,
  skillUseNotes,
  skillGameNotes,
}) => (
  <Card className="text-center" style={{ width: '420px', margin: '7px' }}>
    <Card.Header>{skillName}</Card.Header>
    <Card.Body style={{ backgroundColor: 'rgba(35, 82, 128, 0.35)' }}>
      <Card.Text>Attribute: {attribute}</Card.Text>
      <Card.Text>Time Taken: {timeTaken || 'N/A'}</Card.Text>
      <Card.Text>Is a Reaction: {isAReaction ? 'Yes' : 'No'}</Card.Text>
      {forceSkill && <Card.Text>Force Skill: {forceSkill ? 'Yes' : 'No'}</Card.Text>}
      {speciesSpecific && <Card.Text>Is a Species Skill</Card.Text>}
      {speciesName && <Card.Text>{speciesName}</Card.Text>}
      {specializations && <Card.Text>{specializations}</Card.Text>}
      {modifiers && <Card.Text>{modifiers}</Card.Text>}
      <Card.Text>{skillUseNotes ? `Skill Use Notes: ${skillUseNotes}` : 'No use notes'}</Card.Text>
      <Card.Text>{skillGameNotes ? `Skill Game Notes: ${skillGameNotes}` : 'No game notes'}</Card.Text>
    </Card.Body>
    <Card.Footer style={{ backgroundColor: 'rgba(65, 116, 173, 0.95)' }} className="text-muted">...- {id} -...</Card.Footer>
  </Card>
);

SkillCard.propTypes = {
  id: PropTypes.number.isRequired,
  attribute: PropTypes.string.isRequired,
  skillName: PropTypes.string.isRequired,
  timeTaken: PropTypes.string,
  isAReaction: PropTypes.bool,
  forceSkill: PropTypes.bool,
  speciesSpecific: PropTypes.bool,
  speciesName: PropTypes.string,
  specializations: PropTypes.string,
  modifiers: PropTypes.string,
  skillUseNotes: PropTypes.string,
  skillGameNotes: PropTypes.string,
};

SkillCard.defaultProps = {
  timeTaken: '',
  isAReaction: false,
  forceSkill: false,
  speciesSpecific: false,
  speciesName: '',
  specializations: '',
  modifiers: '',
  skillUseNotes: '',
  skillGameNotes: '',
};

export default SkillCard;
