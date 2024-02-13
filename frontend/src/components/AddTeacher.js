// frontend/src/components/AddTeacher.js

import React, { useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';

const AddTeacher = () => {
  const [teacher, setTeacher] = useState({
    tid: '',
    name: ''
  });

  const handleChange = (e) => {
    setTeacher({ ...teacher, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/teachers', teacher);
      console.log(response.data);
      // Optionally, clear the form or give user feedback
    } catch (error) {
      console.error(error.response.data);
      // Handle errors, perhaps show user feedback
    }
  };

  return (
    <div>
        <div>
            <Navbar />
        </div>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
            <div className="w-full max-w-xs">
                <form onSubmit={handleSubmit} className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label htmlFor="tid" className="block text-gray-300 text-sm font-bold mb-2">Teacher ID:</label>
                    <input
                    type="number"
                    name="tid"
                    value={teacher.tid}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="name" className="block text-gray-300 text-sm font-bold mb-2">Name:</label>
                    <input
                    type="text"
                    name="name"
                    value={teacher.name}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Add Teacher
                    </button>
                </div>
                </form>
            </div>
            </div>
    </div>
    
  );
};

export default AddTeacher;
