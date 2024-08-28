import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ArchtypeForm from '../../../../components/character/forms/ArchtypeForm';
import { useAuth } from '../../../../utils/context/authContext';
import { getSingleArchetype } from '../../../../utils/data/archetypeData';

const NewArchetype = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const { anArchtype, setAnArchtype } = useState({});

  useEffect(() => {
    getSingleArchetype(id).then(setAnArchtype);
  }, [id, setAnArchtype]);
  return (
    <div className="hero-container">
      <div className="hero-content">
        <h2>
          {user?.admin
            ? 'You can edit or add Archetypes as an admin.'
            : 'Create a NPC Archetype for fun!'}
        </h2>
        <ArchtypeForm user={user} id={Number(id)} update={anArchtype} />
      </div>
    </div>
  );
};

export default NewArchetype;
