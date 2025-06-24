const express = require('express')
const router = express.Router()
const Student = require('../models/Student')

// @route   POST /api/students
//  Create a new student
router.post('/', async(req, res) => {

    const {username, password, roomNumber} = req.body;

    if(!username || !password) {
        return res.status(400).json({error: 'Username and password required'})
    }

    try {
        // check for duplicate student
        const existingStudent = await Student.findOne({username});
        if(existingStudent) {
            return res.status(409).json({error: 'Username already exists'})
        }

        const student = new Student(req.body);
        await student.save();

        res.status(201).json({message: 'Student created successfully'});
    }
    catch(err) {
        res.status(500).json({error: err.message})
    }
})

module.exports = router