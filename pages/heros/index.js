import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getHeros } from '../../utils/data/heroData';
import HeroCard from '../../components/character/cards/HeroCard'; // Update path if necessary

const Hero = () => {
  const [heros, setHeros] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user && user.uid) {
      getHeros().then((data) => {
        setHeros(data);
      });
    }
  }, [user]);

  return (
    <div className="hero-container">
      <div className="hero-content">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">Hero List</h2>
          <Button variant="success" href="/heros/new">Create New Hero</Button>
        </div>
        <div className="row">
          {heros.length > 0 ? (
            heros.map((hero) => (
              <div className="col-md-4 mb-4" key={hero.id}>
                <HeroCard
                  image={hero.image}
                  name={hero.name}
                  species={hero.species}
                  homeworld={hero.homeworld}
                  gender={hero.gender}
                  age={hero.age}
                  height={hero.height}
                  weight={hero.weight}
                  physicalDescription={hero.physical_description}
                  personality={hero.personality}
                  background={hero.background}
                  objectives={hero.objectives}
                  aQuote={hero.a_quote}
                  credits={hero.credits}
                  forceSensitive={hero.force_sensitive}
                  dexterity={hero.dexterity}
                  knowledge={hero.knowledge}
                  mechanical={hero.mechanical}
                  perception={hero.perception}
                  strength={hero.strength}
                  technical={hero.technical}
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
