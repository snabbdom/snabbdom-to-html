
var forOwn = require('lodash.forown')
var escape = require('lodash.escape')
var kebabCase = require('lodash.kebabcase')

// data.style

module.exports = function style (vnode) {
  var styles = []
  var style = vnode.data.style || {}

  // merge in `delayed` properties
  if (style.delayed) {
    Object.assign(style, style.delayed)
  }

  forOwn(style, function (value, key) {
    // omit hook objects
    if (typeof value === 'string') {
      styles.push(`${kebabCase(key)}: ${escape(value)}`)
    }
  })

  return styles.length ? `style="${styles.join('; ')}"` : ''
}
