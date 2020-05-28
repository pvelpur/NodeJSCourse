const express = require('express')
require('./db/mongoose') //by just calling require it ensures that the file runs and connection is made
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

//configure express to autimatically parse the incoming JSON for us
// so we have it accessible as a object we can use
app.use(express.json())

// //Creating a router
// const router = express.Router()
// //We will have several express routers that will combine into a single application
// // categorized by resource
// //example (basic structure)
// router.get('/test', async(req,res) => {
//     res.send("This is from my other router")
// })
// //need this to use router
// app.use(router)
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})

//EXAMPLE
// const bcrypt = require('bcryptjs')
// //Hashing via bcryptjs (npm package used to secure passwords)
// const myFunction = async () => {
//     const password = 'Red12345!' // Plain text password
//     const hashedPassword = await bcrypt.hash(password, 8) //8 is the number of rounds to run the hashing function

//     console.log(password)
//     console.log(hashedPassword)

//     //How login would work
//     const isMatch = await bcrypt.compare('red12345!', hashedPassword)
//     console.log(isMatch)
// }

// myFunction()