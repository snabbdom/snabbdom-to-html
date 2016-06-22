
module.exports = function createAttributes () {
  var _attributes = []

  return function attributes () {
    var key = arguments[0]
    var value = arguments[1]

    if (arguments.length === 1) {
      return get(key)
    }
    if (arguments.length === 2) {
      return set(key, value)
    }

    return _attributes
  }

  function get (key) {
    var index = findIndex(_attributes, key)
    return _attributes[index] ? _attributes[index].value : null
  }

  function set (key, value) {
    var index = findIndex(_attributes, key)
    var item = {
      key: key,
      value: value
    }

    if (index > -1) {
      if (value === null || typeof value === 'undefined') {
        _attributes.splice(index, 1)
      } else {
        _attributes.splice(index, 1, item)
      }
      return
    }
    if (typeof value !== 'string' && typeof value !== 'number') {
      throw new TypeError(
        'Only strings and numbers are allowed for values. ' +
        'Tried to set `' + key + '` to ' + typeof value + '.'
      )
    }
    _attributes.push(item)
  }
}

function findIndex (target, key) {
  var index = -1
  target.some(function (value, i) {
    if (value.key === key) {
      index = i
      return true
    }
  })
  return index
}
