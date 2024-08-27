import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const StarField = ({ children }) => {
  useEffect(() => {
    const starField = document.getElementById('stars');
    const starCount = 666;

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.className = 'star';

      const size = Math.random() * 3 + 1; // Random size between 1px and 4px
      const posX = Math.random() * window.innerWidth;
      const posY = Math.random() * window.innerHeight;

      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.top = `${posY}px`;
      star.style.left = `${posX}px`;
      star.style.pointerEvents = 'none'; // Ensure stars do not block interactions

      starField.appendChild(star);
    }
  }, []); // Empty dependency array to run the effect only once

  return (
    <div id="starfield">
      <div id="stars" />
      <div className="content">
        {children}
      </div>
    </div>
  );
};

StarField.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarField;
