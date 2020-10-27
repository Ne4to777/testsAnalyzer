const ifElse = predicate => onTrue => onFalse => data => predicate(data)
    ? onTrue(data)
    : onFalse
        ? onFalse(data)
        : false
const ifThen = predicate => onTrue => data => predicate(data)
    ? onTrue(data)
    : data

module.exports = {
    ifElse,
    ifThen
}
