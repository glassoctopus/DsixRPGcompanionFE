// import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
// import { useAuth } from '../../../utils/context/authContext';
// import { getArchetypes } from '../../../utils/data/archetypeData';

const Archetype = () =>
//   const [archetype, setArchetype] = useState([]);
//   const { user } = useAuth();

//   useEffect(() => {
//     if (user && user.uid) {
//       getArchtype().then((data) => {
//         setArchtype(data);
//       });
//     }
//   }, [user]);
  // eslint-disable-next-line implicit-arrow-linebreak
  (
    <div className="hero-container">
      <div className="hero-content">
        <article className="Hero">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">Archtype List</h2>
            <Link href="archetype/archetypes/new" passHref>
              <Button variant="primary">
                New Character Archtype
              </Button>
            </Link>
          </div>
        </article>
      </div>
    </div>
  );

export default Archetype;
