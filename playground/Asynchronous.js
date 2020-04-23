console.log("Starting")

// Asynchronous means that other processes can 
// be executed while one process is going on

setTimeout(() => {
    console.log('2 Second timer')
}, 2000)  

setTimeout(() => {
    console.log("0 second timer")
}, 0)

console.log("Stopping")