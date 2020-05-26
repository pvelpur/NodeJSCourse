require('../src/db/mongoose')
const Task = require('../src/models/task')

//findByIdAndDelete
// Task.findByIdAndDelete('5eaa36c3bdc7ba2ae0c7a656').then((task) => {
//     //console.log(task)
//     return Task.countDocuments({completed:false})
// }).then((count) => {
//     console.log(count)
// }).catch((e) => {
//     console.log(e)
// })

const DeleteTaskAndCount = async (id) => {
    await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed: false})
    return count
}

DeleteTaskAndCount('5eaa36c3bdc7ba2ae0c7a656').then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})
