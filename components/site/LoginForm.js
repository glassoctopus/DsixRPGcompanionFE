import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../../context/AuthContext';
import FancySubmitButton from '../GUI/FancySubmitButton';
import FancyCardLong from '../GUI/FancyCardLong';

export default function LoginForm() {
  const router = useRouter();
  const { login, loading: authLoading } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!username || !password) {
      setError('Please enter both username and password');
      setLoading(false);
      return;
    }

    const result = await login(username, password);
    if (result.success) {
      router.push('/');
    } else {
      setError(result.error || 'Invalid username or password');
    }
    setLoading(false);
  };

  return (
    <FancyCardLong>
      <h1 className="text-center mb-4">Welcome Back</h1>
      <h5 className="text-center mb-4 text-muted">
        Log in to continue to D6 RPG Companion
      </h5>

      {error && (
        <div className="alert alert-danger mb-3" role="alert">
          <strong>Error:</strong> {error}
        </div>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={loading || authLoading}
            autoFocus
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading || authLoading}
          />
        </Form.Group>

        <FancySubmitButton disabled={loading || authLoading}>
          {loading ? 'Logging In...' : 'Log In'}
        </FancySubmitButton>
      </Form>

      <div className="text-center mt-4">
        <p className="mb-0">
          Don&apos;t have an account?{' '}
          <Link href="/register" style={{ color: '#007bff' }}>
            Register here
          </Link>
        </p>
      </div>
    </FancyCardLong>
  );
}
