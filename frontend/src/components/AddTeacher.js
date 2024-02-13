// frontend/src/components/AddTeacher.js

import React, { useState, useEffect  } from 'react';
import Navbar from './Navbar';
import axios from 'axios';

const AddTeacher = () => {
  const [teacher, setTeacher] = useState({
    tid: '',
    name: ''
  });
  
  const [teachers, setTeachers] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false); 

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/teachers');
      setTeachers(response.data); // Set the fetched teachers
    } catch (error) {
      console.error(error.response ? error.response.data : 'Error fetching teachers');
    }
  };


  const handleChange = (e) => {
    setTeacher({ ...teacher, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/teachers', teacher);
      console.log(response.data);
      // Optionally, clear the form or give user feedback
      setShowSuccess(true);
    } catch (error) {
      console.error(error.response.data);
      // Handle errors, perhaps show user feedback
      setShowSuccess(false);
    }
  };

  


  return (
    <div>
        <div>
            <Navbar />
        </div>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
            <div className="w-full max-w-xs">
            {showSuccess && (
            <div role="alert" className="alert alert-success mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>Timeslot has been added successfully!</span>
            </div>
          )}
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

            <div className="mt-8 w-full max-w-4xl">
              <table className="table-auto w-full">
                <thead>
                  <tr className="bg-gray-700">
                    <th className="px-4 py-2">Teacher ID</th>
                    <th className="px-4 py-2">Name</th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.map((teacher) => (
                    <tr key={teacher._id} className="bg-gray-800">
                      <td className="border px-4 py-2">{teacher.tid}</td>
                      <td className="border px-4 py-2">{teacher.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
    </div>
    
  );
};

export default AddTeacher;
