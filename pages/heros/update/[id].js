import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import HeroForm from '../../../components/character/forms/HeroForm';
import { getSingleHero } from '../../../utils/data/heroData';

const NewHero = () => {
  const router = useRouter();
  const { id } = router.query;
  const [numericId, setNumericId] = useState(0);
  const [aHero, setAHero] = useState({
    id: 0,
    uid: '',
    NPC: true,
    user: 0,
    image: '',
    name: '',
    archetype: null,
    species: '',
    homeworld: '',
    gender: '',
    age: 0,
    height: '',
    weight: '',
    physical_description: '',
    personality: '',
    background: '',
    objectives: '',
    a_quote: '',
    credits: 0,
    force_sensitive: false,
    dexterity: 0.0,
    knowledge: 0.0,
    mechanical: 0.0,
    perception: 0.0,
    strength: 0.0,
    technical: 0.0,
    force_control: 0.0,
    force_sense: 0.0,
    force_alter: 0.0,
    force_points: 0,
    dark_side_points: 0,
    force_strength: 0,
  });

  useEffect(() => {
    if (id) {
      const parsedId = Number(id);
      setNumericId(parsedId);
      getSingleHero(parsedId).then(setAHero);
    }
  }, [id]);

  const editSkills = () => {
    router.push(`/heros/update/heroCodes/${id}`);
  };

  return (
    <div>
      <h2>Update Hero</h2>
      <button type="button" onClick={editSkills}>
        Edit Skills
      </button>
      {aHero ? (
        <div>
          <HeroForm hero={aHero} id={numericId} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default NewHero;
