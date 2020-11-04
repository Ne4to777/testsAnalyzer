const csv = require('csv')
const { C, B } = require('./combinators')

const someC = f => data => data.some(f)
const someCSync = predicator => data => data.some(predicator)

const concatCSync = el => data => data.concat(el)
const concatC = el => async data => data.concat(await el)
const reduceCSync = init => f => data => data.reduce((acc, el) => f(acc)(el), init)
const reduceC = init => f => data => data.reduce(async (acc, el) => f(await acc)(await el), init)
const reduceToArraySync = f => reduceCSync([])(C(B(concatCSync)(f)))
const reduceToArray = f => reduceC([])(C(B(concatC)(f)))
const mapCSync = f => data => data.map(f)

const arrayToCsv = scheme => data => new Promise((resolve, reject) => csv
    .stringify(
        data,
        {
            header: true,
            columns: scheme,
        },
        (err, chunk) => err ? reject(err) : resolve(chunk)
    ))
const joinCSync = joiner => data => data.join(joiner)
const filterCSync = predicator => data => data.filter(predicator)

const mapify = xs => xs.reduce((acc, el) => {
    acc[el] = true
    return acc
}, {})

const head = xs => xs[0]
const last = xs => xs[xs.length - 1]

const isFilled = xs => Boolean(xs.length)
const isEmpty = xs => !xs.length

module.exports = {
    someCSync,
    someC,
    joinCSync,
    mapify,
    reduceC,
    filterCSync,
    reduceToArray,
    reduceCSync,
    reduceToArraySync,
    arrayToCsv,
    concatCSync,
    concatC,
    last,
    head,
    isEmpty,
    isFilled,
    mapCSync,
}
