import { useRouter } from 'next/router';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import FancyButton from '../components/FancyButton';

function Home() {
  const { user } = useAuth();
  const router = useRouter();

  const handleShowForm = () => {
    if (user && user.uid) {
      router.push(`/users/${user.id}`);
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

        <FancyButton
          onClick={handleShowForm} // Show the form on click
        >
          Update Information
        </FancyButton>
        <br />

        <p>Click the button below to logout!</p>

        <FancyButton onClick={signOut}>
          Sign Out
        </FancyButton>
      </>
    </div>
  );
}

export default Home;
