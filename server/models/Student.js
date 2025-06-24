const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const StudentSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    roomNumber:{type: String},
    role: {type: String},
})

StudentSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (err) {
        next(err);
    }
})

module.exports = mongoose.model('Student', StudentSchema)