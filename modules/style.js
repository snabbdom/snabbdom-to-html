
var forOwn = require('lodash.forown')
var escape = require('lodash.escape')
var kebabCase = require('lodash.kebabcase')

// data.style

module.exports = function style (vnode) {
  var styles = vnode.data.style
  var result = []

  forOwn(styles, function (value, key) {
    result.push(`${kebabCase(key)}: ${escape(value)}`)
  })

  return result.length ? `style="${result.join('; ')}"` : ''
}
