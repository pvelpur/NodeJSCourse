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