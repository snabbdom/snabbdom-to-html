
var forOwn = require('lodash.forown')
var remove = require('lodash.remove')
var uniq = require('lodash.uniq')

// data.class

module.exports = function classModule (vnode, attributes) {
  var values
  var _add = []
  var _remove = []
  var classes = vnode.data.class || {}
  var existing = attributes.get('class')
  existing = existing.length > 0 ? existing.split(' ') : []

  forOwn(classes, function (value, key) {
    if (value === true) {
      _add.push(key)
    } else {
      _remove.push(key)
    }
  })

  values = remove(uniq(existing.concat(_add)), function (value) {
    return _remove.indexOf(value) < 0
  })

  if (values.length) {
    attributes.set('class', values.join(' '))
  }
}
