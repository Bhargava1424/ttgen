// src/HomePage.js
import React from 'react';
import Navbar from './Navbar';

const Main = () => {
  return (
    <div>
        <Navbar/>

        <p className='text-2xl'>MAIN PAGE.....YET TO CODE</p>
        <button
        className="w-full py-2 bg-green-500 text-white rounded-md text-lg cursor-pointer hover:bg-green-600 max-w-md mx-auto mt-20"
      >
        Generate
      </button>
    </div>
  );
};

export default Main;


  