import React, {
  createContext, useContext, useState, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { getSkills } from '../data/skillData';

const SkillContext = createContext();

export const useSkills = () => useContext(SkillContext);

export const SkillProvider = ({ children }) => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    getSkills().then((data) => {
      setSkills(data);
    });
  }, []);

  return (
    <SkillContext.Provider value={{ skills }}>
      {children}
    </SkillContext.Provider>
  );
};

SkillProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
