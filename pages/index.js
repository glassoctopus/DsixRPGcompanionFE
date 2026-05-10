import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import FancyButton from '../components/GUI/FancyButton';
import LogoutButton from '../components/GUI/logoutButton';

function Home() {
  const router = useRouter();
  const { isAuthenticated, user, loading } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="text-center" style={{ padding: '50px' }}>
        <p>Loading...</p>
      </div>
    );
  }

  // Redirect if not authenticated (though ViewDirector should handle this)
  if (!isAuthenticated) {
    router.push('/login');
    return null;
  }

  const userId = user?.id;
  const userHandle = user?.username;
  const userBio = user?.bio || 'No bio available.';

  const handleShowForm = () => {
    if (userId) {
      router.push(`/users/${userId}`);
    } else {
      console.error('User not found or not logged in');
    }
  };

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '100%',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <>
        <h1>Hello {userHandle || 'User'}!</h1>
        <p>Your Bio: {userBio}</p>
        <p>Click the button below to update your information!</p>

        <FancyButton onClick={handleShowForm}>
          Update Information
        </FancyButton>
        <br />

        <p>Click the button below to logout!</p>

        <LogoutButton />
      </>
    </div>
  );
}

export default Home;
