import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const AddCourse = () => {const [course, setCourse] = useState({
  cid: '',
  name: '',
  teacherNames: [],
  credits: '',
});

const [teachers, setTeachers] = useState([]);
const [selectedTeacherNames, setSelectedTeacherNames] = useState('');
const [message, setMessage] = useState({ text: '', type: '' }); // New state for managing feedback messages

useEffect(() => {
  fetchTeachers();
}, []);

const fetchTeachers = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/teachers');
    setTeachers(response.data);
    console.log(teachers)
  } catch (error) {
    console.error(error.response ? error.response.data : 'Error fetching teachers');
  }
};
const [courses, setCourses] = useState([]); // New state for storing courses

useEffect(() => {
  
  fetchCourses(); // Fetch courses when the component mounts
}, []);

const fetchCourses = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/courses');
    setCourses(response.data);
  } catch (error) {
    console.error('Error fetching courses', error);
  }
};


// const handleChange = (event) => {
//   const { name, value, options } = event.target;

//   if (name === 'teachers') {
//     let selectedOptions = Array.from(options).filter(option => option.selected).map(option => option.value);
//     let selectedNames = selectedOptions.map(id => teachers.find(teacher => teacher._id === id).name);
//     console.log(selectedNames)
    
//     setCourse({ ...course, teacherNames: selectedNames }); 
//     setSelectedTeacherNames(selectedNames.join(', '));  
//   } else {
//     setCourse({ ...course, [name]: value });
//   }
// };

const handleChange = (event) => {
  const { name, value, options } = event.target;

  if (name === 'teachers') {
    // Extracting the selected options
    let selectedOptions = Array.from(options).filter(option => option.selected).map(option => option.value);

    // Assuming teachers.find(...).name correctly returns a string, this will be a flat array of strings
    let selectedNames = selectedOptions.map(id => teachers.find(teacher => teacher._id === id).name);

    // Directly set the flat array of teacher names
    setCourse({ ...course, teacherNames: selectedNames }); // Ensure this is a flat array
    setSelectedTeacherNames(selectedNames.join(', '));
  } else {
    setCourse({ ...course, [name]: value });
  }
};




const handleSubmit = async (event) => {
  event.preventDefault();
  // Create a new object excluding the teachers ID array if you don't need it
  let submissionData = {
    ...course,
    teachers: course.teacherNames, // Replace or keep both as needed
  };
  console.log(submissionData)
  try {
    const response = await axios.post('http://localhost:5000/api/courses', submissionData);
    console.log(response.data);
    setCourse({ cid: '', name: '', teachers: [], teacherNames: [], credits: '' });
    setSelectedTeacherNames('');
    setMessage({ text: 'Course added successfully!', type: 'success' });
  } catch (error) {
    console.error('Error adding course', error);
    setMessage({ text: 'Error adding course.', type: 'error' });
  }
};


  

  return (
    <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center pt-10">
      <Navbar/>
      <h2 className="text-3xl font-bold mb-4">Add Course</h2>

      {message.text && (
        <div
          role="alert"
          className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-error'} mb-4`}
        >
          {message.text}
        </div>
      )}
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
            value={selectedTeacherNames} // This should reflect the state updated in handleChange
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
      <table className="table-auto w-full">
            <thead>
              <tr className="bg-gray-700">
                <th className="px-4 py-2 text-white">Course ID</th>
                <th className="px-4 py-2 text-white">Course Name</th>
                <th className="px-4 py-2 text-white">Teachers</th>
                <th className="px-4 py-2 text-white">Credits</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course._id} className="bg-gray-800">
                  <td className="border px-4 py-2 text-white">{course.cid}</td>
                  <td className="border px-4 py-2 text-white">{course.name}</td>
                  <td className="border px-4 py-2 text-white">
                    {/* Flatten the array of arrays and join names with a comma */}
                    {course.teachers.flat().join(', ')}
                  </td>
                  <td className="border px-4 py-2 text-white">{course.credits}</td>
                </tr>
              ))}
              {courses.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-4 py-2 text-white text-center">No courses found</td>
                </tr>
              )}
            </tbody>
          </table>
    </div>
  );
};

export default AddCourse;
