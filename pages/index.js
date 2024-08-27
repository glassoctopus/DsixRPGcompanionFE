import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth(); // Get user from context
  const router = useRouter(); // Initialize router

  const handleShowForm = () => {
    if (user && user.uid) {
      router.push(`/users/${user.id}`); // Navigate to the update form dynamically
    } else {
      console.error('User not found or not logged in');
    }
  };

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <>
        <h1>Hello {user?.handle || 'User'}!</h1>
        <p>Your Bio: {user?.bio || 'No bio available.'}</p>
        <p>Click the button below to update your information!</p>

        <Button
          variant="success"
          type="button"
          size="lg"
          className="copy-btn"
          onClick={handleShowForm} // Show the form on click
        >
          Update Information
        </Button>

        <p>Click the button below to logout!</p>

        <Button
          variant="danger"
          type="button"
          size="lg"
          className="copy-btn"
          onClick={signOut}
        >
          Sign Out
        </Button>
      </>
    </div>
  );
}

export default Home;
