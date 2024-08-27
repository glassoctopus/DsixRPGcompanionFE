import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import UpdateUserForm from '../../components/UpdateUserForm';
import { useAuth } from '../../utils/context/authContext';
import { getSingleUser } from '../../utils/data/user';

const UserUpdate = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const [theUser, setTheUser] = useState({});

  useEffect(() => {
    if (id) {
      getSingleUser(id).then(setTheUser);
    }
  }, [id]);

  return (
    <div className="hero-container">
      <div className="hero-content">
        <h2>Update your user profile</h2>
        <UpdateUserForm user={user} id={Number(id)} update={theUser} />
      </div>
    </div>
  );
};

export default UserUpdate;
