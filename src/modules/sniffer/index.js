const { pipe, pipeSync, B } = require('../../utility/src/combinators')
const { generatorToArray } = require('../../utility/src/generator')
const { sniffR } = require('./src')
const { FileLogger, log } = require('../../utility/src/debuggers')

const loggerForInvalids = new FileLogger({
    root: 'output',
    filesOutput: 'invalidFileNames.txt',
    pathsOutput: 'invalidFullPaths.txt'
})
const loggerForValids = new FileLogger({
    root: 'output',
    pathsOutput: 'validFullPaths.txt'
})

const logToFiles = pipe([
    paths => paths.map(path => loggerForValids.add({ path })),
    // () => loggerForValids.write(),
    // () => loggerForInvalids.write()
])

const sniff = pipeSync([
    sniffR,
    B(generatorToArray),
    // parallel(K)([
    //     I,
    //     logToFiles
    // ])
])

module.exports = params => () => sniff(params)(params.root)
