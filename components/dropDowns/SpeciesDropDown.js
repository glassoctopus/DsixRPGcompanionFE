import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getSpecies } from '../../utils/data/speciesData';

const SpeciesDropdown = ({
  filteredSpecies, selectedSpecies, onSelect, random,
}) => {
  const [species, setSpecies] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [hover, setHover] = useState(false);

  const setSpeciesPool = async () => {
    if (species.length === 0) {
      const fetchedSpeciess = await getSpecies();
      setSpecies(fetchedSpeciess);
    }
  };

  useEffect(() => {
    setSpeciesPool();
  });

  const speciesList = filteredSpecies.length > 0 ? filteredSpecies : species;

  const handleChange = (event) => {
    const selectedId = Number(event.target.value);
    const selectedSpeciesObject = speciesList.find((aSpecies) => aSpecies.id === selectedId);
    onSelect(selectedSpeciesObject); // Pass the full object to the onSelect handler
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
        <label htmlFor="Species-select" style={{ marginBottom: '10px', display: 'inline' }}>
          Select an Species:
        </label><button type="button" className="siteButton" onClick={random}>roll a class</button>
      </div>
      <select
        id="Species-select"
        value={selectedSpecies?.id || ''} // Use selectedSpecies.id if available
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
        <option value="">--Choose an Species--</option>
        {species.map((aSpecies) => (
          <option key={aSpecies.id} value={aSpecies.id}>
            {aSpecies.species_name}
          </option>
        ))}
      </select>
    </div>
  );
};

SpeciesDropdown.propTypes = {
  filteredSpecies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      species_name: PropTypes.string.isRequired,
    }),
  ),
  selectedSpecies: PropTypes.shape({
    id: PropTypes.number,
    Species_name: PropTypes.string,
  }),
  onSelect: PropTypes.func.isRequired,
  random: PropTypes.func,
};

SpeciesDropdown.defaultProps = {
  filteredSpecies: [],
  selectedSpecies: null,
  random: null,
};

export default SpeciesDropdown;
