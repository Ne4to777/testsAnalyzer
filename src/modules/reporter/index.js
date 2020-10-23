/* eslint-disable no-cond-assign */
/* eslint-disable guard-for-in */

const { write } = require('../../utility/src/fs')
const { pipeSync, pipe, parallelSync } = require('../../utility/src/combinators')
const {
    arrayToCsv, joinC, reduceToArray, filterC
} = require('../../utility/src/array')
const { joinAbs } = require('../../utility/src/path')
const { getProp } = require('../../utility/src/object')
const { trimLeft, getEmptyString } = require('../../utility/src/string')
const { getFirstGroupMatches, testC } = require('../../utility/src/regexp')
const { DECISIONS, SCHEME } = require('../../constants')

const [pathKey, decisionKey, contentKey] = SCHEME
const OUTPUT_PATH = 'output'
const joinOutput = joinAbs(OUTPUT_PATH)

const filterCyrillic = data => data.replace(/[^а-яё\n\s]/ig, '')
const clearBreakLines = data => data.replace(/\s*(\r|\n)/mg, '\n')
const clearFirstBreakLine = data => data.replace(/^\n/, '')

const matchDescribeAndIt = pipeSync([
    getFirstGroupMatches(/(describe|it)\('(.+)',/igm),
    joinC('\n')
])

const ifElse = predicate => onTrue => onFalse => data => predicate(data)
    ? onTrue(data)
    : onFalse
        ? onFalse(data)
        : false

const getMatchHandler = pipeSync([
    testC,
    ifElse,
])

const makeSuiteReplacer = pipeSync([
    filterCyrillic,
    clearBreakLines,
    clearFirstBreakLine
])

const matchMakeSuite = getMatchHandler(/makeSuite/ig)(makeSuiteReplacer)(getEmptyString)

const testForGemini = testC(/gemini/)

const beautify = pipeSync([
    trimLeft,
    trimRoot => reduceToArray(acc => item => {
        const path = item[pathKey]
        let decision = item[decisionKey]
        let content = extractContent(item[contentKey])
        if (testForGemini(path)) {
            content = 'snapshot'
            decision = DECISIONS.E
        }
        return acc.concat({
            [pathKey]: trimRoot(path),
            [decisionKey]: decision,
            [contentKey]: content
        })
    })
])

const chooseMatch = matches => {
    for (const item of matches) {
        if (item) return item
    }
    return ''
}

const matchesJoiner = describeAndItData => makeSuiteData => [describeAndItData, makeSuiteData]

const getMatchesByMatchers = parallelSync(matchesJoiner)([
    matchDescribeAndIt,
    matchMakeSuite
])

const extractContent = pipeSync([
    getMatchesByMatchers,
    chooseMatch
])

const getContentKey = getProp(contentKey)

const removeEmpty = pipeSync([
    getContentKey,
    Boolean
])

const writeToOutput = pipeSync([
    joinOutput,
    write
])

module.exports = ({ filepath, root }) => pipe([
    beautify(root),
    filterC(removeEmpty),
    arrayToCsv(SCHEME),
    writeToOutput(filepath)
])
