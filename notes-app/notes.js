const fs = require('fs')
const chalk = require('chalk')


const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }catch(e){
        return []
    }
    
}

const saveNotes = (notes) => {
    const notesJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', notesJSON)
}

const addNote = (title, body) => {
    const notes = loadNotes()
    //const duplicatesNotes = notes.filter((note) => note.title === title)
    const duplicatesNote = notes.find((note) => note.title === title)
    // Find terminates after first occurance and will stop looking
    // else if will return undefined

    //if(duplicatesNotes.length === 0){
    if(!duplicatesNote){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green('Success'))
    }
    else{
        console.log(chalk.red("Note title taken"))
    }   
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)

    if (notes.length === notesToKeep.length){
        console.log(chalk.bgRed("No Note Found!"))
    }
    else{
        console.log(chalk.bgGreen("Note Removed!"))
        saveNotes(notesToKeep)
    }
}

const listNotes = () => {
    console.log(chalk.blue("Your Notes..."))
    const notes = loadNotes()
    notes.forEach(note => {
        console.log(note.title)
    });
}

const readNote = (title) => {
    const notes = loadNotes()
    const readingNote = notes.find((note) => note.title === title)

    if(readingNote){
        console.log(chalk.inverse("Note Title:") +" " +title + '\n')
        console.log(readingNote.body)
        
    }
    else{
        console.log(chalk.bgRed("Note Title NOT Found"))
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}