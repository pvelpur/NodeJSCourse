const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')
const path = require('path') // core node module
const http = require('http') //core node module

const app = express()
const server = http.createServer(app)
const io = socketio(server) // socket io is called with raw http server

const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {
    //socket is an object that contains info about the new connection
    console.log('new websocket connection')
    socket.emit('message', "Welcome!")
    socket.broadcast.emit('message', 'A new user has joined!')

    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter()

        if(filter.isProfane(message)){
            return callback('Profanity is not allowed')
        }

        io.emit('message', message)
        callback()
    })

    socket.on('sendLocation', (coords, callback) => {
        io.emit('locationMessage', `https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
        callback()
    })

    socket.on('disconnect', () => {
        io.emit('message', 'A user has been disconnected')
    })

})

// have the server listen
server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})