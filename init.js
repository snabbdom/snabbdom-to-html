
var parseSelector = require('./parse-selector')
var VOID_TAGS = require('./void-tags')

module.exports = function init (modules) {
  function parse (data) {
    return modules
      .reduce(function (arr, fn) {
        arr.push(fn(data))
        return arr
      }, [])
      .filter(function (result) {
        return result !== ''
      })
  }

  return function renderToString (vnode) {
    if (!vnode.sel && vnode.text) {
      return vnode.text
    }

    var tagName = parseSelector(vnode.sel).tagName
    var attributes = parse(vnode)
    var tag = []

    // Open tag
    tag.push('<' + tagName)
    if (attributes.length) {
      tag.push(' ' + attributes.join(' '))
    }
    tag.push('>')

    // Close tag, if needed
    if (VOID_TAGS[tagName.toUpperCase()] !== true) {
      if (vnode.text) {
        tag.push(vnode.text)
      } else if (vnode.children) {
        vnode.children.forEach(function (child) {
          tag.push(renderToString(child))
        })
      }
      tag.push(`</${tagName}>`)
    }

    return tag.join('')
  }
}
