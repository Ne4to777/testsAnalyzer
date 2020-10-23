const { emptyGenerator } = require('./dummies')

const generatorToArray = async (iter = emptyGenerator()) => {
    const r = []
    for await (const x of iter) { r.push(x) }
    return r
}

module.exports = {
    generatorToArray
}
