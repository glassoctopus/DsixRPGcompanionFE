import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import HeroForm from '../../../components/character/forms/HeroForm';
import { useAuth } from '../../../utils/context/authContext';
import { getSingleHero } from '../../../utils/data/heroData';

const NewHero = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const { aHero, setAHero } = useState({});

  useEffect(() => {
    getSingleHero(id).then(setAHero);
  }, [id, setAHero]);
  return (
    <div>
      <h2>Update Hero</h2>
      <HeroForm user={user} id={Number(id)} update={aHero} />
    </div>
  );
};

export default NewHero;
