const { join, extname } = require('path')
const { curry2, curry3 } = require('./combinators')

const joinC2 = curry2(join)
const joinC3 = curry3(join)
const joinAbs = joinC3(process.env.PWD)

module.exports = {
    joinC2,
    joinC3,
    joinAbs,
    extname
}
