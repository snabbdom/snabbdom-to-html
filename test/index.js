var test = require('tape')
var h = require('snabbdom/h')
var init = require('../').init

test('No modules', function (t) {
  var vnode
  var renderToString = init([])

  vnode = h('div')
  t.equal(renderToString(vnode), '<div></div>')

  vnode = h('div', 'Hello World')
  t.equal(renderToString(vnode), '<div>Hello World</div>')

  vnode = h('br')
  t.equal(renderToString(vnode), '<br>')

  vnode = h('div', [
    h('p', 'Paragraph 1'),
    h('p', [h('img')]),
    h('ul', [
      h('li', '1'),
      h('li', '2'),
      h('li', '3')
    ])
  ])
  t.equal(renderToString(vnode), '<div><p>Paragraph 1</p><p><img></p><ul><li>1</li><li>2</li><li>3</li></ul></div>')

  t.end()
})

test('Modules', function (t) {
  var vnode
  var renderToString = init([
    require('../modules/properties'),
    require('../modules/attributes'),
    require('../modules/class-name'),
    require('../modules/style')
  ])

  vnode = h('div', {
    style: {
      backgroundColor: 'cyan'
    }
  })
  t.equal(renderToString(vnode), '<div style="background-color: cyan"></div>')

  vnode = h('div', {
    style: {
      color: 'red',
      fontSize: '2em'
    }
  })
  t.equal(renderToString(vnode), '<div style="color: red; font-size: 2em"></div>')

  t.end()
})
