const express = require('express')
const socketio = require('socket.io')
const path = require('path') // core node module
const http = require('http') //core node module

const app = express()
const server = http.createServer(app)
const io = socketio(server) // socket io is called with raw http server

const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

let msg = "Welcome"

io.on('connection', (socket) => {
    //socket is an object that contains info about the new connection
    console.log('new websocket connection')
    socket.emit('message', msg)

    socket.on('sendMessage', (message) => {
        io.emit('message', message)
    })

})

// have the server listen
server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})