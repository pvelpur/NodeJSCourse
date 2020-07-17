const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')
const path = require('path') // core node module
const http = require('http') //core node module
const {generateMessage, generateLocationMessage} = require('./utils/messages')

const app = express()
const server = http.createServer(app)
const io = socketio(server) // socket io is called with raw http server

const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {
    //socket is an object that contains info about the new connection
    console.log('new websocket connection')

    socket.on('join', ({ username, room }) => {
        socket.join(room) //server side only function that allows for new ways of emitting to clients (only clients in the room)
        socket.emit('message', generateMessage('Welcome!'))
        socket.broadcast.to(room).emit('message', generateMessage(`${username} has joined`))

        // socket.emit, io.emit, socket.broadcast.emit
        // with rooms => io.to.emit, socket.broadcast.to.emit (limits to specific chat room)
    })

    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter()

        if(filter.isProfane(message)){
            return callback('Profanity is not allowed')
        }

        io.to('Chicago').emit('message', generateMessage(message))
        callback()
    })

    socket.on('sendLocation', (coords, callback) => {
        io.emit('locationMessage', generateLocationMessage(`https://google.com/maps?q=${coords.latitude},${coords.longitude}`))
        callback()
    })

    socket.on('disconnect', () => {
        io.emit('message', generateMessage('A user has been disconnected'))
    })

})

// have the server listen
server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})