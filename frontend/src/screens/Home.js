import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>🏠 Hostel Management System</h1>
      <p>Welcome! Please login as Admin or Student to continue.</p>
      
      <div>
        <Link to="/login">
          <button>Go to Login</button>
        </Link>
      </div>
    </div>
  );
};


export default Home;
