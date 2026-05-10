/* eslint-disable react/prop-types */
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import { AuthProvider } from '../context/AuthContext';
import StarField from '../components/site/StarField';
import ViewDirectorBasedOnUserAuthStatus from '../utils/ViewDirector';
import Layout from '../components/site/layout';

const MyApp = ({ Component, pageProps }) => {
  const { session, ...restPageProps } = pageProps;

  return (
    <AuthProvider>
      <StarField>
        <Layout>
          <ViewDirectorBasedOnUserAuthStatus
            component={Component}
            pageProps={restPageProps}
          />
        </Layout>
      </StarField>
    </AuthProvider>
  );
};

export default MyApp;
