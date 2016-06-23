
var assign = require('object-assign')
var forOwn = require('lodash.forown')
var escape = require('lodash.escape')
var kebabCase = require('lodash.kebabcase')

// data.style

module.exports = function styleModule (vnode, attributes) {
  var values = []
  var style = vnode.data.style || {}

  // merge in `delayed` properties
  if (style.delayed) {
    assign(style, style.delayed)
  }

  forOwn(style, function (value, key) {
    // omit hook objects
    if (typeof value === 'string' || typeof value === 'number') {
      values.push(`${kebabCase(key)}: ${escape(value)}`)
    }
  })

  if (values.length) {
    attributes('style', values.join('; '))
  }
}
