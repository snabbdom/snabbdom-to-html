var test = require('tape')
var h = require('snabbdom/h')
var init = require('../').init

test('No modules', function (t) {
  var vnode
  var renderToString = init([])

  vnode = h('div')
  t.equal(renderToString(vnode), '<div></div>', 'no content')

  vnode = h('div', 'Hello World')
  t.equal(renderToString(vnode), '<div>Hello World</div>', 'tag and content')

  vnode = h('br')
  t.equal(renderToString(vnode), '<br>', 'void element')

  vnode = h('div', [
    h('p', 'Paragraph 1'),
    h('p', [h('img')]),
    h('ul', [
      h('li', '1'),
      h('li', '2'),
      h('li', '3')
    ])
  ])
  t.equal(renderToString(vnode), '<div><p>Paragraph 1</p><p><img></p><ul><li>1</li><li>2</li><li>3</li></ul></div>', 'nesting')

  t.end()
})

test('Modules', function (t) {
  var vnode
  var renderToString = init([
    require('../modules/attributes'),
    require('../modules/style')
  ])

  // style

  vnode = h('div', {
    style: {
      backgroundColor: 'cyan'
    }
  })
  t.equal(renderToString(vnode), '<div style="background-color: cyan"></div>', 'style 1')

  vnode = h('div', {
    style: {
      color: 'red',
      fontSize: '2em'
    }
  })
  t.equal(renderToString(vnode), '<div style="color: red; font-size: 2em"></div>', 'style 2')

  // props

  vnode = h('a', {
    props: {
      href: 'http://github.com',
      target: '_blank'
    }
  }, 'Github')
  t.equal(renderToString(vnode), '<a href="http://github.com" target="_blank">Github</a>', 'props 1')

  vnode = h('a#github', {
    props: {
      className: 'a b',
      href: 'http://github.com',
      target: '_blank'
    }
  }, 'Github')
  t.equal(renderToString(vnode), '<a id="github" class="a b" href="http://github.com" target="_blank">Github</a>', 'props 2')

  vnode = h('a#github', {
    props: {
      id: 'overridden',
      href: 'http://github.com'
    }
  }, 'Github')
  t.equal(renderToString(vnode), '<a id="overridden" href="http://github.com">Github</a>', 'props 3, id override')

  // attrs

  vnode = h('a', {
    attrs: {
      href: 'http://github.com',
      target: '_blank'
    }
  }, 'Github')
  t.equal(renderToString(vnode), '<a href="http://github.com" target="_blank">Github</a>', 'attrs 1')

  vnode = h('a#github', {
    attrs: {
      className: 'a b',
      href: 'http://github.com',
      target: '_blank'
    }
  }, 'Github')
  t.equal(renderToString(vnode), '<a id="github" class="a b" href="http://github.com" target="_blank">Github</a>', 'attrs 2')

  vnode = h('a#github', {
    attrs: {
      id: 'overridden',
      href: 'http://github.com'
    }
  }, 'Github')
  t.equal(renderToString(vnode), '<a id="overridden" href="http://github.com">Github</a>', 'attrs 3, id override')

  vnode = h('label', {
    attrs: {
      htmlFor: 'beep'
    }
  }, [
    'Edge case',
    h('input', { attrs: { type: 'text', value: 'Shit' } })
  ])
  t.equal(renderToString(vnode), '<label for="beep">Edge case<input type="text" value="Shit"></label>', 'htmlFor, nested tag and text together')

  // className

  vnode = h('p', {
    class: {
      yes: true,
      no: false
    }
  }, 'Text')
  t.equal(renderToString(vnode), '<p class="yes">Text</p>', 'class 1')

  vnode = h('p.yes.sure', {
    class: {
      yes: true,
      no: false
    }
  }, 'Text')
  t.equal(renderToString(vnode), '<p class="yes sure">Text</p>', 'class 2, dupes 1')

  vnode = h('p.yes.sure', {
    class: {
      yes: true,
      no: false
    },
    attrs: {
      className: 'no extra'
    }
  }, 'Text')
  t.equal(renderToString(vnode), '<p class="yes sure">Text</p>', 'class 3, dupes 2')

  vnode = h('p.yes.sure', {
    attrs: {
      className: 'yes extra'
    }
  }, 'Text')
  t.equal(renderToString(vnode), '<p class="yes extra sure">Text</p>', 'class 4, dupes 3')

  // altogether "randomly"

  vnode = h('h1#happy.regular', { props: { title: 'Cheers' } }, 'Happy Birthday')
  t.equal(renderToString(vnode), '<h1 id="happy" title="Cheers" class="regular">Happy Birthday</h1>', 'altogether')

  t.end()
})
