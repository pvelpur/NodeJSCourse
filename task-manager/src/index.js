const express = require('express')
require('./db/mongoose') //by just calling require it ensures that the file runs and connection is made
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

//configure express to autimatically parse the incoming JSON for us
// so we have it accessible as a object we can use
app.use(express.json())

app.post('/users', (request, response) => {
    //This is how we grab incoming body data
        //console.log(request.body)
        //response.send("Testing!")
    const user = new User(request.body)
    user.save().then(() => {
        response.status(201).send(user)
    }).catch((e) => {
        response.status(400).send(e)
    })
})

//To get all the users
app.get('/users', (req, res) => {
    // look up mongoose queries to get mongoose CRUD operations
    User.find({}).then((users) => {
        res.send(users)
    }).catch((e) => {
        res.status(500).send()
    })
})

//To get individual/specific user
// using route parameters
app.get('/users/:id', (req, res) => {
    //console.log(req.params)
    const _id = req.params.id
    //look up mongoose queries
    User.findById(_id).then((user) => {
        //might not always have user with id
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
        
    }).catch((e) => {
        res.status(500).send()
    })

})

app.post('/tasks', (req, res) => {
    const task = new Task(req.body)
    task.save().then(() => {
        res.status(201).send(task)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

app.get('/tasks', (req, res) => {
    Task.find({}).then((tasks) => {
        res.send(tasks)
    }).catch((e) => {
        res.status(500).send()
    })
})

app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id

    Task.findById(_id).then((task) => {
        if(!task){
            return res.status(400).send()
        }
        res.send(task)
    }).catch((e) => {
        res.status(500).send()
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})