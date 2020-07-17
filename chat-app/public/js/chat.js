// function to connect to server
const socket = io()

//Elements
const msgForm = document.querySelector('#messageForm')
const msgFormInput = msgForm.querySelector('input')
const msgFormButton = msgForm.querySelector('button')
const locationButton = document.querySelector('#send-location')
const messages = document.querySelector('#messages')

//Templates
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationMsgTemplate = document.querySelector('#locationMsg-template').innerHTML


socket.on('message', (msg) => {
    console.log(msg)
    //stores the final html we will actually render in browser
    const html = Mustache.render(messageTemplate, {
        message: msg
    })
    messages.insertAdjacentHTML('beforeend', html)
})

socket.on('locationMessage', (locationURL) => {
    console.log(locationURL)
    const html = Mustache.render(locationMsgTemplate, {
        url: locationURL
    })
    messages.insertAdjacentHTML('beforeend', html)
})

msgForm.addEventListener('submit', (e) => {
    e.preventDefault()
    //disable btn
    msgFormButton.setAttribute('disabled', "disabled")

    const msgInput = e.target.elements.message.value
    socket.emit('sendMessage', msgInput, (error) => {
        //this functions runs when event is aknowledged
        //enable btn
        msgFormButton.removeAttribute('disabled')      
        msgFormInput.value = ''  
        msgFormInput.focus()

        if(error) {
            return console.log(error)
        }
        console.log('Message delivered')
    })
})

locationButton.addEventListener('click', () => {
    if(!navigator.geolocation){
        return alert('Geolocation is not supported by your browser')
    }
    locationButton.setAttribute('disabled', 'disabled')
    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () => {
            console.log('Location shared!')
            locationButton.removeAttribute('disabled')
        })
    })

})