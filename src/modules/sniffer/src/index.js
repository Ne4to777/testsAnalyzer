const { readDirWithFiles } = require('../../../utility/src/fs')
const { joinC2, extname } = require('../../../utility/src/path')
const {
    pipeSync, parallelSync, C, K, B,
} = require('../../../utility/src/combinators')
const { execMethodEmpty, getProp } = require('../../../utility/src/object')
const { someCSync } = require('../../../utility/src/array')
const { testArrayInverted } = require('../../../utility/src/regexp')
const { negate, conjunct } = require('../../../utility/src/logical')
const { equal } = require('../../../utility/src/equality')
// const { log } = require('../../../utility/src/debuggers')

const isFileNameHasValidExtension = C(pipeSync([
    extname,
    equal,
    someCSync,
]))

const parallelSyncConjunct = parallelSync(conjunct)

const testFileNameExtension = pipeSync([
    getProp('extensions'),
    isFileNameHasValidExtension,
])

const testNameNotExcluded = pipeSync([
    getProp('patternsToExclude'),
    testArrayInverted,
    negate,
])

const isFileNameValid = parallelSyncConjunct([
    testFileNameExtension,
    testNameNotExcluded,
])

const isFolder = execMethodEmpty('isDirectory')

const testFolder = parallelSyncConjunct([
    K(isFolder),
    C(B)(getProp('name')),
])

const isFolderValid = pipeSync([
    testNameNotExcluded,
    testFolder,
])
const prepareSniffParams = ({ validPaths, extensions, exclude }) => ({
    validateFileName: isFileNameValid({ extensions, patternsToExclude: exclude.files }),
    validateFolderName: isFolderValid({ patternsToExclude: exclude.folders }),
    validateFullPath: testArrayInverted(validPaths),
})

const sniffR = pipeSync([
    prepareSniffParams,
    ({
        validateFileName, validateFolderName, validateFullPath,
    }) => async function* sniff(path) {
        const dirs = await readDirWithFiles(path)
        const joinByPath = joinC2(path)
        for (const dirent of dirs) {
            const { name } = dirent
            const fullPath = joinByPath(name)
            if (validateFolderName(dirent)) {
                yield* sniff(fullPath)
            } else if (validateFileName(name) && validateFullPath(fullPath)) {
                yield fullPath
            }
        }
    },
])

module.exports = {
    testFileNameExtension,
    testNameNotExcluded,
    isFileNameHasValidExtension,
    isFileNameValid,
    isFolder,
    testFolder,
    isFolderValid,
    sniffR,
}
