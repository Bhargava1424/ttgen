// src/components/LoginButton.js
import React from 'react';
import { Link } from 'react-router-dom';

const LoginButton = () => {
  return (
    <Link to="/login">
    <button className="p-2 m-1 text-base bg-green-500 text-white rounded">Login</button>
    </Link>
  );
};

export default LoginButton;
