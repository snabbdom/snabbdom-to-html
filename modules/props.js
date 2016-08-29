
var forOwn = require('lodash.forown')
var escape = require('lodash.escape')

// https://developer.mozilla.org/en-US/docs/Web/API/element
var omit = [
  'attributes',
  'childElementCount',
  'children',
  'classList',
  'clientHeight',
  'clientLeft',
  'clientTop',
  'clientWidth',
  'currentStyle',
  'firstElementChild',
  'innerHTML',
  'lastElementChild',
  'nextElementSibling',
  'ongotpointercapture',
  'onlostpointercapture',
  'onwheel',
  'outerHTML',
  'previousElementSibling',
  'runtimeStyle',
  'scrollHeight',
  'scrollLeft',
  'scrollLeftMax',
  'scrollTop',
  'scrollTopMax',
  'scrollWidth',
  'tabStop',
  'tagName'
]

// data.props

module.exports = function propsModule (vnode, attributes) {
  var props = vnode.data.props || {}

  forOwn(props, function (value, key) {
    if (omit.indexOf(key) > -1) {
      return
    }
    if (key === 'htmlFor') {
      key = 'for'
    }
    if (key === 'className') {
      key = 'class'
    }

    attributes.set(key.toLowerCase(), escape(value))
  })
}
