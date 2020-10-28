const TRUE = () => true
const FALSE = () => false
const not = x => !x
const negate = f => x => not(f(x))
const conjunct = f => g => x => f(x) && g(x)
const disjunct = f => g => x => f(x) || g(x)
const and = x => y => x && y
const or = x => y => x || y

module.exports = {
    TRUE,
    FALSE,
    not,
    negate,
    conjunct,
    disjunct,
    and,
    or,
}
