const { fsToGenerator } = require('../../../utility/src/fs')
const { extname } = require('../../../utility/src/path')
const {
    pipeSync, parallelSync, C, K, B, // parallelizeN, composeN,
} = require('../../../utility/src/combinators')
const { execMethodEmpty, getProp } = require('../../../utility/src/object')
const { someCSync } = require('../../../utility/src/array')
const { testArrayInverted } = require('../../../utility/src/regexp')
const { negate, conjunct, and } = require('../../../utility/src/logical')
const { equal } = require('../../../utility/src/equality')
const { generatorToArray } = require('../../../utility/src/generator')
const { log } = require('../../../utility/src/debuggers')

// const parallel2 = composeN(parallelizeN(2))(2)
// const parallel2And = parallel2(and)

const isFileNameHasValidExtension = C(pipeSync([
    extname,
    equal,
    someCSync,
]))

const parallelSyncConjunct = parallelSync(conjunct)
const parallelSyncAnd = parallelSync(and)

const testFileNameExtension = pipeSync([
    getProp('extensions'),
    isFileNameHasValidExtension,
])

const testNameNotExcluded = pipeSync([
    getProp('patternsToExclude'),
    testArrayInverted,
    negate,
])

// const isFileNameValid = parallel2And(testFileNameExtension)(testNameNotExcluded)

const isFileNameValid = parallelSyncConjunct([
    testFileNameExtension,
    testNameNotExcluded,
])

const isFolder = execMethodEmpty('isDirectory')

// const testFolder = parallel2And(K(isFolder))(C(B)(getProp('name')))

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
    validateFolderName: pipeSync([
        getProp('dirent'),
        isFolderValid({ patternsToExclude: exclude.folders }),
    ]),
    validateFullPath: testArrayInverted(validPaths),
})

const validateFileNameByParam = validateFileName => pipeSync([
    getProp('dirent'),
    getProp('name'),
    validateFileName,
])
const validateFullPathByParam = validateFullPath => pipeSync([
    getProp('fullPath'),
    validateFullPath,
])
const preparePredicators = ({
    validateFileName, validateFolderName, validateFullPath,
}) => ({
    predicateToRecurse: validateFolderName,
    predicateToReturn: parallelSyncAnd([
        validateFileNameByParam(validateFileName),
        validateFullPathByParam(validateFullPath),
    ]),
})

const sniff = pipeSync([
    prepareSniffParams,
    preparePredicators,
    fsToGenerator,
    B(generatorToArray),
])

module.exports = {
    testFileNameExtension,
    testNameNotExcluded,
    isFileNameHasValidExtension,
    isFileNameValid,
    isFolder,
    testFolder,
    isFolderValid,
    sniff,
}
