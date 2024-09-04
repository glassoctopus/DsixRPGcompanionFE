/* eslint-disable react/prop-types */
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import { AuthProvider } from '../utils/context/authContext';
import ViewDirectorBasedOnUserAuthStatus from '../utils/ViewDirector';
import StarField from '../components/StarField'; // procedural background element
import { ArchetypeProvider } from '../utils/context/archetypeContext';
import { SkillProvider } from '../utils/context/skillContext';

const MyApp = ({ Component, pageProps }) => (
  <AuthProvider>
    <ArchetypeProvider>
      <SkillProvider>
        {/* gives children components access to user and auth methods */}
        <StarField>
          <ViewDirectorBasedOnUserAuthStatus
          // if status is pending === loading
          // if status is logged in === view app
          // if status is logged out === sign in page
            component={Component}
            pageProps={pageProps}
          />
        </StarField>
      </SkillProvider>
    </ArchetypeProvider>
  </AuthProvider>
);

export default MyApp;
