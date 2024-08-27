import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

const EquipmentForm = ({ initialData, onSubmit }) => {
  // console.log('Initial Data in Form:', initialData);
  const router = useRouter();
  const [formData, setFormData] = useState(initialData || {
    equipment_name: '',
    equipment_category: '',
    equipment_sub_category: '',
    equipment_model: '',
    equipment_type: '',
    equipment_scale: '',
    equipment_cost: 0,
    equipment_description: '',
    equipment_availability: '',
    equipment_skill: '',
    equipment_damage: 0,
    equipment_ammo: 0,
    equipment_charges: 0,
    equipment_uses: 0,
    equipment_use_notes: '',
    source: '',
  });

  useEffect(() => {
    setFormData(initialData || {
      equipment_name: '',
      equipment_category: '',
      equipment_sub_category: '',
      equipment_model: '',
      equipment_type: '',
      equipment_scale: '',
      equipment_cost: 0,
      equipment_description: '',
      equipment_availability: '',
      equipment_skill: '',
      equipment_damage: '',
      equipment_ammo: 0,
      equipment_charges: 0,
      equipment_uses: 0,
      equipment_use_notes: '',
      source: '',
    });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData);
    router.push('/equipment'); // Redirect to the equipment list page
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col">
          <label>
            Name:
            <input
              type="text"
              name="equipment_name"
              value={formData.equipment_name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Category:
            <input
              type="text"
              name="equipment_category"
              value={formData.equipment_category}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Sub Category:
            <input
              type="text"
              name="equipment_sub_category"
              value={formData.equipment_sub_category}
              onChange={handleChange}
            />
          </label>

        </div>
        <div className="col">
          <label>
            Skill:
            <input
              type="text"
              name="equipment_skill"
              value={formData.equipment_skill}
              onChange={handleChange}
            />
          </label>
          <label>
            Damage:
            <input
              type="number"
              name="equipment_damage"
              value={formData.equipment_damage}
              onChange={handleChange}
              step="0.1"
            />
          </label>

          <label>
            Availability:
            <input
              type="text"
              name="equipment_availability"
              value={formData.equipment_availability}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="col">

          <label>
            Cost:
            <input
              type="number"
              name="equipment_cost"
              value={formData.equipment_cost}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Ammo:
            <input
              type="number"
              name="equipment_ammo"
              value={formData.equipment_ammo}
              onChange={handleChange}
            />
          </label>
          <label>
            Charges:
            <input
              type="number"
              name="equipment_charges"
              value={formData.equipment_charges}
              onChange={handleChange}
            />
          </label>
          <label>
            Uses:
            <input
              type="number"
              name="equipment_uses"
              value={formData.equipment_uses}
              onChange={handleChange}
            />
          </label>
        </div>
        <label>
          Type:
          <input
            type="text"
            name="equipment_type"
            value={formData.equipment_type}
            onChange={handleChange}
          />
        </label>
        <label>
          Scale:
          <input
            type="text"
            name="equipment_scale"
            value={formData.equipment_scale}
            onChange={handleChange}
          />
        </label>
        <label>
          Model:
          <input
            style={{ width: '100%' }}
            type="text"
            name="equipment_model"
            value={formData.equipment_model}
            onChange={handleChange}
          />
        </label>
        <label>
          Description:
          <textarea
            style={{ width: '100%' }}
            name="equipment_description"
            value={formData.equipment_description}
            onChange={handleChange}
          />
        </label>

        <label>
          Use Notes:
          <textarea
            style={{ width: '100%' }}
            name="equipment_use_notes"
            value={formData.equipment_use_notes}
            onChange={handleChange}
          />
        </label>
        <label>
          Source:
          <textarea
            name="source"
            value={formData.source}
            onChange={handleChange}
            style={{ width: '100%', height: '36px' }}
          />
        </label>

      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

EquipmentForm.propTypes = {
  initialData: PropTypes.shape({
    equipment_name: PropTypes.string,
    equipment_category: PropTypes.string,
    equipment_sub_category: PropTypes.string,
    equipment_model: PropTypes.string,
    equipment_type: PropTypes.string,
    equipment_scale: PropTypes.string,
    equipment_cost: PropTypes.number,
    equipment_description: PropTypes.string,
    equipment_availability: PropTypes.string,
    equipment_skill: PropTypes.string,
    equipment_damage: PropTypes.number,
    equipment_ammo: PropTypes.number,
    equipment_charges: PropTypes.number,
    equipment_uses: PropTypes.number,
    equipment_use_notes: PropTypes.string,
    source: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
};

EquipmentForm.defaultProps = {
  initialData: null,
};

export default EquipmentForm;
