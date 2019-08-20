const fs = require('fs')

const getNotes = () => {
  return "Your notes...";
}

const addNote = function(title, body) {
  const notes = loadNotes()
  const duplicateNotes = notes.filter(note => note.title !== title)

  duplicateNotes.push({
    title: title,
    body: body
  })
  
  saveNotes(duplicateNotes)
}

const saveNotes = function(notes) {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = function() {
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
  addNote: addNote
}