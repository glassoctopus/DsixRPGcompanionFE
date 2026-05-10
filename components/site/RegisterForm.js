// components/RegisterForm.jsx
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';
import FancySubmitButton from '../GUI/FancySubmitButton';
import FancyCardLong from '../GUI/FancyCardLong';

function RegisterForm() {
  const router = useRouter();
  const { refreshSession } = useAuth(); // <-- use refreshSession instead of signIn
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    confirmPassword: '',
    handle: '',
    bio: '',
    game_master: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (userData.password !== userData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (userData.password.length < 8) {
      setError('Password must be at least 8 characters');
      setLoading(false);
      return;
    }

    try {
      // Register with Django (only send fields backend expects)
      const registerRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // <-- important to receive session cookie
        body: JSON.stringify({
          username: userData.username,
          email: userData.email,
          first_name: userData.first_name,
          last_name: userData.last_name,
          password: userData.password,
          handle: userData.handle || userData.username,
          bio: userData.bio,
          game_master: userData.game_master,
        }),
      });

      const registerData = await registerRes.json();

      if (!registerRes.ok) {
        setError(registerData.error || 'Registration failed');
        setLoading(false);
        return;
      }

      // Registration succeeded and Django automatically logged the user in (session cookie set)
      // Refresh the client-side session state so navbar updates
      await refreshSession();

      // Redirect to home page
      router.push('/');
    } catch (err) {
      console.error('Registration error:', err);
      setError('Network error. Please try again.');
      setLoading(false);
    }
  };

  const handleInputChange = ({
    target: {
      name, value, type, checked,
    },
  }) => {
    setUserData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <FancyCardLong>
      <h2 className="text-center mb-4">Create Account</h2>
      <Form onSubmit={handleSubmit}>
        {error && (
          <div className="alert alert-danger mb-3" role="alert">
            {error}
          </div>
        )}

        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username *</Form.Label>
          <Form.Control
            type="text"
            name="username"
            required
            placeholder="Choose a username"
            value={userData.username}
            onChange={handleInputChange}
            disabled={loading}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formFirstName">
          <Form.Label>First Name (optional)</Form.Label>
          <Form.Control
            type="text"
            name="first_name"
            placeholder="Your first name"
            value={userData.first_name}
            onChange={handleInputChange}
            disabled={loading}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formLastName">
          <Form.Label>Last Name (optional)</Form.Label>
          <Form.Control
            type="text"
            name="last_name"
            placeholder="Your last name"
            value={userData.last_name}
            onChange={handleInputChange}
            disabled={loading}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email (optional)</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="your@email.com"
            value={userData.email}
            onChange={handleInputChange}
            disabled={loading}
          />
          <Form.Text className="text-muted">
            Used for password recovery
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formHandle">
          <Form.Label>Display Handle (optional)</Form.Label>
          <Form.Control
            type="text"
            name="handle"
            placeholder="How others see you"
            value={userData.handle}
            onChange={handleInputChange}
            disabled={loading}
          />
          <Form.Text className="text-muted">
            If blank, your username will be used
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBio">
          <Form.Label>Bio (optional)</Form.Label>
          <Form.Control
            as="textarea"
            name="bio"
            rows={3}
            placeholder="Tell other players a bit about yourself..."
            value={userData.bio}
            onChange={handleInputChange}
            disabled={loading}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password *</Form.Label>
          <Form.Control
            type="password"
            name="password"
            required
            placeholder="Create a password"
            value={userData.password}
            onChange={handleInputChange}
            disabled={loading}
          />
          <Form.Text className="text-muted">
            Minimum 8 characters
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formConfirmPassword">
          <Form.Label>Confirm Password *</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            required
            placeholder="Confirm your password"
            value={userData.confirmPassword}
            onChange={handleInputChange}
            disabled={loading}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGameMaster">
          <Form.Check
            type="checkbox"
            name="game_master"
            label="I want to be a Game Master"
            checked={userData.game_master}
            onChange={handleInputChange}
            disabled={loading}
          />
          <Form.Text className="text-muted">
            Game Master requests require admin approval. You will be notified when approved.
          </Form.Text>
        </Form.Group>

        <FancySubmitButton disabled={loading}>
          {loading ? 'Creating Account...' : 'Register'}
        </FancySubmitButton>
      </Form>
    </FancyCardLong>
  );
}

export default RegisterForm;
