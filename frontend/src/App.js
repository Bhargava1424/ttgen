import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Signup from './components/Signup';
import Main from './components/Main';
import AddTeacher from './components/AddTeacher';   // Import AddTeacher component
import AddClass from './components/AddClass';       // Import AddClass component
import AddCourse from './components/AddCourse';     // Import AddCourse component
import AddTimeslot from './components/AddTimeslot'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/main" element={<Main />} />
          <Route path="/add-teacher" element={<AddTeacher />} /> 
          <Route path="/add-class" element={<AddClass />} />    
          <Route path="/add-course" element={<AddCourse />} />   
          <Route path="/add-timeslot" element={<AddTimeslot />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
