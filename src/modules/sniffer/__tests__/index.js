const {
    isFileNameHasValidExtension,
} = require('../src')

describe('sniffer', () => {
    test('isFileNameHasValidExtension', () => {
        expect(isFileNameHasValidExtension(['.js'])('foo.js')).toEqual(true)
    })
})
