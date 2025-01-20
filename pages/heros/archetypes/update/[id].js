import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ArchetypeForm from '../../../../components/character/forms/ArchtypeForm';
import { useAuth } from '../../../../utils/context/authContext';
import { getSingleArchetype } from '../../../../utils/data/archetypeData';
import ArchetypeCard from '../../../../components/character/cards/ArchetypeCard';

const UpdateArchetype = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const [archetype, setArchetype] = useState({});
  const [numericId, setNumericId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const parsedId = Number(id);
      setNumericId(parsedId);
      getSingleArchetype(parsedId)
        .then(setArchetype)
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <h2>Archetype Details</h2>
      <div
        style={{
          padding: '13px',
          backgroundColor: 'rgba(244, 244, 244, 0.5)',
          flexGrow: 1,
          overflowY: 'auto', // Enable scrolling
        }}
      >
        <h2>
          {user?.admin
            ? 'You can edit or add Archetypes as an admin.'
            : 'Create a NPC Archetype for fun!'}
        </h2>
        <div>
          <ArchetypeForm archetype={archetype} id={numericId} />
        </div>
        <div>
          <ArchetypeCard
            id={archetype.id}
            archetypeName={archetype.archetype_name}
            archetypeForNPC={archetype.archetype_for_npc}
            archetypeForceSensitive={archetype.archetype_force_sensitive}
            archetypeDexterity={archetype.archetype_dexterity}
            archetypeKnowledge={archetype.archetype_knowledge}
            archetypeMechanical={archetype.archetype_mechanical}
            archetypePerception={archetype.archetype_perception}
            archetypeStrength={archetype.archetype_strength}
            archetypeTechnical={archetype.archetype_technical}
            archetypeForceControl={archetype.archetype_force_control}
            archetypeForceSense={archetype.archetype_force_sense}
            archetypeForceAlter={archetype.archetype_force_alter}
            archetypeStartingCredits={archetype.archetype_starting_credits}
            archetypePersonality={archetype.archetype_personality}
            archetypeBackground={archetype.archetype_background}
            archetypeObjectives={archetype.archetype_objectives}
            archetypeAllowedSpecies={archetype.archetype_allowed_species}
            archetypeAQuote={archetype.archetype_a_quote}
            archetypeGameNotes={archetype.archetype_game_notes}
            archetypeSource={archetype.archetype_source}
          />
        </div>

      </div>
    </div>
  );
};

export default UpdateArchetype;
