const { readdir } = require('fs').promises
const { joinC2, extname } = require('../../../utility/src/path')
const { pipeSync, T, parallelSync } = require('../../../utility/src/combinators')
// const { emptyFileLogger } = require('../../../utility/src/dummies')
const { execMethodEmpty, getProp } = require('../../../utility/src/object')
const { mapify } = require('../../../utility/src/array')
const { testArrayInverted } = require('../../../utility/src/regexp')
const { and, negate } = require('../../../utility/src/logical')
// const { log } = require('../../../utility/src/debuggers')

const isFileNameHasValidExtension = extensions => pipeSync([
    extname,
    getProp,
    T(mapify(extensions)),
    Boolean,
])

const parallelSyncAnd = parallelSync(and)

const isFileNameValid = ({ extensions, patternsToExclude }) => parallelSyncAnd([
    isFileNameHasValidExtension(extensions),
    negate(testArrayInverted(patternsToExclude)),
])

const isFolder = execMethodEmpty('isDirectory')

const isFolderValid = ({ patternsToExclude }) => parallelSyncAnd([
    isFolder,
    pipeSync([
        getProp('name'),
        negate(testArrayInverted(patternsToExclude)),
    ]),
])

const sniffR = ({
    validPaths, extensions, exclude,
}) => {
    const validateFilenameByParams = isFileNameValid({ extensions, patternsToExclude: exclude.files })
    const validateFoldernameByParams = isFolderValid({ patternsToExclude: exclude.folders })
    const validateFullPath = testArrayInverted(validPaths)
    return async function* sniff(path) {
        const dir = await readdir(path, { withFileTypes: true })
        const joinByPath = joinC2(path)
        for (const dirent of dir) {
            const { name } = dirent
            const fullPath = joinByPath(name)
            if (validateFoldernameByParams(dirent)) {
                yield* sniff(fullPath)
            } else if (validateFilenameByParams(name)) {
                if (validateFullPath(fullPath)) {
                    yield fullPath
                }
            }
        }
    }
}

module.exports = {
    isFileNameHasValidExtension,
    isFileNameValid,
    isFolder,
    isFolderValid,
    sniffR,
}
