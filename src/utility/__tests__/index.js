const { testArrayInverted } = require('../src/regexp')

describe('utility', () => {
    test('testArrayInverted', () => {
        expect(testArrayInverted([/foo/])('.js')).toEqual(false)
    })
})
