import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';
import { registerUser } from '../utils/auth';
// import { updateGameMasterStatus } from '../utils/data/user';

function UpdateUserForm({ user, onUserUpdate }) {
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
    registerUser(userData)
      .then(() => {
        onUserUpdate(user.uid);
        router.push('/users');
      })
      .catch((error) => {
        console.error('Error registering or updating user:', error);
      });
  };

  const handleCheckboxChange = (e) => {
    setUserData((prev) => ({ ...prev, gameMaster: e.target.checked, admin: e.target.checked }));
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
        <Form.Check
          type="checkbox"
          name="gameMaster"
          label="Game Master"
          checked={userData.gameMaster}
          onChange={handleCheckboxChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formAdmin">
        <Form.Check
          type="checkbox"
          name="admin"
          label="Admin"
          checked={userData.admin}
          onChange={handleCheckboxChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

UpdateUserForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    handle: PropTypes.string,
    bio: PropTypes.string,
    gameMaster: PropTypes.bool,
    admin: PropTypes.bool,
  }).isRequired,
  onUserUpdate: PropTypes.func.isRequired, // Ensure onUserUpdate is defined here
};

export default UpdateUserForm;
