import React, { useState } from 'react';
import { useRouter } from 'next/router';
import HeroCarousel from '../../components/carousels/HeroCarousel';
import GroupCarousel from '../../components/carousels/GroupCarousel';

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
          <button
            type="button"
            onClick={toggleHeroCarousel}
            style={{
              padding: '10px 16px',
              backgroundColor: '#593A80',
              color: '#ffffcc',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {showHeroCarousel ? 'Hide Hero Carousel' : 'Show Hero Carousel'}
          </button>
        </div>

        {/* Conditionally Render HeroCarousel */}
        {showHeroCarousel && (
          <div style={{ width: '100%', maxWidth: '900px' }}>
            <HeroCarousel />
          </div>
        )}

        {/* Middle: Create New Group Button */}
        <div style={{ margin: '20px 0' }}>
          <button
            type="button"
            onClick={createNewGroup}
            style={{
              padding: '10px 16px',
              backgroundColor: '#593A80',
              color: '#ffffcc',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Create New Group
          </button>
        </div>

        {/* Bottom: GroupCarousel */}
        <div style={{ width: '100%', maxWidth: '1300px' }}>
          <GroupCarousel />
        </div>
      </div>
    </div>
  );
};

export default Index;
