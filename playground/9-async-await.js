// point is the manage asynchronous tasks with ease
//async functions always return a promise 
//with nothing the promise gets fulfilled with undefined implicitly

//await can only work with async functions

const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(a < 0 || b < 0) {
                return reject('Numbers must be non-negative')
            }
            resolve(a + b)
        }, 2000)
    })
}

const doWork = async () => {
    //throw new Error('Something went wrong')
    //return 'Prithvi'

    //await makes in syntactically cleaner
    const sum = await add(1, 99)
    //return sum
    const sum2 = await add(sum, 60)
    const sum3 = await add(sum2, -40)
    return sum3
}

doWork().then((res) => {
    console.log('result', res)
}).catch((e)=> {
    console.log(e) // can get here if u throw and error thereby rejecting the promise
})