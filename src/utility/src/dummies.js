/* eslint-disable func-names */
/* eslint-disable no-empty-function */

const emptyGenerator = async function* () {}

module.exports = {
    emptyGenerator,
    emptyFileLogger: {
        add: () => {}
    }
}
