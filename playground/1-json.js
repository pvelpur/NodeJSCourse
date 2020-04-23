const fs = require('fs') 

// const book = {
//     title: "Ego is an enemy",
//     author: 'Ryan Holiday'
// }

// Right now we have a JavaScript object and we want to 
// convert it to a string as JSON so that we can send
// it to a file using fs (fileSystem) which is a built
// in node module
// JSON.parse to go other way

// const bookJSON = JSON.stringify(book)
// fs.writeFileSync('1-json.json', bookJSON)

// const dataBuffer = fs.readFileSync('1-json.json')
// databuffer is the way for nodejs to represent binary data
// console.log(dataBuffer.toString())
// const dataJSON = dataBuffer.toString()
// const data = JSON.parse(dataJSON)
// console.log(data.title)

//CHALLENGE
//{"name":"Andrew","planet":"Earth","age":27}
// change name and age and rewrite to file
const dataBuffer = fs.readFileSync('1-json.json')
const dataJSON = dataBuffer.toString()
const data = JSON.parse(dataJSON)
data.name = 'Prithvi'
data.age = '21'

newDataJSON = JSON.stringify(data)
fs.writeFileSync('1-json.json', newDataJSON)


