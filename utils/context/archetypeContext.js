import React, {
  createContext, useContext, useState, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { getArchetypes } from '../data/archetypeData';

const ArchetypeContext = createContext();

export const useArchetypes = () => useContext(ArchetypeContext);

export const ArchetypeProvider = ({ children }) => {
  const [archetypes, setArchetypes] = useState([]);

  useEffect(() => {
    getArchetypes().then((data) => {
      setArchetypes(data);
    });
  }, []);

  return (
    <ArchetypeContext.Provider value={{ archetypes }}>
      {children}
    </ArchetypeContext.Provider>
  );
};

ArchetypeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
