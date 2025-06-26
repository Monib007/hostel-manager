import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './screens/Home'
import Login from './screens/auth/Login';
import AdminDashboard from './screens/admin/Dashboard'
import ManageStudents from './screens/admin/ManageStudents'
import StudentDashboard from './screens/student/Dashboard'
import StudentProfile from './screens/admin/StudentProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path='/admin/manage-students' element={<ManageStudents />} />
        <Route path='/admin/students/:id' element={<StudentProfile />} />
        <Route path='/student/dashboard' element={<StudentDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
