const doWorkPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        //When things go well
        //resolve([7, 4, 1])
        //When things are bad
        reject('This is my Error!')
        // Promise finishes when either reject or resolve is found
        resolve([2,3,4])
    }, 2000);
})

//When resolve is called
doWorkPromise.then((result) => {
    console.log('success!', result)
}).catch((error) => {
    console.log('Error!', error)
})

//  
//                          fulfilled
//                        / 
// Promise  -> pending ->
//                        \
//                          rejected
//

// Time for promise chaining
const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b)
        }, 2000)
    })
}

// Without Promise Chaining
// add(1, 2).then((sum) => {
//     console.log(sum)

//     add(sum, 5).then((sum) => {
//         console.log(sum)
//     }).catch((e) => {
//         console.log(e)
//     })
// }).catch((e) => {
//     console.log(e)
// })

//WITH promise chaining
add(1, 1).then((sum) => {
    console.log(sum)
    return add(sum, 4)
}).then((sum2) => {
    console.log(sum2)
}).catch((e) => {
    console.log(e)
})