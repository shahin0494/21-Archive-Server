const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase:true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number
    },
    role: {
        type: String,
        required: true,
        default: "user"
    },

})

const users = mongoose.model("users", userSchema)
module.exports = users