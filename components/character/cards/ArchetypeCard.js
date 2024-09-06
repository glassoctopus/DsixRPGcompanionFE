import PropTypes from 'prop-types';
import React from 'react';
import Link from 'next/link';
import { Card, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { formatDiceCode } from '../../../utils/d6LogicForUI';
import { useAuth } from '../../../utils/context/authContext';

const ArchetypeCard = ({
  id,
  archetypeName,
  archetypeForNPC,
  archetypeForceSensitive,
  archetypeDexterity,
  archetypeKnowledge,
  archetypeMechanical,
  archetypePerception,
  archetypeStrength,
  archetypeTechnical,
  archetypeForceControl,
  archetypeForceSense,
  archetypeForceAlter,
  archetypeStartingCredits,
  archetypePersonality,
  archetypeBackground,
  archetypeObjectives,
  archetypeAQuote,
  archetypeGameNotes,
  archetypeSource,
}) => {
  const router = useRouter();
  const { user } = useAuth();

  const deleteThisArchetype = () => {
    if (window.confirm(`Delete ${archetypeName}?`)) {
      // Logic to delete the archetype here
      console.warn('Its a ', user.admin, ' Admin');
      // window.location.reload();
      router.push('/heros/archetypes');
    }
  };

  return (
    <Card className="text-center" style={{ width: '420px', margin: '7px' }}>
      <Card.Header>{archetypeName}</Card.Header>
      <Card.Body>
        {archetypeForNPC && <Card.Text>This is an NPC archetype.</Card.Text>}
        <Card.Text>Archetype starting Attributes</Card.Text>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '3px',
          marginTop: '15px',
        }}
        >
          {archetypeDexterity !== null && <Card.Text>Dexterity: {formatDiceCode(archetypeDexterity)}</Card.Text>}
          {archetypeKnowledge !== null && <Card.Text>Knowledge: {formatDiceCode(archetypeKnowledge)}</Card.Text>}
          {archetypeMechanical !== null && <Card.Text>Mechanical: {formatDiceCode(archetypeMechanical)}</Card.Text>}
          {archetypePerception !== null && <Card.Text>Perception: {formatDiceCode(archetypePerception)}</Card.Text>}
          {archetypeStrength !== null && <Card.Text>Strength: {formatDiceCode(archetypeStrength)}</Card.Text>}
          {archetypeTechnical !== null && <Card.Text>Technical: {formatDiceCode(archetypeTechnical)}</Card.Text>}
        </div>
        {archetypeForceSensitive && <Card.Text>Force Sensitive: {archetypeForceSensitive ? 'Yes' : 'No'}</Card.Text>}
        {(archetypeForceControl > 0 || archetypeForceSense > 0 || archetypeForceAlter > 0) ? (
          <Card.Text>Force skills</Card.Text>
        ) : (
          <Card.Text>...</Card.Text>
        )}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '8px',
          marginTop: '15px',
        }}
        >
          {archetypeForceControl > 0 && <Card.Text>Control: {formatDiceCode(archetypeForceControl)}</Card.Text>}
          {archetypeForceSense > 0 && <Card.Text>Sense: {formatDiceCode(archetypeForceSense)}</Card.Text>}
          {archetypeForceAlter > 0 && <Card.Text>Alter: {formatDiceCode(archetypeForceAlter)}</Card.Text>}
        </div>

        {archetypeStartingCredits !== null && (
          <Card.Text>Starting Credits: {archetypeStartingCredits}</Card.Text>
        )}
        {archetypePersonality && <Card.Text>Personality: {archetypePersonality}</Card.Text>}
        {archetypeBackground && <Card.Text>Background: {archetypeBackground}</Card.Text>}
        {archetypeObjectives && <Card.Text>Objectives: {archetypeObjectives}</Card.Text>}
        {archetypeAQuote && <Card.Text>A Quote: {archetypeAQuote}</Card.Text>}
        {archetypeGameNotes && <Card.Text>Game Notes: {archetypeGameNotes}</Card.Text>}
        {archetypeSource && <Card.Text>Source: {archetypeSource}</Card.Text>}

        <Link href={`/heros/archetypes/${id}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        <Link href={`/heros/archetypes/update/${id}`} passHref>
          <Button variant="info" className="m-2">EDIT</Button>
        </Link>
        {user.admin && (
        <Button variant="danger" onClick={deleteThisArchetype} className="m-2">
          DELETE
        </Button>
        )}
      </Card.Body>
    </Card>
  );
};

ArchetypeCard.propTypes = {
  id: PropTypes.number.isRequired,
  archetypeName: PropTypes.string.isRequired,
  archetypeForNPC: PropTypes.bool,
  archetypeForceSensitive: PropTypes.bool,
  archetypeDexterity: PropTypes.number,
  archetypeKnowledge: PropTypes.number,
  archetypeMechanical: PropTypes.number,
  archetypePerception: PropTypes.number,
  archetypeStrength: PropTypes.number,
  archetypeTechnical: PropTypes.number,
  archetypeForceControl: PropTypes.number,
  archetypeForceSense: PropTypes.number,
  archetypeForceAlter: PropTypes.number,
  archetypeStartingCredits: PropTypes.number,
  archetypePersonality: PropTypes.string,
  archetypeBackground: PropTypes.string,
  archetypeObjectives: PropTypes.string,
  archetypeAQuote: PropTypes.string,
  archetypeGameNotes: PropTypes.string,
  archetypeSource: PropTypes.string,
};

ArchetypeCard.defaultProps = {
  archetypeForNPC: false,
  archetypeForceSensitive: false,
  archetypeDexterity: null,
  archetypeKnowledge: null,
  archetypeMechanical: null,
  archetypePerception: null,
  archetypeStrength: null,
  archetypeTechnical: null,
  archetypeForceControl: null,
  archetypeForceSense: null,
  archetypeForceAlter: null,
  archetypeStartingCredits: null,
  archetypePersonality: '',
  archetypeBackground: '',
  archetypeObjectives: '',
  archetypeAQuote: '',
  archetypeGameNotes: '',
  archetypeSource: '',
};

export default ArchetypeCard;
