const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim:true
    },
    email: {
        type: String,
        required: true,
        validate(value)  {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid")
            }
        },
        trim:true,
        lowercase:true
    },
    password: {
        type: String,
        validate(value) {
            if(value.toLowerCase().includes("password")) {
                throw new Error("Password cannot contain 'password'")
            }
        },
        required: true,
        trim: true,
        minlength: 7
    },
    age:{
        type: Number,
        default: 0,
        validate(value){
            if(value < 0){
                throw new Error('Age must be a positive number')
            }
        }
    }
})

// const me = new User({
//     name: "   Prithvi   ",
//     email: 'PRITHVI180@gmail.com   ',
//     password: 'lolwhat5'
// })

// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log("Error!", error)
// })

module.exports = User