/* eslint-disable no-cond-assign */
/* eslint-disable guard-for-in */

const { write } = require('../../utility/src/fs')
const {
    pipeSync, pipe, parallelSync, I, K, C
} = require('../../utility/src/combinators')
const {
    arrayToCsv, joinCSync, reduceToArraySync, filterCSync, reduceCSync, last, concatCSync, isEmpty, mapCSync, head
} = require('../../utility/src/array')
const { joinAbs } = require('../../utility/src/path')
const { getProp } = require('../../utility/src/object')
const { trimLeft, getEmptyString, splitC } = require('../../utility/src/string')
const { getGroupMatches, testC, } = require('../../utility/src/regexp')
const { ifElse, ifThen } = require('../../utility/src/conditional')
const { DECISION_TYPES_MAP, SCHEME } = require('../../constants')
const { log } = require('../../utility/src/debuggers')
const { equal } = require('../../utility/src/equality')

const [pathKey, decisionKey, contentKey] = SCHEME

const OUTPUT_PATH = 'output'

const joinOutput = joinAbs(OUTPUT_PATH)

const ifLastEqual = pipeSync([
    last,
    equal,
    ifElse,
])

const duplicateFilter = parallelSync(I)([
    ifLastEqual,
    K,
    C(concatCSync)
])

const deduplicateArray = reduceCSync([])(duplicateFilter)

const testForGemini = testC(/gemini/)

const matchByRE = n => re => ifElse(testC(re))(
    pipeSync([
        getGroupMatches(n)(re)(I),
        joinCSync('\n')
    ])
)(
    getEmptyString
)

const matchByRE1 = matchByRE(1)
const matchByRE2 = matchByRE(2)

const matchMakeSuite = matchByRE1(/makeSuite\('(.+)'/ig)
const matchMakeCase = matchByRE1(/'(.+)': makeCase\(/ig)
const matchMergeSuites = matchByRE1(/'(.+)': mergeSuites\(/ig)

const matchDescribe = matchByRE1(/describe\('(.+)'.+/ig)
const matchIt = matchByRE2(/\sit\(('|`)(.+)('|`)+/ig)

const matchAnyChar = matchByRE1(/'([а-яёa-z0-9.,+\-"\s<>:${}]+)'/ig)

const hermioneMatch = data => data.replace(/makeCase\(|makeSuite\(|prepareSuite\(|.+/ig, match => {
    if (/makeCase/ig.test(match)) return matchMakeCase(data)
    if (/makeSuite/ig.test(match)) return matchMakeSuite(data)
    if (/prepareSuite/ig.test(match)) return matchMergeSuites(data)
    return ''
})

const unitMatch = data => data.replace(/describe\(|\sit\(|.+/ig, match => {
    if (/describe/.test(match)) return matchDescribe(data)
    if (/\sit/.test(match)) return matchIt(data)
    return ''
})

const anyMatch = data => data.replace(/'[а-яё]+|.+/i, match => {
    if (/'[а-яё]+/ig.test(match)) return matchAnyChar(data)
    return ''
})

const extractContent = pipeSync([
    splitC(/\n/),
    filterCSync(testC(/[a-zа-яё0-9]/ig)),
    mapCSync(parallelSync(x => y => z => x || y || z)([
        hermioneMatch,
        unitMatch,
        anyMatch
    ])),
    filterCSync(Boolean),
    deduplicateArray,
    joinCSync('\n'),
    // log
])

const beautify = pipeSync([
    trimLeft,
    trimRoot => reduceToArraySync(item => {
        const path = item[pathKey]
        let decision = item[decisionKey]
        // console.log(path)

        let content = extractContent(item[contentKey])
        if (testForGemini(path)) {
            content = 'snapshot'
            decision = DECISION_TYPES_MAP.E
        }
        return {
            [pathKey]: trimRoot(path),
            [decisionKey]: decision,
            [contentKey]: content
        }
    })
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
    filterCSync(removeEmpty),
    arrayToCsv(SCHEME),
    writeToOutput(filepath)
])
