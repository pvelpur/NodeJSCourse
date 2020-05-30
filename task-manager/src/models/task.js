const mongoose = require('mongoose')

const Task = mongoose.model('Task', {
    description: {
        type: String,
        trim:true, required: true
    },
    completed: {type: Boolean, default:false,},
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' //mongoose referece to a model
    }
})

// const task1 = new Task({
//     description: "  Homework  "
// })

// task1.save().then((res) => {
//     console.log(res)
// }).catch((error) => {
//     console.log("Error!", error)
// })

module.exports = Task