const Admin = require('../models/Admin')
const Student = require('../models/Student')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');

// login admin
// POST /api/auth/login
exports.loginUser = async (req, res) => {
    const {username, password, role} = req.body;

    if(!username || !password || !role) {
        return res.status(400).json({message : 'Username, password and role are required'})
    }

    try {
        let user;

        if(role === 'admin'){
            user = await Admin.findOne({username})
        } else if(role  === 'student'){
            user = await Student.findOne({username})
        } else {
            return res.status(400).json({message: 'Invalid user'})
        }

        if(!user){
            return res.status(401).json({ message: 'Invalid username or password' })
        }

        //verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(401).json({message: 'Invalid username or password'})
        }

        //generate JWT token
        const token = jwt.sign(
            {id: user._id, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn: '1d'}
        );

        res.status(200).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                role: user.role,
            },
        });
    
    } catch (err) {
        console.error('Login error: ', err.message)
        res.status(500).json({message: 'Server error'})
    }
}