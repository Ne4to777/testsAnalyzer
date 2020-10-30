const { testArrayInverted } = require('../src/regexp')
const {
    S, B, W, Y, concatenizeN, parallelizeN, composeN,
} = require('../src/combinators')

describe('utility', () => {
    // test('testArrayInverted', () => {
    //     expect(testArrayInverted([/foo/])('.js')).toEqual(false)
    // })
    test('combinators', () => {
        // const L1 = f => g => x => f(g(x))
        // const L2 = f => g => k => x => f(g(x))(k(x))
        // const L3 = f => g => k => p => x => f(g(x))(k(x))(p(x))

        // const L1 = B
        // const L2 = B(B(S))(L1)
        // const L3 = B(B(B(S)))(L2)
        // const L3 = B(B(B(S)))(B(B(S))(B))
        // const L4 = B(B(B(B(S))))(L3)

        const L1 = parallelizeN(1)
        const L2 = parallelizeN(2)
        const L3 = parallelizeN(3)
        const L4 = parallelizeN(4)

        const sum = x => y => x + y
        const sumN = concatenizeN(sum)(0)
        const s1 = sumN(1)
        const s2 = sumN(2)
        const s3 = sumN(3)
        const s4 = sumN(4)

        const L11 = composeN(L1)(2)
        const L111 = composeN(L1)(3)
        const L1111 = composeN(L1)(4)

        const L22 = composeN(L2)(2)
        const L222 = composeN(L2)(3)
        const L2222 = composeN(L2)(4)

        const L33 = composeN(L3)(2)
        const L333 = composeN(L3)(3)
        const L3333 = composeN(L3)(4)

        const L44 = composeN(L4)(2)
        const L444 = composeN(L4)(3)
        const L4444 = composeN(L4)(4)

        expect(L1(x => [x])(s1)(1)).toEqual([1])
        expect(L2(x => y => [x, y])(s1)(s1)(1)).toEqual([1, 1])
        expect(L3(x => y => z => [x, y, z])(s1)(s1)(s1)(1)).toEqual([1, 1, 1])
        expect(L4(x => y => z => k => [x, y, z, k])(s1)(s1)(s1)(s1)(1)).toEqual([1, 1, 1, 1])

        expect(L11(x => [x])(s2)(1)(2)).toEqual([3])
        expect(L22(x => y => [x, y])(s2)(s2)(1)(2)).toEqual([3, 3])
        expect(L33(x => y => z => [x, y, z])(s2)(s2)(s2)(1)(2)).toEqual([3, 3, 3])
        expect(L44(x => y => z => k => [x, y, z, k])(s2)(s2)(s2)(s2)(1)(2)).toEqual([3, 3, 3, 3])

        expect(L111(x => [x])(s3)(1)(2)(3)).toEqual([6])
        expect(L222(x => y => [x, y])(s3)(s3)(1)(2)(3)).toEqual([6, 6])
        expect(L333(x => y => z => [x, y, z])(s3)(s3)(s3)(1)(2)(3)).toEqual([6, 6, 6])
        expect(L444(x => y => z => k => [x, y, z, k])(s3)(s3)(s3)(s3)(1)(2)(3)).toEqual([6, 6, 6, 6])

        expect(L1111(x => [x])(s4)(1)(2)(3)(4)).toEqual([10])
        expect(L2222(x => y => [x, y])(s4)(s4)(1)(2)(3)(4)).toEqual([10, 10])
        expect(L3333(x => y => z => [x, y, z])(s4)(s4)(s4)(1)(2)(3)(4)).toEqual([10, 10, 10])
        expect(L4444(x => y => z => k => [x, y, z, k])(s4)(s4)(s4)(s4)(1)(2)(3)(4)).toEqual([10, 10, 10, 10])
    })
})
