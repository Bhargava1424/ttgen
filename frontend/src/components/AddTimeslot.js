  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import Navbar from './Navbar'; // Assuming Navbar is a shared component

  const AddTimeslot = () => {
    const [timeslot, setTimeslot] = useState({
      timeslotId: '',
      startTime: '',
      endTime: '',
      // Add other fields as needed
    });

    const [timeslots, setTimeslots] = useState([]); 
    const [showSuccess, setShowSuccess] = useState(false); // State to control the visibility of the success message

    useEffect(() => {
      fetchTimeslots();
    }, []);
  
    const fetchTimeslots = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/timeslots');
        setTimeslots(response.data);
      } catch (error) {
        console.error('Error fetching timeslots', error);
      }
    };

    
    const handleChange = (e) => {
      setTimeslot({ ...timeslot, [e.target.name]: e.target.value });
      if (showSuccess) {
        setShowSuccess(false); // Hide the success message when user starts editing the form again
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios.post('http://localhost:5000/api/timeslots', timeslot);
        setTimeslot({ timeslotId: '', startTime: '', endTime: '' }); // Reset form
        setShowSuccess(true); // Show success message
      } catch (error) {
        console.error(error.response ? error.response.data : 'Error adding timeslot');
        setShowSuccess(false); // In case of error, ensure success message is not shown
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
              <div className="mb-4">
                <label htmlFor="timeslotId" className="block text-gray-300 text-sm font-bold mb-2">Timeslot ID:</label>
                <input type="text" name="timeslotId" value={timeslot.timeslotId} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="mb-4">
                <label htmlFor="startTime" className="block text-gray-300 text-sm font-bold mb-2">Start Time:</label>
                <input type="text" name="startTime" value={timeslot.startTime} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="mb-4">
                <label htmlFor="endTime" className="block text-gray-300 text-sm font-bold mb-2">End Time:</label>
                <input type="text" name="endTime" value={timeslot.endTime} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="flex items-center justify-between">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Add Timeslot
                </button>
              </div>
            </form>
          </div>
          <table className="table-auto w-full text-white">
          <thead>
            <tr className="bg-gray-700">
              <th className="px-4 py-2">Timeslot ID</th>
              <th className="px-4 py-2">Start Time</th>
              <th className="px-4 py-2">End Time</th>
            </tr>
          </thead>
          <tbody>
            {timeslots.map((slot, index) => (
              <tr key={index} className="bg-gray-800">
                <td className="border px-4 py-2">{slot.timeslotId}</td>
                <td className="border px-4 py-2">{slot.startTime}</td>
                <td className="border px-4 py-2">{slot.endTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    );
  };

  export default AddTimeslot;
