import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useArchetypes } from '../../utils/context/archetypeContext';

const ArchetypeDropdown = ({ selectedArchetype, onSelect, random }) => {
  const { archetypes } = useArchetypes();
  // eslint-disable-next-line no-unused-vars
  const [hover, setHover] = useState(false);

  const handleChange = (event) => {
    const selectedId = Number(event.target.value);
    const selectedArchetypeObject = archetypes.find((archetype) => archetype.id === selectedId);
    onSelect(selectedArchetypeObject); // Pass the full object to the onSelect handler
  };

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  return (
    <div>
      <div>
        <label htmlFor="archetype-select" style={{ marginBottom: '10px', display: 'inline' }}>
          Select an Archetype:
        </label><button type="button" className="siteButton" onClick={random}>roll a class</button>
      </div>
      <select
        id="archetype-select"
        value={selectedArchetype?.id || ''} // Use selectedArchetype.id if available
        onChange={handleChange}
        style={{
          padding: '10px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          fontSize: '16px',
          color: 'black',
          backgroundColor: 'white',
          outline: 'none',
          appearance: 'none', // For removing the default dropdown arrow (optional)
          width: '100%',
          maxWidth: '400px',
          cursor: 'pointer',
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
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
  selectedArchetype: PropTypes.shape({
    id: PropTypes.number,
    archetype_name: PropTypes.string,
  }),
  onSelect: PropTypes.func.isRequired,
  random: PropTypes.func,
};

ArchetypeDropdown.defaultProps = {
  selectedArchetype: null,
  random: null,
};

export default ArchetypeDropdown;
