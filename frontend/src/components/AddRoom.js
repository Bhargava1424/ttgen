import React, { useState, useEffect  } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const AddRoom = () => {
  const [room, setRoom] = useState({
    roomId: '',
    seatingCapacity: 60, // Default seating capacity
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [rooms, setRooms] = useState([]);

  const handleChange = (e) => {
    setRoom({ ...room, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Post the room data to the server
      await axios.post('http://localhost:5000/api/rooms', {
        roomId: room.roomId,
        // Since the seating capacity is fixed at 60, we don't need to send it from the state
        // but I'm including it here in case the backend requires it.
        seatingCapacity: room.seatingCapacity
      });
      setRoom({ roomId: '', seatingCapacity: 60 });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      console.error('Error adding room', error);
      setShowSuccess(false);
    }
  };

  
  useEffect(() => {
    fetchRooms(); // Fetch rooms when the component mounts
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/rooms');
      setRooms(response.data); // Set the rooms state with the fetched data
    } catch (error) {
      console.error('Error fetching rooms', error);
    }
  };

  
  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
        <div className="w-full max-w-xs">
          {showSuccess && (
            <div role="alert" className="alert alert-success mb-5">
              <span>Room added successfully!</span>
            </div>
          )}
          <form onSubmit={handleSubmit} className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label htmlFor="roomId" className="block text-gray-300 text-sm font-bold mb-2">Room ID:</label>
              <input type="text" name="roomId" value={room.roomId} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            {/* Seating capacity is fixed at 60 and not changed by the user, so no input for it */}
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Add Room
            </button>
          </form>
        </div>
        <div className="w-full max-w-2xl mt-8">
          <h3 className="text-xl font-bold mb-4">Room List</h3>
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-800 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Room ID
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-800 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Seating Capacity
                </th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room, index) => (
                <tr key={index}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-gray-900 text-sm">
                    {room.roomId}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-gray-900 text-sm">
                    {room.seatingCapacity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {rooms.length === 0 && (
            <p className="text-center text-gray-500">No rooms added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddRoom;
