const { parallelSync, pipeSync, C } = require('../../../utility/src/combinators')
const { someCSync } = require('../../../utility/src/array')
const { getProp, isObjectFilled } = require('../../../utility/src/object')
const { testC } = require('../../../utility/src/regexp')
const { log } = require('../../../utility/src/debuggers')
const { DECISION_TYPES_MAP } = require('../../../constants')

const testArray = pipeSync([
    C(testC),
    someCSync
])

const testArrayInverted = C(testArray)

const decisionJoiner = unit => component => e2e => {
    const result = {}
    if (unit) result[DECISION_TYPES_MAP.U] = true
    if (component) result[DECISION_TYPES_MAP.C] = true
    if (e2e && !unit) result[DECISION_TYPES_MAP.E] = true
    return result
}

const decisionsJoiner = contentDecisions => pathDecisions => Object
    .keys({ ...(isObjectFilled(contentDecisions) ? contentDecisions : pathDecisions) })
    .filter(Boolean)
    .join(', ')

const parallelDecisionJoiner = parallelSync(decisionJoiner)
const parallelDecisionsJoiner = parallelSync(decisionsJoiner)

const getChannelByCheckers = checkers => type => pipeSync([
    getProp(type),
    parallelDecisionJoiner([
        testArrayInverted(checkers[DECISION_TYPES_MAP.U][type]),
        testArrayInverted(checkers[DECISION_TYPES_MAP.C][type]),
        testArrayInverted(checkers[DECISION_TYPES_MAP.E][type]),
    ]),
])

const getDecision = pipeSync([
    getChannelByCheckers,
    getChannel => parallelDecisionsJoiner([
        getChannel('content'),
        getChannel('path')
    ])
])

module.exports = {
    testArray,
    testArrayInverted,
    decisionJoiner,
    decisionsJoiner,
    parallelDecisionJoiner,
    parallelDecisionsJoiner,
    getChannelByCheckers,
    getDecision
}
