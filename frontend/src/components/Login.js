import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  const handleLogin = async () => {
    try {
      if (!username || !password) {
        alert('All fields are mandatory');
        return;
      }
      const apiUrl = 'http://localhost:5001/api/login';
      const response = await axios.post(apiUrl, { username, password });

      if (response.status === 200) {
        setLoginMessage('Login successful');
      } else if (response.status === 401) {
        setLoginMessage('Invalid credentials');
      }
    } catch (error) {
      console.error('Error:', error);
      setLoginMessage('An error occurred during login');
    }
  };

  return (
    <div className="LoginContainer p-4 border border-gray-300 rounded-md shadow-md max-w-md mx-auto mt-10 bg-grey">
      <h2 className="text-center text-lg font-semibold mb-4">Login</h2>
      <label className="block text-sm mb-1">Username:</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full py-2 px-3 border border-gray-300 rounded-md mb-3 focus:outline-none focus:border-blue-500"
      />
      <label className="block text-sm mb-1">Password:</label>
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full py-2 px-3 border border-gray-300 rounded-md mb-3 focus:outline-none focus:border-blue-500"
        />
        <FontAwesomeIcon
          icon={showPassword ? faEye : faEyeSlash}
          className="absolute top-1/2 right-3 transform -translate-y-1/2 text-blue-500 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        />
      </div>
      <button
        onClick={handleLogin}
        className="w-full py-2 bg-blue-500 text-white rounded-md text-lg cursor-pointer hover:bg-blue-600 focus:outline-none"
      >
        Login
      </button>
      {loginMessage && <p className="text-red-500 text-sm mt-1">{loginMessage}</p>}
    </div>
  );
}

export default Login;
