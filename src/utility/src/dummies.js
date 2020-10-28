/* eslint-disable func-names */
/* eslint-disable no-empty-function */

const emptyFunction = () => {}
const emptyGenerator = async function* () {}
const emptyFileLogger = {
    add: () => {},
}
const emptyTest = () => test('empty', () => {

})

module.exports = {
    emptyFunction,
    emptyGenerator,
    emptyTest,
    emptyFileLogger,
}
