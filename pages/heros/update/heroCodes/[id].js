import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../../utils/context/authContext';
import { getSingleHero } from '../../../../utils/data/heroData';
import HeroSkillForm from '../../../../components/character/forms/HeroSkillForm';
import HeroAndSkillsCard from '../../../../components/character/cards/HeroAndSkillsCard';

const HeroCodes = () => {
  const router = useRouter();
  const { id } = router.query;
  // eslint-disable-next-line no-unused-vars
  const [aHero, setAHero] = useState({});
  // eslint-disable-next-line no-unused-vars
  const { user } = useAuth();
  const [numericId, setNumericId] = useState(0);

  useEffect(() => {
    if (id) {
      const parsedId = Number(id);
      setNumericId(parsedId);
      getSingleHero(parsedId).then(setAHero);
    }
  }, [id]);

  if (!numericId) {
    return <div>Loading...</div>;
  }

  return (

    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <h2>{user.handle}&apos;s Hero</h2>

      <div
        style={{
          padding: '13px',

          flexGrow: 1,
          borderRadius: '15px',
          overflowY: 'auto', // Enable scrolling
        }}
      >
        <HeroSkillForm id={numericId} />
        <HeroAndSkillsCard
          id={aHero.id}
          image={aHero.image}
          uid={aHero.uid}
          NPC={aHero.NPC}
          userHandle={user.userHandle}
          name={aHero.name}
          archetype={aHero.archetype}
          species={aHero.species}
          homeworld={aHero.homeworld}
          gender={aHero.gender}
          age={aHero.age}
          height={aHero.height}
          weight={aHero.weight}
          forceSensitive={aHero.force_sensitive}
          dexterity={aHero.dexterity}
          knowledge={aHero.knowledge}
          mechanical={aHero.mechanical}
          perception={aHero.perception}
          strength={aHero.strength}
          technical={aHero.technical}
          forceControl={aHero.force_control}
          forceSense={aHero.force_sense}
          forceAlter={aHero.force_alter}
          forcePoints={aHero.force_points}
          darkSidePoints={aHero.dark_side_points}
          physicalDescription={aHero.physical_description}
          personality={aHero.personality}
          background={aHero.background}
          objectives={aHero.objectives}
          aQuote={aHero.a_quote}
          credits={aHero.credits}
          forceStrength={aHero.force_strength}
          characterSkills={aHero.character_skills}
        />
      </div>

    </div>

  );
};

export default HeroCodes;
