const { read } = require('../../utility/src/fs')
const { reduceToArray } = require('../../utility/src/array')
const { getDecision } = require('./src')

const { SCHEME } = require('../../constants')

const [pathKey, decisionKey, contentKey] = SCHEME

module.exports = ({ checkers }) => reduceToArray(async path => {
    const content = await read(path)
    const getDecisionByCheckers = getDecision(checkers)
    return {
        [pathKey]: path,
        [decisionKey]: getDecisionByCheckers({ path, content }),
        [contentKey]: content,
    }
})
