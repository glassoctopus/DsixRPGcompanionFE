import React from 'react';
import { signIn } from '../utils/auth';
import FancyButton from './FancyButton';
import FancyCardLong from './character/cards/FancyCard copy';

function Signin() {
  return (

    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        display: 'flex',
        justifyContent: 'center', // Center vertically
        alignItems: 'center', // Center horizontally
        padding: '30px',
        margin: '0 auto',
        zIndex: 1,
        minHeight: '25rem',
        width: '100%',
        minWidth: '30rem',
        paddingBlock: '0 5rem',
      }}
    >
      <FancyCardLong>
        <h1>Welcome to the D6 RPG Companion</h1>
        <h5>A long term project to produce a working aid to running D6 campaigns, especially with friends</h5>
        <FancyButton type="button" style={{ fontSize: '1.5rem', padding: '10px 20px', maxWidth: '666px' }} onClick={signIn}>
          Sign In
        </FancyButton>
      </FancyCardLong>
    </div>

  );
}

export default Signin;
