/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import LogoutButton from '../GUI/logoutButton';

const NavBar = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <Navbar collapseOnSelect expand="lg" bg="transparent" variant="dark">
      <Container>
        <Link href="/" passHref legacyBehavior>
          <Navbar.Brand>D6 RPG Companion</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link href="/heros" passHref legacyBehavior>
              <Nav.Link>Make a Hero</Nav.Link>
            </Link>
            <Link href="/heros/archetypes/" passHref legacyBehavior>
              <Nav.Link>Hero Templates</Nav.Link>
            </Link>
            <Link href="/skills" passHref legacyBehavior>
              <Nav.Link>Skill DB</Nav.Link>
            </Link>
            <Link href="/heros/species/" passHref legacyBehavior>
              <Nav.Link>Species</Nav.Link>
            </Link>
            <Link href="/heros/abilities/" passHref legacyBehavior>
              <Nav.Link>Abilities</Nav.Link>
            </Link>
            <Link href="/groups" passHref legacyBehavior>
              <Nav.Link>Groups</Nav.Link>
            </Link>
            <Link href="/notes" passHref legacyBehavior>
              <Nav.Link>What is next</Nav.Link>
            </Link>
          </Nav>

          {/* Authentication section */}
          {!isAuthenticated ? (
            <Nav>
              <Link href="/login" passHref legacyBehavior>
                <Nav.Link>Login</Nav.Link>
              </Link>
              <Link href="/register" passHref legacyBehavior>
                <Nav.Link>Register</Nav.Link>
              </Link>
            </Nav>
          ) : (
            <Nav>
              <Navbar.Text className="me-2">
                Hello, {user?.username || 'User'}
              </Navbar.Text>
              <LogoutButton>Sign Out</LogoutButton>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
