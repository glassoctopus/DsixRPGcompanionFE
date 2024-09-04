import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuth } from '../../utils/context/authContext';
import { getSingleHero } from '../../utils/data/heroData';
// import HeroForm from '../../components/character/forms/HeroForm';
import HeroCard from '../../components/character/cards/HeroAndSkillsCard';

const HeroById = () => {
  const router = useRouter();
  const { id } = router.query;
  //   const { user } = useAuth();
  const [aHero, setAHero] = useState({});
  const { user } = useAuth();
  // eslint-disable-next-line no-unused-vars
  const [numericId, setNumericId] = useState(0);

  useEffect(() => {
    if (id) {
      const parsedId = Number(id);
      setNumericId(parsedId);
      getSingleHero(parsedId).then(setAHero);
    }
  }, [id]);

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <h2>Your Hero</h2>
      <div
        style={{
          padding: '13px',
          backgroundColor: 'rgba(244, 244, 244, 0.5)',
          flexGrow: 1,
          overflowY: 'auto', // Enable scrolling
        }}
      >
        <div>
          <HeroCard
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
        {/* <HeroForm hero={aHero} id={numericId} /> */}

      </div>
    </div>
  );
};

export default HeroById;
