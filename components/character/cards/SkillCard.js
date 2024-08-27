import PropTypes from 'prop-types';
import React from 'react';
import Link from 'next/link';
import { Card, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';

const SkillCard = ({
  id,
  attribute,
  skillName,
  timeTaken,
  isAReaction,
  forceSkill,
  specializations,
  modifiers,
  skillUseNotes,
  skillGameNotes,
  skillCode,
}) => {
  const router = useRouter();

  const deleteThisSkill = () => {
    if (window.confirm(`Delete ${skillName}`)) {
      // deleteSkill(id);
      window.location.reload();
      router.push('/skills');
    }
  };

  return (
    <Card className="text-center" style={{ width: '420px', margin: '7px' }}>
      <Card.Header>{skillName}</Card.Header>
      <Card.Body>
        <Card.Text>Attribute: {attribute}</Card.Text>
        <Card.Text>Time Taken: {timeTaken || 'N/A'}</Card.Text>
        <Card.Text>Is a Reaction: {isAReaction ? 'Yes' : 'No'}</Card.Text>
        <Card.Text>Force Skill: {forceSkill ? 'Yes' : 'No'}</Card.Text>
        <Card.Text>{specializations ? `Specializations: ${specializations}` : 'No specializations'}</Card.Text>
        <Card.Text>{modifiers ? `Modifiers: ${modifiers}` : 'No modifiers'}</Card.Text>
        <Card.Text>{skillUseNotes ? `Skill Use Notes: ${skillUseNotes}` : 'No use notes'}</Card.Text>
        <Card.Text>{skillGameNotes ? `Skill Game Notes: ${skillGameNotes}` : 'No game notes'}</Card.Text>
        <Card.Text>Skill Code: {skillCode !== null ? skillCode : 'N/A'}</Card.Text>
        <Link href={`/skills/${id}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        <Link href={`/skills/update/${id}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisSkill} className="m-2">
          DELETE
        </Button>
      </Card.Body>
      <Card.Footer className="text-muted">Skill Code: {skillCode !== null ? skillCode : 'N/A'}</Card.Footer>
    </Card>
  );
};

SkillCard.propTypes = {
  id: PropTypes.number.isRequired,
  attribute: PropTypes.string.isRequired,
  skillName: PropTypes.string.isRequired,
  timeTaken: PropTypes.string,
  isAReaction: PropTypes.bool,
  forceSkill: PropTypes.bool,
  specializations: PropTypes.string,
  modifiers: PropTypes.string,
  skillUseNotes: PropTypes.string,
  skillGameNotes: PropTypes.string,
  skillCode: PropTypes.number,
};

SkillCard.defaultProps = {
  timeTaken: '',
  isAReaction: false,
  forceSkill: false,
  specializations: '',
  modifiers: '',
  skillUseNotes: '',
  skillGameNotes: '',
  skillCode: null,
};

export default SkillCard;
