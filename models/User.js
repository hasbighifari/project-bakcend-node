const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
    },

})
userSchema.methods.generateAuthToken = (user) => {

    return jwt.sign({ _id: user._id, timeout: new Date().getTime() + 30 * 60 * 1000}, process.env.jwtPrivateKey, {
        expiresIn: 30 * 60
    })
}
const User = mongoose.model('User', userSchema, 'user')

exports.User = User