/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

const NavBar = () => (
  <Navbar collapseOnSelect expand="lg" bg="transparent" variant="dark">
    <Container>
      <Link passHref href="/heros">
        <Navbar.Brand>D6 RPG Companion</Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
          <Link passHref href="/">
            <Nav.Link>Home</Nav.Link>
          </Link>
          <Link passHref href="/heros">
            <Nav.Link>Make a Hero</Nav.Link>
          </Link>
          <Link passHref href="/heros/archetypes/">
            <Nav.Link>Hero Templates</Nav.Link>
          </Link>
          <Link passHref href="/skills">
            <Nav.Link>Skill DB</Nav.Link>
          </Link>
          <Link passHref href="/Groups">
            <Nav.Link>Groups</Nav.Link>
          </Link>
          <Link passHref href="/notes">
            <Nav.Link>What is next</Nav.Link>
          </Link>
        </Nav>
        <button type="button" onClick={signOut}>
          Sign Out
        </button>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);
export default NavBar;
