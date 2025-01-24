import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getAbilities } from '../../../utils/data/abilityData';
import AbilityCard from '../../../components/character/cards/AbilityCard';
import FancyButton from '../../../components/FancyButton';

const Ability = () => {
  const [abilities, setAbilities] = useState([]);
  const router = useRouter();

  const handleClick = () => {
    router.push('/heros/abilities/new');
  };

  useEffect(() => {
    getAbilities().then((data) => {
      setAbilities(data);
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
          <h2 style={{ fontSize: '2rem', margin: '0' }}> Abilities</h2>
          <FancyButton onClick={handleClick}>
            Create New Ability
          </FancyButton>
        </div>

        <div style={{
          maxHeight: '80vh', overflowY: 'auto', display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '10px', boxSizing: 'border-box',
        }}
        >
          {abilities.length > 0 ? (
            abilities.map((ability) => (
              <div
                key={ability.id}
                style={{
                  background: 'rgba(255, 165, 0, 0.85)',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  flex: '1 1 calc(50% - 13px)',
                  maxWidth: 'calc(50% - 20px)',
                }}
              >
                <AbilityCard
                  id={ability.id}
                  abilityName={ability.ability_name}
                  attribute={ability.attribute}
                  timeTaken={ability.time_taken}
                  isReaction={ability.is_a_reaction}
                  forceAbility={ability.force_ability}
                  speciesSpecific={ability.species_specific}
                  abilityNotes={ability.ability_notes}
                  modifiers={ability.modifier}
                  abilityUseNotes={ability.ability_use_notes}
                  abilityGameNotes={ability.ability_game_notes}
                  abilityCode={ability.ability_code}
                />
              </div>
            ))
          ) : (
            <p>No abilities found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Ability;
