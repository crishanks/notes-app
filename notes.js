const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
  const notes = loadNotes()
  const duplicateNote = notes.find(note => note.title === title)

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    })
    console.log(chalk.green.inverse('New note added!'))
    saveNotes(notes)
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

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.inverse("Your notes"))
  notes.forEach(note => console.log(note.title));
}

const readNote = title => {
  const notes = loadNotes();
  const note = notes.find(note => note.title === title);

  if (note) {
    console.log(chalk.blue.inverse(note.title))
    console.log(note.body)
  }else {
    console.log(chalk.red.inverse('No note found!'))
  }
}

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
}