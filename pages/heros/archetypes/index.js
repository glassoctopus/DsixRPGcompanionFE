import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
// import { useAuth } from '../../../utils/context/authContext';
import { getArchetypes } from '../../../utils/data/archetypeData';
import ArchetypeCard from '../../../components/character/cards/ArchetypeCard';
import SearchTextField from '../../../components/Searchbar';

const Archetypes = () => {
  const [archetypes, setArchetypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    // console.log('Search term:', term); // Debugging line
    setSearchTerm(term);
  };

  const filteredArchetypes = archetypes
    .filter((archetype) => archetype.archetype_name.toLowerCase().includes(searchTerm.toLowerCase()));

  useEffect(() => {
    getArchetypes().then((data) => {
      setArchetypes(data);
    });
  }, []);

  return (
    <div style={{
      margin: '13px', border: '13px ', padding: '13px',
    }}
    >
      <div className="archetype-container">
        <div className="archetype-content">
          <article className="Archetypes">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="mb-0">Archetype List</h2>
              <SearchTextField placeholder="Search by name..." onSubmit={handleSearch} />
              <Button as={Link} href="/heros/archetypes/new" className="btn btn-primary">
                Add Archetype
              </Button>
            </div>
            <div
              className="archetype-list"
              style={{
                display: 'flex', flexWrap: 'wrap', gap: '20px', maxWidth: '120vh', maxHeight: '80vh', overflowY: 'auto', margin: '13px', border: '13px ', padding: '13px',
              }}
            >
              {filteredArchetypes.length > 0 ? (
                filteredArchetypes.map((archetype) => (
                  <ArchetypeCard
                    key={archetype.id}
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
                    archetypeAQuote={archetype.archetype_a_quote}
                    archetypeGameNotes={archetype.archetype_game_notes}
                    archetypeSource={archetype.archetype_source}
                  />
                ))
              ) : (
                <p>No archetypes found</p>
              )}
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default Archetypes;
