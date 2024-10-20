import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSpecialAbilities } from '../../../utils/data/specialAbilityData';
import SpecialAbilityCard from '../../../components/character/cards/SpecialAbilityCard';
import FancyButton from '../../../components/FancyButton';

const SpecialAbility = () => {
  const [specialAbilities, setSpecialAbilities] = useState([]);
  const router = useRouter();

  const handleClick = () => {
    router.push('/heros/specialAbilities/new');
  };

  useEffect(() => {
    getSpecialAbilities().then((data) => {
      setSpecialAbilities(data);
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
          <h2 style={{ fontSize: '2rem', margin: '0' }}>Special Abilities</h2>
          <FancyButton onClick={handleClick}>
            Create New Ability
          </FancyButton>
        </div>

        <div style={{
          maxHeight: '80vh', overflowY: 'auto', display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '10px', boxSizing: 'border-box',
        }}
        >
          {specialAbilities.length > 0 ? (
            specialAbilities.map((ability) => (
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
                <SpecialAbilityCard
                  id={ability.id}
                  abilityName={ability.ability_name}
                  attribute={ability.attribute}
                  timeTaken={ability.time_taken}
                  isReaction={ability.is_a_reaction}
                  forceSkill={ability.force_skill}
                  speciesSpecific={ability.species_specific}
                  specialAbilityNotes={ability.special_ability_notes}
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

export default SpecialAbility;
