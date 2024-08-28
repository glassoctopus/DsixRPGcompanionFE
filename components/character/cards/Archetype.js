import PropTypes from 'prop-types';
import React from 'react';
import Link from 'next/link';
import { Card, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';

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

  const deleteThisArchetype = () => {
    if (window.confirm(`Delete ${archetypeName}?`)) {
      // Logic to delete the archetype here
      window.location.reload();
      router.push('/archetypes');
    }
  };

  return (
    <Card className="text-center" style={{ width: '420px', margin: '7px' }}>
      <Card.Header>{archetypeName}</Card.Header>
      <Card.Body>
        {archetypeForNPC && <Card.Text>This is an NPC archetype.</Card.Text>}
        {archetypeForceSensitive !== null && (
          <Card.Text>Force Sensitive: {archetypeForceSensitive ? 'Yes' : 'No'}</Card.Text>
        )}
        {archetypeDexterity !== null && <Card.Text>Dexterity: {archetypeDexterity}</Card.Text>}
        {archetypeKnowledge !== null && <Card.Text>Knowledge: {archetypeKnowledge}</Card.Text>}
        {archetypeMechanical !== null && <Card.Text>Mechanical: {archetypeMechanical}</Card.Text>}
        {archetypePerception !== null && <Card.Text>Perception: {archetypePerception}</Card.Text>}
        {archetypeStrength !== null && <Card.Text>Strength: {archetypeStrength}</Card.Text>}
        {archetypeTechnical !== null && <Card.Text>Technical: {archetypeTechnical}</Card.Text>}
        {archetypeForceControl !== null && <Card.Text>Force Control: {archetypeForceControl}</Card.Text>}
        {archetypeForceSense !== null && <Card.Text>Force Sense: {archetypeForceSense}</Card.Text>}
        {archetypeForceAlter !== null && <Card.Text>Force Alter: {archetypeForceAlter}</Card.Text>}
        {archetypeStartingCredits !== null && (
          <Card.Text>Starting Credits: {archetypeStartingCredits}</Card.Text>
        )}
        {archetypePersonality && <Card.Text>Personality: {archetypePersonality}</Card.Text>}
        {archetypeBackground && <Card.Text>Background: {archetypeBackground}</Card.Text>}
        {archetypeObjectives && <Card.Text>Objectives: {archetypeObjectives}</Card.Text>}
        {archetypeAQuote && <Card.Text>A Quote: {archetypeAQuote}</Card.Text>}
        {archetypeGameNotes && <Card.Text>Game Notes: {archetypeGameNotes}</Card.Text>}
        {archetypeSource && <Card.Text>Source: {archetypeSource}</Card.Text>}

        <Link href={`/archetypes/${id}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        <Link href={`/archetypes/update/${id}`} passHref>
          <Button variant="info" className="m-2">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisArchetype} className="m-2">
          DELETE
        </Button>
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
