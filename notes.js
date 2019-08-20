const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => {
  return "Your notes...";
}

const addNote = (title, body) => {
  const notes = loadNotes()
  const duplicateNotes = notes.filter(note => note.title !== title)

  duplicateNotes.push({
    title: title,
    body: body
  })
  if (duplicateNotes.length > notes.length) {
    console.log(chalk.green.inverse('New note added!'))
    saveNotes(duplicateNotes)
  } else {
    console.log(chalk.red.inverse('Note title taken!'))
  }
}

const removeNote = title => {
  const notes = loadNotes()
  const notesToKeep = notes.filter(note => note.title !== title)

  if (notes.length > notesToKeep.length) {
    console.log(chalk.green.inverse("Note removed!"))
    saveNotes(notesToKeep)
  } else {
    console.log(chalk.red.inverse("No note found!"))
  }
}

const saveNotes = notes => {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch(e) {
    return []
  }
}

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote
}