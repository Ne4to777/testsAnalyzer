/* eslint-disable no-param-reassign */
/* eslint-disable no-cond-assign */
const { debugParams } = require('./debuggers')

const regExpOf = params => value =>
    // debugParams({ name: 'regExpOf', types: ['string|regexp', String] })(params, value) ||
    new RegExp(value, params)

const testC = re => value =>
    // debugParams({ name: 'testC', types: [RegExp, String] })(re, value) ||
    re.test(value)

const getGroupMatches = n => re => predicate => data => {
    let itemArray
    const result = []
    re.lastIndex = 0
    while (itemArray = re.exec(data)) {
        const item = itemArray[n]
        if (predicate(item)) result.push(item)
    }
    return result
}

const matchC = re => data => {
    const res = data.match(re)
    if (res) return res[1]
}

module.exports = {
    regExpOf,
    testC,
    matchC,
    getGroupMatches
}
