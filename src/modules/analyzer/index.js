const { readFile } = require('fs').promises
const { parallelSync, pipeSync } = require('../../utility/src/combinators')
const { DECISIONS, SCHEME } = require('../../constants')

const [pathKey, decisionKey, contentKey] = SCHEME

const testByRE = data => re => re.test(data)

const testByREs = tester => regexes => {
    for (let i = 0; i < regexes.length; i += 1) {
        if (tester(regexes[i])) return true
    }
    return false
}

const test = pipeSync([
    testByRE,
    testByREs
])

const testByPathAndContent = type => ({ path, content, checkers }) =>
    test(content)(checkers[type].content) || test(path)(checkers[type].path)

const checkForK = testByPathAndContent(DECISIONS.C)
const checkForE = testByPathAndContent(DECISIONS.E)
const checkForU = testByPathAndContent(DECISIONS.U)

const getDecision = parallelSync(x => y => z => []
    .concat(x ? DECISIONS.E : [])
    .concat(y ? DECISIONS.C : [])
    .concat(z ? DECISIONS.U : [])
    .join(', '))([
    checkForE,
    checkForK,
    checkForU
])

const iteratePaths = ({ checkers }) => async (paths) => {
    const result = []
    for (let i = 0; i < paths.length; i += 1) {
        const path = paths[i]
        const content = await readFile(path, 'utf8')
        const decision = getDecision({ path, content, checkers })
        result.push({
            [pathKey]: path,
            [decisionKey]: decision,
            [contentKey]: content
        })
    }
    return result
}

module.exports = iteratePaths
