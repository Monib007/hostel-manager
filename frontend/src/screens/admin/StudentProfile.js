import React, { useState, useEffect } from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import axios from 'axios';

const StudentProfile = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchStudent = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/admin/students/${id}`)
            setStudent(res.data)
        }
        catch (err) {
            console.error('Error fetching student:', err);
            alert('Failed to fetch student details')
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchStudent();
    }, [id]);

    if(loading) return <p>Loading...</p>
    if(!student) return <p>Student not found!</p>

    return (
        <div>
            <h2>Student Profile</h2>
            <p><strong>Username:</strong>{student.username}</p>
            <p><strong>Room Number: </strong>{student.roomNumber}</p>
            <button onClick={() => navigate('/admin/manage-students')}>Back</button>
        </div>
    )
}

export default StudentProfile;