
var forOwn = require('lodash.forown')

// data.class

module.exports = function classModule (vnode, attributes) {
  var values = []
  var classes = vnode.data.class || {}

  forOwn(classes, function (value, key) {
    if (value === true) {
      values.push(key)
    }
  })

  if (values.length) {
    attributes.set('class', values.join(' '))
  }
}
