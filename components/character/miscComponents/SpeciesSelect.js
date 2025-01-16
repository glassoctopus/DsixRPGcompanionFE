import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FancyButton from '../../FancyButton';

const Dropdown = ({ species, onSelect }) => (
  <select
    multiple
    style={{ width: '45%', height: '150px' }}
    onChange={(e) => {
      const selected = Array.from(e.target.selectedOptions, (option) => ({
        id: option.value,
        species_name: option.getAttribute('species_name'),
      }));
      onSelect(selected);
    }}
  >
    {species.map((sp) => (
      // eslint-disable-next-line react/no-unknown-property
      <option key={sp.id} value={sp.id} species_name={sp.species_name}>
        {sp.species_name}
      </option>
    ))}
  </select>
);

Dropdown.propTypes = {
  species: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      species_name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
};

const SelectedItems = ({ items, onRemove }) => (
  <div style={{ width: '45%' }}>
    {items.length > 0 ? (
      items.map((item) => (
        <div key={item.id} style={{ marginBottom: '1px' }}>
          <FancyButton
            onClick={() => onRemove(item.id)}
            style={{
              marginRight: '5px',
              verticalAlign: 'middle',
              padding: '2px 8px',
              fontSize: '13px',
              lineHeight: '1',
            }}
          >
            &lt;
          </FancyButton>
          <span>{item.species_name}</span> {/* Check if species_name is being passed */}
        </div>
      ))
    ) : (
      <span>No Archetype Specific Species selected</span> // A fallback message to debug
    )}
  </div>
);

SelectedItems.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      species_name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onRemove: PropTypes.func.isRequired,
};

const SpeciesSelect = ({ species, archetypeAllowedSpecies, onConfirm }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    if (archetypeAllowedSpecies && archetypeAllowedSpecies.length > 0) {
      // eslint-disable-next-line camelcase
      setSelectedItems(archetypeAllowedSpecies.map(({ id, species_name }) => ({ id, species_name })));
    }
  }, [archetypeAllowedSpecies]);

  const handleSelect = (newSelections) => {
    setSelectedItems((prevItems) => {
      const updatedItems = [
        ...prevItems,
        ...newSelections,
      ].filter(
        (item, index, self) => self.findIndex((i) => i.id === item.id) === index,
      );
      return updatedItems;
    });
  };

  const handleRemove = (id) => {
    setSelectedItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleConfirm = () => {
    const speciesNames = selectedItems.map((item) => item.species_name);
    onConfirm(speciesNames);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
        <Dropdown species={species} onSelect={handleSelect} />
        <SelectedItems items={selectedItems} onRemove={handleRemove} />
      </div>
      <FancyButton onClick={handleConfirm} style={{ marginTop: '20px' }}>
        Confirm
      </FancyButton>
    </div>
  );
};

SpeciesSelect.propTypes = {
  species: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      species_name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  archetypeAllowedSpecies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      species_name: PropTypes.string.isRequired,
    }),
  ),
  onConfirm: PropTypes.func.isRequired,
};

SpeciesSelect.defaultProps = {
  archetypeAllowedSpecies: [],
};

export default SpeciesSelect;
