import React, { useState, useEffect } from 'react';
import SkillCard from '../../components/character/cards/SkillCard';
import { getSkills } from '../../utils/data/skillData';
import SearchTextField from '../../components/Searchbar';

import FancyCardLong from '../../components/character/cards/FancyCardLong';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [selectedFilterValue, setSelectedFilterValue] = useState('All');
  const [searchFragment, setSearchFragment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const fetchedSkills = await getSkills();
        setSkills(fetchedSkills);
      } catch (err) {
        console.error(err);
        setError('Failed to load skills');
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const filterCriteriaMap = {
    // eslint-disable-next-line quote-props, no-unused-vars
    'All': (skill) => true,
    'Species Skill': (skill) => skill.species_specific === true,
    'Reaction Skill': (skill) => skill.is_a_reaction === true,
    // eslint-disable-next-line quote-props
    'Dexterity': (skill) => skill.attribute === 'Dexterity',
    // eslint-disable-next-line quote-props
    'Knowledge': (skill) => skill.attribute === 'Knowledge',
    // eslint-disable-next-line quote-props
    'Mechanical': (skill) => skill.attribute === 'Mechanical',
    // eslint-disable-next-line quote-props
    'Perception': (skill) => skill.attribute === 'Perception',
    // eslint-disable-next-line quote-props
    'Strength': (skill) => skill.attribute === 'Strength',
    // eslint-disable-next-line quote-props
    'Technical': (skill) => skill.attribute === 'Technical',
  };

  const handleSearch = (fragment) => {
    setSearchFragment(fragment);
  };

  const handleFilterChange = (filterCriteria) => {
    setSelectedFilterValue(filterCriteria);
  };

  const filteredSkills = skills
    .filter((skill) => {
      const filterFunc = filterCriteriaMap[selectedFilterValue] || filterCriteriaMap.All;
      return filterFunc(skill) && skill.skill_name.toLowerCase().includes(searchFragment.toLowerCase());
    });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div
      className="container"
      style={{
        overflowY: 'auto',
        maxHeight: '95vh',
        borderRadius: '13px',
        padding: '13px',
        margin: '13px',
      }}
    >
      <FancyCardLong>
        <div
          className="container"
          style={{
            minHeight: '90vh',
            overflowY: 'auto',
            borderRadius: '13px',
            boxShadow: '0 0 10px 2px rgba(255, 255, 255, 0.8)',
            padding: '13px',
            margin: '13px',
          }}
        >
          <div className="cardOfForm">
            <header
              className="header"
              style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%',
              }}
            >
              <h1 style={{ textAlign: 'center', flex: '1' }}>Attributes and Skills</h1>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <SearchTextField placeholder="Search by skill name..." onSubmit={handleSearch} />
                <select
                  onChange={(e) => handleFilterChange(e.target.value)}
                  style={{ marginTop: '8px', padding: '5px', fontSize: '16px' }}
                >
                  <option value="All">Show All</option>
                  <option value="Dexterity">Dexterity Skills</option>
                  <option value="Knowledge">Knowledge Skills</option>
                  <option value="Mechanical">Mechanical Skills</option>
                  <option value="Perception">Perception Skills</option>
                  <option value="Strength">Strength Skills</option>
                  <option value="Technical">Technical Skills</option>
                  <option value="Reaction Skill">Reaction Skill</option>
                  <option value="Species Skill">Species Skills</option>
                </select>
              </div>
            </header>
            <main className="main-content" style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
              <div className="col-md-8" style={{ flex: '1 1 auto' }}>
                <section className="section">
                  <h2>Using Attributes and Skills</h2>
                  <p>
                    Using attributes and skills is very easy if you can remember one simple concept. It&apos;s called the <strong>&quot;Star Wars Rule of Thumb.&quot;</strong>
                  </p>
                  <p>
                    Pick a difficulty number. If the character&apos;s skill roll is equal or higher, she succeeds.
                  </p>
                  <p>
                    When you want your character to do something, the game master picks a difficulty number. (All the lists and explanations in this chapter tell him how to figure out what the difficulty number should be.) If you roll equal to or higher than the difficulty number, your character succeeded at what she was trying to do.
                  </p>
                  <p>
                    Now you know the one major rule you need to play this game.
                  </p>
                  <div>
                    Skill Levels:<br />
                    1D - Below Human average for an attribute.<br />
                    2D - Human average for an attribute and many skills.<br />
                    3D - Average level of training for a Human.<br />
                    4D - Professional level of training for a Human.<br />
                    5D - Above average expertise.<br />
                    6D - Considered about the best in a city or geographic area. 1 in 100,000 people will have training to this skill level.<br />
                    7D - Among the best on a continent. About 1 in 10,000,000 people will have training to this skill level.<br />
                    8D - Among the best on a planet. About 1 in 100,000,000 people will have training to this skill level.<br />
                    9D - One of the best for several systems in the immediate area. About 1 in a billion people have a skill at this level.<br />
                    10D - One of the best in a sector.<br />
                    12D - One of the best in a region.<br />
                    14D+ - Among the best in the galaxy.
                  </div>
                </section>
                <section className="section">
                  <h2>Skill Descriptions</h2>
                  <p>
                    <strong>Time Taken:</strong> This is generally how long it takes to do something with the skill. Many skills (especially combat skills) can be used in one round. More complex skills, like computer programming/repair, may take a round ... or minutes, hours or even days to do something. These are general guidelines; the game master can always customize the time taken depending upon the situation.
                  </p>
                  <p>
                    <strong>Specializations:</strong> Characters may choose a specialization for a skill. The kinds of specializations are explained, and several examples are provided in italics. The skill description tells you what the skill covers and gives a few sample difficulties and modifiers.
                  </p>
                </section>
              </div>
              <div
                className="col-md-4"
                style={{
                  flex: '0 0 446px',
                  maxHeight: '739px',
                  border: '1px solid #ddd',
                  padding: '1px',
                  borderRadius: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div
                  style={{
                    flex: '1',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    boxSizing: 'border-box',
                  }}
                >
                  {filteredSkills.length > 0 ? (
                    filteredSkills.map((skill) => (
                      <SkillCard
                        key={skill.id}
                        id={skill.id}
                        attribute={skill.attribute}
                        skillName={skill.skill_name}
                        timeTaken={skill.time_taken}
                        isAReaction={skill.is_a_reaction}
                        forceSkill={skill.force_skill}
                        speciesSpecific={skill.species_specific}
                        speciesName={skill.species_name}
                        specializations={skill.specializations}
                        modifiers={skill.modifiers}
                        skillUseNotes={skill.skill_use_notes}
                        skillGameNotes={skill.skill_game_notes}
                        skillCode={skill.skill_code}
                      />
                    ))
                  ) : (
                    <p>No skills found</p>
                  )}
                </div>
              </div>
            </main>
          </div>
        </div>
      </FancyCardLong>
    </div>
  );
};

export default Skills;
