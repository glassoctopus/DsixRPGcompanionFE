/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

const NoteCard = ({
  title, description, completed, temporary_field,
}) => (
  <Card>
    <Card.Body>
      <Card.Title>{title}</Card.Title>
      <Card.Text>{description}</Card.Text>
      <Card.Text>Status: {completed ? 'Needed' : 'irrelevant'}</Card.Text>
      <Card.Text>{temporary_field ? 'Temporary' : 'Permanent'} Task</Card.Text>
    </Card.Body>
  </Card>
);

NoteCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  temporary_field: PropTypes.bool.isRequired,
};

export default NoteCard;
