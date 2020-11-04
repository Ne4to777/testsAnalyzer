/* eslint-disable no-new-func */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const { joinAbs } = require('./path')
const {
    pipeSync, B,
} = require('./combinators')
const { log } = require('./debuggers')

const getModuleByPath = pipeSync([
    joinAbs,
    B(require),
])

const chargeWithGlobals = f => globals => Function(
    ...Object.keys(globals),
    `return ${f.toString()}`
)(...Object.values(globals))

const chargeWithContext = f => context => f.bind(context)

const chargeWithArgs = f => (...args) => () => f(...args)

const chargeWith = f => ({ args, globals, context }) => {
    let chargedF = f
    if (globals) chargedF = chargeWithGlobals(chargedF)(globals)
    if (context) chargedF = chargeWithContext(chargedF)(context)
    if (args) chargedF = chargeWithArgs(chargedF)(...args)
    return chargedF
}

module.exports = {
    getModuleByPath,
    chargeWith,
    chargeWithGlobals,
    chargeWithContext,
    chargeWithArgs,
}
