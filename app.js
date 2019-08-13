const fs = require('fs');

fs.writeFileSync('notes.txt', 'My name is Cris.');

fs.appendFileSync('notes.txt', " I'm a computer genius!");
