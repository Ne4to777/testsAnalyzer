const { write } = require('../fs')
const { joinAbs } = require('../path')

class FileLogger {
    constructor({ root = '', filesOutput = '', pathsOutput = '' }) {
        const joinRoot = joinAbs(root)
        this.filesOutput = filesOutput
        this.pathsOutput = pathsOutput
        this.filesOutputAbs = joinRoot(filesOutput)
        this.pathsOutputAbs = joinRoot(pathsOutput)
        this.state = {
            files: [],
            paths: []
        }
    }

    add({ file, path }) {
        if (file) this.state.files.push(file)
        if (path) this.state.paths.push(path)
    }

    async write() {
        const {
            state, filesOutput, pathsOutput, filesOutputAbs, pathsOutputAbs
        } = this
        const { files, paths } = state
        if (filesOutput) await write(filesOutputAbs)(files.join('\n'))
        if (pathsOutput) await write(pathsOutputAbs)(paths.join('\n'))
    }

    debug() {
        console.log(this.state.files.join('\n'))
        console.log(this.state.paths.join('\n'))
    }
}

module.exports = FileLogger
