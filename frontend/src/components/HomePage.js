// src/HomePage.js
import Navbar from './Navbar';
import SignupButton from './SignupButton';
import LoginButton from './LoginButton';
import React from 'react';

const HomePage = () => {
  return (
    <div>
        <div>
            <Navbar/>
        </div>
        <div className="flex flex-col items-center mt-20">
          <p>If You are a new user:  <SignupButton /></p>
          <p>If You are an existing:  <LoginButton /></p>
        </div>


    </div>
  );
};

export default HomePage;
