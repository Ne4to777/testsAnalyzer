const { writeFile } = require('fs').promises

const write = filepath => data => writeFile(filepath, data, 'utf8')

module.exports = {
    write
}
