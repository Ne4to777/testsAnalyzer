const debugParams = require('./debugParams')
const FileLogger = require('./fileLogger')

const log = (...args) => (console.log(...args), args[0])
const trace = x => (console.trace(x), x)
const logToString = x => (console.log(x.toString()), x)

module.exports = {
    debugParams,
    FileLogger,
    log,
    trace,
    logToString
}
