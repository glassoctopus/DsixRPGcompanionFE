import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { registerUser } from '../utils/auth'; // Update with path to registerUser

function RegisterForm({ user, updateUser }) {
  const [formData, setFormData] = useState({
    bio: '',
    uid: user.uid,
    // gameMaster: user.game_master,
  });
  // const [checkBoxState, setCheckBoxState] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formData).then(() => updateUser(user.uid));
  };

  // const handleCheckboxChange = (event) => {
  //   setCheckBoxState(event.target.checked);
  // };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>User Bio</Form.Label>
        <Form.Control as="textarea" name="bio" required placeholder="Enter your Bio" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
        <Form.Text className="text-muted">Let other players know a little bit about you...</Form.Text>
        {/* <Form.Input type="checkbox" checked={checkBoxState} id="GameMaster" name="GameMaster" value="GameMaster" onChange={handleCheckboxChange}>Are you a Game Master?</Form.Input> */}
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    // game_master: PropTypes.bool,
  }).isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default RegisterForm;
