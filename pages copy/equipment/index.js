import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import EquipmentCard from '../../components/equipment/cards/EqupimentCard';
import { getEquipments } from '../../utils/data/equipmentData';
import { useAuth } from '../../utils/context/authContext';

const Equipment = () => {
  const [equipments, setEquipments] = useState([]);
  const [filteredEquipment, setFilteredEquipments] = useState([]);
  const [filterBy, setFilterBy] = useState('name');
  const [searchTerms, setSearchTerms] = useState({
    name: '',
    category: '',
    subCategory: '',
    skill: '',
    damage: '',
  });
  const [isWeapon, setIsWeapon] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getEquipments().then((data) => {
      setEquipments(data);
      setFilteredEquipments(data);
    });
  }, [user]);

  const handleFilterSubmit = () => {
    let filtered = equipments;

    if (searchTerms.name) {
      filtered = filtered.filter((equipment) => equipment.equipment_name?.toLowerCase().includes(searchTerms.name.toLowerCase()));
    }

    if (searchTerms.category) {
      filtered = filtered.filter((equipment) => equipment.equipment_category?.toLowerCase().includes(searchTerms.category.toLowerCase()));
    }

    if (searchTerms.subCategory) {
      filtered = filtered.filter((equipment) => equipment.equipment_sub_category?.toLowerCase().includes(searchTerms.subCategory.toLowerCase()));
    }

    if (searchTerms.skill) {
      filtered = filtered.filter((equipment) => equipment.equipment_skill?.toLowerCase().includes(searchTerms.skill.toLowerCase()));
    }

    if (searchTerms.damage) {
      filtered = filtered.filter((equipment) => parseFloat(equipment.equipment_damage) > parseFloat(searchTerms.damage));
    }

    if (isWeapon) {
      filtered = filtered.filter((equipment) => equipment.isWeapon === true);
    }

    setFilteredEquipments(filtered);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchTerms((prevTerms) => ({
      ...prevTerms,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    setIsWeapon(e.target.checked);
  };

  return (
    <div style={{ display: 'flex', maxHeight: '100vh', overflow: 'hidden' }}>
      <div style={{
        flex: '0 0 300px', padding: '16px', overflowY: 'auto', borderRight: '1px solid #ccc',
      }}
      >
        <h2>Search Filters</h2>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={searchTerms.name}
            onChange={handleInputChange}
            style={{ width: '100%', marginBottom: '8px' }}
          />
        </label>
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={searchTerms.category}
            onChange={handleInputChange}
            style={{ width: '100%', marginBottom: '8px' }}
          />
        </label>
        <label>
          Sub Category:
          <input
            type="text"
            name="subCategory"
            value={searchTerms.subCategory}
            onChange={handleInputChange}
            style={{ width: '100%', marginBottom: '8px' }}
          />
        </label>
        <label>
          Skill:
          <input
            type="text"
            name="skill"
            value={searchTerms.skill}
            onChange={handleInputChange}
            style={{ width: '100%', marginBottom: '8px' }}
          />
        </label>
        <label>
          Damage (greater than):
          <input
            type="text"
            name="damage"
            value={searchTerms.damage}
            onChange={handleInputChange}
            style={{ width: '100%', marginBottom: '8px' }}
          />
        </label>
        <label style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          Is Weapon:
          <input
            type="checkbox"
            checked={isWeapon}
            onChange={handleCheckboxChange}
            style={{ marginLeft: '8px' }}
          />
        </label>
        <Button onClick={handleFilterSubmit} style={{ width: '100%' }}>Search</Button>
      </div>
      <div style={{ flex: '1', padding: '16px', overflowY: 'auto' }}>
        <h1>Equipments</h1>
        <Button
          onClick={() => router.push('/equipment/new')}
          style={{ marginBottom: '8px' }}
        >
          Add New Equipment
        </Button>
        <div className="d-flex flex-wrap">
          {filteredEquipment.map((equipment) => (
            <EquipmentCard
              key={equipment.id}
              id={equipment.id}
              name={equipment.equipment_name}
              isWeapon={equipment.is_a_weapon}
              category={equipment.equipment_category}
              subCategory={equipment.equipment_sub_category}
              model={equipment.equipment_model}
              type={equipment.equipment_type}
              scale={equipment.equipment_scale}
              cost={equipment.equipment_cost}
              description={equipment.equipment_description}
              availability={equipment.equipment_availability}
              skill={equipment.equipment_skill}
              damage={equipment.equipment_damage}
              ammo={equipment.equipment_ammo}
              charges={equipment.equipment_charges}
              uses={equipment.equipment_uses}
              useNotes={equipment.equipment_useNotes}
              source={equipment.source}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Equipment;
