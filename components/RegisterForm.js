import PropTypes from 'prop-types';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';
import { registerUser } from '../utils/auth';
import FancyButton from './FancyButton';
import FancyCardLong from './character/cards/FancyCardLong';

function RegisterForm({ user, updateUser }) {
  const router = useRouter();
  const [userData, setUserData] = useState({
    uid: user.uid || '',
    handle: '',
    bio: '',
    game_master: false,
    admin: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(userData)
      .then(() => {
        updateUser(user.uid);
        router.push('/users');
      })
      .catch((error) => {
        console.error('Error registering user:', error);
      });
  };

  const handleInputChange = ({
    target: {
      name, value, type, checked,
    },
  }) => {
    setUserData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value, // this inputChange handles both text input and checkbox
    }));
  };

  return (
    <FancyCardLong>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicHandle">
          <Form.Label>User Handle</Form.Label>
          <Form.Control
            type="text"
            name="handle"
            required
            placeholder="Enter your handle"
            value={userData.handle}
            onChange={handleInputChange}
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
            onChange={handleInputChange}
          />
          <Form.Text className="text-muted">
            Let other players know a little bit about you...
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGameMaster">
          <Form.Check
            type="checkbox"
            name="game_master"
            label="Game Master"
            checked={userData.game_master}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formAdmin">
          <Form.Check
            type="checkbox"
            name="admin"
            label="Admin"
            checked={userData.admin}
            onChange={handleInputChange}
          />
        </Form.Group>

        <FancyButton onClick={handleSubmit}>
          Register
        </FancyButton>
      </Form>
    </FancyCardLong>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default RegisterForm;
