const greeter = (name = 'Anonymous', age) => {
    console.log('Hello ' + name)
}

greeter('Prithvi')

greeter() // default parameter is 'undefined'