const TRUE = () => true
const FALSE = () => false
const not = x => !x
const negate = f => x => not(f(x))
const and = x => y => x && y
const or = x => y => x || y
const conjunct = f => g => x => and(f(x))(g(x))
const disjunct = f => g => x => or(f(x))(g(x))

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
