
var test = require('tape')
var createAttributes = require('../attributes')

test('Attributes helper', function (t) {
  var attributes = createAttributes()

  t.notEqual(attributes(), createAttributes()(), 'has no globals')

  attributes('foo', 'bar')
  t.equal(attributes().length, 1)
  t.equal(attributes()[0].key, 'foo')
  t.equal(attributes()[0].value, 'bar', 'sets')

  attributes('baz', 0)
  t.equal(attributes().length, 2)

  t.equal(attributes('nono'), null)
  t.equal(attributes('baz'), 0, 'gets')

  attributes('foo', '..')
  t.equal(attributes()[0].value, '..', 'replaces')

  attributes('foo', null)
  t.equal(attributes().length, 1)
  t.equal(attributes()[0].value, 0, 'deletes')

  attributes('1', 1)
  attributes('2', 2)
  attributes('3', 3)
  attributes('4', 4)
  t.deepEqual(attributes().map(function (n) { return n.value }), [0, 1, 2, 3, 4], 'keeps insertion order')

  t.throws(setFn(function () {}), 'throws with function as value')
  t.throws(setFn({}), 'throws with object as value')
  t.throws(setFn(null), 'throws with null as value')
  t.throws(setFn([]), 'throws with array as value')

  function setFn (value) {
    return function () {
      attributes('fn', value)
    }
  }

  t.end()
})
