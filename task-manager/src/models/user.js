const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim:true
    },
    email: {
        type: String,
        unique: true,
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

//By setting up a value on schema.statics, we can access directly on model
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    
    if(!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

//Middleware (mongoose docs)
//Below is so that before u save, do some function
// Cant use arrow functions, because we need to use a 'this' binding
// This will hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this

    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    //when the function is over, call next() so that the asynchronous process can finish
    //Not calling next will result in infinite loop
    next()
})

const User = mongoose.model('User', userSchema)

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