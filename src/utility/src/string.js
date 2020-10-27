const trimLeft = perfix => data => data.replace(perfix, '')
const replaceC = re => replacer => data => data.replace(re, replacer)
const getEmptyString = () => ''
const splitC = re => data => data.split(re)
module.exports = {
    trimLeft,
    replaceC,
    getEmptyString,
    splitC
}
