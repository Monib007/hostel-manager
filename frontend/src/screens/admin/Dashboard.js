import React from 'react'
import {useNavigate} from 'react-router-dom'

const AdminDashboard = () => {

    const navigate =  useNavigate();

    const handleManageStudents = () => {
        navigate('/admin/manage-students')
    }
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <div>
                <button onClick={handleManageStudents}>Manage Students</button>
                <button>Manage Rooms</button>
                <button>View Reports</button>
            </div>
        </div>    
    )
}

export default AdminDashboard;