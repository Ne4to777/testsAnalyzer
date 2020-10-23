const { typeOf, constructorOf } = require('../checkers')

const COLORS = {
    Reset: '\x1b[0m',
    Bright: '\x1b[1m',
    Dim: '\x1b[2m',
    Underscore: '\x1b[4m',
    Blink: '\x1b[5m',
    Reverse: '\x1b[7m',
    Hidden: '\x1b[8m',
    fg: {
        Black: '\x1b[30m',
        Red: '\x1b[31m',
        Green: '\x1b[32m',
        Yellow: '\x1b[33m',
        Blue: '\x1b[34m',
        Magenta: '\x1b[35m',
        Cyan: '\x1b[36m',
        White: '\x1b[37m',
        Crimson: '\x1b[38m'
    },
    bg: {
        Black: '\x1b[40m',
        Red: '\x1b[41m',
        Green: '\x1b[42m',
        Yellow: '\x1b[43m',
        Blue: '\x1b[44m',
        Magenta: '\x1b[45m',
        Cyan: '\x1b[46m',
        White: '\x1b[47m',
        Crimson: '\x1b[48m'
    }
}

const DEBUGGER_TYPE_COLORS = {
    undefined: COLORS.fg.Crimson,
    null: COLORS.fg.Crimson,
    number: COLORS.fg.Blue,
    string: COLORS.fg.Crimson,
    boolean: COLORS.fg.Yellow,
    regexp: COLORS.fg.Red,
    symbol: COLORS.fg.Red,
    object: COLORS.fg.Cyan,
    function: COLORS.fg.Cyan,
    array: COLORS.fg.Cyan,
}

const generateBoundings = ({ padding, filler = '=' }) => title => {
    let line = ''
    for (let i = 0; i < padding; i += 1) {
        line = line.concat(filler)
    }
    return {
        top: `${line} ${title} ${line}`,
        bottom: line + filler + title.replace(/./g, filler) + filler + line
    }
}

const logByLine = lines => lines.forEach(el => console.log(el))

const colorize = color => value => `${color}${value}\x1b[0m`

const debugParams = ({ name, types }) => (...params) => {
    const { top, bottom } = generateBoundings({ padding: 20 })(name)
    const { fg } = COLORS
    const {
        White,
        Green
    } = fg
    const colorizeGreen = colorize(Green)

    const paramLines = params.reduce((acc, param, i) => {
        const paramType = typeOf(param)
        const coloredParam = colorize(White)(param)
        const coloredType = colorize(DEBUGGER_TYPE_COLORS[paramType])(paramType)
        const type = types[i]
        const schemaType = type.prototype ? constructorOf(types[i]).toLowerCase() : type
        const coloredSchemaType = colorize(DEBUGGER_TYPE_COLORS[schemaType] || DEBUGGER_TYPE_COLORS.string)(schemaType)
        return acc.concat(`${coloredParam} -> ${coloredType} => ${coloredSchemaType}`)
    }, [])
    logByLine([
        colorizeGreen(top),
        ...paramLines,
        colorizeGreen(bottom)
    ])
}

module.exports = debugParams
