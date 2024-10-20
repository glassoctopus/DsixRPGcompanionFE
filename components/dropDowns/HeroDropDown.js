import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getHeros } from '../../utils/data/heroData';

const HeroDropdown = ({ selectedHero, onSelect }) => {
  const [heros, setHeros] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAllHeros = async () => {
      try {
        const grabbedHeros = await getHeros();
        setHeros(grabbedHeros);
      } catch (err) {
        console.error(err);
        setError('Failed to load heros');
      } finally {
        setLoading(false);
      }
    };
    getAllHeros();
  }, []);

  const handleChange = (event) => {
    const selectedId = Number(event.target.value);
    const selectedHeroObject = heros.find((hero) => hero.id === selectedId);
    onSelect(selectedHeroObject); // Pass the full object to the onSelect handler
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      if (loading) return <p>Loading...</p>;
      if (error) return <p>{error}</p>;
      <label htmlFor="hero-select" style={{ marginBottom: '10px', display: 'block' }}>
        Select a Hero:
      </label>
      <select
        id="hero-select"
        value={selectedHero?.id || ''} // Use selectedHero.id if available
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
        <option value="">--Choose a Hero--</option>
        {heros.map((hero) => (
          <option key={hero.id} value={hero.id}>
            {hero.name}
          </option>
        ))}
      </select>
    </div>
  );
};

HeroDropdown.propTypes = {
  selectedHero: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
  onSelect: PropTypes.func.isRequired,
};

HeroDropdown.defaultProps = {
  selectedHero: null,
};

export default HeroDropdown;
