import React from 'react';
import { useHeros } from '../../utils/context/heroContext';
import HeroOverviewCard from '../character/cards/HeroOverviewCard'; // Adjust the path based on your directory structure

const HeroCarousel = () => {
  const { heros } = useHeros();

  // Ensure heros is always an array
  if (!Array.isArray(heros)) {
    return <p>Loading heroes...</p>;
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '16px',
        overflowX: 'auto',
        maxWidth: '100%',
        whiteSpace: 'nowrap',
        scrollSnapType: 'x mandatory',
        WebkitOverflowScrolling: 'touch', // Smooth scrolling for iOS
      }}
    >
      {heros.length > 0 ? (
        heros.map((hero, index) => (
          <div
            key={hero.id}
            style={{
              flex: '0 0 auto',
              scrollSnapAlign: 'center',
              marginRight: '13px',
              marginLeft: '13px',
              transition: 'transform 0.3s ease-in-out',
              cursor: 'pointer',
              paddingLeft: index === 0 ? '7vh' : '0', // Add extra padding for the first card
              paddingRight: index === heros.length - 1 ? '16px' : '0', // Add extra padding for the last card
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <HeroOverviewCard
              id={hero.id}
              userHandle={hero.user_handle}
              name={hero.name}
              archetypeName={hero.archetype_name}
              groupName={hero.group_name}
              key={hero.id}
            />
          </div>
        ))
      ) : (
        <p>No heroes available.</p>
      )}
    </div>
  );
};

export default HeroCarousel;
