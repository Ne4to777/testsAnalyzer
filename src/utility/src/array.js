const csv = require('csv')

const someC = f => array => array.some(f)
const mapify = xs => xs.reduce((acc, el) => {
    acc[el] = true
    return acc
}, {})

const reduceCSync = init => f => array => array.reduce((acc, el) => f(acc)(el), init)
const reduceC = init => f => array => array.reduce(async (acc, el) => f(await acc)(await el), init)
const reduceToArray = reduceC([])

const arrayToCsv = scheme => data => new Promise((resolve, reject) => csv
    .stringify(
        data,
        {
            header: true,
            columns: scheme
        },
        (err, chunk) => err ? reject(err) : resolve(chunk)
    ))
const joinC = joiner => data => data.join(joiner)
const filterC = predicator => data => data.filter(predicator)

module.exports = {
    someC,
    joinC,
    mapify,
    reduceC,
    filterC,
    reduceToArray,
    reduceCSync,
    arrayToCsv,
}
