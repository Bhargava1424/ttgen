import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar'; // Assuming Navbar is a shared component

const AddClass = () => {
  const [classData, setClassData] = useState({
    classId: '',
    className: '',
    // Add other class properties as needed
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [classes, setClasses] = useState([]);


  const handleChange = (e) => {
    setClassData({ ...classData, [e.target.name]: e.target.value });
    if (showSuccess) {
      setShowSuccess(false); // Hide the success message when user starts editing the form again
    }
  };

  useEffect(() => {
    fetchClasses(); // Fetch classes when the component mounts
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/classes');
      setClasses(response.data); // Store fetched classes
    } catch (error) {
      console.error('Error fetching classes', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/classes', classData);
      console.log(response.data);
      // Optionally, clear the form or give user feedback
      setClassData({ classId: '', className: '' }); // Reset form
      setShowSuccess(true);
      fetchClasses();
    } catch (error) {
      console.error(error.response ? error.response.data : 'Error adding class');
      // Handle errors, perhaps show user feedback
      setShowSuccess(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
        <div className="w-full max-w-xs">
        {showSuccess && (
            <div role="alert" className="alert alert-success mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>Timeslot has been added successfully!</span>
            </div>
          )}
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
        <table className="table-auto w-full">
            <thead>
              <tr className="bg-gray-700">
                <th className="px-4 py-2 text-white">Class ID</th>
                <th className="px-4 py-2 text-white">Class Name</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((cls, index) => (
                <tr key={index} className="bg-gray-800">
                  <td className="border px-4 py-2 text-white">{cls.classId}</td>
                  <td className="border px-4 py-2 text-white">{cls.className}</td>
                </tr>
              ))}
              {classes.length === 0 && (
                <tr>
                  <td colSpan="2" className="px-4 py-2 text-white text-center">No classes found</td>
                </tr>
              )}
            </tbody>
          </table>

      </div>
    </div>
  );
};

export default AddClass;
