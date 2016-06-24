
var init = require('./init')
var modules = require('./modules')

var toHTML = init([
  modules.class,
  modules.props,
  modules.attributes,
  modules.style
])

module.exports = toHTML
