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
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML

// Options
const {username, room} = Qs.parse(location.search, { ignoreQueryPrefix:true }) // removes question mark and creates object

const autoscroll = () => {
    //New message element (last element (new message))
    const $newMessage = messages.lastElementChild

    // Height of the new message (how tall it is)
    const newMessageStyles = getComputedStyle($newMessage)
    const newMessageMargin = parseInt(newMessageStyles.marginBottom)
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin

    //visible height
    const visibleHeight = messages.offsetHeight

    // Height of messages container
    const contentHeight = messages.scrollHeight

    // How far have i scrolled from the bottom
    const scrollOffset = messages.scrollTop + visibleHeight 

    if(contentHeight - newMessageHeight <= scrollOffset) {
        messages.scrollTop = messages.scrollHeight // scroll all the way down from top
    }
}

socket.on('message', (msg) => {
    console.log(msg)
    //stores the final html we will actually render in browser
    const html = Mustache.render(messageTemplate, {
        username: msg.username,
        message: msg.text,
        createdAt: moment(msg.createdAt).format('h:mm A')
    })
    messages.insertAdjacentHTML('beforeend', html)
    autoscroll()
})

socket.on('locationMessage', (message) => {
    console.log(message.url)
    const html = Mustache.render(locationMsgTemplate, {
        username: message.username,
        url: message.url,
        createdAt: moment(message.createdAt).format('h:mm A')
    })
    messages.insertAdjacentHTML('beforeend', html)
    autoscroll()
})

socket.on('roomData', ({room, users}) => {
    const html = Mustache.render(sidebarTemplate, {
        room,
        users 
    })
    document.querySelector('#sidebar').innerHTML = html
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

socket.emit('join', { username, room }, (error) => {
    if (error) {
        alert(error)
        location.href = '/'
    }
})