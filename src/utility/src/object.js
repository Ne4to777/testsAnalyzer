const { curry2 } = require('./combinators')

const getProp = key => o => o[key]
const execMethod = f => params => o => o[f](params)
const execMethodEmpty = f => execMethod(f)()

const merge = o1 => o2 => ({ ...o1, ...o2 })

const hasOwnProperty = Function.prototype.call.bind(Object.prototype.hasOwnProperty)

const hasOwnPropertyC = curry2(hasOwnProperty)

module.exports = {
    getProp,
    execMethodEmpty,
    execMethod,
    hasOwnPropertyC,
    merge
}
