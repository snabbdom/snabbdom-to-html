# Snabbdom Server

Render snabbdom vnodes to an HTML string

## Usage

```js
var h = require('snabbdom/h')
var snabbdomServer = require('snabbdom-server')
var renderToString = snabbdomServer.init([
  require('snabbdom-server/modules/attributes'),
  require('snabbdom-server/modules/style')
])

var output = renderToString(
  h('div', { style: { color: 'lime' } }, 'Server-side rendering FTW')
)

console.log(output)
// => <div style="color: lime">Server-side rendering FTW</div>
```

## License

MIT
