// src/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-blue-900 rounded-box w-52">
        <li className='hover:bg-sky-700'><Link to='/main'>Main Page</Link></li>
        <li className='hover:bg-sky-700'><Link to='/add-teacher'>Add Teacher</Link></li> 
        <li className='hover:bg-sky-700'><Link to='/add-class'>Add Class</Link></li>      
        <li className='hover:bg-sky-700'><Link to='/add-course'>Add Course</Link></li>    
        <li className='hover:bg-sky-700'><Link to='/add-timeslot'>Add Time Slot</Link></li>
        <li className='hover:bg-sky-700'><Link to='/add-room'>Add Room</Link></li>
        <li className='hover:bg-sky-700'><Link to='/add-dept'>Add Department</Link></li>
      </ul>

    </div>
  </div>
  <div className="navbar-center">
    <a className="btn btn-ghost text-xl" href='Main.js'>Time Table Manager</a>
  </div>
  <div className="navbar-end ">
    <button className="btn btn-ghost btn-circle">
      <div className="dropdown relative">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
        </div>
        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-blue-900 rounded-box w-52 right-0"> 
          <li><Link to='/main'>Main Page</Link></li>
          <li><Link to='/'>Logout</Link></li>
        </ul>
      </div>
    </button>
  </div>


</div>
  );
};

export default Navbar;
