import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { getHeros } from '../../utils/data/heroData';
import HeroCard from '../../components/character/cards/HeroCard';
import FancyButton from '../../components/FancyButton';

const Hero = () => {
  const [heros, setHeros] = useState([]);
  const [myHeros, setMyHeros] = useState([]);
  const [showMine, setShowMine] = useState(true); // New state to toggle between mine and all heroes
  const { user } = useAuth();
  const router = useRouter();

  const handleClick = () => {
    router.push('/heros/new');
  };

  const handleToggleView = () => {
    setShowMine(!showMine); // Toggle the state between true and false
  };

  useEffect(() => {
    if (user && user.uid) {
      getHeros().then((data) => {
        setHeros(data);
      });
    }
  }, [user]);

  useEffect(() => {
    const userHeros = heros.filter((mines) => mines.user === user.id);
    setMyHeros(userHeros);
  }, [heros, user]);

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
          <h2 style={{ fontSize: '2rem', margin: '0' }}>Hero List</h2>

          {/* Button to toggle between "mine" and "all" */}
          <FancyButton onClick={handleToggleView}>
            {showMine ? 'Show All' : 'Show Mine'}  {/* Button label */}
          </FancyButton>

          <FancyButton onClick={handleClick}>
            Create New Hero
          </FancyButton>
        </div>

        <div style={{
          maxHeight: '80vh', overflowY: 'auto', display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '10px', boxSizing: 'border-box',
        }}
        >
          {(showMine ? myHeros : heros).length > 0 ? (
            (showMine ? myHeros : heros).map((hero) => (
              <div
                key={hero.id}
                style={{
                  background: 'rgba(255, 215, 0, 0.85)',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  flex: '1 1 calc(50.000% - 13px)', // Adjust for 2 columns
                  maxWidth: 'calc(50.000% - 20px)',
                }}
              >
                <HeroCard
                  id={hero.id}
                  image={hero.image}
                  uid={hero.uid}
                  NPC={hero.NPC}
                  userHandle={hero.user_handle}
                  name={hero.name}
                  archetype={hero.archetype}
                  species={hero.species}
                  homeworld={hero.homeworld}
                  gender={hero.gender}
                  age={hero.age}
                  height={hero.height}
                  weight={hero.weight}
                  forceSensitive={hero.force_sensitive}
                  dexterity={hero.dexterity}
                  knowledge={hero.knowledge}
                  mechanical={hero.mechanical}
                  perception={hero.perception}
                  strength={hero.strength}
                  technical={hero.technical}
                  forceControl={hero.force_control}
                  forceSense={hero.force_sense}
                  forceAlter={hero.force_alter}
                  forcePoints={hero.force_points}
                  darkSidePoints={hero.dark_side_points}
                  physicalDescription={hero.physical_description}
                  personality={hero.personality}
                  background={hero.background}
                  objectives={hero.objectives}
                  aQuote={hero.a_quote}
                  credits={hero.credits}
                  forceStrength={hero.force_strength}
                />
              </div>
            ))
          ) : (
            <p>No heroes found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
