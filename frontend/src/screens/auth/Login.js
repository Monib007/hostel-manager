import React, { useState } from "react";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");

  // const [showPassword, setShowPassword] = useState(false)
  // const [loading, setLoading] = useState("")
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // connection to backend using axios
    try {
        const response = await axios.post('http://localhost:5000/api/auth/login', {
            username,
            password,
            role,
        });
        console.log('Login successful', response.data)

        localStorage.setItem('token', response.data.token)
        localStorage.setItem('role', response.data.user.role?.toLowerCase())

        console.log(response.data.token)
        console.log(response.data.user.role)

        if(response.data.user.role?.toLowerCase() === 'admin'){
          navigate('/admin/dashboard')
        } else if (response.data.user.role?.toLowerCase() === "student"){
          navigate('/student/dashboard')
        }
    }
    catch (err) {
        console.error('Login failed:', err.response?.data?.err || err.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Role:</label><br />
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="admin">Admin</option>
            <option value="student">Student</option>
          </select>
        </div>
        <div>
          <label>Username:</label>
          <br />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
