const {
    isFileNameHasValidExtension,
    isFileNameValid,
    isFolderValid,
    testFileNameExtension,
    testNameNotExcluded,
    sniff,
} = require('../src')

describe('sniffer', () => {
    test('isFileNameHasValidExtension', () => {
        expect(isFileNameHasValidExtension(['.js'])('foo.js')).toEqual(true)
        expect(isFileNameHasValidExtension(['.js'])('foo.ts')).toEqual(false)
        expect(isFileNameHasValidExtension(['.js'])('.js')).toEqual(false)
        expect(isFileNameHasValidExtension(['.js'])('.ts')).toEqual(false)
    })
    test('testFileNameExtension', () => {
        expect(testFileNameExtension({ extensions: ['.js'] })('foo.js')).toEqual(true)
        expect(testFileNameExtension({ extensions: ['.js'] })('.js')).toEqual(false)
        expect(testFileNameExtension({ extensions: ['.js'] })('.ts')).toEqual(false)
        expect(testFileNameExtension({ extensions: ['.js'] })('foo.ts')).toEqual(false)
    })

    test('testNameNotExcluded', () => {
        expect(testNameNotExcluded({ patternsToExclude: [/bar/] })('foo.js')).toEqual(true)
        expect(testNameNotExcluded({ patternsToExclude: [/foo/] })('.js')).toEqual(true)
        expect(testNameNotExcluded({ patternsToExclude: [/bar/] })('.ts')).toEqual(true)
        expect(testNameNotExcluded({ patternsToExclude: [/foo/] })('foo.ts')).toEqual(false)
        expect(testNameNotExcluded({ patternsToExclude: [/bar/] })('foo.ts')).toEqual(true)
    })

    test('isFileNameValid', () => {
        expect(isFileNameValid({ extensions: ['.js'], patternsToExclude: [/bar/] })('foo.js')).toEqual(true)
        expect(isFileNameValid({ extensions: ['.js'], patternsToExclude: [/foo/] })('foo.js')).toEqual(false)
        expect(isFileNameValid({ extensions: ['.js'], patternsToExclude: [/foo/] })('foo.ts')).toEqual(false)
        expect(isFileNameValid({ extensions: ['.js'], patternsToExclude: [/bar/] })('foo.ts')).toEqual(false)
    })

    test('isFolderValid', () => {
        expect(isFolderValid({ patternsToExclude: [/bar/] })({ isDirectory: () => true, name: 'foo' })).toEqual(true)
        expect(isFolderValid({ patternsToExclude: [/foo/] })({ isDirectory: () => true, name: 'foo' })).toEqual(false)
    })

    test('sniff', async () => {
        const root = `${__dirname}/__mocks__/`
        const params1 = {
            validPaths: [/foo/],
            extensions: ['.js'],
            exclude: {
                folders: [/bak/],
                files: [/bar/, /foo/, /baz.js/, /bak/],
            },
        }
        const params2 = {
            validPaths: [/bar/],
            extensions: ['.ts'],
            exclude: {
                folders: [],
                files: [/bar/],
            },
        }

        expect(await sniff(params1)(root)).toEqual([
            `${root}foo/baz/bazFile.js`,
        ])
        expect(await sniff(params2)(root)).toEqual([
            `${root}bar/foo.ts`,
        ])
    })
})
