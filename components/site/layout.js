import NavBar from './NavBar';

// eslint-disable-next-line react/prop-types
export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      <main>{children}</main>
    </>
  );
}
