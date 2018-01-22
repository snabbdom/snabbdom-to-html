
var forOwn = require('lodash.forown')
var escape = require('lodash.escape')

// data.dataset

module.exports = function datasetModule (vnode, attributes) {
  var dataset = vnode.data.dataset || {}

  forOwn(dataset, function (value, key) {
    attributes.set(`data-${key}`, escape(value))
  })
}
