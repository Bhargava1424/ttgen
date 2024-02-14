import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const AddDept = () => {
  const [dept, setDept] = useState({
    deptId: '',
    deptName: '',
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [depts, setDepts] = useState([]); 

  useEffect(() => {
    fetchDepts();
  }, []);

  const fetchDepts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/depts');
      setDepts(response.data);
    } catch (error) {
      console.error('Error fetching departments', error);
    }
  };


  const handleChange = (e) => {
    setDept({ ...dept, [e.target.name]: e.target.value });
    setShowSuccess(false); // Hide success message when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/depts', dept);
      setDept({ deptId: '', deptName: '' }); // Reset form
      setShowSuccess(true); // Show success message
    } catch (error) {
      console.error('Error adding department', error);
      setShowSuccess(false); // Ensure success message is not shown on error
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
        <div className="w-full max-w-xs">
          {showSuccess && (
            <div role="alert" className="alert alert-success mb-5">
              <span>Department added successfully!</span>
            </div>
          )}
          <form onSubmit={handleSubmit} className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label htmlFor="deptId" className="block text-gray-300 text-sm font-bold mb-2">Department ID:</label>
              <input type="text" name="deptId" value={dept.deptId} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
              <label htmlFor="deptName" className="block text-gray-300 text-sm font-bold mb-2">Department Name:</label>
              <input type="text" name="deptName" value={dept.deptName} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Add Department
            </button>
          </form>
        </div>
        <table className="table-auto w-full text-white">
          <thead>
            <tr className="bg-gray-700">
              <th className="px-4 py-2">Department ID</th>
              <th className="px-4 py-2">Department Name</th>
            </tr>
          </thead>
          <tbody>
            {depts.map((dept) => (
              <tr key={dept._id} className="bg-gray-800">
                <td className="border px-4 py-2">{dept.deptId}</td>
                <td className="border px-4 py-2">{dept.deptName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddDept;
