module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
        jest: true
    },
    extends: [
        'airbnb-base',
    ],
    parserOptions: {
        ecmaVersion: 12,
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-tabs': 0,
        'comma-dangle': 0,
        'arrow-parens': 0,
        'no-confusing-arrow': 0,
        'no-nested-ternary': 0,
        'no-use-before-define': 0,
        'no-await-in-loop': 0,
        'no-loop-func': 0,
        'no-restricted-syntax': 0,
        'implicit-arrow-linebreak': 0,
        'import/no-cycle': [
            0,
            {
                maxDepth: 1
            }
        ],
        'max-len': [
            'error',
            120
        ],
        indent: [
            'error',
            4,
            {
                SwitchCase: 1
            }
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        quotes: [
            'error',
            'single'
        ],
        semi: [
            'error',
            'never'
        ],
        'operator-linebreak': 0
    }
}
