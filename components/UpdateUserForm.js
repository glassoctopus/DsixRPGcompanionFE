import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';
import { updateThisUser } from '../utils/data/user';

const UpdateUserForm = ({ user }) => {
  const router = useRouter();
  const [userData, setUserData] = useState({
    uid: user.uid,
    handle: user.handle || '',
    bio: user.bio || '',
    gameMaster: user.gameMaster || false,
    admin: user.admin || false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateThisUser(user.id, userData)
      .then(() => {
        router.push('/users');
      })
      .catch((error) => {
        console.error('Error updating user:', error);
      });
  };

  const toggleGameMaster = () => {
    setUserData((prev) => ({ ...prev, gameMaster: !prev.gameMaster }));
  };

  const toggleAdmin = () => {
    setUserData((prev) => ({ ...prev, admin: !prev.admin }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicHandle">
        <Form.Label>User Handle</Form.Label>
        <Form.Control
          type="text"
          name="handle"
          required
          placeholder="Enter your handle"
          value={userData.handle}
          onChange={({ target }) => setUserData((prev) => ({ ...prev, [target.name]: target.value }))}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicBio">
        <Form.Label>User Bio</Form.Label>
        <Form.Control
          as="textarea"
          name="bio"
          required
          placeholder="Enter your Bio"
          value={userData.bio}
          onChange={({ target }) => setUserData((prev) => ({ ...prev, [target.name]: target.value }))}
        />
        <Form.Text className="text-muted">
          Let other players know a little bit about you...
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGameMaster">
        <Button variant={userData.gameMaster ? 'success' : 'secondary'} onClick={toggleGameMaster}>
          {userData.gameMaster ? 'a Game Master' : 'Not a Game Master'}
        </Button>
        <h5 style={{ display: 'inline-block', marginLeft: '15px' }}>
          {userData.gameMaster ? 'You are a Game Master, click the button to leave this role' : 'You are not a Game Master, click the button to be a GM in this community!'}
        </h5>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formAdmin">
        <Button variant={userData.admin ? 'success' : 'secondary'} onClick={toggleAdmin}>
          {userData.admin ? 'Admin' : 'Not Admin'}
        </Button>
        <h5 style={{ display: 'inline-block', marginLeft: '15px' }}>
          {userData.admin ? 'You are potentially an Admin' : 'You are not an Admin, click the button to submit a request to apply for admin memebership in this community.'}
        </h5>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

UpdateUserForm.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    uid: PropTypes.string.isRequired,
    handle: PropTypes.string,
    bio: PropTypes.string,
    gameMaster: PropTypes.bool,
    admin: PropTypes.bool,
  }).isRequired,
};

export default UpdateUserForm;
