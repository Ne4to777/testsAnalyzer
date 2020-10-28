const {
    testArray,
    testArrayInverted,
    decisionJoiner,
    decisionsJoiner,
    parallelDecisionJoiner,
    parallelDecisionsJoiner,
    getChannelByCheckers,
    getDecision,
} = require('../src')

describe('analyzer', () => {
    const checkers = {
        Unit: {
            path: [
                /some1\/folder1\/file1/,
            ],
            content: [
                /content1/,
            ],
        },
        Component: {
            path: [
                /some2\/folder2\/file2/,
            ],
            content: [
                /content2/,
            ],
        },
        E2E: {
            path: [
                /some3\/folder3\/file3/,
            ],
            content: [
                /content3/,
            ],
        },
    }
    test('string should match with Array<RegExp>', () => {
        expect(testArray('foo')([/foo/])).toEqual(true)
    })
    test('Array<RegExp> should match with string', () => {
        expect(testArrayInverted([/foo/])('foo')).toEqual(true)
    })

    test('decisionJoiner', () => {
        expect(decisionJoiner(false)(false)(false)).toEqual({})
        expect(decisionJoiner(true)(false)(false)).toEqual({ Unit: true })
        expect(decisionJoiner(true)(true)(false)).toEqual({ Unit: true, Component: true })
        expect(decisionJoiner(true)(false)(true)).toEqual({ Unit: true })
        expect(decisionJoiner(true)(true)(true)).toEqual({ Unit: true, Component: true })
        expect(decisionJoiner(false)(true)(false)).toEqual({ Component: true })
        expect(decisionJoiner(false)(false)(true)).toEqual({ E2E: true })
        expect(decisionJoiner(false)(true)(true)).toEqual({ E2E: true, Component: true })
    })

    test('decisionsJoiner', () => {
        expect(decisionsJoiner({})({})).toEqual('')
        expect(decisionsJoiner({ Unit: true })({})).toEqual('Unit')
        expect(decisionsJoiner({})({ Unit: true })).toEqual('Unit')
        expect(decisionsJoiner({ Unit: true })({ Component: true })).toEqual('Unit')
        expect(decisionsJoiner({ Unit: true, Component: true })({ E2E: true })).toEqual('Unit, Component')
        expect(decisionsJoiner({})({ Unit: true, Component: true, E2E: true })).toEqual('Unit, Component, E2E')
    })

    test('parallelDecisionJoiner by content', () => {
        const joiner = parallelDecisionJoiner([
            testArrayInverted(checkers.Unit.content),
            testArrayInverted(checkers.Component.content),
            testArrayInverted(checkers.E2E.content),
        ])
        expect(joiner('content1')).toEqual({ Unit: true })
        expect(joiner('content2')).toEqual({ Component: true })
        expect(joiner('content3')).toEqual({ E2E: true })
    })

    test('parallelDecisionJoiner by path', () => {
        const joiner = parallelDecisionJoiner([
            testArrayInverted(checkers.Unit.path),
            testArrayInverted(checkers.Component.path),
            testArrayInverted(checkers.E2E.path),
        ])
        expect(joiner('/some1/folder1/file1')).toEqual({ Unit: true })
        expect(joiner('/some2/folder2/file2')).toEqual({ Component: true })
        expect(joiner('/some3/folder3/file3')).toEqual({ E2E: true })
    })

    test('parallelDecisionsJoiner', () => {
        const getChannel = getChannelByCheckers(checkers)
        const joiner = parallelDecisionsJoiner([
            getChannel('content'),
            getChannel('path'),
        ])
        expect(joiner('')).toEqual('')
        expect(joiner({ content: 'content1' })).toEqual('Unit')
        expect(joiner({ path: '/some1/folder1/file1' })).toEqual('Unit')
    })

    test('getDecision', () => {
        const getDecisionByCheckers = getDecision(checkers)
        expect(getDecisionByCheckers({ content: 'content1' })).toEqual('Unit')
        expect(getDecisionByCheckers({ content: 'content2' })).toEqual('Component')
        expect(getDecisionByCheckers({ content: 'content3' })).toEqual('E2E')
    })
})
