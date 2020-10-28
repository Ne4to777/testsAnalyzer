const I = x => x // identity
const K = x => () => x // constant
const A = f => x => f(x) // apply
const T = x => f => f(x) // thrush
const W = f => x => f(x)(x) // duplication
const C = f => y => x => f(x)(y) // flip
const B = f => g => x => f(g(x)) // compose
const S = f => g => x => f(x)(g(x)) // substitution
const P = f => g => x => y => f(g(x))(g(y)) // psi
const U = f => f(f) // UofU
const Y = f => U(g => f(x => U(g)(x))) // fix-point

const pipeSync = fs => fs.reduce((acc, f) => x => f(acc(x)), I)
const pipe = fs => fs.reduce((acc, f) => async x => f(await acc(x)), I)
const parallelSync = joiner => fs => x => fs.reduce((acc, f) => acc(f(x)), joiner)
const parallel = joiner => fs => async x => fs.reduce(async (acc, f) => (await acc)(await f(x)), joiner)
const curry2 = f => x => y => f(x, y)
const curry3 = f => x => y => z => f(x, y, z)

module.exports = {
    I, K, A, T, W, C, B, S, P, U, Y, pipeSync, pipe, parallelSync, parallel, curry2, curry3,
}
