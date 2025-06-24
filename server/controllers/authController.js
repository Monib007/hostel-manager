const Admin = require('../models/Admin')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');

// login admin
// POST /api/auth/login
exports.loginAdmin = async (req, res) => {
    const {username, password} = req.body;

    try {
        //check if admin exists
        const admin = await Admin.findOne({username});
        if(!admin) { 
            return res.status(401).json({message: 'Invalid username or password'});
        }
        //verify password
        const isMatch = await bcrypt.compare(password, admin.password);
        if(!isMatch) {
            return res.status(401).json({message: 'Invalid username or password'})
        }

        //generate JWT token
        const token = jwt.sign(
            {id: admin._id, role: admin.role},
            process.env.JWT_SECRET,
            {expiresIn: '1d'}
        );

        res.status(200).json({
            token,
            user: {
                id: admin._id,
                username: admin.username,
                role: admin.role,
            },
        });
    
    } catch (err) {
        console.error('Login error: ', err.message)
        res.status(500).json({message: 'Server error'})
    }
}