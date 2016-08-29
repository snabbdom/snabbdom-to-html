
var forOwn = require('lodash.forown')
var escape = require('lodash.escape')

// data.attrs

module.exports = function attrsModule (vnode, attributes) {
  var attrs = vnode.data.attrs || {}

  forOwn(attrs, function (value, key) {
    attributes.set(key, escape(value))
  })
}
