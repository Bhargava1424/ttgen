import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar'; // Assuming Navbar is a shared component

const AddClass = () => {
  const [classData, setClassData] = useState({
    classId: '',
    className: '',
    // Add other class properties as needed
  });

  const handleChange = (e) => {
    setClassData({ ...classData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/classes', classData);
      console.log(response.data);
      // Optionally, clear the form or give user feedback
      setClassData({ classId: '', className: '' }); // Reset form
    } catch (error) {
      console.error(error.response ? error.response.data : 'Error adding class');
      // Handle errors, perhaps show user feedback
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
        <div className="w-full max-w-xs">
          <form onSubmit={handleSubmit} className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
            {/* Class ID Input */}
            <div className="mb-4">
              <label htmlFor="classId" className="block text-gray-300 text-sm font-bold mb-2">Class ID:</label>
              <input type="text" name="classId" value={classData.classId} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline" />
            </div>

            {/* Class Name Input */}
            <div className="mb-6">
              <label htmlFor="className" className="block text-gray-300 text-sm font-bold mb-2">Class Name:</label>
              <input type="text" name="className" value={classData.className} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" />
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Add Class
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddClass;
