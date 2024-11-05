import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSpecies } from '../../../utils/data/speciesData';
import SpeciesCard from '../../../components/character/cards/SpeciesCard';
import FancyButton from '../../../components/FancyButton';

const Species = () => {
  const [speciesList, setSpeciesList] = useState([]);
  const router = useRouter();

  const handleClick = () => {
    router.push('/heros/species/new');
  };

  useEffect(() => {
    getSpecies().then((data) => {
      setSpeciesList(data);
    });
  }, []);

  return (
    <div style={{
      padding: '13px', backgroundColor: 'rgba(244, 244, 244, 0.1)', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center',
    }}
    >
      <div style={{ width: '100%', maxWidth: '1200px' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px',
        }}
        >
          <h2 style={{ fontSize: '2rem', margin: '0' }}>Species List</h2>
          <FancyButton onClick={handleClick}>
            Create New Species
          </FancyButton>
        </div>

        <div style={{
          maxHeight: '80vh', overflowY: 'auto', display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '10px', boxSizing: 'border-box',
        }}
        >
          {speciesList.length > 0 ? (
            speciesList.map((species) => (
              <div
                key={species.id}
                style={{
                  background: 'rgba(135, 206, 250, 0.85)',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  flex: '1 1 calc(50% - 13px)',
                  maxWidth: 'calc(50% - 20px)',
                }}
              >
                <SpeciesCard
                  id={species.id}
                  name={species.name}
                  speciesName={species.species_name}
                  speciesHomeworld={species.species_homeworld}
                  speciesAverageHeight={species.species_average_height}
                  speciesAverageWeight={species.species_average_weight}
                  speciesForceSensitive={species.species_force_sensitive}
                  speciesPhysicalDescription={species.species_physical_description}
                  speciesPersonality={species.species_personality}
                  speciesBackground={species.species_background}
                  speciesDexterityModifier={species.species_dexterity_modifer}
                  speciesKnowledge={species.species_knowledge}
                  speciesMechanical={species.species_mechanical}
                  speciesPerception={species.species_perception}
                  speciesStrength={species.species_strength}
                  speciesTechnical={species.species_technical}
                  speciesForceControl={species.species_force_control}
                  speciesForceSense={species.species_force_sense}
                  speciesForceAlter={species.species_force_alter}
                  speciesForcePoints={species.species_force_points}
                  speciesDarkSidePoints={species.species_dark_side_points}
                  speciesForceStrength={species.species_force_strength}
                  playable={species.playable}
                />
              </div>
            ))
          ) : (
            <p>No species found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Species;
