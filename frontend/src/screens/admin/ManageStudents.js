import React, { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'


const ManageStudents = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [students, setStudents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  // const [selectedStudent, setSelectedStudent] = useState(null);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  
  const navigate = useNavigate();

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/students");
      setStudents(res.data);
    } catch (err) {
      console.error("Error fetching students", err);
    }
  };
  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to remove thi student?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/admin/students/${id}`);
      alert("Student deleted");
      fetchStudents();
    } catch (err) {
      console.error(err.response?.data?.error || err.message);
      alert("Failed to remove student");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/admin/students/${editingId}`, {
          username,
          password,
          roomNumber,
        });
        alert("Student updated successfully");
      } else {
        const response = await axios.post(
          "http://localhost:5000/api/admin/students",
          {
            username,
            password,
            roomNumber,
          }
        );
        alert("Student registered successfully");
      }

      setUsername("");
      setPassword("");
      setRoomNumber("");
      setEditingId(null);
      fetchStudents();
    } catch (err) {
      console.error(err.response?.data?.error || err.message);
      alert("Failed to register student");
    }
  };

  const handleEdit = (student) => {
    setUsername(student.username);
    setPassword(student.password);
    setRoomNumber(student.roomNumber);
    setEditingId(student._id);
  };

  // const handleView = (student) => {
  //   setSelectedStudent(student);
  //   setIsModalOpen(true);
  // };

  return (
    <div>
      <h2>Register New Student</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />
        <input
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <input
          type="text"
          placeholder="Room Number"
          value={roomNumber}
          onChange={(e) => setRoomNumber(e.target.value)}
          required
        />
        <br />
        <button type="submit">
          {editingId ? "Update Student" : "Create Student"}
        </button>
      </form>

      <hr />

      <h3>Student List</h3>

      <div>
        <input
          type="text"
          placeholder="Search by username or room"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Username</th>
            <th>Room Number</th>
          </tr>
        </thead>
        <tbody>
          {students
            .filter(
              (student) =>
                student.username
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()) ||
                student.roomNumber
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
            )

            .map((student) => (
              <tr key={student._id}>
                <td>{student.username}</td>
                <td>{student.roomNumber}</td>
                <td>
                  <button onClick={() => navigate(`/admin/students/${student._id}`)}>View</button>
                </td>
                <td>
                  <button onClick={() => handleEdit(student)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => handleDelete(student._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageStudents;
