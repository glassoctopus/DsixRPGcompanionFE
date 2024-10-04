import React, { useState } from 'react';
import { useRouter } from 'next/router';
import HeroCarousel from '../../components/carousels/HeroCarousel';
import GroupCarousel from '../../components/carousels/GroupCarousel';
import FancyButton from '../../components/FancyButton';

const Index = () => {
  const [showHeroCarousel, setShowHeroCarousel] = useState(false); // State to manage HeroCarousel visibility
  const router = useRouter();

  const createNewGroup = () => {
    router.push('/groups/new');
  };

  const toggleHeroCarousel = () => {
    setShowHeroCarousel((prev) => !prev);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh', // Use 100vh to make sure it takes up the full viewport height
        overflowY: 'auto', // Enable vertical scrolling
      }}
    >
      {/* Content Wrapper */}
      <div
        style={{
          flex: 1, // Ensures the content can grow and take up available space
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '16px',
        }}
      >
        {/* Toggle Button */}
        <div style={{ margin: '20px 0' }}>
          <FancyButton onClick={toggleHeroCarousel}>
            {showHeroCarousel ? 'Hide Hero Carousel' : 'Show Hero Carousel'}
          </FancyButton>
        </div>

        {/* Conditionally Render HeroCarousel */}
        {showHeroCarousel && (
          <div style={{ width: '100%', maxWidth: '900px' }}>
            <HeroCarousel />
          </div>
        )}

        {/* Middle: Create New Group Button */}
        <div style={{ margin: '20px 0' }}>
          <FancyButton onClick={createNewGroup}>
            Create New Group
          </FancyButton>
        </div>

        {/* Bottom: GroupCarousel */}
        <div style={{ width: '100%', maxWidth: '1300px' }}>
          <GroupCarousel />
        </div>
        <div style={{ /* to allow the user to scroll I need this style ''blonk''... fix or work on more important stuff. */
          padding: '13px',
          margin: '13px',
          borderRadius: '13px',
          minHeight: '666px',
          minWidth: '666px',
        }}
        >...
        </div>
      </div>
    </div>
  );
};

export default Index;
