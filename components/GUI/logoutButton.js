import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useAuth } from '../../context/AuthContext';
import FancyButton from './FancyButton';

export default function LogoutButton({ children }) {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <FancyButton onClick={handleLogout}>
      {children || 'Sign Out'}
    </FancyButton>
  );
}

LogoutButton.propTypes = {
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.node,
};
