import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleSpecies } from '../../../../utils/data/speciesData';
import { useAuth } from '../../../../utils/context/authContext';
import SpeciesForm from '../../../../components/character/forms/SpeciesForm';

const NewSpecies = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const [aSpecies, setASpecies] = useState({});

  useEffect(() => {
    getSingleSpecies(id).then((species) => {
      setASpecies(species);
    });
  }, [id]);

  return (
    <div className="hero-container">
      <div
        className="hero-content"
        style={{
          margin: '13px',
          border: '13px',
          padding: '13px',
          maxHeight: '666px',
          overflowY: 'auto',
        }}
      >
        <h2>
          {user?.admin
            ? 'You can edit or add Species as an admin.'
            : 'Create an unapproved Species for fun!'}
        </h2>
        <SpeciesForm user={user} id={Number(id)} species={aSpecies} />
      </div>
    </div>
  );
};
export default NewSpecies;
