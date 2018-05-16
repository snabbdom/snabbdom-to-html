
var escape = require('lodash.escape')
var parseSelector = require('parse-sel')
var VOID_ELEMENTS = require('./elements').VOID
var CONTAINER_ELEMENTS = require('./elements').CONTAINER

module.exports = function init (modules) {
  function parse (vnode, node) {
    var result = []
    var attributes = new Map([
      // These can be overwritten because that’s what happens in snabbdom
      ['id', node.id],
      ['class', node.className]
    ])

    modules.forEach(function (fn, index) {
      fn(vnode, attributes)
    })
    attributes.forEach(function (value, key) {
      if (value && value !== '') {
        result.push(key + '="' + value + '"')
      }
    })

    return result.join(' ')
  }

  return function renderToString (vnode) {
    if (typeof vnode === 'undefined' || vnode === null) {
      return ''
    }

    if (!vnode.sel && typeof vnode.text === 'string') {
      return escape(vnode.text)
    }

    vnode.data = vnode.data || {}

    // Support thunks
    if (vnode.data.hook &&
      typeof vnode.data.hook.init === 'function' &&
      typeof vnode.data.fn === 'function') {
      vnode.data.hook.init(vnode)
    }

    var node = parseSelector(vnode.sel)
    var tagName = node.tagName
    var attributes = parse(vnode, node)
    var svg = vnode.data.ns === 'http://www.w3.org/2000/svg'
    var tag = []

    if (tagName === '!') {
      return '<!--' + vnode.text + '-->'
    }

    // Open tag
    tag.push('<' + tagName)
    if (attributes.length) {
      tag.push(' ' + attributes)
    }
    if (svg && CONTAINER_ELEMENTS[tagName] !== true) {
      tag.push(' /')
    }
    tag.push('>')

    // Close tag, if needed
    if ((VOID_ELEMENTS[tagName] !== true && !svg) ||
        (svg && CONTAINER_ELEMENTS[tagName] === true)) {
      if (vnode.data.props && vnode.data.props.innerHTML) {
        tag.push(vnode.data.props.innerHTML)
      } else if (vnode.text) {
        tag.push(escape(vnode.text))
      } else if (vnode.children) {
        vnode.children.forEach(function (child) {
          tag.push(renderToString(child))
        })
      }
      tag.push('</' + tagName + '>')
    }

    return tag.join('')
  }
}
