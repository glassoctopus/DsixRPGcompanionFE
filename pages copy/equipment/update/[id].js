import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import EquipmentForm from '../../../components/equipment/forms/EquipmentForm';
import { useAuth } from '../../../utils/context/authContext';
import { getSingleEquipment, updateEquipment } from '../../../utils/data/equipmentData';

const NewEquipnment = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const [anEquipment, setAnEquipment] = useState({});

  useEffect(() => {
    if (id) {
      getSingleEquipment(id).then((data) => {
        // console.log('Fetched Data:', data);
        setAnEquipment(data);
      });
    }
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      await updateEquipment(id, formData);
      router.push('/equipment'); // Redirect to equipment list page or wherever needed
    } catch (error) {
      console.error('Error updating equipment:', error);
    }
  };

  return (
    <div className="hero-container">
      <div className="hero-content">
        <h2>Edit Equipment</h2>
        <EquipmentForm user={user} initialData={anEquipment} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default NewEquipnment;
