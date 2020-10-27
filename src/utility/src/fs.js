const { writeFile, readFile } = require('fs').promises

const write = filepath => data => writeFile(filepath, data, 'utf8')
const read = filepath => readFile(filepath, 'utf8')

module.exports = {
    write,
    read
}
