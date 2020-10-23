/* eslint-disable no-cond-assign */
const { debugParams } = require('./debuggers')

const regExpOf = params => value =>
    // debugParams({ name: 'regExpOf', types: ['string|regexp', String] })(params, value) ||
    new RegExp(value, params)

const testC = re => value =>
    // debugParams({ name: 'testC', types: [RegExp, String] })(re, value) ||
    re.test(value)

const getFirstGroupMatches = re => data => {
    let itemArray
    const result = []
    while (itemArray = re.exec(data)) {
        result.push(itemArray[2])
    }
    return result
}

module.exports = {
    regExpOf,
    testC,
    getFirstGroupMatches
}
