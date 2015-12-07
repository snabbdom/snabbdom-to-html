# Snabbdom Server

Render snabbdom vnodes to an HTML string

> This is not ready yet, modules are missing

## Usage

```js
var h = require('snabbdom/h')
var snabbdomServer = require('snabbdom-server')
var renderToString = snabbdomServer.init([
  require('snabbdom-server/modules/attributes'),
  require('snabbdom-server/modules/properties'),
  require('snabbdom-server/modules/class-name'),
  require('snabbdom-server/modules/style')
])

var output = renderToString(
  h('div', 'Server-side rendering FTW')
)

console.log(output)
// => <div>Server-side rendering FTW</div>
```

## License

MIT
