import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const ViewDirectorBasedOnUserAuthStatus = ({ component: Component, pageProps }) => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  // Define public routes
  const publicRoutes = ['/login', '/register'];
  const isPublicRoute = publicRoutes.includes(router.pathname);

  useEffect(() => {
    // Redirect if trying to access protected route while not authenticated
    if (!loading && !isAuthenticated && !isPublicRoute) {
      router.push('/login');
    }
  }, [loading, isAuthenticated, isPublicRoute, router]);

  if (loading) {
    return (
      <div>Loading application...</div>
    );
  }

  // Always render the requested component - let it handle its own layout
  return <Component {...pageProps} />;
};

ViewDirectorBasedOnUserAuthStatus.propTypes = {
  component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.shape({}).isRequired,
};

export default ViewDirectorBasedOnUserAuthStatus;
