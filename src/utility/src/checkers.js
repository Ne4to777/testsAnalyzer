const { W } = require('./combinators')
const { equal, unequal } = require('./equality')
const { negate, conjunct } = require('./logical')

const typeOf = x => Object.prototype.toString.call(x).slice(8, -1).toLowerCase()
const constructorOf = x => x.prototype.constructor.toString().slice(9, -20)
const typeEqual = type => x => equal(type)(typeOf(x))

const isNumber = typeEqual('number')
const isNotNumber = negate(isNumber)
const isString = typeEqual('string')
const isNotString = negate(isString)
const isBoolean = typeEqual('boolean')
const isNotBoolean = negate(isBoolean)
const isRegExp = typeEqual('regexp')
const isNotRegExp = negate(isRegExp)
const isFunction = typeEqual('function')
const isNotFunction = negate(isFunction)
const isSymbol = typeEqual('symbol')
const isNotSymbol = negate(isSymbol)
const isArray = typeEqual('array')
const isNotArray = negate(isArray)
const isObject = typeEqual('object')
const isNotObject = negate(isObject)
const isBlob = typeEqual('blob')
const isNotBlob = negate(isBlob)
const isFile = typeEqual('file')
const isNotFile = negate(isFile)
const isError = typeEqual('error')
const isNotError = negate(isError)

const isNull = equal(null)
const isNotNull = negate(isNull)
const isUndefined = equal(undefined)
const isDefined = negate(isUndefined)
const isExists = conjunct(isDefined)(isNotNull)
const isNotExists = negate(isExists)
const isNaN = conjunct(isNumber)(W(unequal))
const isNotNaN = negate(isNaN)

module.exports = {
    constructorOf,
    typeOf,
    typeEqual,
    isNumber,
    isNotNumber,
    isString,
    isNotString,
    isBoolean,
    isNotBoolean,
    isRegExp,
    isNotRegExp,
    isFunction,
    isNotFunction,
    isSymbol,
    isNotSymbol,
    isArray,
    isNotArray,
    isObject,
    isNotObject,
    isBlob,
    isNotBlob,
    isFile,
    isNotFile,
    isError,
    isNotError,
    isNull,
    isNotNull,
    isUndefined,
    isDefined,
    isExists,
    isNotExists,
    isNaN,
    isNotNaN,
}
