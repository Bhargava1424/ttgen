import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Login from './Login'; // Import the Login component


const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [showPassword, setShowPassword] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [signupError, setSignupError] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false); // New state for signup success

  const handleSignUp = async () => {
    try {
      if (!username || !password || !mobile) {
        alert('All fields are mandatory');
        return;
      }

      const apiUrl = 'http://localhost:5000/api/signup';
      const response = await axios.post(apiUrl, { username, password, mobile });

      // Check if the response has a message
      if (response.data && response.data.message) {
        alert(response.data.message);
      }
      console.log('User registered successfully');
      setSignupError('');
      setSignupSuccess(true);
      

    } catch (error) {
      console.error('Error registering user:', error);

      if (error.response) {
        if (error.response.status === 400) {
          setSignupError('Username is already in use');
          setMobileError('Mobile number is already in use');
        } else if (error.response.status === 409) {
          setMobileError('Mobile number is already in use');
        } else if (error.response.status === 422) {
          setSignupError('Username is already in use');
        }
      } else {
        setSignupError('Error registering user. Please try again later.');
      }
    }
  };

  const handleUserChange = (e) => {
    setSignupError('');
    setUsername(e.target.value);
  };

  const handleMobileChange = (e) => {
    var inputValue = e.target.value;
    var last = inputValue.at(-1);
    inputValue = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
    if (last >= 0 && last <= 9) {
      setMobileError('');
      setSignupError('');
    }

    setMobile(inputValue);
  };

  const handleMobileBlur = () => {
    if (mobile.length !== 10) {
      setMobileError('Mobile number must be 10 digits long');
    } else {
      setMobileError('');
    }
  };

  return (
    <div className="SignUpContainer p-4 border border-gray-300 rounded-md shadow-md max-w-md mx-auto mt-10">
      <h2 className="text-2xl text-center mb-4">Sign Up</h2>
      <label className="block text-sm mb-1">Username:</label>
      <input
        type="text"
        value={username}
        onChange={handleUserChange}
        className="w-full py-2 px-3 border rounded-md mb-3"
        required
      />
      <label className="block text-sm mb-1">Password:</label>
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full py-2 px-3 border rounded-md mb-3"
          required
        />
        <FontAwesomeIcon
          icon={showPassword ? faEye : faEyeSlash}
          className="absolute top-1/2 right-3 transform -translate-y-1/2 text-blue-500 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        />
      </div>
      <label className="block text-sm mb-1">Mobile:</label>
      <input
        type="text"
        value={mobile}
        onChange={handleMobileChange}
        onBlur={handleMobileBlur}
        className="w-full py-2 px-3 border rounded-md mb-2"
        required
      />
      {mobileError && <p className="text-red-500 text-sm mt-1">{mobileError}</p>}
      {signupError && <p className="text-red-500 text-sm mt-1">{signupError}</p>}
      <button
        onClick={handleSignUp}
        className="w-full py-2 bg-blue-500 text-white rounded-md text-lg cursor-pointer hover:bg-blue-600"
      >
        Sign Up
      </button>
      <div>
      {!signupSuccess ? (
        <div className="SignUpContainer p-0 border border-gray-300 rounded-md shadow-md max-w-md mx-auto mt-20">
          {/* ... (rest of the component code) */}
          <button
            onClick={handleSignUp}
            className="w-full py-0.5 bg-grey-500 text-white rounded-md text-lg cursor-pointer hover:bg-red-600"
          >
            Sign Up and Login
          </button>
        </div>
      ) : (
        <Login /> // Render the Login component when signup is successful
      )}
    </div>
      
    </div>
    
  );
};

export default SignUp;
