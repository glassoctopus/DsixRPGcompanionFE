import React from 'react';
import PropTypes from 'prop-types';
import { useArchetypes } from '../utils/context/archetype';

const ArchetypeDropdown = ({ selectedArchetype, onSelect }) => {
  const { archetypes } = useArchetypes();

  const handleChange = (event) => {
    onSelect(event.target.value);
  };

  return (
    <div>
      <label htmlFor="archetype-select" style={{ marginBottom: '10px', display: 'block' }}>
        Select an Archetype:
      </label>
      <select
        id="archetype-select"
        value={selectedArchetype}
        onChange={handleChange}
        style={{
          padding: '10px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          fontSize: '16px',
          color: 'black',
          boxShadow: '0px 4px 8px rgba(255, 255, 255, 0.3)',
          backgroundColor: 'white',
          outline: 'none',
          appearance: 'none', // For removing the default dropdown arrow (optional)
          width: '100%',
          maxWidth: '400px',
          cursor: 'pointer',
        }}
      >
        <option value="">--Choose an Archetype--</option>
        {archetypes.map((archetype) => (
          <option key={archetype.id} value={archetype.id}>
            {archetype.archetype_name}
          </option>
        ))}
      </select>
    </div>
  );
};

ArchetypeDropdown.propTypes = {
  selectedArchetype: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default ArchetypeDropdown;
