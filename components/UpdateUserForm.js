import PropTypes from 'prop-types';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';
import { updateThisUser } from '../utils/data/user';
import FancyButton from './FancyButton';
import FancyCard from './character/cards/FancyCard';

const UpdateUserForm = ({ user }) => {
  const router = useRouter();
  const [userData, setUserData] = useState({
    id: user.id,
    uid: user.uid,
    handle: user.handle || '',
    bio: user.bio || '',
    game_master: user.game_master || false,
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
    setUserData((prev) => ({ ...prev, game_master: !prev.game_master }));
  };

  const toggleAdmin = () => {
    setUserData((prev) => ({ ...prev, admin: !prev.admin }));
  };

  return (
    <FancyCard>
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

        <Form.Group className="mb-3" controlId="formGame_master">
          <FancyButton onClick={toggleGameMaster}>
            {userData.game_master ? 'a Game Master' : 'Not a Game Master'}
          </FancyButton>
          <h5 style={{ display: 'inline-block', marginLeft: '15px' }}>
            {userData.game_master ? 'You are a Game Master, click the button to leave this role' : 'You are not a Game Master, click the button to be a GM in this community!'}
          </h5>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formAdmin">
          <FancyButton onClick={toggleAdmin}>
            {userData.admin ? 'Admin' : 'Not Admin'}
          </FancyButton>
          <h5 style={{ display: 'inline-block', marginLeft: '15px' }}>
            {userData.admin ? 'You are potentially an Admin' : 'You are not an Admin, click the button to submit a request to apply for admin membership in this community.'}
          </h5>
        </Form.Group>

        <FancyButton onClick={handleSubmit}>
          Submit
        </FancyButton>
      </Form>
    </FancyCard>
  );
};

UpdateUserForm.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    uid: PropTypes.string.isRequired,
    handle: PropTypes.string,
    bio: PropTypes.string,
    game_master: PropTypes.bool,
    admin: PropTypes.bool,
  }).isRequired,
};

export default UpdateUserForm;
