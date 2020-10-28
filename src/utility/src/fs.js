const { writeFile, readFile, readdir } = require('fs').promises

const write = filepath => data => writeFile(filepath, data, 'utf8')
const read = filepath => readFile(filepath, 'utf8')
const readDirWithFiles = path => readdir(path, { withFileTypes: true })

module.exports = {
    write,
    read,
    readDirWithFiles,
}
