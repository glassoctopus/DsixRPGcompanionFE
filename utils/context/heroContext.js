import React, {
  createContext, useContext, useState, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { getHeros } from '../data/heroData';

const HeroContext = createContext();

export const useHeros = () => useContext(HeroContext);

export const HeroProvider = ({ children }) => {
  const [heros, setHeros] = useState([]);

  useEffect(() => {
    getHeros().then((response) => {
      console.log('API response:', response);
      setHeros(response);
    });
  }, []);

  return (
    <HeroContext.Provider value={{ heros }}>
      {children}
    </HeroContext.Provider>
  );
};

HeroProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
