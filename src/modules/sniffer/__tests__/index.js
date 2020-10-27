const {
    isNameMatches,
    testByCaseInsensitive,
    isFileNameHasValidExtension,
    isFileNameValid,
    isFolder,
    isFolderValid,
} = require('../src')

// console.log(
// testByCaseInsensitive(/yva/)('fyvap')
// isNameMatches([/yva/, /dlo/])('dloyav')
// isFileNameHasValidExtension(['.js'])('yva.js')
// isFileNameValid({ extensions: ['.js'], patternsToExclude: ['yva', 'dlo'] })('yva.js')
// isFolder({ isDirectory: () => false })
// isFolderValid({ patternsToExclude: [/yva/, /dalo/] })({ name: 'dlo', isDirectory: () => true })
// )

function sum(a, b) {
    return a + b
}

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3)
})
