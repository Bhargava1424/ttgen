import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const AddCourse = () => {

  const [course, setCourse] = useState({
    cid: '',
    name: '',
    teachers: [],
    credits: '',
  });

  const [teachers, setTeachers] = useState([]);
  const [selectedTeacherNames, setSelectedTeacherNames] = useState('');

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'teachers') {
      const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
      setCourse({ ...course, teachers: selectedOptions });
      const selectedNames = selectedOptions.map(id => 
        teachers.find(teacher => teacher._id === id).name
      ).join(', ');
      setSelectedTeacherNames(selectedNames);
    } else {
      setCourse({ ...course, [name]: value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Post to your API to save the course
    axios.post('/api/courses', course)
      .then(response => {
        // Handle the response from the server
        console.log(response.data);
        setCourse({ cid: '', name: '', teachers: [], credits: '' });
        setSelectedTeacherNames('');
      })
      .catch(error => {
        console.error('Error adding course', error);
      });
  };
  

  return (
    <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center pt-10">
      <Navbar/>
      <h2 className="text-3xl font-bold mb-4">Add Course</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="mb-4">
          <label htmlFor="cid" className="block text-sm font-medium mb-1">Course Number:</label>
          <input
            type="number"
            name="cid"
            value={course.cid}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium mb-1">Course Name:</label>
          <input
            type="text"
            name="name"
            value={course.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="teachers">Teachers:</label>
          {teachers.length > 0 ? (
            <select
              name="teachers"
              multiple
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline"
            >
              {teachers.map((teacher) => (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.name}
                </option>
              ))}
            </select>
          ) : (
            <p>Loading teachers...</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="selectedTeachers" className="block text-sm font-medium mb-1">Selected Teachers:</label>
          <input
            type="text"
            name="selectedTeachers"
            value={selectedTeacherNames}
            readOnly
            className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="credits" className="block text-sm font-medium mb-1">Credits:</label>
          <input
            type="number"
            name="credits"
            value={course.credits}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
