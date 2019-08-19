const chalk = require('chalk');
const getNotes = require('./notes');

const message = getNotes();
console.log(message);

console.log(chalk.bold.bgGreen.black('Success!'));