const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')
const path = require('path') // core node module
const http = require('http') //core node module
const {generateMessage, generateLocationMessage} = require('./utils/messages')
const {addUser, removeUser, getUser, getUsersInRoom} = require('./utils/users')

const app = express()
const server = http.createServer(app)
const io = socketio(server) // socket io is called with raw http server

const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {
    //socket is an object that contains info about the new connection
    console.log('new websocket connection')

    socket.on('join', (options, callback) => {
        const {error, user} = addUser({id: socket.id, ...options})

        if(error) {
            return callback(error)
        }


        socket.join(user.room) //server side only function that allows for new ways of emitting to clients (only clients in the room)
        
        socket.emit('message', generateMessage('Admin', 'Welcome!'))
        socket.broadcast.to(user.room).emit('message', generateMessage('Admin', `${user.username} has joined`))
        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        })
        
        callback()
        // socket.emit, io.emit, socket.broadcast.emit
        // with rooms => io.to.emit, socket.broadcast.to.emit (limits to specific chat room)
    })

    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter()

        const user = getUser(socket.id)

        if(filter.isProfane(message)){
            return callback('Profanity is not allowed')
        }

        io.to(user.room).emit('message', generateMessage(user.username, message))
        callback()
    })

    socket.on('sendLocation', (coords, callback) => {
        const user = getUser(socket.id)
        io.to(user.room).emit('locationMessage', generateLocationMessage(user.username, `https://google.com/maps?q=${coords.latitude},${coords.longitude}`))
        callback()
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)

        if(user) {
            io.to(user.room).emit('message', generateMessage('Admin', `${user.username} has left`))
            io.to(user.room).emit('roomData', {
                room: user.room,
                users: getUsersInRoom(user.room)
            })
        }
    })

})

// have the server listen
server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})