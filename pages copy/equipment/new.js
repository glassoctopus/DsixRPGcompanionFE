import React from 'react';
import EquipmentForm from '../../components/equipment/forms/EquipmentForm';
import { useAuth } from '../../utils/context/authContext';
import { createEquipment } from '../../utils/data/equipmentData';

const NewEquipmentType = () => {
  const { user } = useAuth();

  const handleSubmit = async (formData) => {
    try {
      await createEquipment(formData);
      // Redirect to equipment list page or wherever needed
    } catch (error) {
      console.error('Error creating equipment:', error);
    }
  };

  return (
    <div className="general-container">
      <div className="general-content">
        <h2>Create a New Equipment</h2>
        <EquipmentForm user={user} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default NewEquipmentType;
