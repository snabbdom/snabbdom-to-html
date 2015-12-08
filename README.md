# Snabbdom to HTML

Render Snabbdom Vnodes to HTML strings

## Install

With [`npm`](https://www.npmjs.com/) do:

```bash
npm install snabbdom-to-html
```

## Usage

```js
var h = require('snabbdom/h')

var snabbdomToHTML = require('snabbdom-to-html')
var renderToString = snabbdomToHTML.init([
  require('snabbdom-to-html/modules/attributes'),
  require('snabbdom-to-html/modules/style')
])

var output = renderToString(
  h('div', { style: { color: 'lime' } }, 'The quick brown fox jumps')
)

console.log(output)
// => <div style="color: lime">The quick brown fox jumps</div>
```

## License

MIT
