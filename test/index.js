
var test = require('tape')
var snabbdom = require('snabbdom')
var toHTML = require('../')
var init = require('../init')
var modules = require('../modules')
var h = snabbdom.h
var thunk = snabbdom.thunk

test('Main export', function (t) {
  t.equal(typeof toHTML, 'function', 'is function')
  t.equal(toHTML(h('i', { props: { title: 'Italics' } }, ':-)')), '<i title="Italics">:-)</i>', 'and it works')

  t.end()
})

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

  vnode = h('div', [
    undefined,
    null
  ])
  t.equal(renderToString(vnode), '<div></div>', 'null / undefined')

  vnode = h('!', 'comment text')
  t.equal(renderToString(vnode), '<!--comment text-->', 'comment')

  t.end()
})

test('Modules', function (t) {
  var vnode
  var html
  var renderToString = init([
    modules.class,
    modules.props,
    modules.attributes,
    modules.style,
    modules.dataset
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
      fontSize: '2em',
      lineHeight: 1.3
    }
  })
  t.equal(renderToString(vnode), '<div style="color: red; font-size: 2em; line-height: 1.3"></div>', 'style 2')

    // `delayed` and hook properties

  vnode = h('div', {
    style: {
      fontSize: '100%',
      color: 'blue',
      delayed: {
        color: 'white'
      },
      remove: {
        color: 'black'
      },
      destroy: {
        color: 'cyan'
      }
    }
  })
  t.equal(renderToString(vnode), '<div style="font-size: 100%; color: white"></div>', 'style 3')

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

  vnode = h('a#github', {
    props: {
      innerHTML: '<strong>Github</strong>',
      href: 'http://github.com',
      target: '_blank'
    }
  }, 'Github')
  t.equal(renderToString(vnode), '<a id="github" href="http://github.com" target="_blank"><strong>Github</strong></a>', 'props 4, innerHTML')

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
      class: 'a b',
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

  html =
    '<svg width="92" height="38" viewBox="0 0 92 38" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' +
      '<title>Balls</title>' +
      '<g fill="none" fill-rule="evenodd" stroke="#979797" stroke-width="3">' +
        '<circle cx="19" cy="19" r="17" /><circle cx="73" cy="19" r="17" />' +
      '</g>' +
    '</svg>'
  vnode = h('svg', {
    attrs: {
      width: '92',
      height: '38',
      viewBox: '0 0 92 38',
      xmlns: 'http://www.w3.org/2000/svg',
      'xmlns:xlink': 'http://www.w3.org/1999/xlink'
    }
  }, [
    h('title', 'Balls'),
    h('g', {
      attrs: {
        fill: 'none',
        'fill-rule': 'evenodd',
        stroke: '#979797',
        'stroke-width': 3
      }
    }, [
      h('circle', { props: { cx: '19', cy: '19', r: '17' } }),
      h('circle', { props: { cx: '73', cy: '19', r: '17' } })
    ])
  ])
  t.equal(renderToString(vnode), html, 'svg')

  html = '<svg><text>Hello world</text></svg>'
  vnode = h('svg', [
    h('text', 'Hello world')
  ])
  t.equal(renderToString(vnode), html, 'svg')

  vnode = h('label', {
    props: {
      htmlFor: 'beep'
    }
  }, [
    'Edge case ',
    h('input', { attrs: { type: 'text', value: 'Shit' } })
  ])
  t.equal(renderToString(vnode), '<label for="beep">Edge case <input type="text" value="Shit"></label>', 'htmlFor, nested tag and text together')

  // class

  vnode = h('p', {
    class: {
      yes: true,
      no: false
    }
  }, 'Text')
  t.equal(renderToString(vnode), '<p class="yes">Text</p>', 'class 1')

  vnode = h('p.yes.no', {
    class: {
      yes: true,
      no: false
    }
  }, 'Text')
  t.equal(renderToString(vnode), '<p class="yes">Text</p>', 'class 2')

  // classList behaviour
  vnode = h('p.yes.no', {
    class: {
      no: false,
      else: true
    }
  }, 'Text')
  t.equal(renderToString(vnode), '<p class="yes else">Text</p>', 'class 3')

  vnode = h('p.yes.no', {
    attrs: {
      class: 'something else'
    }
  }, 'Text')
  t.equal(renderToString(vnode), '<p class="something else">Text</p>', 'class 4')

  // dataset

  vnode = h('div', {
    dataset: {
      foo: 'bar',
      answer: 42
    }
  }, '')
  t.equal(renderToString(vnode), '<div data-foo="bar" data-answer="42"></div>', 'dataset 1')

  // altogether "randomly"

  vnode = h('h1#happy.regular', { props: { title: 'Cheers' } }, 'Happy Birthday')
  t.equal(renderToString(vnode), '<h1 id="happy" class="regular" title="Cheers">Happy Birthday</h1>', 'altogether')

  t.end()
})

test('Protect against `data` being undefined', function (t) {
  var vnode = h('div')
  vnode.data = undefined

  t.doesNotThrow(function () {
    return toHTML(vnode)
  })

  t.end()
})

test('Support thunks', function (t) {
  var vnode = thunk('span', numberInSpan, [22])

  function numberInSpan (n) {
    return h('span', 'Number is ' + n)
  }

  t.equal(toHTML(vnode), '<span>Number is 22</span>')

  t.end()
})

test('Custom CSS properties', function (t) {
  var vnode = h('div', {style: {'--customColor': '#000'}})

  t.equal(toHTML(vnode), '<div style="--custom-color: #000"></div>')

  t.end()
})

test('Escape HTML in text', function (t) {
  var vnode = h('div', ['<p></p>'])

  t.equal(toHTML(vnode), '<div>&lt;p&gt;&lt;/p&gt;</div>')

  vnode = h('div', '<p></p>')

  t.equal(toHTML(vnode), '<div>&lt;p&gt;&lt;/p&gt;</div>')

  t.end()
})

test('Empty string in children', function (t) {
  var vnode = h('span', [''])
  var htmlString = '<span></span>'

  t.equal(toHTML(vnode), htmlString)

  vnode = h('span', [])

  t.equal(toHTML(vnode), htmlString)

  vnode = h('span', '')

  t.equal(toHTML(vnode), htmlString)

  t.end()
})
