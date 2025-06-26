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

// student list
router.get('/', async (req, res) => {
    try {
        const students = await Student.find()
        res.json(students)
    }
    catch (err) {
        res.status(500).json({error: 'Server error'})
    }
})

// delete a student by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);
        if (!deletedStudent) {
            return res.status(404).json({error: 'Student not found'})
        }
        res.json({message: 'Student deleted successfully'})
    }
    catch (err) {
        res.status(500).json({error: err.message})
    }
})

// updata a student by id
router.put('/:id', async (req, res) => {
    const {username, password, roomNumber} = req.body;

    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            {username, password, roomNumber},
            {new: true}
        )
        if(!student){
            return res.status(404).json({error: 'Student not found'});
        }
        res.json({message: 'Student updated successfully', student})
    }
    catch (err) {
        res.status(500).json({error: err.message})
    }
})

module.exports = router