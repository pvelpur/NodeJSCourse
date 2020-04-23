// 1st way
// const square = function(x){
//     return x*x
// }

//2nd way
// const square = (x) => {return x*x} 

//3rd way
// const square = (x) => x*x

// console.log(square(2))

// create an object
// Arrow functions don't bind the 'this' value
// So should use 'function'
// OR do down below (by removing the 'function keyword)
// and removing the semicolon
const event = {
    name: 'Birthday Party',
    guestList: ['Person 1', 'Person 2', 'Person 3'],
    printGuestList() {
        console.log("Guest list for " + this.name)

        // Below causes error because it creates it's own 'this' binding
        // this.guestList.forEach(function(guest){
        //     console.log(guest + " is attending " + this.name + "\n")
        // })

        // Solution here is to use arrow function
        // Since arrow functions don't bind a 'this' value
        this.guestList.forEach((guest) => {
            console.log(guest + " is attending " + this.name + "\n")        })
    }
}

event.printGuestList()