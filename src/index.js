/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const {
    parallel, pipe, I, C, T, A,
} = require('./utility/src/combinators')
const { reduceC } = require('./utility/src/array')
const { getProp } = require('./utility/src/object')
const { log, logToString } = require('./utility/src/debuggers')
const { getModuleByPath } = require('./utility/src/runtime')

const MODULES_FOLDER = 'src/modules'
const PARAMS_FOLDER = 'params'

const MODULE_NAMES = [
    // 'logger',
    'sniffer',
    // 'logger',
    'analyzer',
    // 'logger',
    'reporter',

]

const getPropI = C(getProp)

const getParamsModule = getModuleByPath(PARAMS_FOLDER)
const getModule = getModuleByPath(MODULES_FOLDER)

const reduceModules = C(reduceC(I))(MODULE_NAMES)

const chargeModuleWithParams = params => parallel(A)([
    getModule,
    getPropI(params),
])

const composeModules = accModule => module => pipe([
    accModule,
    module,
])

const composeChargedModuleWithParams = params => accModule => pipe([
    chargeModuleWithParams(params),
    composeModules(accModule),
])

const chargeModulesWithParams = pipe([
    composeChargedModuleWithParams,
    reduceModules,
    T('init data'),
])

module.exports = pipe([
    getParamsModule,
    chargeModulesWithParams,
])
