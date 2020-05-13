// CRUD create read update delete

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient

// // for working with objects ids
// const ObjectID = mongodb.ObjectID

const { MongoClient, ObjectID } = require('mongodb') 

// Use ip address for localhost
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

// const id = new ObjectID()
// console.log(id.id.length)
// console.log(id.toHexString().length)

MongoClient.connect(connectionURL, {useNewUrlParser: true, useUnifiedTopology: true}, (error, client) => {
    if(error) {
        return console.log("Unable to connect to database")
    }
    //console.log('Connected correctly')
    //mongodb will automatically create a database that u try to reference if it doesnt already exist
    const db = client.db(databaseName)

    //CREATE (insert)
    // db.collection('users').insertOne({
    //     _id: id,
    //     name: 'Vikram',
    //     age: 22
    // }, (error, result) => {
    //     if(error){
    //         return console.log('Unable to insert user')
    //     }
    //     console.log(result.ops)
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         description: "Homework",
    //         completed: false
    //     },
    //     {
    //         description: "Clean room",
    //         completed: true
    //     },
    //     {
    //         description: "Photoshop edit",
    //         completed: false
    //     }
    // ], (error, result) => {
    //     if(error){
    //         return console.log('Unable to insert tasks')
    //     }
    //     console.log(result.ops)
    // })

    // READ (Find)
    // db.collection('users').findOne({ _id: new ObjectID("5ea9e1bb5232425f500177d2") }, (error, userDocument) => {
    //     //searching for a document and no finding one is not an error, it will return null
    //     if(error){
    //         return console.log('Unable to fetch user')
    //     }
    //     console.log(userDocument)
    // })

    //find returns a cursor to where the document is in the database
    // db.collection('users').find({age: 22}).toArray((error, users) => {
    //     console.log(users)
    // }) 

    // db.collection('users').find({age: 22}).count((error, count) => {
    //     console.log(count)
    // }) 

    // db.collection('tasks').findOne({_id: new ObjectID('5ea9deaa18fc5747a0394625')}, (error, task) => {
    //     console.log(task)
    // })

    // db.collection('tasks').find({completed: false}).toArray((error, tasks) => {
    //     console.log(tasks)
    // });

    //UPDATE
    // db.collection('users').updateOne({
    //     _id: new ObjectID("5ea9d2eeb09b1118502cb7e1")
    // }, {
    //     //look up mongodb update operators on google to find this
    //     // $set: {
    //     //     name: 'Yash'
    //     // }
    //     $inc: {
    //         age: 1
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // db.collection('tasks').updateMany({
    //     completed: false
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }).then((result) => {
    //     console.log(result.modifiedCount)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // DELETE
    // db.collection('users').deleteOne({name : "Prithvi"}).then((result) => {
    //     console.log(result)
    // }). catch((error) => {
    //     console.log(error)
    // })

    // db.collection('users').deleteMany({name : "Vikram"}).then((result) => {
    //     console.log(result)
    // }). catch((error) => {
    //     console.log(error)
    // })

    //Challenge
    db.collection('tasks').deleteOne({description : "Homework"}).then((result) => {
        console.log(result)
    }). catch((error) => {
        console.log(error)
    })
})

