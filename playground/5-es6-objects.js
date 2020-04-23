// Object Property Shorthand

const name = 'Andrew'
const userAge = 27

// There is shorthand object syntax when variable name and 
// property name are the same
const user = {
    name,
    age: userAge,
    location: "Philadelphia"
}

console.log(user)

// Object destructuring

const product = {
    label: 'Red Notebook',
    price: 3,
    stock: 201,
    salePrice: undefined
}
// goal of desructuring is to extract object properties
// and values into individual variables

// const label = product.label
// const stock = product.stock

// destructuring syntax
const {label:productLabel, stock, rating=5} = product
console.log(productLabel)
console.log(stock)

// for rating, the default(5 in our case ^^) will only
// be used if there is no rating property for the object
console.log(rating)

// Can destructure directly in function call
const transaction = (type, { label, stock }) => {
    console.log(type, label, stock)
}

transaction('order', product)