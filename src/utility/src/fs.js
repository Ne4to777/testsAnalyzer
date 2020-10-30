const { writeFile, readFile, readdir } = require('fs').promises
const { joinC2 } = require('./path')

const write = filepath => data => writeFile(filepath, data, 'utf8')
const read = filepath => readFile(filepath, 'utf8')
const readDirWithFiles = path => readdir(path, { withFileTypes: true })

const fsToGenerator = ({ predicateToRecurse, predicateToReturn }) => async function* f(path) {
    const dirs = await readDirWithFiles(path)
    const joinByPath = joinC2(path)
    for (const dirent of dirs) {
        const { name } = dirent
        const fullPath = joinByPath(name)
        const param = {
            dirent,
            fullPath,
        }
        if (predicateToRecurse(param)) {
            yield* f(fullPath)
        } else if (predicateToReturn(param)) {
            yield fullPath
        }
    }
}

module.exports = {
    write,
    read,
    readDirWithFiles,
    fsToGenerator,
}
