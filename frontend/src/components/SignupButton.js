// src/components/SignupButton.js
import React from 'react';
import { Link } from 'react-router-dom';

const SignupButton = () => {
  return (
    <Link to="/signup">
    <button className="p-2 m-1 text-base bg-blue-500 text-white rounded">Signup</button>
    </Link>
  );
};

export default SignupButton;
