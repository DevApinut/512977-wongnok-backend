const mongoose = require('mongoose');

const BlogRegister = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    personel_number: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: "general"
    },

}, { timestamps: true })

module.exports = mongoose.model("Register", BlogRegister)