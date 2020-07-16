// function to connect to server
const socket = io()

socket.on('message', (msg) => {
    console.log(msg)
})

const msgForm = document.querySelector('#messageForm')

msgForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const msgInput = e.target.elements.message.value
    socket.emit('sendMessage', msgInput)
    msgInput.value = ''
})
