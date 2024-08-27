import PropTypes from 'prop-types';
import React from 'react';
import Link from 'next/link';
import { Card, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { deleteEquipment } from '../../../utils/data/equipmentData';

const EquipmentCard = ({
  id,
  name,
  isWeapon,
  category,
  subCategory,
  model,
  type,
  scale,
  cost,
  description,
  availability,
  skill,
  damage,
  ammo,
  charges,
  uses,
  useNotes,
  source,
}) => {
  const router = useRouter();

  const deleteThisEquipment = () => {
    if (window.confirm(`Delete ${name} database id:${id}`)) {
      deleteEquipment(id);
      window.location.reload();
      router.push('/equipment');
    }
  };

  return (
    <Card className="text-center" style={{ width: '420px', margin: '7px' }}>
      <Card.Header>{name}</Card.Header>
      <Card.Body>
        <Card.Text>Category: {category}</Card.Text>
        <Card.Text>Sub-Category: {subCategory}</Card.Text>
        <Card.Text>{isWeapon ? 'Weapon: Yes' : 'Weapon: No'}</Card.Text>
        <Card.Text>{model ? `Model: ${model}` : null}</Card.Text>
        <Card.Text>{type ? `Type: ${type}` : null}</Card.Text>
        <Card.Text>{scale ? `Scale: ${scale}` : null}</Card.Text>
        <Card.Text>{cost ? `Cost: ${cost}` : null}</Card.Text>
        <Card.Text>{availability ? `Availability: ${availability}` : null}</Card.Text>
        <Card.Text>{skill ? `Skill: ${skill}` : null}</Card.Text>
        <Card.Text>{damage ? `Damage: ${damage}` : null}</Card.Text>
        <Card.Text>{ammo ? `Ammo: ${ammo}` : null}</Card.Text>
        <Card.Text>{charges ? `Charges: ${charges}` : null}</Card.Text>
        <Card.Text>{uses ? `Uses: ${uses}` : null}</Card.Text>
        <Card.Text style={{ whiteSpace: 'pre-wrap' }}>{description ? `Description: ${description}` : null}</Card.Text>
        <Card.Text style={{ whiteSpace: 'pre-wrap' }}>{useNotes ? `Use Notes: ${useNotes}` : null}</Card.Text>
        <Card.Text>{source ? `Source: ${source}` : null}</Card.Text>
        <Link href={`/equipment/${id}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        <Link href={`/equipment/update/${id}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisEquipment} className="m-2">
          DELETE
        </Button>
      </Card.Body>
      <Card.Footer className="text-muted">Source: {source}</Card.Footer>
    </Card>
  );
};

EquipmentCard.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  isWeapon: PropTypes.bool,
  category: PropTypes.string,
  subCategory: PropTypes.string,
  model: PropTypes.string,
  type: PropTypes.string,
  scale: PropTypes.string,
  cost: PropTypes.number,
  description: PropTypes.string,
  availability: PropTypes.string,
  skill: PropTypes.string,
  damage: PropTypes.number,
  ammo: PropTypes.number,
  charges: PropTypes.string,
  uses: PropTypes.string,
  useNotes: PropTypes.string,
  source: PropTypes.string,
};

EquipmentCard.defaultProps = {
  id: '',
  name: '',
  isWeapon: false,
  category: '',
  subCategory: '',
  model: '',
  type: '',
  scale: '',
  cost: 0,
  description: '',
  availability: '',
  skill: '',
  damage: null,
  ammo: 0,
  charges: '',
  uses: '',
  useNotes: '',
  source: '',
};

export default EquipmentCard;
