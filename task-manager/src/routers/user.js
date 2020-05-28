const express = require('express')
const User = require('../models/user')
const router = new express.Router()

//Middleware (mongoose documentation)
// way customize behavior of mongoose model

// CREATE a resource
router.post('/users', async (request, response) => {
    //This is how we grab incoming body data
        //console.log(request.body)
        //response.send("Testing!")
    const user = new User(request.body)
    // user.save().then(() => {
    //     response.status(201).send(user)
    // }).catch((e) => {
    //     response.status(400).send(e)
    // })

    //USING AWAIT NOW
    try{
        await user.save()
        response.status(201).send(user)
    } catch(e) {
        response.status(400).send(e)
    }

})

//Http request to login with user credentials + validation check
//login request should send back an authentication token that can be used later for other non-public requests
router.post('/users/login', async (req, res) => {
    try {
        // Creating our own functions for user model
        const user = await User.findByCredentials(req.body.email, req.body.password)
        res.send(user)
    } catch (e) {
        res.status(400).send()
    }
})

// ONLY 2 ROUTES THAT WILL STAY PUBLIC ARE LOGIN AND SIGNUP, REST WILL REQUIRE USER TO BE LOGGED IN

//To get all the users
router.get('/users', async (req, res) => {
    // look up mongoose queries to get mongoose CRUD operations
    // User.find({}).then((users) => {
    //     res.send(users)
    // }).catch((e) => {
    //     res.status(500).send()
    // })
    //USING AWAIT
    try{
        const users = await User.find({})
        res.send(users)
    }catch(e) {
        res.status(500).send()
    }
})

//To get individual/specific user
// using route parameters
router.get('/users/:id', async (req, res) => {
    //console.log(req.params)
    const _id = req.params.id
    //look up mongoose queries
    // User.findById(_id).then((user) => {
    //     //might not always have user with id
    //     if(!user){
    //         return res.status(404).send()
    //     }
    //     res.send(user)
        
    // }).catch((e) => {
    //     res.status(500).send()
    // })
    //ASYNC AWAIT
    try {
        const user = await User.findById(_id)
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }catch(e){
        res.status(500).send()
    }

})

//update existing resource
router.patch('/users/:id', async (req, res) => {
    //Code to prevent ppl from updating things that dont exist or they
    // are not allowed to update (like _id)
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({ error: 'invalid updates!' })
    }

    try{
        //update will bypass mongoose middleware, so we need to do this instead...
        const user = await User.findById(req.params.id)
        updates.forEach((update) => {
            //use bracket notation to access attribute DYNAMICALLY
            user[update] = req.body[update]
        })
        await user.save()

        //mongoose method to update => the update ones
        //const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators:true })
        //3 things could happen, update went well, went poorly, or user to update doesnt exist
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }
    catch (e) {
        res.status(400).send(e)
    }
})

//DELETE existing resourse
router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router