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
      <h2>Your Hero</h2>
      <div
        style={{
          padding: '13px',
          backgroundColor: 'rgba(244, 244, 244, 0.5)',
          flexGrow: 1,
          overflowY: 'auto', // Enable scrolling
        }}
      >
        <HeroSkillForm id={numericId} />
        <HeroAndSkillsCard id={numericId} />
      </div>
    </div>
  );
};

export default HeroCodes;
