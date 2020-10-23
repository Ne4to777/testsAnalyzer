const equal = x => y => x === y
const unequal = x => y => x !== y
const gt = x => y => x > y
const lt = x => y => x < y
const gte = x => y => x >= y
const lte = x => y => x <= y

module.exports = {
    equal,
    unequal,
    gt,
    lt,
    gte,
    lte,
}
