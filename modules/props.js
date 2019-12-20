
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

// https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#boolean-attributes
var booleanAttributes = [
  'disabled',
  'visible',
  'checked',
  'readonly',
  'required',
  'allowfullscreen',
  'autofocus',
  'autoplay',
  'compact',
  'controls',
  'default',
  'formnovalidate',
  'hidden',
  'ismap',
  'itemscope',
  'loop',
  'multiple',
  'muted',
  'noresize',
  'noshade',
  'novalidate',
  'nowrap',
  'open',
  'reversed',
  'seamless',
  'selected',
  'sortable',
  'truespeed',
  'typemustmatch'
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

    var lkey = key.toLowerCase()
    if (~booleanAttributes.indexOf(lkey)) {
      if (value) { // set attr only when truthy
        attributes.set(lkey, lkey)
      }
    } else {
      attributes.set(lkey, escape(value))
    }
  })
}
