/* eslint-disable no-sequences */
module.exports = () => data => (console.log(data && data.join ? data.join('\n') : data), data)
