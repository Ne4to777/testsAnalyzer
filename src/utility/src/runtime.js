/* eslint-disable no-param-reassign */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const { joinAbs } = require('./path')
const {
    pipeSync, B
} = require('./combinators')
const { log } = require('./debuggers')

const getModuleByPath = pipeSync([
    joinAbs,
    B(require)
])

module.exports = {
    getModuleByPath
}
